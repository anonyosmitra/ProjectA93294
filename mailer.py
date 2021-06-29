import smtplib, ssl

port = 465  # For SSL
smtp_server = "smtp.gmail.com"
sender_email = "x3800177@gmail.com"
password = ("x380@0000")
def send(receiver,name):
	receiver_email = receiver
	message = """\
	Subject: User Registered

	Hi %s! Your new account have been registered."""%(name)

	context = ssl.create_default_context()
	with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
		server.login(sender_email, password)
		server.senadmail(sender_email, receiver_email, message)