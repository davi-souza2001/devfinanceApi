import { FastifyInstance } from 'fastify'

import { PrismaUsers } from '../repositories/prisma/prisma-users'
import { SubmitUserService, SubmitUserServiceRequest } from '../services/user/submit-user-service'
import { LoginUserService, LoginUserServiceRequest } from '../services/user/login-user-service'
import { UpdatePatrimonyServiceRequest, UpdatePatrimonyService } from '../services/user/update-patrimony-user-service'
import { GetPatrimonyService } from '../services/user/get-patrimony-user-service'

const prismaUserRepository = new PrismaUsers()

export async function userRoutes(app: FastifyInstance) {
    app.post('/user/create', async (req, res) => {
        const { name, email, password, patrimony, salary } = req.body as SubmitUserServiceRequest
        const submitUserService = new SubmitUserService(prismaUserRepository)

        try {
            await submitUserService.executeCreate({
                name,
                email,
                password,
                patrimony,
                salary
            })

            const token = app.jwt.sign({
                payload: {
                    name,
                    email,
                    password,
                    patrimony,
                    salary
                }
            })

            return res.status(201).send({ token })

        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).send({ message: error.message })
            } else {
                return res.status(500).send({ message: 'Internal server error' })
            }
        }
    })

    app.post('/user/login', async (req, res) => {
        const { email, password } = req.body as LoginUserServiceRequest
        const loginUserService = new LoginUserService(prismaUserRepository)

        try {
            const user = await loginUserService.executeLogin({
                email,
                password
            })

            if (user?.email === '') {
                return res.status(201).send({ message: 'User not found!' })
            } else {
                const token = app.jwt.sign({
                    payload: user
                })
                return res.status(201).send({ token })
            }

        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).send({ message: error.message })
            } else {
                return res.status(500).send({ message: 'Internal server error' })
            }
        }
    })

    app.get('/user/getPatrimony/:email', async (req, res) => {
        const { email } = req.params as { email: string }
        const getPatrimonyService = new GetPatrimonyService(prismaUserRepository)

        try {
            const patrimony = await getPatrimonyService.executeGetPatrimony({ email })

            return res.status(201).send({ patrimony })

        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).send({ message: error.message })
            } else {
                return res.status(500).send({ message: 'Internal server error' })
            }
        }
    })

    app.post('/user/updatePatrimony', async (req, res) => {
        const { email, patrimony } = req.body as UpdatePatrimonyServiceRequest
        const updatePatrimonyService = new UpdatePatrimonyService(prismaUserRepository)

        try {
            await updatePatrimonyService.executeUpdate({
                email,
                patrimony
            })

            return res.status(201).send({ message: 'Patrimony updated!' })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).send({ message: error.message })
            } else {
                return res.status(500).send({ message: 'Internal server error' })
            }
        }
    })
}