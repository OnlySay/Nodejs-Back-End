import bcrypt from 'bcrypt';

import{ Schema, model, Document} from 'mongoose';


const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,

        unique: true,

        required: [ true, 'El correo es necesario' ]
    },
    password: {

        type: String,

        required: [ true, 'La contraseña es necesaria']
    }

});

usuarioSchema.method('compararPassword',function ( password: string = '' ):boolean   {

    if(bcrypt.compareSync(password, this.password )  ){
        return true ;
    }else {
        return false; 
    }


});

interface IUsuario extends Document {
    nombre:string;
    email:string;
    password:string;    
    avatar:string;

    compararPassword(password:string):boolean;


}
//al usar la constante Usuario Tendra todas las propiedades de IUsuario 


export const Usuario = model<IUsuario>('Usuario', usuarioSchema);
