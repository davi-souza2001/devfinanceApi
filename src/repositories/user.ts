export interface UserCreateData {
    name: string
    email: string
    password: string
    patrimony: number
    salary: number
}

export interface Users {
    create(data: UserCreateData): Promise<void>
    login(email: string): Promise<UserCreateData | null>
    getPatrimony(email: string): Promise<number>
    updatePatrimony(email: string, patrimony: number): Promise<void>
}