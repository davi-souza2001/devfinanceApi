import { Transference } from '../../repositories/transference'

export interface SubmitTransferenceServiceRequest {
    name: string
    value: number
    recurrent: boolean
    emailUser: string
    expense: boolean
    date: number
}

export class SubmitCreateTransferenceService {
    constructor(
        private transferenceRepository: Transference
    ) { }

    async executeCreate(request: SubmitTransferenceServiceRequest) {
        const { name, value, recurrent, emailUser, expense, date } = request

        if (!name) {
            throw new Error('Name is required!')
        }

        if (!value) {
            throw new Error('Value is required!')
        }

        if (typeof recurrent !== 'boolean') {
            throw new Error('Recurrent is required!')
        }

        if (!emailUser) {
            throw new Error('EmailUser is required!')
        }

        if (!date) {
            throw new Error('Date is required!')
        }

        if (typeof expense !== 'boolean') {
            throw new Error('Expense is required!')
        }

        await this.transferenceRepository.create({
            name,
            emailUser,
            recurrent,
            value,
            expense,
            date
        })
    }
}