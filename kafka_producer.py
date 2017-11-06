from kafka import KafkaProducer
from time import sleep


producer = KafkaProducer()
for _ in range(100):
    producer.send('trump', b'I hate cats cats')
    print('msg sent')
    sleep(1)
