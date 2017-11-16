from flask import Flask, jsonify, request
from json import dumps
from random import randint

app = Flask(__name__)

@app.route('/item')
def hello_world():
    var = {"timestamp" : "2017-02-23-12:11:12", "data" : {"positive": str(randint(100, 1000)), "negative" : str(randint(100, 2500)), "neutral" : str(randint(100, 500))}} 
    return dumps(var), 200
