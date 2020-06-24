import { Router , Response} from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Calendario } from '../models/calendario.model';
import { Dineroeg, Dineroing } from '../models/dinero.model';
import { Usuario } from '../models/usuario.model';



const calendarioRouts = Router();


calendarioRouts.get('/',[verificaToken], async (req: any, res: Response)=>{

    
    
    const _idUsuario =   req.usuario._id;

        

  
    const dineroeg = await Dineroeg.find({ usuario : _idUsuario })
                                    .sort({_id: -1})
                                    .populate('usuario', '-password')
                                    .exec();

    const dineroing = await Dineroing.find({usuario: _idUsuario})
                                     .sort({_id: -1})
                                     .populate('usuario','-password')
                                     .exec();


    res.json ({ 

        ok:true,
        dineroeg,
        dineroing
        

    });

                    


});


calendarioRouts.post('/',[verificaToken], async (req: any, res: Response)=>{

    const body = req.body;
    body.usuario = req.usuario._id;
    
    

    Calendario.create( body ).then( async Calendario =>{

        await Calendario.populate('usuario', '-password').execPopulate();

        res.json({
          
            ok: true,
            Calendario : Calendario
    
        });

    }).catch( err => {
        res.json(err)
    });
});





export default calendarioRouts;