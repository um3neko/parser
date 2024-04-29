import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { BlackListTokens } from '../entity/BlackListTokens';


export const AuthenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/login' || req.path === '/register' || req.path === '/refreshTokens') {
        next();
    }
    else {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.sendStatus(401);

        try {
            const expRepository = AppDataSource.getRepository(BlackListTokens);
            const expToken = await expRepository.findOne({ where: { expToken: token } });
            if(expToken) res.sendStatus(403);
            
            const decoded = jwt.verify(token, process.env.JWT_ACCESS) as { userId: number; exp?: number; };
            const userRepository = AppDataSource.getRepository(User);
            const user = await userRepository.findOne({ where: { id: decoded.userId } });
            if (!user) throw new Error('User not found');
            req.user = user;
            next();
        } catch (error) {
            const rep = AppDataSource.getRepository(BlackListTokens);
            const tokenExists = await rep.findOne({ where: { expToken: token } });
            if (tokenExists) {
                return;
            }
            await rep.save({expToken: token});
            res.sendStatus(403);
        }
    }

};
