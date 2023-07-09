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

    async login(email: string): Promise<null | UserCreateData> {
        const userRequest = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        const userReceived: UserCreateData = {
            name: userRequest?.name ?? '',
            email: userRequest?.email ?? '',
            password: userRequest?.password ?? '',
            patrimony: userRequest?.patrimony ?? 0,
            salary: userRequest?.salary ?? 0
        }

        return userReceived
    }

    async updatePatrimony(email: string, patrimony: number) {
        await prisma.user.update({
            where: {
                email
            },
            data: {
                patrimony
            }
        })
    }
}