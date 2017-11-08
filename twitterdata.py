#!/usr/bin/python3

from twitter import *
import re
import datetime
import time
import boto3
import threading
import os
from pathlib import Path

search_term = "trump"

home = str(Path.home())

with open("/{0}/twitter_keys.txt".format(home), "r") as f:
    ck = f.readline().strip()
    cs = f.readline().strip()
    ak = f.readline().strip()
    a_s = f.readline().strip()
    config = {
        "consumer_key" : ck,
        "consumer_secret" : cs,
        "access_key" : ak,
        "access_secret" : a_s
    }

def send_to_s3(file_name):
    AWS_BUCKET = "marketing-analytics-megadados"
    s3 = boto3.resource("s3")
    with open(file_name,'rb') as f:
        s3.Bucket(AWS_BUCKET).put_object(Key=file_name, Body=f)
    print("sent")
    os.remove(file_name)

while True:
    try:
        count = 0
        st = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d_%H:%M:%S')
        auth = OAuth(
            config["access_key"],
            config["access_secret"],
            config["consumer_key"],
            config["consumer_secret"]
        )
        stream = TwitterStream(auth = auth, secure = True)
        tweet_iter = stream.statuses.filter(track = search_term)
        file_name = "twitter-data-{0}.txt".format(st)
        with open(file_name, "w") as f:
            print("here")
            for tweet in tweet_iter:
                f.write(str(tweet))
                f.write("\n")
                count += 1
                if count == 10000:
                    break
        t1 = threading.Thread(target=send_to_s3, args=(file_name,))
        t1.start()
    except:
        time.sleep(1000)
