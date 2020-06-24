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
const calendarioRouts = express_1.Router();
calendarioRouts.get('/', [autenticacion_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const grafico = yield calendario_model_1.calendario.find()
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        grafico
    });
}));
calendarioRouts.post('/', [autenticacion_1.verificaToken], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const grafico = yield calendario_model_1.calendario.find()
        .limit(10)
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        grafico
    });
}));
exports.default = calendarioRouts;
