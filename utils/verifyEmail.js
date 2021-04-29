const nodemailer = require('nodemailer')

const sendEmail = (options) => {


  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  });

  const mailOptions = {
    from:options.from,
    to:options.to,
    subect:options.subject,
    text:options.text,
    html:options.html
  }
  transport.sendMail(mailOptions)


}

module.exorts=sendEmail
