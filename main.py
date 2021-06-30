from flask import Flask, render_template, request, url_for, redirect, flash, jsonify
import requests, json
import os.path
from os import path
from mailer import send
import dbHandler as dbh
application = app = Flask(__name__)

if not path.exists("database.db"):
	dbh.runSql("CREATE TABLE users(name text, dob date, email text,phone text)")

@app.route('/user-form', methods=['POST',"GET"])
def form():
	if request.method == 'GET':
		return (render_template("NewUserForm.html"),200)
	else:
		print(request.form)
		form={"name":request.form["name"], "dob":request.form["dob"], "phone":"+%s%s"%(request.form["tel_code"],request.form["num"]), "email":request.form["email"]}
		send(form["email"],form["name"])
		con=dbh.Connect()
		con.insertIntoTable("users",form)
		allUsers=con.getTable("users",["rowid","name","dob","email","phone"])
		con.close()
		return (render_template("userList.html",users=json.dumps(allUsers).replace('"',"\"")),200)

if __name__ == '__main__':
	app.secret_key = 'password'
	app.debug = True
	app.run(host='0.0.0.0', port=5020, threaded=True, ssl_context=('keys/fullchain.pem', 'keys/privkey.pem'))