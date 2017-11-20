use marketing_analytics_twitter;

select
	sum(s.sentiment_pos),
    sum(s.sentiment_neg),
    sum(s.sentiment_neu),
    sum(s.sentiment_count),
    floor(unix_timestamp(s.sentiment_ts) / (2 * 60)) as tk
from 
	sentiment as s
inner join topic
	using(topic_id)
where 
	topic.topic_name = "obama"
group by 
	tk -- 2 * 60 = 2min
order by tk desc limit 2;

