import { Request, Response, NextFunction } from 'express';
import { Interaction24ParserService } from '../service/Interaction24ParserService';
import { AuthService } from '../service/AuthService';
import { AppDataSource } from '../data-source';
import { ParseRequest } from '../entity/ParseRequests';
import { Credentials } from '../dto/ParseDTO';

export class ParseController {
    private parseRepository = AppDataSource.getRepository(ParseRequest);
    
    async parse(req: Request, res: Response, next: NextFunction) {
        const creds: Credentials = req.body;
        try {
            if (!creds.email || !creds.privateKey || !creds.sheetsId) {
                throw new Error('No creds.')
            } 
            await Interaction24ParserService.parseIntercation24(creds);
            const parseRequest = new ParseRequest();
            parseRequest.userName =  AuthService.decodeNameFromToken(req.headers.authorization.split(' ')[1]);
            await this.parseRepository.save(parseRequest);
            res.status(200).json({ message: 'Data parsing and saving completed successfully.' });
        } catch (error) {
            next(error);
        }
    }
    
    async parseRequest(req: Request, res: Response, next: NextFunction) {
        try {
            return this.parseRepository.find();
        } catch (error) {
            next(error);
        }
    }
}