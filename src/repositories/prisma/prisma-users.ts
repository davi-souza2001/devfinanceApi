import { prisma } from '../../prisma'
import { comparePassword, encryptPassword } from '../../utils/EncryptPassword'
import { UserCreateData, Users } from '../user'

export class PrismaUsers implements Users {
    async create(data: UserCreateData) {
        const passwordHash = encryptPassword(data.password)

        await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: passwordHash,
                patrimony: data.patrimony,
                salary: data.salary
            }
        })
    }

    async login(email: string, password: string): Promise<null | UserCreateData> {
        const userRequest = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        const passwordMatch = comparePassword(password, userRequest?.password ?? '')
        if (passwordMatch) {
            const userReceived: UserCreateData = {
                name: userRequest?.name ?? '',
                email: userRequest?.email ?? '',
                password: userRequest?.password ?? '',
                patrimony: userRequest?.patrimony ?? 0,
                salary: userRequest?.salary ?? 0
            }

            return userReceived
        } else {
            return null
        }
    }

    async getPatrimony(email: string): Promise<number> {
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                patrimony: true
            }
        })

        return user?.patrimony ?? 0
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