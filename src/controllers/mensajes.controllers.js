import logger from '../helpers/logger.js'
import { createMsj, getAllMsj } from "../servicios/servMsj.js";

export const renderMsjForm = async (req, res, next) => {
    try {
        const mensajes = await getAllMsj()
        res.status(200).json(mensajes)     
    } catch (error) {
        res.status(400).json({message: error})
    }
}

export const crearMsj = async (req, res, next) => {
    try {
        await createMsj(req)
        res.status(200).json({message: "mensaje guardado"})         
    } catch (error) {
        res.status(400).json({message: error})
    }
}  