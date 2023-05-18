import { Users } from '../../repositories/user'

export interface SubmitUserServiceRequest {
    name: string
    email: string
    patrimony: number
    salary: number
}

export class SubmitUserService {
    constructor(
        private userRepository: Users
    ) { }

    async executeCreate(request: SubmitUserServiceRequest) {
        const { email, name, patrimony, salary } = request

        if (!email) {
            throw new Error('Email is required!')
        }

        if (!name) {
            throw new Error('Name is required!')
        }

        await this.userRepository.create({
            email,
            name,
            patrimony: patrimony ?? 0,
            salary: salary ?? 0
        })
    }
}