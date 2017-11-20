use marketing_analytics_twitter;

delete from sentiment where topic_id = 4;
insert into sentiment(sentiment_pos, sentiment_neg,
					  sentiment_neu, sentiment_count,
                      topic_id, sentiment_ts) values
	(0, 3, 8, 11, 4, '2017-11-19 16:54:01'),
    (0, 3, 1, 04, 4, '2017-11-19 16:55:01'),
    (9, 3, 8, 20, 4, '2017-11-19 16:56:01'),
    (7, 3, 8, 18, 4, '2017-11-19 16:57:01'),
    (2, 3, 8, 13, 4, '2017-11-19 16:58:01'),
    (8, 7, 8, 23, 4, '2017-11-19 16:59:01');