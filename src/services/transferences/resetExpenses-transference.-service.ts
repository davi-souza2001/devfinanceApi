import { Transference } from '../../repositories/transference'

export interface ResetTransferenceServiceRequest {
    email: string
    date: number
}

export class ResetTransferenceService {
    constructor(
        private transferenceRepository: Transference
    ) { }

    async executeReset(request: ResetTransferenceServiceRequest) {
        const { email, date } = request

        if (!email) {
            throw new Error('Email is required!')
        }

        if (!date) {
            throw new Error('Date is required!')
        }

        if (date < 0 || date > 31) {
            throw new Error('Date is invalid!')
        }

        await this.transferenceRepository.resetExpenses(email)
    }
}