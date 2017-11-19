drop database if exists marketing_analytics_twitter;
create database marketing_analytics_twitter;
use marketing_analytics_twitter;

create table topic (
	topic_id integer not null auto_increment primary key,
    topic_name varchar(500)
);

create table sentiment (
    sentiment_ts timestamp primary key, -- autoupdatable
    sentiment_pos integer,
    sentiment_neg integer,
    sentiment_neu integer,
    sentiment_count integer,
    topic_id integer not null,
    foreign key (topic_id)
		references topic(topic_id)
);
