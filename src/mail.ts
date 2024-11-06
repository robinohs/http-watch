// @ts-types="npm:@types/nodemailer"
import nodemailer from "npm:nodemailer";

export async function sendMail(mailOptions: {
    hostname: string;
    port: number;
    username: string;
    password: string;
    recipients: string[];
    from: string;
    subject: string;
    content: string;
}) {
    const smtpTransportOptions = {
        host: mailOptions.hostname,
        auth: {
            user: mailOptions.username,
            pass: mailOptions.password,
        },
        port: mailOptions.port,
        secure: true,
        // tls: {
        //     ciphers: "SSLv3",
        // },
        logger: true,
    };

    console.log(smtpTransportOptions);

    const transporter = nodemailer.createTransport(smtpTransportOptions);

    const info = await transporter.sendMail({
        from: mailOptions.from,
        to: mailOptions.recipients,
        subject: mailOptions.subject,
        text: mailOptions.content,
    });

    return info;
}
