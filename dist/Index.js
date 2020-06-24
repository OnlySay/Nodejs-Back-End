"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./Classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const dineroEg_1 = __importDefault(require("./routes/dineroEg"));
const dineroIg_1 = __importDefault(require("./routes/dineroIg"));
const calendario_1 = __importDefault(require("./routes/calendario"));
const saldototal_1 = __importDefault(require("./routes/saldototal"));
const server = new server_1.default();
//para abrir postman es con nodemon dist/ 
//configuracion 
server.app.use(cors_1.default({ origin: true, credentials: true }));
//FileUpload
server.app.use(express_fileupload_1.default());
//body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/dinero', dineroEg_1.default);
server.app.use('/dineroI', dineroIg_1.default);
server.app.use('/Calendario', calendario_1.default);
server.app.use('/saldototal', saldototal_1.default);
//conectar base de datos 
mongoose_1.default.connect('mongodb://localhost:27017/MyBilletera', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
//levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
