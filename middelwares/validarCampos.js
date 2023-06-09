const { validationResult } = require('express-validator');



const validaCampo = (req,res,next)=>{
    //leo el req en busca de algun error de validacion generado por el middelware de express-validator agregado en las rutas
    const erroresReq= validationResult(req);//consulto el objeto req con la funcion validatorResult de express-validator en busqueda de errores
    if (!erroresReq.isEmpty()){
        return res.status(400).json(erroresReq);
    }
    next();
}

module.exports= validaCampo