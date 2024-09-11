const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: "smtp.fastmail.com",
    port: 465,  
    secure: true,  
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    debug: true,  
    logger: true 
});

const sendResetCode = async (email, resetCode) => {
    console.log(process.env.EMAIL);
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${resetCode}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendResetCode };
