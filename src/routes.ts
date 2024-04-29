import { AuthController } from "./controller/AuthController"
import { ParseController } from "./controller/ParseController"

export const Routes = [{
    method: "post",
    route: "/register",
    controller: AuthController,
    action: "register",
}, {
    method: "post",
    route: "/login",
    controller: AuthController,
    action: "login",
}, {
    method: "post",
    route: "/parse",
    controller: ParseController,
    action: "parse",
},{
    method: "get",
    route: "/logout",
    controller: AuthController,
    action: "logout",
}, {
    method: "post",
    route: "/refreshTokens",
    controller: AuthController,
    action: "refreshTokens",
},
{
    method: "get",
    route: "/parse-request",
    controller: ParseController,
    action: "parseRequest",
}]