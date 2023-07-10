import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'

import { userRoutes } from './routes/user-routes'
import { transferenceRoutes } from './routes/transference-routes'

const app = fastify()

app.register(cors, {
    origin: true,
})

app.register(jwt, {
    secret: '123'
})

app.register(userRoutes)
app.register(transferenceRoutes)

app.listen({ host: '0.0.0.0', port: process.env.PORT ? Number(process.env.PORT) : 3333 })
    .then(() => console.log('Server is running :)'))