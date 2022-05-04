import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1c44a86d8a7b31",
        pass: "6271a91e61d086"
    }
});

export class NodeMailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Feedget Team',
            to: 'Caetano Burjack <caetano.burjack@gmail.com>',
            subject: subject,
            html: body
        })
    }
}