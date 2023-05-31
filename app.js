require('dotenv').config();

const Servidor= require('./model/Servidor');

const initServer = new Servidor();

initServer.puertoActivo();



