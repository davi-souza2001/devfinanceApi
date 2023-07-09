import { Users } from '../../repositories/user'

export interface UpdatePatrimonyServiceRequest {
    email: string
    patrimony: number
}

export class UpdatePatrimonyService {
    constructor(
        private userRepository: Users
    ) { }

    async executeUpdate(request: UpdatePatrimonyServiceRequest) {
        const { email, patrimony } = request

        if (!email) {
            throw new Error('Email is required!')
        }

        if (!patrimony) {
            throw new Error('Patrimony is required!')
        }

        await this.userRepository.updatePatrimony(email, patrimony)
    }
}