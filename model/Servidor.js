const express = require('express');
var cors = require('cors');

const {conexionDB}=require('../database/config.db');


class Servidor{

    constructor(){
        this.app = express();
        this.port =process.env.PORT;
        this.rutaApiUsuarios='/api/usuarios';

        this.conectaBaseDeDatosMongo();

        this.middelwareSitioEstatico();
        this.rutas();
    }


    async conectaBaseDeDatosMongo(){
        // OJO OJO OJO, los await SIEMPRE dentro de un metodo async
        const conecta=  await conexionDB();
    }

    middelwareSitioEstatico(){
        this.app.use(cors());

        //parseo/serializacion del body de peticiones(las que poseen body) a formato JSON
        this.app.use(express.json());


        this.app.use(express.static('public/accesoDenegado'));
    }

    rutas(){
        this.app.use(this.rutaApiUsuarios, require('../rutas/Usuarios'));
    }

    puertoActivo(){
        this.app.listen(this.port);
    }

}

module.exports= Servidor;