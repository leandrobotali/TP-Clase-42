import {carritoModel} from '../models/ModelCarrito.js'
import mongoClass from '../db/mongoClass.js';

let instance = null;

class DaoCarrito{
    constructor() {
        this.client = mongoClass.getInstance()
    }
    
    async find(req){
        try {
            return await carritoModel.find({user_id:req.user._id, idProd:req.params.id_prod})
            .lean();
        } catch (err) {
            return err
        }
    }

    async getById(id){
        try {
            const getCarrId = await carritoModel.find({user_id:id})
            .sort({ date: "desc" })
            .lean();
            return getCarrId
        } catch (err) {
            return err
        }
    }
    
    async save(carr){
        try {
            const newCarrito = new carritoModel(carr)
            await newCarrito.save()
            return { 'messaje': 'Carrito agregado' }
        } catch (err) {
            return (err)
        }
    }

    async update(req){
        try {
            await carritoModel.updateOne({ user_id: req.user._id, idProd: req.params.id_prod }, {
                $inc: {
                    cantidad: 1
                }
            })
            return{'messaje':'Carrito Actualizado'}
        } catch (err) {
            return (err)
        }
    }

    async delete(req){
        try {
            await carritoModel.deleteOne({user_id:req.user._id, idProd:req.params.id_prod})
            return{ 'messaje': 'Producto Quitado de carrito' }
        } catch (err) {
            return(err)
        }
    }

    static getInstance(){
        if(!instance){
            instance = new DaoCarrito;
        }
        return instance
    }
}


export default DaoCarrito;