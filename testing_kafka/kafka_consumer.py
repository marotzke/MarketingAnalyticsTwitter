import nltk.sentiment.vader as vader

from kafka import KafkaConsumer


sia = vader.SentimentIntensityAnalyzer()
consumer = KafkaConsumer('trump')
for msg in consumer:
    print(sia.polarity_scores(str(msg.value)))
