from kafka import KafkaProducer
from time import sleep


producer = KafkaProducer()
for i in range(10000):
    producer.send('trump', b'I hate cats cats')
    print('msg sent')
    sleep(1)
