"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const saldototalSchema = new mongoose_1.Schema({
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'id de usuario obligatorio']
    },
    dineroingeso: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Dineroing',
    },
    dineroegreso: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Dineroeg',
    }
});
exports.Saldototal = mongoose_1.model('Saldototal', saldototalSchema);
