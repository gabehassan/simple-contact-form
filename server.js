const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
require('dotenv').config()

const sgMail = require('@sendgrid/mail');

const app = express();

const PORT = process.env.PORT || 3000;
app.set('PORT', PORT);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/', function(req, res) {
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	let contactName = req.body.contactName;
	let contactEmail = req.body.contactEmail;
	let emailContent = req.body.textEmail;

	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: process.env.TARGET_DOMAIN,
		from: contactEmail,
		subject: `Email from ${contactName} | (${process.env.HOST_DOMAIN})`,
		text: `${emailContent}\n\n\nIP Address sent from: ${ip}`,
	};
	sgMail.send(msg);

	res.render('thank-you');
	res.end();
	
	console.log('sent\n', msg);
});


app.listen(app.get('PORT'), function() {
	console.log('Email service is now running on', app.get('PORT'));
});