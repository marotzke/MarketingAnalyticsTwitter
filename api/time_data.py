from json import dumps


def _format_time_data(res):
    ans = { 'data': [] }
    for val in res:
        ans['data'].append({
            'positive': int(val[0]),
            'negative': int(val[1]),
            'neutral': int(val[2]),
            'count': int(val[3])
        })
    return ans


def time_data(json, conn, mutex=None):
    query = '''
    select
        sum(s.sentiment_pos),
        sum(s.sentiment_neg),
        sum(s.sentiment_neu),
        sum(s.sentiment_count),
        floor(unix_timestamp(s.sentiment_ts) / (%s)) as tk
    from sentiment as s
    inner join topic using(topic_id)
    where topic.topic_name = %s
    group by tk
    order by tk desc limit %s;
    '''
    args = (
        json['interval'],
        json['topic'],
        json['limit']
    )

    if mutex != None:
        mutex.acquire()
    res = conn.runall(query, args)
    if mutex != None:
        mutex.release()

    return dumps(_format_time_data(res))
