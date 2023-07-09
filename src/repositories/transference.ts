export interface TransferenceCreateData {
    name: string
    value: number
    recurrent: boolean
    expense: boolean
    emailUser: string
}

export interface Transference {
    create(data: TransferenceCreateData): Promise<void>
    getAll(email: string): Promise<TransferenceCreateData[]>
    search(email: string, item: string): Promise<TransferenceCreateData[]>
}