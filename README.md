# MarketingAnalyticsTwitter

Project for BigData Discipline - Insper - Computer Engineering Program

## Project Description

### Business Model

The goal of this is project is to provide a tool to better understand user reaction to marketing campaigns or even popularity of
specific topic. Designed for Marketing Companies and Companies' Marketing Areas, this project has a dashboard that allows its users to monitor natural language interpreted sentiment from Tweets in real-time to better understand behavior and get insights for future campaigns.

The Business Model Canvas:
![alt text](https://raw.githubusercontent.com/MatheusDMD/MarketingAnalyticsTwitter/master/images/Canvas.jpeg "Canvas")

### Technologies Involved

To achieve the real-time processing we used a BigData Stream Processing paradigm. We used [Kafka](https://kafka.apache.org/) to manage the Stream of data. A Twitter API to collect tweets filtered by word of choice served as **Producer** and [SparkStreaming](https://spark.apache.org/streaming/) with PySpark to process batches of raw Tweets into sentiment value, it serves as **Consumer** to Kafka's topic.

A **React** designed dashboard interacts with end-users providing the information from the tweet's sentiment analysis. Along with a **Python Flask** server the application distributes the data from SparkStream to both a **MySQL Database** for future analysis and long-term storage.

## Running the application

yet to come

### Pre-requirements

### Running commands

  - How to use spark-streaming
    https://www.rittmanmead.com/blog/2017/01/getting-started-with-spark-streaming-with-python-and-kafka/

  - Consumer run command:
    ```spark-submit --packages org.apache.spark:spark-streaming-kafka-0-8_2.11:2.0.2 spark_consumer.py```

  - FrontEnd run command:
    ```npm install```
    ```npm start```