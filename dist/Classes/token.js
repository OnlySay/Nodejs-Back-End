"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() { }
    //PAYLOad lo que estara dentro del token ej id usuario 
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    }
    static comprobarToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    //no confiar
                    reject();
                }
                else {
                    //token valido
                    resolve(decoded);
                }
            });
        });
    }
}
Token.seed = 'este-es-el-seed-del-app';
Token.caducidad = '30d';
exports.default = Token;
