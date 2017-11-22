from kafka import KafkaProducer
from time import sleep
from api.connection_helper import ConnectionHelper
from api.create_topic import create_topic


topic = 'trump'
topic_id = create_topic(topic, ConnectionHelper())
producer = KafkaProducer()

print('topic {} working with id {}'.format(topic, topic_id))

for i in range(10000):
    producer.send(topic, b'I hate cats cats')
    print('msg sent')
    sleep(1)
