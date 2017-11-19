use marketing_analytics_twitter;

select
	sum(sentiment_pos),
    sum(sentiment_neg),
    sum(sentiment_neu),
    sum(sentiment_count)
from 
	sentiment
where 
	topic_id = 4
group by 
	floor(unix_timestamp(sentiment_ts) / (2 * 60)); -- 2 * 60 = 2min;