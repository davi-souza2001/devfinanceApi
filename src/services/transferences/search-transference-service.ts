import { Transference } from '../../repositories/transference'

export interface SearchTransferenceServiceRequest {
    email: string
    item: string
}

export class SearchTransferenceService {
    constructor(
        private transferenceRepository: Transference
    ) { }

    async executeSearch(request: SearchTransferenceServiceRequest) {
        const { email, item } = request

        if (!email) {
            throw new Error('Email is required!')
        }

        if (!item) {
            throw new Error('Item is required!')
        }

        const transferences = await this.transferenceRepository.search(email, item)


        return transferences
    }
}