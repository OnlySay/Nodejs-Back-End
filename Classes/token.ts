import jwt from 'jsonwebtoken';
import { promises, resolve } from 'dns';
import { rejects } from 'assert';


export default class Token {

    private static seed: string ='este-es-el-seed-del-app';
    private static caducidad: string ='30d';


    constructor(){}

    //PAYLOad lo que estara dentro del token ej id usuario 

    static getJwtToken(payload :any ): string{


        return jwt.sign({
            usuario: payload
        }, this.seed,{expiresIn: this.caducidad});

    } 

    static comprobarToken( userToken: string){

        return new Promise ((resolve, reject)=>{

            jwt.verify(userToken,this.seed, (err, decoded)=>{

                if(err){
                    //no confiar
                    reject();
                }else{
                    //token valido
                    resolve(decoded);
                }
    
            })


        });


        
    }


}

