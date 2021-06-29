from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
from flask_debug import Debug
import requests, json
import os.path
from os import path
import dbHandler as dbh
application = app = Flask(__name__)

if not path.exists("database.db"):
	dbh.runSql("CREATE TABLE users(name text, dob date, email text,number text)")

@app.route('/user-form', methods=['POST',"GET"])
def form():
	if request.method == 'GET':
		return (render_template("NewUserForm.html"),200)

if __name__ == '__main__':
	app.secret_key = 'password'
	app.debug = True
	app.run(host='0.0.0.0', port=5020, threaded=True, ssl_context=('keys/fullchain.pem', 'keys/privkey.pem'))