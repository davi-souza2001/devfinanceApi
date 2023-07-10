import { Transference } from '../../repositories/transference'

export interface DeleteTransferenceServiceRequest {
    id: string
}

export class DeleteTransferenceService {
    constructor(
        private transferenceRepository: Transference
    ) { }

    async executeDelete(request: DeleteTransferenceServiceRequest) {
        const { id } = request

        if (!id) {
            throw new Error('Id is required!')
        }

        await this.transferenceRepository.delete(id)
    }
}