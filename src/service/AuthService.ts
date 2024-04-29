import bcrypt = require('bcrypt');
import * as jwt from "jsonwebtoken";

export class AuthService {
    
    static async hashPassword(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }

    static async comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(inputPassword, hashedPassword);
        } catch (error) {
            throw error;
        }
    }

    static decodeNameFromToken(token: string): string {
        const decodedToken = jwt.decode(token);
        if (decodedToken && decodedToken.hasOwnProperty('email')) {
            return decodedToken['email'];
        } 
        throw new Error('Invalid token or missing user information');
    }

}