import * as bcrypt from "bcrypt"

class PasswordServiceProcess {
    public async hashPassword (password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    public async comparePassword (password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashPassword)
    }
}

export const passwordService = new PasswordServiceProcess()