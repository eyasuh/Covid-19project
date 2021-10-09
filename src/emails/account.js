const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kyleljanda@gmail.com',
        subject: 'Thanks for signing up!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kyleljanda@gmail.com',
        subject: 'Baby, come back!...',
        text: `You can blame it all on me. ${name}, we are sorry to see you go!`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}