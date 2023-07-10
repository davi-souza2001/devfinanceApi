import { FastifyInstance } from 'fastify'

import { PrismaTransference } from '../repositories/prisma/prisma-transference'

import { SubmitCreateTransferenceService, SubmitTransferenceServiceRequest } from '../services/transferences/create-transference-service'
import { GetAllTransferenceService, GetAllTransferenceServiceRequest } from '../services/transferences/getAll-transference-service'
import { SearchTransferenceService, SearchTransferenceServiceRequest } from '../services/transferences/search-transference-service'
import { DeleteTransferenceService, DeleteTransferenceServiceRequest } from '../services/transferences/delete-transference-service'

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

    app.get('/expenses/getAll/:email', async (req, res) => {
        const { email } = req.params as GetAllTransferenceServiceRequest
        const getAllTransferenceService = new GetAllTransferenceService(prismaTransferenceRepository)

        try {
            const transferences = await getAllTransferenceService.executeGet({ email })

            return res.status(200).send(transferences)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).send({ message: error.message })
            } else {
                return res.status(500).send({ message: 'Internal server error' })
            }
        }
    })

    app.get('/expenses/search/:email/:item', async (req, res) => {
        const { email, item } = req.params as SearchTransferenceServiceRequest
        const searchTransferenceService = new SearchTransferenceService(prismaTransferenceRepository)

        try {
            const transferences = await searchTransferenceService.executeSearch({ email, item })

            return res.status(200).send(transferences)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).send({ message: error.message })
            } else {
                return res.status(500).send({ message: 'Internal server error' })
            }
        }
    })

    app.delete('/expenses/delete/:id', async (req, res) => {
        const { id } = req.params as DeleteTransferenceServiceRequest
        const deleteTransferenceService = new DeleteTransferenceService(prismaTransferenceRepository)

        try {
            await deleteTransferenceService.executeDelete({ id })

            res.status(201).send({ message: 'Transference deleted!' })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).send({ message: error.message })
            } else {
                return res.status(500).send({ message: 'Internal server error' })
            }
        }
    })
}