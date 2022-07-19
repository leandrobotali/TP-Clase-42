import DaoCarrito from "../daos/DaosCarritos.js";
import logger from '../helpers/logger.js'
import {envioMailSmsWsp} from '../helpers/envio.js'

const CarrInstance = DaoCarrito.getInstance()

export const Carrito = async (id) => {
    try {
        return await CarrInstance.getById(id)
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const Comprar = async (req) => {
    try {
        envioMailSmsWsp(req)
        await CarrInstance.delete(req)
        return true
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const agregarProd = async (req, res, next) => {
    try {
        let carr = await CarrInstance.find(req)
        if(carr.length == 0){
            //falta validar
            let newCarr= {
                "user_id": req.user._id,
                "idProd": req.params.id_prod,
                "nombreProd": req.body.nombre,
                "descripcion": req.body.descripcion,
                "imagen": req.body.imagen,
                "precioProd": req.body.precioProd,
                "cantidad": 1,
            }
            await CarrInstance.save(newCarr)
        }else{
            await CarrInstance.update(req)
        }
        return true
    } catch (error) {
        logger.error(error)
        return error
    }
}

export const deleteProd = async (req, res, next) => {
    try {
        await CarrInstance.delete(req)
        return true
    } catch (error) {
        logger.error(error)
        return error
    }
}