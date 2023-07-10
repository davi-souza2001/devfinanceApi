import bcrypt from 'bcrypt'

function encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
}

export { encryptPassword, comparePassword }