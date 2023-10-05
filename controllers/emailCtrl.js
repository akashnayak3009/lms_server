import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

export const sendEmail = asyncHandler(async(data, req, res)=>{
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:true,
        auth:{
            user:process.env.MAIL_ID,
            pass:process.env.MAIL_PASS,
        },
    });

    let info = await transporter.sendMail({
        from:"Developer's corner",
        to: data.to,
        subject:data.subject,
        text: data.text,
        html: data.html,
    });
    console.log("Message sent", info.messageId);
    console.log("preview Url: ", nodemailer.getTestMessageUrl(info))
});