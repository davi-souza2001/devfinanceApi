import { FastifyInstance } from 'fastify'

import { PrismaTransference } from '../repositories/prisma/prisma-transference'
import { SubmitCreateTransferenceService, SubmitTransferenceServiceRequest } from '../services/expenses/create-transference-service'

const prismaTransferenceRepository = new PrismaTransference()

export async function transferenceRoutes(app: FastifyInstance) {
    app.addHook('onRequest', async (request, reply) => {
        try {
            await request.jwtVerify()
        } catch (error) {
            reply.send(error)
        }
    })

    app.post('/expenses/create', async (req, res) => {
        const { name, emailUser, recurrent, value, expense } = req.body as SubmitTransferenceServiceRequest
        const submitTransferenceService = new SubmitCreateTransferenceService(prismaTransferenceRepository)

        try {
            await submitTransferenceService.executeCreate({
                emailUser,
                name,
                recurrent,
                value,
                expense
            })

            return res.status(201).send({ message: 'Transference submitted!' })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).send({ message: error.message })
            } else {
                return res.status(500).send({ message: 'Internal server error' })
            }
        }
    })
}