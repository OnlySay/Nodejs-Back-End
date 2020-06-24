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
const autenticacion_1 = require("../middlewares/autenticacion");
const calendario_model_1 = require("../models/calendario.model");
const dinero_model_1 = require("../models/dinero.model");
const calendarioRouts = express_1.Router();
calendarioRouts.get('/', [autenticacion_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const _idUsuario = req.usuario._id;
    const dineroeg = yield dinero_model_1.Dineroeg.find({ usuario: _idUsuario })
        .sort({ _id: -1 })
        .populate('usuario', '-password')
        .exec();
    const dineroing = yield dinero_model_1.Dineroing.find({ usuario: _idUsuario })
        .sort({ _id: -1 })
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        dineroeg,
        dineroing
    });
}));
calendarioRouts.post('/', [autenticacion_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const body = req.body;
    body.usuario = req.usuario._id;
    calendario_model_1.Calendario.create(body).then((Calendario) => __awaiter(this, void 0, void 0, function* () {
        yield Calendario.populate('usuario', '-password').execPopulate();
        res.json({
            ok: true,
            Calendario: Calendario
        });
    })).catch(err => {
        res.json(err);
    });
}));
exports.default = calendarioRouts;
