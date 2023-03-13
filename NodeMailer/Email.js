const nodemailer = require("nodemailer")

const SendEmail = async options => {
    //create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            client: process.env.EMAIL_USERNAME,
            pass: process.env.EMAILPASSWORD
        }
        // Activate in gmail "less secure app" option
    })
    //define options for email
    const mailOptions = {
        from: 'My Event Mangagememt <hello@myeventmanagement.io>',
        to: options.email,
        subject: options.subject,
        text: options.message ,
        //html: 
    }

    //send the mail
    await transporter.sendMail(mailOptions)

}
module.exports = sendMail