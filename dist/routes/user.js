"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//router objeto que reconocera ciertas direcciones 
const userRoutes = express_1.Router();
//requerir y responder 
userRoutes.post('/create ', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        email: req.body.email,
        contraseña: req.body.contraseña
    };
    res.json({
        ok: true,
        user
    });
});
exports.default = userRoutes;
