import { FastifyInstance } from 'fastify'
import { SubmitUserService, SubmitUserServiceRequest } from '../services/user/submit-user-service'
import { PrismaUsers } from '../repositories/prisma/prisma-users'

export async function userRoutes(app: FastifyInstance) {
    app.post('/user/create', async (request, res) => {
        const { name, email, password, patrimony, salary } = request.body as SubmitUserServiceRequest

        const prismaUserRepository = new PrismaUsers()
        const submitUserService = new SubmitUserService(prismaUserRepository)

        try {
            await submitUserService.executeCreate({
                name,
                email,
                password,
                patrimony,
                salary
            })

        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).send({ message: error.message })
            } else {
                return res.status(500).send({ message: 'Internal server error' })
            }
        }
    })
}