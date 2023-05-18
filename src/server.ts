import fastify from 'fastify'
import { userRoutes } from './routes/user-routes'

const app = fastify()

app.get('/', () => {
    return 'Hello World!'
})

app.register(userRoutes)

app.listen({
    port: 3333
}).then(() => {
    console.log('Server is running on port 3333')
})