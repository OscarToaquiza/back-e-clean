const express = require('express');
const cors = require('cors');
const db = require('../database/postgresql');

const routerAuth = require('../routes/auth');
const routerUsuario = require('../routes/usuarios');
const routerAlamcenajeReciduo = require('../routes/almacenajeReciduo');
const routerFavorito = require('../routes/favorito');
const routerNoticia = require('../routes/noticia');
const routerPuntoGeografico = require('../routes/puntoGeografico');
const routerVehiculo = require('../routes/vehiculo');
const routerTipoDatos = require('../routes/tipoData');
const routerEmpresaRecicladora = require('../routes/empresaRecicladora');
const routerEmpresaTipoDesperdicio = require('../routes/empresaTipoDesperdicio');
const routerNotificacionProblema = require('../routes/notificacionProblema');
const routerTramite = require('../routes/tramite');
const routerCabeceraRuta = require('../routes/cabeceraRuta');
const routerUploads = require('../routes/uploads');
const routerProcesoReciclaje = require('../routes/procesoReciclar');
const routerLugar = require('../routes/lugar');
const routerLugarPuntoGeografico = require('../routes/lugarPuntoGeografico');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080 ;

        this.pathAuht = '/api/auth'
        this.usuariosPath = '/api/usuarios';
        this.pathAlmacenajeResiduos = '/api/almacenaje-residuos';
        this.pathFavoritos = '/api/favoritos';
        this.pathNoticias = '/api/noticias';
        this.pathPermisos = '/api/permisos';
        this.pathPuntoGeografico = '/api/punto-geografico';
        this.pathVehiculo = '/api/vehiculo';
        this.pathTipoDatos = '/api/tipo-datos';
        this.pathEmpresaRecicladora = '/api/empresa-recicladora';
        this.pathEmpresaTipoDesperdicio = '/api/empresa-recicladora/tipo-desperdicio';
        this.pathNotificacionProblema = '/api/notificacion-problema';
        this.pathUploads = '/api/uploads';
        this.pathTramite = '/api/tramite';
        this.pathCabeceraRuta = '/api/cabecera-ruta';
        this.pathProcesoReciclaje = '/api/proceso-reciclaje';
        this.PathLugar = '/api/lugar';
        this.PathLugarPuntos = '/api/lugar-punto-geografico';

        //Data base
        this.connection();
        
        // Middlewares
        this.middlewares();

        //Rutas de aplicacion
        this.routes();
    }

    async connection(){
        try {
            await db.authenticate();
            console.log(`Base de datos ${db.getDialect()} online`);
            console.log(`Nombre de la base de datos => ${db.getDatabaseName()}`);
          } catch (error) {
            console.error('Error con la base de datos:', error);
          }
    }


    middlewares(){

        //Cors
        this.app.use( cors() );

        //Praseo y lectura de body
        this.app.use(express.json());

        //Directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
       
        this.app.use(this.pathAuht, routerAuth);
        this.app.use(this.usuariosPath, routerUsuario);
        this.app.use(this.pathAlmacenajeResiduos, routerAlamcenajeReciduo );
        this.app.use(this.pathFavoritos, routerFavorito );
        this.app.use(this.pathNoticias, routerNoticia );
        this.app.use(this.pathPuntoGeografico, routerPuntoGeografico );
        this.app.use(this.pathUploads, routerUploads );
        this.app.use(this.pathVehiculo, routerVehiculo );
        this.app.use(this.pathTipoDatos, routerTipoDatos );
        this.app.use(this.pathEmpresaRecicladora, routerEmpresaRecicladora );
        this.app.use(this.pathEmpresaTipoDesperdicio, routerEmpresaTipoDesperdicio);
        this.app.use(this.pathNotificacionProblema, routerNotificacionProblema);
        this.app.use(this.pathTramite, routerTramite);
        this.app.use(this.pathCabeceraRuta, routerCabeceraRuta);
        this.app.use(this.pathProcesoReciclaje, routerProcesoReciclaje);
        this.app.use(this.PathLugar, routerLugar);
        this.app.use(this.PathLugarPuntos, routerLugarPuntoGeografico);
    }

    listen(){
        this.app.listen( this.port , () =>{
            (  process.env.DB_LOCAL === '1' ) 
                ? console.log("Entorno local")
                : console.log("Entorno heroku");
            console.log('Servidor web corriendo en el puerto ', this.port);
        })
    }

}

module.exports = Server;