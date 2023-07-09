import { Users } from '../../repositories/user'

export interface GetPatrimonyServiceRequest {
    email: string
}

export class GetPatrimonyService {
    constructor(
        private userRepository: Users
    ) { }

    async executeGetPatrimony(request: GetPatrimonyServiceRequest) {
        const { email } = request

        if (!email) {
            throw new Error('Email is required!')
        }

        const user = await this.userRepository.getPatrimony(email)

        return user
    }
}