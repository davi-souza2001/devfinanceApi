import { prisma } from '../../prisma'
import { UserCreateData, Users } from '../user'

export class PrismaUsers implements Users {
    async create(data: UserCreateData) {
        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                patrimony: data.patrimony,
                salary: data.salary
            }
        })
    }
}