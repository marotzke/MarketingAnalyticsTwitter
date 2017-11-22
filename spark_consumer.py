import nltk.sentiment.vader as vader
import requests

from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils
from api.connection_helper import ConnectionHelper


def mapping_func(line):
    # if 'text' in l:
    compound = float(vader.SentimentIntensityAnalyzer() \
                     .polarity_scores(line)['compound'])
    if compound < -.25:
        return (0, 0, 1, 1)
    elif compound > .25:
        return (1, 0, 0, 1)
    else:
        return (0, 1, 0, 1)


def get_topic_id(topic, conn):
    return int(conn.run('select topic_id from topic where topic_name=%s', topic)[0])


def add_to_db(val, id_, conn):
    query = '''
    insert into sentiment(sentiment_pos, sentiment_neg,
                          sentiment_neu, sentiment_count,
                          topic_id) values
    (%s, %s, %s, %s, %s)
    '''
    conn.run(query, (val[0], val[2], val[1], val[3], id_))


def send_rdd(rdd, id_, conn):
    try:
        tmp = rdd.take(1)[0]
    except IndexError:
        return

    add_to_db(tmp, id_, conn)
    requests.post(url, json={
        'good': tmp[0],
        'neutral': tmp[1],
        'bad': tmp[2],
        'count': tmp[3]
    })


if __name__ == "__main__":
    sc = SparkContext(appName="PythonStreamingKafkaWordCount")
    ssc = StreamingContext(sc, 15)
    sia = vader.SentimentIntensityAnalyzer()
    zkQuorum = 'localhost:2181'
    topic = 'trump'
    url = 'http://127.0.0.1:5000/'
    conn = ConnectionHelper()
    id_ = get_topic_id(topic, conn)


    kvs = KafkaUtils.createStream(ssc, zkQuorum, "spark-streaming-consumer", {topic: 1})
    lines = kvs.map(lambda x: x[1])

    counts = lines.map(mapping_func) \
                  .reduce(lambda x, y: [xx + yy for xx, yy in zip(x, y)])

    counts.foreachRDD(lambda x: send_rdd(x, id_, conn))  # counts is a dstream (stream of rdds)

    ssc.start()
    ssc.awaitTermination()
