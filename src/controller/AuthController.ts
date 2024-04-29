import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { LoginDTO, RefreshTokenDTO, RegisterRequestDto } from "../dto/AuthDTO";
import { AuthService } from "../service/AuthService";
import * as jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from "../utils/GenTokenHandler";
import { BlackListTokens } from "../entity/BlackListTokens";

export class AuthController {
    private userRepository = AppDataSource.getRepository(User);

    async register(req: Request, res: Response, next: NextFunction) {
        const user: RegisterRequestDto = req.body;
        try {
            const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
            if (existingUser) {
                throw new Error('Email exists');
            }
            user.password = await AuthService.hashPassword(user.password);
            await this.userRepository.save(user);
            return "Register success";
        } catch (error) {
            next(error);
        }
    };

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: LoginDTO = req.body; 
            const user = await this.userRepository.findOne({where:{ email: userData.email }});
            if (!user || !await AuthService.comparePassword(userData.password, user.password)) {
                throw new Error('Invalid email or password');
            }

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken();
            user.refreshToken = refreshToken;
            await this.userRepository.save(user);
            res.json({ accessToken, refreshToken });
        }
        catch (error) {
            console.error(error);
            next(error);
        };
    }

    async refreshTokens(req: Request, res: Response) {
        const { refreshToken } = req.body;
        const user = await this.userRepository.findOne({ where: { refreshToken } });
        if (!user) return res.sendStatus(403);
        const accessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken();
        user.refreshToken = newRefreshToken;
        await this.userRepository.save(user);
        res.json({ accessToken, refreshToken: newRefreshToken });
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const rep = AppDataSource.getRepository(BlackListTokens);
            const tokenExists = await rep.findOne({ where: { expToken: token } });
            if (tokenExists) {
                return;
            }
            await rep.save({expToken: token});
            res.status(200).json({ message: 'Logout successful'});
        } catch (error) {
            next(error);
        }
    }
};