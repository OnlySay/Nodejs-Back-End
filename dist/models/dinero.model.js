"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//mongoose es MI ORM Mangosta es un Object Document Mapper (ODM). Esto significa que Mongoose le 
//permite definir objetos con un esquema fuertemente tipado que se asigna a un documento MongoDB.
//bycrypt es la filtracion de los datos, para encriptarla y hacerlas mas segura.
//dinero egreso pago
const dineroegSchema = new mongoose_1.Schema({
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'id de usuario obligatorio']
    },
    nombreD: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    tipoD: {
        type: String
    },
    imgs: [{
            type: String
        }],
    precioD: {
        type: Number,
        required: [true, 'El precio es necesario ']
    },
    fechadepagD: {
        type: Date
    },
    estadodepagD: {
        type: Boolean
    }
});
//-----------------------------------Pr: Dinero Ingreso---------------------------------------------------
const dineroingSchema = new mongoose_1.Schema({
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'id de usuario obligatorio']
    },
    cantidadI: {
        type: Number,
    },
    textoI: {
        type: String
    },
    fechadeingreso: {
        type: Date
    }
});
dineroingSchema.pre('save', function (next) {
    this.fechadeingreso = new Date();
    next();
});
exports.Dineroeg = mongoose_1.model('Dineroeg', dineroegSchema);
exports.Dineroing = mongoose_1.model('Dineroing', dineroingSchema);
