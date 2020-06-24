import bcrypt from 'bcrypt';

import { Schema, model, Document} from 'mongoose';

//mongoose es MI ORM Mangosta es un Object Document Mapper (ODM). Esto significa que Mongoose le 
//permite definir objetos con un esquema fuertemente tipado que se asigna a un documento MongoDB.

//bycrypt es la filtracion de los datos, para encriptarla y hacerlas mas segura.


//dinero egreso pago

const dineroegSchema = new Schema({

    usuario :{
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : [true, 'id de usuario obligatorio']
    },

    nombreD: {
        type: String,
        required: [ true, 'El nombre es necesario' ]

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

    fechadepagD:{
        type: Date
    },

    estadodepagD: {
        type: Boolean
        

    }
});
    //-----------------------------------Pr: Dinero Ingreso---------------------------------------------------

    const dineroingSchema = new Schema({

        usuario :{
            type : Schema.Types.ObjectId,
            ref : 'Usuario',
            required : [true, 'id de usuario obligatorio']
        },
    
        cantidadI: {
            type: Number,
        },
        textoI: {
            type: String
        },

        fechadeingreso:{
            type: Date
        }   

});

    dineroingSchema.pre<IDineroing>('save', function(next){

        this.fechadeingreso = new Date();
        next();
    });










//----------------------------------------------Interfaces---------------------------------





interface IDineroeg extends Document{
    usuario : string,
    nombreD: string,
    img: string[];
    tipoD:string,
    precioD:number,
    fechadepagD:Date,
    estadodepagD:boolean


}

interface IDineroing extends Document{
    usuario : string;
    cantidadI:number;
    textoI: string;
    fechadeingreso: Date;

}


export const Dineroeg = model <IDineroeg>('Dineroeg', dineroegSchema );

export const Dineroing = model <IDineroing>('Dineroing', dineroingSchema);
