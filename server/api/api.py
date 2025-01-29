from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from flask_cors import CORS
import json
from Email.email_routes import email_bp
from Utility.logger import create_logger


app = Flask(__name__)
CORS(app)
load_dotenv()


logger = create_logger()

@app.route('/')
def hello():
    return "Hello, Flask!"

@app.route('/api/HomeData', methods=['POST'])
def RetrieveData():
    print("Start")
    try:
        with open("TempDataBase/mainpage.json") as json_file:
            json_data = json.load(json_file)
            return jsonify(json_data)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404


app.register_blueprint(email_bp, url_prefix='/api')



    

if __name__ == '__main__':
    app.run(debug=True)