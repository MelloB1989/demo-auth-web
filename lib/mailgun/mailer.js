const dotenv = require('dotenv');
dotenv.config();
const FormData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

const send_otp = async (email, otp) => {
        mg.messages.create('mellob.in', {
                from: "Noobsverse SES <support@mellob.in>",
                to: [email],
                subject: `Your OTP is *****`,
                text: `Your OTP is ${otp}`,
            })
            .then(msg => console.log(mgs)) // logs response data
            .catch(err => console.error(err)); // logs any error
}

send_otp('kartikdd90@gmail.com', '123456');
//exports.module = send_otp;