"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dinero_model_1 = require("../models/dinero.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const dineroIRoutes = express_1.Router();
dineroIRoutes.get('/', [autenticacion_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const _idUsuario = req.usuario._id;
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const dineroing = yield dinero_model_1.Dineroing.find({ usuario: _idUsuario })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(5)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        dineroing
    });
}));
dineroIRoutes.post('/ingresoDinero', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    dinero_model_1.Dineroing.create(body).then((dineroDB) => __awaiter(this, void 0, void 0, function* () {
        yield dineroDB.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            dinero: dineroDB
        });
    })).catch(err => {
        res.json(err);
    });
});
exports.default = dineroIRoutes;
