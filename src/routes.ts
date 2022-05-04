import express from 'express'
import nodemailer from 'nodemailer'
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbackRespository';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';

export const routes = express.Router()

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1c44a86d8a7b31",
        pass: "6271a91e61d086"
    }
});

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository)

    await SubmitFeedbackUseCase.execute({
        type, comment, screenshot
    })

    // await transport.sendMail({
    //     from: 'Feedget Team',
    //     to: 'Caetano Burjack <caetano.burjack@gmail.com>',
    //     subject: 'New Feedback',
    //     html: [
    //         `<p>You just received a new feedback!</p>`,
    //         `<p>Type: ${type}</p>`,
    //         `<p>Comment: ${comment}</p>`,
    //     ].join('\n')
    // })

    return res.status(201).send()
})