const mongoose= require('mongoose');

const conexionDB= async ()=>{ 
    try {
        
        await mongoose.connect(process.env.MONGO_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true
            /*,useCreateIndex:true,
            useFindAndModify:false*/
        });
        console.log('*************todo bem*************')
    } catch (error) {
        console.log(error); 
        throw new Error('Error al conectar la DB')
    }
}
module.exports={
    conexionDB
}