from pymysql import IntegrityError


def create_topic(name, conn):
    ''' creates and returns the id for a new topic '''
    try:
        conn.run('insert into topic(topic_name) values (%s)', name)
    except IntegrityError as e:
        if e.args[0] != 1062:  # code for duplicate error
            return None
    return conn.run('select topic_id from topic where topic_name=%s', name)[0]
