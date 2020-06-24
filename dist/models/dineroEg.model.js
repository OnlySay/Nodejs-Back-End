"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dineroEgSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    tipode: {
        type: String,
        required: [true, 'El tipo de deuda es necesaria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es necesario ']
    },
    fechadepag: {
        type: Date,
        required: [true, 'La fecha de pago  es necesario ']
    },
    estadodepag: {
        type: Boolean,
        required: [true, 'El estado de pago  es necesario ']
    }
});
const dineroIngSchema = new mongoose_1.Schema({
    cantidad: {
        type: Number,
        required: [true, 'ingrese una cantidad de dinero']
    }
});
exports.DineroEg = mongoose_1.model('DineroEg', dineroEgSchema);
exports.DineroIng = mongoose_1.model('DineroIng', dineroIngSchema);
