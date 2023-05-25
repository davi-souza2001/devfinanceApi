import { Transference } from '../../repositories/transference'

export interface SubmitTransferenceServiceRequest {
    name: string
    value: number
    recurrent: boolean
    emailUser: string
    expense: boolean
}

export class SubmitCreateTransferenceService {
    constructor(
        private transferenceRepository: Transference
    ) { }

    async executeCreate(request: SubmitTransferenceServiceRequest) {
        const { name, value, recurrent, emailUser, expense } = request

        if (!name) {
            throw new Error('Name is required!')
        }

        if (!value) {
            throw new Error('Value is required!')
        }

        if (!recurrent) {
            throw new Error('Recurrent is required!')
        }

        if (!emailUser) {
            throw new Error('EmailUser is required!')
        }

        if (!expense) {
            throw new Error('Expense is required!')
        }

        const transference = await this.transferenceRepository.create({
            name,
            emailUser,
            recurrent,
            value,
            expense
        })

        return transference
    }
}