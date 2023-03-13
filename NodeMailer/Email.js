const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth:{
        client: process.env.EMAIL_USERNAME,
        pass: process.env.EMAILPASSWORD
    }
    // Activate in gmail "less secure app" option
})
const SendEmail = async (to, subject, text) => {
    //create a transporter
    
    //define options for email
    const mailOptions = {
        from: 'My Event Mangagememt <hello@myeventmanagement.io>',
        to,
        subject,
        text,
        //html: 
    }

    //send the mail
    await transporter.SendMail(mailOptions)

}
module.exports = SendEmail