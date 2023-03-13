const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth:{
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
    // Activate in gmail "less secure app" option
})
const SendEmail = async (to, subject, text) => {
    //create a transporter
    //console.log(process.env.EMAIL_HOST)
    
    //define options for email
    const mailOptions = {
        from: 'My Event Mangagememt <hello@myeventmanagement.io>',
        to,
        subject,
        text,
        //html: 
    }

    //send the mail
    await transporter.sendMail(mailOptions)

}
module.exports = SendEmail