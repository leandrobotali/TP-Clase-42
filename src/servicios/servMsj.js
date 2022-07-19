import DaoMsjs from '../daos/DaosMsjs.js'

const msjInstance = DaoMsjs.getInstance()

export const createMsj = async (req) => {
    try {
        let text = {text:req.body.mensaje}
        const mensaje = await msjInstance.saveText(text)
        let msj = {fecha: Date.now(), idMensaje: mensaje._id, autor: req.user.email}
        await msjInstance.save(msj)
        return {message: "mensaje guardado"}        
    } catch (error) {
        return error
    }
};

export const getAllMsj = async () => {
    try {
        return await msjInstance.getAll();    
    } catch (error) {
        return error
    }
}