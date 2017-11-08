import nltk.sentiment.vader as vader
import logging

from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils


def mapping_func(line):
    # if 'text' in l:
    return float(
            vader.SentimentIntensityAnalyzer() \
            .polarity_scores(line)['compound'])
    # return 0.0  # check this later.

if __name__ == "__main__":
    sc = SparkContext(appName="PythonStreamingKafkaWordCount")
    ssc = StreamingContext(sc, 1)
    sia = vader.SentimentIntensityAnalyzer()
    zkQuorum = 'localhost:2181'
    topic = 'trump'
    logger = logging.getLogger('py4j')

    kvs = KafkaUtils.createStream(ssc, zkQuorum, "spark-streaming-consumer", {topic: 1})
    lines = kvs.map(lambda x: x[1])

    counts = lines.map(mapping_func) \
                  .reduce(lambda x, y: x + y)
    # x = counts.pprint()
    # counts.pprint()
    # logger.info(str(type(counts)))
    counts.foreachRDD(lambda x: print('\n\n\n\n\n\n', x.take(1)))
    # print(counts)

    ssc.start()
    ssc.awaitTermination()
