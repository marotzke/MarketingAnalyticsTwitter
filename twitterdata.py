#!/usr/bin/python3

from twitter import *
import re
import csv
import datetime
import time
import boto3
import threading
import os

search_term = "trump"


config = {
    "consumer_key" : "M3pMpicq5BjCdr06V9hUgah8D",
    "consumer_secret" : "phnLBYoWeFlN2McsxqX7BOKs7j9IjOcelOEfQc19y8kBQjZQiW",
    "access_key" : "766337204654317568-VzhJeBjU4S555FTshpAgUuSjiub2Uhw",
    "access_secret" : "3eWcGrBGlNqXwOWN5lNZRs1Bw10g5I1iXjSWGbOFib0ZK"
}
 
def send_to_s3(file_name):
    AWS_BUCKET = "marketing-analytics-megadados"
    s3 = boto3.resource("s3")
    with open(file_name,'rb') as f:
        s3.Bucket(AWS_BUCKET).put_object(Key=file_name, Body=f)
    print("sent")
    os.remove(file_name)

while True:
    count = 0
    st = datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d_%H:%M:%S')
    auth = OAuth(config["access_key"], config["access_secret"], config["consumer_key"], config["consumer_secret"])
    stream = TwitterStream(auth = auth, secure = True)
    tweet_iter = stream.statuses.filter(track = search_term)
    file_name = "twitter-data-{0}.txt".format(st)
    with open(file_name, "w") as f:
        for tweet in tweet_iter:
            f.write(str(tweet))
            f.write("\n")
            count += 1
            if count == 100:
                break
    t1 = threading.Thread(target=send_to_s3, args=(file_name,))
    t1.start()