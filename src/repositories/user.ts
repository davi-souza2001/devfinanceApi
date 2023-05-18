export interface UserCreateData {
    name: string
    email: string
    patrimony: number
    salary: number
}

export interface Users {
    create(data: UserCreateData): Promise<void>
}