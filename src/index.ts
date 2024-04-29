import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import { ErrorHandler } from "./middleware/ErrorHandler"
import { AuthenticateToken } from './middleware/AuthenticateToken';

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(AuthenticateToken);
    

    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
            try {
                const result = await (new (route.controller as any))[route.action](req, res, next)
                res.json(result);
            } catch (error) {
                next(error);
            }
        });
    });
    app.use(ErrorHandler);
    
    app.listen(3000)
    console.log("Express server has started.")

}).catch(error => console.log(error))
