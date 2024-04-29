import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';

export const generateAccessToken = (user: User): string => {
    return jwt.sign({ userName: user.userName, email: user.email }, process.env.JWT_ACCESS, { expiresIn: '5m' });
};

export const generateRefreshToken = (): string => {
    return jwt.sign({}, process.env.REFRESH_JWT, { expiresIn: '7d' });
};