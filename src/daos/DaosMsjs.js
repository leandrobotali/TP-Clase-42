import {mensajeModel,mensajesModel} from '../models/ModelMsjs.js'
import mongoClass from '../db/mongoClass.js';

let instance = null;

class DaoMsjs{
    constructor() {
        this.client = mongoClass.getInstance()
    }

    async getAll(){
        try {
            const msjs = await mensajesModel.find({})
                .sort({ fecha: "asc" })
                .lean();
            for (let i = 0; i < msjs.length; i++) {
                const text = await mensajeModel.find({ _id: msjs[i].idMensaje }).lean()
                msjs[i].text = text[0].text
            }
            return msjs
        } catch (err) {
            return err
        }
    }
    
    async save(mensaje){
        try {
            const newMsj = new mensajesModel(mensaje)
            await newMsj.save()
    
            return { 'messaje': 'mensajes Agregado' }
        } catch (err) {
            return err
        }
    }
    
    async saveText(mensaje){
        try {
            const newMsj = new mensajeModel(mensaje)
            return await newMsj.save()
        } catch (err) {
            return err
        }
    }

    static getInstance(){
        if(!instance){
            instance = new DaoMsjs;
        }
        return instance
    }
}


export default DaoMsjs;