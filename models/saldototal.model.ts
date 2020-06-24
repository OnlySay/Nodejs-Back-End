
import { Schema, model, Document} from 'mongoose';



const saldototalSchema = new Schema({

    usuario :{
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : [true, 'id de usuario obligatorio']
    },

    dineroingeso:{
        type: Schema.Types.ObjectId,
        ref:'Dineroing',
    },

    dineroegreso:{
        type: Schema.Types.ObjectId,
        ref:'Dineroeg',
    }

});


interface ISaldototal extends Document{
    usuario : string;
    dineroingreso:string;
    dineroegreso:string;

}

export const Saldototal = model<ISaldototal>('Saldototal',saldototalSchema);