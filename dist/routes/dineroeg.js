"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dinero_model_1 = require("../models/dinero.model");
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const file_system_1 = __importDefault(require("../Classes/file-system"));
const dineroRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
//para buscar el metodo de get y post en postman simular el find y 
dineroRoutes.get('/', [autenticacion_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const _idUsuario = req.usuario._id;
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const dineroeg = yield dinero_model_1.Dineroeg.find({ usuario: _idUsuario })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(5)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        dineroeg
    });
}));
//---------------------------------------- ingreso de pago-----------------------------------------------------
dineroRoutes.post('/ingresoDineroP', [autenticacion_1.verificaToken], (req, res) => {
    // const dinero = {
    //     nombreD     : req.body.nombreD,
    //     tipoD       : req.body.tipoD,
    //     precioD     : req.body.precioD,
    //     fechadepagD : req.body.fechadepagD,
    //     estadodepagD: req.body.estadodepagD
    // };
    const body = req.body;
    body.usuario = req.usuario._id;
    const imagenes = fileSystem.imagenesDeTempHaciaDinero(req.usuario._id);
    body.imgs = imagenes;
    dinero_model_1.Dineroeg.create(body).then((dineroDB) => __awaiter(this, void 0, void 0, function* () {
        yield dineroDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            dinero: dineroDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//servicio para subir Archivos
dineroRoutes.post('/upload', [autenticacion_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo'
        });
    }
    const file = req.files.image;
    if (!file) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }
    if (!file.mimetype.includes('image')) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        });
    }
    yield fileSystem.guardarImagenTemporal(file, req.usuario._id);
    res.json({
        ok: true,
        file: file.mimetype
    });
}));
dineroRoutes.get('/imagen/:userid/:img', [autenticacion_1.verificaToken], (req, res) => {
    const userId = req.params.userid;
    const img = req.params.img;
    const pathFoto = fileSystem.getFotoUrl(userId, img);
    res.sendFile(pathFoto);
});
exports.default = dineroRoutes;
