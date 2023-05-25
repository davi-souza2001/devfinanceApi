import { Transference } from '../../repositories/transference'

export interface GetAllTransferenceServiceRequest {
    email: string
}

export class GetAllTransferenceService {
    constructor(
        private transferenceRepository: Transference
    ) { }

    async executeGet(request: GetAllTransferenceServiceRequest) {
        const { email } = request

        if (!email) {
            throw new Error('Email is required!')
        }

        const transferences = await this.transferenceRepository.getAll(email)


        return transferences
    }
}