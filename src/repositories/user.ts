export interface UserCreateData {
    id: string
    name: string
    email: string
    password: string
    patrimony: number
    salary: number
}

export interface Users {
    create(data: UserCreateData): Promise<void>
    login(email: string): Promise<UserCreateData | null>
}