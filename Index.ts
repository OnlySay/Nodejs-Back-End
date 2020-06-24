import Server from './Classes/server';
import userRoutes from './routes/usuario';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';


import dineroRoutes from './routes/dineroEg'; 
import dineroIRoutes from './routes/dineroIg'; 
import { request } from 'express';
import calendarioRouts from './routes/calendario';
import saldototalRouts from './routes/saldototal';





const server = new Server();

//para abrir postman es con nodemon dist/ 


//configuracion 

server.app.use( cors({ origin:true, credentials: true}) );


server.app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token"); 
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
  next();
}); 



//FileUpload

server.app.use( fileUpload() );

//body parser
server.app.use(bodyParser.urlencoded({ extended: true}));
server.app.use(bodyParser.json());

//rutas de mi app


server.app.use('/user', userRoutes );
server.app.use('/dinero', dineroRoutes);
server.app.use('/dineroI', dineroIRoutes);
server.app.use('/Calendario', calendarioRouts);
server.app.use('/saldototal', saldototalRouts);


//conectar base de datos 
mongoose.connect('mongodb://localhost:27017/MyBilletera', 
                { useNewUrlParser: true, useCreateIndex: true }, ( err ) => {

   if ( err ) throw err;

   console.log('Base de datos ONLINE');
})  


//levantar express

server.start( () => {
  console.log(`Servidor corriendo en puerto ${ server.port }`);
});