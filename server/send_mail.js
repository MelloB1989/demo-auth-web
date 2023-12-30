const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")
const send_mail = (to_mail, subject, text) => {
    const mgs = {
        to: to_mail,
        from: 'no-reply@avidia.in',
        subject: subject,
        text: text
    }
    sgMail
    .send(mgs)
    .then(()=>console.log('Mail sent'))
    .catch((error)=>console.log(error))
}

//send_mail('mushrafahmed555@gmail.com', 'jdgdjhgdj', 'ejdgjhgd', 'edh')
module.exports = send_mail;