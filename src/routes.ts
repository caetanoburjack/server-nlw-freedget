import express from 'express'
import { NodeMailerMailAdapter } from './adapters/nodeMailer/nodeMailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbackRespository';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';

export const routes = express.Router()

routes.get('/', () => {
    return 'Tudo certo por aqui'
})

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body
    try {
        const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
        const nodeMailerMailAdapter = new NodeMailerMailAdapter()
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodeMailerMailAdapter)

        await submitFeedbackUseCase.execute({
            type, comment, screenshot
        })
        return res.status(201).send()
    } catch (err) {
        console.error(err)

        return res.status(500).send()
    }
})