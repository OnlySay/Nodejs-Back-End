
import { Dineroeg } from '../models/dinero.model';
import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../Classes/file-system';
import { Usuario } from '../models/usuario.model';


const dineroRoutes = Router();
const fileSystem = new FileSystem();
//para buscar el metodo de get y post en postman simular el find y 

dineroRoutes.get('/', [verificaToken] ,async (req: any , res: Response)=>{

    const _idUsuario =   req.usuario._id;

        

    let pagina = Number(req.query.pagina) ||  1;
    let skip =  pagina  -1;
    skip  = skip * 10; 
    
    const dineroeg = await Dineroeg.find({ usuario : _idUsuario })
                                    .sort({_id: -1})
                                    .skip(skip )
                                    .limit(5)
                                    .populate('usuario', '-password')
                                    .exec();

    res.json ({

        ok:true, 
        pagina,
        dineroeg

    });

});

//---------------------------------------- ingreso de pago-----------------------------------------------------

dineroRoutes.post('/ingresoDineroP', [verificaToken], (req: any, res: Response)=>{

    // const dinero = {
    //     nombreD     : req.body.nombreD,
    //     tipoD       : req.body.tipoD,
    //     precioD     : req.body.precioD,
    //     fechadepagD : req.body.fechadepagD,
    //     estadodepagD: req.body.estadodepagD
    // };

    const body = req.body;
    body.usuario = req.usuario._id;
    
    const imagenes = fileSystem.imagenesDeTempHaciaDinero( req.usuario._id );

    body.imgs= imagenes;

    Dineroeg.create( body ).then( async dineroDB =>{

        await dineroDB.populate('usuario', '-password').execPopulate();

        res.json({
          
            ok: true,
           dinero : dineroDB
    
        });

    }).catch( err => {
        res.json(err)
    });

}); 

//servicio para subir Archivos

    dineroRoutes.post( '/upload', [ verificaToken ], async (req: any, res: Response) => {
    
        if ( !req.files ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningun archivo'
            });
        }

        const file: FileUpload = req.files.image;

        if ( !file ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningun archivo - image'
            });
        }
    
        if ( !file.mimetype.includes('image') ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Lo que subió no es una imagen'
            }); 
        }
        
        

        await fileSystem.guardarImagenTemporal(file, req.usuario._id);

        res.json({

            ok: true,
            file: file.mimetype
    });

    


  });

  

  dineroRoutes.get('/imagen/:userid/:img',(req: any, res: any) => {

        

    const userId = req.params.userid;
    const img    = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( userId, img );

    res.sendFile( pathFoto );

});

   

export default dineroRoutes; 
