const request = require('request');

module.exports = {
    verifyCaptcha: async (data, captchaResponse, emailContent, contactName, contactEmail, ip) => {
        return new Promise((resolve, reject) => {
            try {
                if (data) {
                    // console.log(data)
                    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${data}`;
                    request({
                        method: 'POST',
                        url: recaptchaUrl,
                    }, function (err, response, body) {
                        let captchaBody = JSON.parse(body);
                        var captchaResponse = captchaBody.success;
                        module.exports.captchaResponse = captchaResponse;

                        resolve(captchaResponse);
                        if (captchaResponse == true) {
                            console.log('Captcha verifed');
                        }
                        else {
                            console.log('Captcha unsuccessful');
                            resolve(false)
                        }
                    });
                }
                else {
                    return "no captcha supplied";
                }
            }
            catch {
                reject();
            }
        });
    }
}