import logger from '../helpers/logger.js'
import {createProducto, getAll, getById, updateProd, deleteProd} from '../servicios/servProductos.js'

export const renderProductos = async (req, res, next) => {
  try {
    const Productos = await getAll();
    res.status(200).json(Productos)
  } catch (error) {
    logger.error(error)
    res.status(400).json({error: error})
  }
};

export const createNewProducto = async (req, res, next) => {
  try {
    const Productos = await createProducto(req)
    if (Productos == true){
      logger.info('producto registrado')
      res.status(201).json({message:"Producto Agregado"})
    }else{
      throw Productos
    }
  } catch (error) {
    logger.error(error)
    res.status(400).json({error: error})
  }
};

export const updateProducto = async (req, res, next) => {
  try {    
    const Productos = await updateProd(req)
    if (Productos == true){
      logger.info("Producto actualizado")
      res.status(201).json({message: "Producto actualizado"});
    }else{
      throw Productos
    } 
  } catch (error) {
    logger.error(error)
    res.status(400).json({error: error})
  }
};

export const deleteProducto = async (req, res,next) => {
  try {
    const Productos = await deleteProd(req.params.id);
    if (Productos == true){
      logger.info('producto eliminado')
      res.status(201).json({message: "Producto Eliminado"});
    }else{
      throw Productos
    }     
  } catch (error) {
    logger.error(error)
    res.status(400).json({error: error})
  }
};
