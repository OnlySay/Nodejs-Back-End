import { Router, Request, Response, request } from 'express';
import { Dineroing } from '../models/dinero.model';
import { verificaToken } from '../middlewares/autenticacion';
import Token from '../Classes/token';

const dineroIRoutes = Router();


dineroIRoutes.get('/', [verificaToken] , async (req: any , res: Response)=>{

    const _idUsuario = req.usuario._id;

    
    let pagina = Number(req.query.pagina) ||  1;
    let skip =  pagina  -1;
    skip  = skip * 10; 


    const dineroing = await Dineroing.find({usuario: _idUsuario})
                                     .sort({_id: -1})
                                     .skip(skip )
                                     .limit(5)
                                     .populate('usuario', '-password')
                                     .exec();

    res.json ({
        ok:true,
        pagina,
        dineroing
    });


});

dineroIRoutes.post('/ingresoDinero', [verificaToken],(req: any, res: Response)=>{



    const body = req.body;
    body.usuario = req.usuario._id;


    Dineroing.create( body ).then( async dineroDB =>{

        await dineroDB.populate('usuario', '-password').execPopulate();

        res.json({
          
            ok: true,
           dinero : dineroDB
    
        });
    }).catch( err => {
        res.json(err)
    });
    
});



export default dineroIRoutes;



