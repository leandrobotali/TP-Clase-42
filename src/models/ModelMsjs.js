import mongoose from 'mongoose'

//===========================================
//===========================================

const MensajeSchema = new mongoose.Schema({
    text: {type: String,required: true}
},{
    timestamps:true
})

//===========================================
//===========================================

const mensajesSchema = new mongoose.Schema({
  fecha: {type: Number,required: true},
  idMensaje: {type: mongoose.Schema.ObjectId,required: true},
  autor: {type: String,required: true }
},{
  timestamps:true
})

//===========================================
//===========================================

const mensajeModel = mongoose.model("Msj", MensajeSchema);
const mensajesModel = mongoose.model("Mensajes", mensajesSchema);

export {mensajeModel,mensajesModel}