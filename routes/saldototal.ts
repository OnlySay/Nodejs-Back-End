import { Router, Request, Response, request, response } from "express";
import { Dineroeg ,Dineroing} from '../models/dinero.model';
import { verificaToken } from '../middlewares/autenticacion';
import { Saldototal } from '../models/saldototal.model';


const saldototalRouts = Router();


saldototalRouts.get('/',[verificaToken], async (req: any, res: Response)=>{

    
    
    const _idUsuario =   req.usuario._id;

        

  
    const saldototal = await Saldototal.find({ usuario : _idUsuario })
                                       .sort({_id: -1})
                                       .populate('usuario', '-password')
                                       .exec();


    res.json ({ 

        ok:true,
    
        

    });

                    


});













export default saldototalRouts;