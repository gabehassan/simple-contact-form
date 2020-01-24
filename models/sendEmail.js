const sgMail = require('@sendgrid/mail');

module.exports = {
    sendEmail: async (contactEmail, emailContent, contactName, ip) => {
        return new Promise((resolve, reject) => {
            try {
                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: process.env.TARGET_DOMAIN,
                    from: `contact@${process.env.HOST_DOMAIN}`,
                    subject: `Email from ${contactName} | (${process.env.HOST_DOMAIN})`,
                    text: ` ${emailContent}\n\n\nIP Address sent from: ${ip} `,
                };
                sgMail.send(msg).catch(err => console.log(JSON.stringify(err)));               
                console.log('sent\n', msg);
                resolve(true);
            } 
            catch (err) {
                console.log(err)
                resolve(false);
                
            }
        sendEmail.catch(function (err) {
            console.log(err)
        });
        });
    }
}