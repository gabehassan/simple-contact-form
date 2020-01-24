const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
<<<<<<< HEAD
require('dotenv').config()

=======
const sgMail = require('@sendgrid/mail');
require('dotenv').config()
>>>>>>> adf55fdffe183681d2452bea1689b93614daf5d9

const app = express();

const PORT = process.env.PORT || 3000;
app.set('PORT', PORT);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
	res.render('index');
	res.end();
});

app.post('/', async (req, res) => {
	const sendEmail = require('./models/sendEmail')
	const verifyCaptcha = require('./models/verifyCaptcha')

	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	let contactName = req.body.contactName;
	let contactEmail = req.body.contactEmail;
	let emailContent = req.body.textEmail;
	let checkbox = req.body.checkbox;

	if (emailContent && contactName && contactEmail) {
		// module.exports.captchaResponse = captchaResponse;
		// console.log(verifyCaptcha);
		//verifyCaptcha.captchaResponse
		if (verifyCaptcha.captchaResponse == true & checkbox == "on") {
			let status = await sendEmail.sendEmail(emailContent, contactName, contactEmail, ip)
			.catch(err => console.log(err));
			res.render('thank-you')
		}
		else {
			console.log('Bad captcha')
			res.redirect('back');
		}
	}
	else {
		res.status(200).send('error: no data supplied');
	}

});

app.post('/captcha', async (req, res) => {
	const verifyCaptcha = require('./models/verifyCaptcha')
	let data = req.body.token
	let status = await verifyCaptcha.verifyCaptcha(data)
	.catch(err => console.log(err));
})


app.listen(app.get('PORT'), function() {
	console.log('Email service is now running on', app.get('PORT'));
});
