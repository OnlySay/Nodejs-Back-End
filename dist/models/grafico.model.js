"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const graficoSchema = new mongoose_1.Schema({
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'id de usuario obligatorio']
    },
    dineroeg: {
        type: mongoose_1.Schema.Types.String,
        ref: 'Dineroeg'
    }
});
exports.Grafico = mongoose_1.model('Grafico', graficoSchema);
