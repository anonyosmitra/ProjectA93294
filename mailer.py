import smtplib, ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
port = 465  # For SSL
smtp_server = "smtp.gmail.com"
sender_email = "x3800177@gmail.com"
password = ("x380@0000")
def send(receiverId,name,url):
	receiver_email = receiverId
	message = """\
	Mailing System
	Subject: User Registered

Hi %s! Your new account has been registered."""%(name)

	msg = MIMEMultipart('alternative')
	msg['Subject'] = "User Registered"
	msg['From'] = sender_email
	msg['To'] = receiverId
	# Plain-text version of content
	plain_text = """\
	Hi %s! Your new account has been registered.
	For More Info Visit %s"""%(name,url)
	# html version of content
	html_content = """\
	    <html>
	    <head></head>
	    <body>
	        <p>Hi %s,</p>
	        <p>Your new account has been registered.</p>
	        <p>For More Info Visit
	            <a href="%s">
	                %s
	            </a>
	        </p>
	    </body>
	</html>
	"""%(name,url,url)

	text_part = MIMEText(plain_text, 'plain')
	html_part = MIMEText(html_content, 'html')

	msg.attach(text_part)
	msg.attach(html_part)
	context = ssl.create_default_context()
	with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
		server.login(sender_email, password)
		server.sendmail(to_addrs=receiverId,msg=msg)