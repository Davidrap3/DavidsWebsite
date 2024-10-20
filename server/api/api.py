from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello, Flask!"

@app.route('/GetData', methods=['POST'])
def RetrieveData():
    print("Start")
    with open("../TempDataBase/mainpage.json") as json_file:
        json_data = json.load(json_file)
        print("test")


if __name__ == '__main__':
    app.run(debug=True)
    RetrieveData()