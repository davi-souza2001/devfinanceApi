import { prisma } from '../../prisma'
import { Transference, TransferenceCreateData } from '../transference'

export class PrismaTransference implements Transference {
    async create(data: TransferenceCreateData) {
        await prisma.transference.create({
            data: {
                value: data.value,
                emailUser: data.emailUser,
                name: data.name,
                recurrent: data.recurrent,
                expense: data.expense
            }
        })
    }

    async getAll(email: string) {
        const transferences = await prisma.transference.findMany({
            where: {
                emailUser: email
            }
        })

        return transferences
    }

    async search(email: string, item: string) {
        const transferences = await prisma.transference.findMany({
            where: {
                emailUser: email,
                name: item
            }
        })

        return transferences
    }

    async delete(id: string) {
        await prisma.transference.delete({
            where: {
                id: id
            }
        })
    }
}