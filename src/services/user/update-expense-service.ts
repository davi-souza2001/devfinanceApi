import { Users } from '../../repositories/user'

export interface UpdateExpenseServiceRequest {
    email: string
    expense: number
}

export class UpdateExpenseService {
    constructor(
        private userRepository: Users
    ) { }

    async executeUpdate(request: UpdateExpenseServiceRequest) {
        const { email, expense } = request

        if (!email) {
            throw new Error('Email is required!')
        }

        if (!expense) {
            throw new Error('Expense is required!')
        }

        await this.userRepository.updateExpense(email, expense)
    }
}