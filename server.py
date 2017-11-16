from flask import Flask, request
from time import gmtime, strftime


app = Flask(__name__)


current = {
    'data': {
        'positive': 0,
        'negative': 0,
        'neutral': 0,
        'count': 0
    },
    'timestamp': strftime("%Y-%m-%d:%H:%M:%S", gmtime())
}


def format_json(j):
    return {
        'data': {
            'positive': j['good'],
            'negative': j['bad'],
            'neutral': j['neutral'],
            'count': j['count']
        },
        'timestamp': strftime("%Y-%m-%d:%H:%M:%S", gmtime())
    }


@app.route('/data', methods=['GET'])
def get_data():
    if request.methods != 'GET':
        return 'Invalid Request', 400

    return current, 200


@app.route('/', methods=['POST'])
def process():
    if request.method != 'POST':
        return 'Invalid Request', 400

    j = request.get_json()
    current = format_json(j)
    print(current)
    return 'OK', 200
