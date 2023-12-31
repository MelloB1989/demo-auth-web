const dotenv = require('dotenv');
dotenv.config();
const FormData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(FormData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

export default async function send_link(email, link) {
        mg.messages.create('mellob.in', {
                from: "Noobsverse SES <support@mellob.in>",
                to: [email],
                subject: `Reset your password`,
                text: `Reset your password here: ${link}`,
            })
            .then(msg => console.log(mgs))
            .catch(err => console.error(err));
}