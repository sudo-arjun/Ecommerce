import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'Gmail',
    // port: 587,
    auth: {
        user: 'chetanprakash7304@gmail.com',
        pass: 'tlxymdwnimbbbehl'
    }
});

export default async function sendMail(email,otp) {
    // send mail with defined transport object
    console.log("Wait");
    const info = await transporter.sendMail({
        from: '"chetan" <chetanprakash7304@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Namaste Sekai", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <b>To do application click to confirm</b>
        <p>${otp}</p>
        `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export async function sendMailLink(email,link) {
    // send mail with defined transport object
    console.log("Wait");
    const info = await transporter.sendMail({
        from: '"chetan" <chetanprakash7304@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Namaste Sekai", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <b>To do application click to confirm</b>
        <a href=${link}>Link</a>
        `, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}