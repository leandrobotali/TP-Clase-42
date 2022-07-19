import {productosModel} from '../models/ModelProducto.js'
import mongoClass from '../db/mongoClass.js';

let instance = null;

class DaoProducto {
    constructor() {
        this.client = mongoClass.getInstance()
    }
    
    async getAll(){
        try{
            const getAllProd = await productosModel.find({})
            .sort({ date: "desc" })
            .lean();
            return getAllProd
        }catch(err){
            return err
        }
    }

    async findById(id){
        try{
            const getByIdProd = await productosModel.find({_id:id}).lean()
            return getByIdProd
        }catch(err){
            return err
        }
    }
    
    async save(prod){
        try {
            const newProducto = new productosModel(prod)
            await newProducto.save()
    
            return { 'messaje': 'Producto Agregado' }
        } catch (err) {
            return err
        }
    }

    async update(req){
        try{
            const getUpdProd = await productosModel.updateOne({_id:req.params.id},{
                $set:{
                    "nombre": req.body.nombre,
                    "descripcion":  req.body.descripcion,
                    "codigo": req.body.codigo,
                    "foto": req.body.foto,
                    "precio": req.body.precio,
                    "stock": req.body.stock
                }
            })
            return{'messaje':'Producto Actualizado'}
        }catch(err){
            return err
        }
    }

    async delete(id){
        try{
            await productosModel.deleteOne({_id:id})
            return {'messaje':'Producto Borrado'}
        }catch(error){
            return(error)
        }
    }

    static getInstance(){
        if(!instance){
            instance = new DaoProducto;
        }
        return instance
    }
}


export default DaoProducto;