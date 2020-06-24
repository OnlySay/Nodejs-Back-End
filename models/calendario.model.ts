import { Schema, model, Document} from 'mongoose';


const calendarioSchema = new Schema({

    usuario :{
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : [true, 'id de usuario obligatorio']
    },
    
    dineroeg:{
        type: Schema.Types.ObjectId,
        ref: 'Dineroeg'
    }
});


interface ICalendario extends Document {
    usuario: string;
    dineroeg: string;

}

export const Calendario = model<ICalendario>('Calendario',calendarioSchema)