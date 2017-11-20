from flask import Flask, jsonify, request
from json import dumps
from random import randint

app = Flask(__name__)

@app.route('/data', methods=['POST'])
def hello_world():
    content = request.get_json()
    print(content)
    var = {'data' : [{"positive": str(randint(100, 1000)), "negative" : str(randint(100, 2500)), "neutral" : str(randint(100, 500)),"count" : str(randint(100, 500))}]*content['limit']}
    return dumps(var), 200

@app.route('/rtdata', methods=['GET'])
def hello_world2():
    var = {"timestamp" : "2017-02-23-12:11:12", "data" : {"positive": str(randint(100, 1000)), "negative" : str(randint(100, 2500)), "neutral" : str(randint(100, 500)),"count" : str(randint(100, 500))}}
    return dumps(var), 200
