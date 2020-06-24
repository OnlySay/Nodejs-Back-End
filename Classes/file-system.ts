import { FileUpload } from '../interfaces/file-upload';


import fs from 'fs';
import path from 'path';
import uniqid from 'uniqid';

export default class FileSystem{

    constructor(){}

    guardarImagenTemporal (file:FileUpload, userId:string){


        return new Promise((resolve, reject)=> {

            const path= this.crearCarpetaUsuario(userId);

            const nombrearchivo = this.generarNombreUnico(file.name);
    
            //mover archivos del temp a nuestra carpeta exisde
    
            file.mv( `${path}/${nombrearchivo}`, (err: any) =>{
    
                if (err){
                    reject(err);
                    //no se movio
                }else{
                    resolve();
                    //se movio correctamente
                }
            }); 
    

        });

     
    }

    private generarNombreUnico(nombreOriginal: string){

        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length -1];

        const idUnico = uniqid();



        return `${idUnico}.${extension}`;


    }

    private crearCarpetaUsuario(userId: string){


    const pathUser= path.resolve(__dirname, '../uploads', userId);
    const pathUserTemp = pathUser + '/temp';
    console.log(pathUser);

    const existe = fs.existsSync( pathUser);

    if(!existe){
        fs.mkdirSync(pathUser);
        fs.mkdirSync(pathUserTemp);
    }

    return pathUserTemp;

    }

    imagenesDeTempHaciaDinero(userId: string){
        const pathTemp= path.resolve(__dirname, '../uploads', userId,'temp');
        const pathDinero= path.resolve(__dirname, '../uploads', userId,'dineros');

        if(!fs.existsSync(pathTemp)){
            return[];
        }
        
        if(!fs.existsSync(pathDinero)){
            fs.mkdirSync(pathDinero);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(userId);

        imagenesTemp.forEach(imagen =>{

            fs.renameSync(`${pathTemp}/${imagen}`,`${pathDinero}/${imagen}`)

        });

        return imagenesTemp; 

    }

    private obtenerImagenesEnTemp(userId:string){

        const pathTemp= path.resolve(__dirname, '../uploads', userId,'temp');
        return fs.readdirSync(pathTemp) || [];
    }

    getFotoUrl( userId: string, img: string ) {

        // Path POSTs
        const pathFoto = path.resolve( __dirname, '../uploads', userId, 'dineros', img );


        // Si la imagen existe
        const existe = fs.existsSync( pathFoto );
        if ( !existe ) {
            return path.resolve( __dirname, '../assets/400x250.jpg' );
        }


        return pathFoto;

    }


}