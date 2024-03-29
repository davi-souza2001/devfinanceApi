export interface TransferenceCreateData {
    name: string
    value: number
    recurrent: boolean
    expense: boolean
    emailUser: string
    date: number
}

export interface Transference {
    create(data: TransferenceCreateData): Promise<void>
    getAll(email: string): Promise<TransferenceCreateData[]>
    search(email: string, item: string): Promise<TransferenceCreateData[]>
    delete(id: string): Promise<void>
    resetExpenses(email: string): Promise<void>
}