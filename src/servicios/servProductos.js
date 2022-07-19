import DaoProducto from "../daos/DaosProductos.js";
import logger from '../helpers/logger.js'

const ProdInstance = DaoProducto.getInstance()

export const createProducto = async (req) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre) throw "Falta el nombre del Producto."
    if (!descripcion) throw "Falta la Descripción del Producto."
    if (!codigo) throw "Falta el codigo del Producto."
    if (!foto) throw "Falta la foto del Producto."
    if (!precio) throw "Falta el precio del Producto."
    if (!stock) throw "Falta el stock del Producto."
    try {
        let newProducto = {nombre: nombre, descripcion: descripcion, codigo: codigo, foto: foto, precio: precio, stock: stock }
        await ProdInstance.save(newProducto);
        return true
    } catch (error) {
        logger.error(error)
        return error
    }
};

export const getAll = async () => {
    return await ProdInstance.getAll();
}

export const getById = async (id) => {
    return await ProdInstance.findById(id);
}

export const updateProd = async (req) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    if (!nombre) throw "Falta el nombre del Producto."
    if (!descripcion) throw "Falta la Descripción del Producto."
    if (!codigo) throw "Falta el codigo del Producto."
    if (!foto) throw "Falta la foto del Producto."
    if (!precio) throw "Falta el precio del Producto."
    if (!stock) throw "Falta el stock del Producto."
    try {
        await ProdInstance.update(req);
        return true
    } catch (error) {
        logger.error(error)
        return error
    }
};

export const deleteProd = async (id) => {
    try {        
        await ProdInstance.delete(id);
        return true
    } catch (error) {
        return error
    }
}