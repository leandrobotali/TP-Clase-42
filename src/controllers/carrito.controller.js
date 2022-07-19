import logger from '../helpers/logger.js'
import {Carrito, Comprar, agregarProd, deleteProd} from '../servicios/servCarrito.js'

export const getCarrito = async (req, res, next) => {
    try {
        const Carritos = await Carrito(req.user._id)
        res.status(200).json(Carritos)
    } catch (error) {
        logger.error(error)
        res.status(400).json({error: error})
    }
}

export const confirmarCompra = async (req, res, next) => {
    try {
        await Comprar(req)
        req.flash("success_msg", "Su compra esta en proceso");
        res.status(201).json({message: "Su compra esta en proceso"})
    } catch (error) {
        logger.error(error)
        res.status(400).json({error: error})
    }
}

export const agregarProdaCarr = async (req, res, next) => {
    try {
        await agregarProd(req)
        res.status(201).json({message: "Producto Agregado!"})
    } catch (error) {
        logger.error(error)
        res.status(400).json({error: error})
    }
}

export const deleteByIdProd = async (req, res, next) => {
    try {
        await deleteProd(req)
        res.status(201).json({message: "Producto eliminado de carrito"})
    } catch (error) {
        logger.error(error)
        res.status(400).json({error: error})
    }
}
