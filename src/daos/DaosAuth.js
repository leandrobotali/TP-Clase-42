import {userModel} from "../models/ModelUser.js"
import mongoClass from '../db/mongoClass.js';

let instance = null;

class DaoUser{
    constructor() {
        this.client = mongoClass.getInstance()
    }
    
    async find(email){
        try{
            return await userModel.findOne({ email: email }).lean()
        }catch(err){
            return err
        }
    }

    async findById(id){
        try{
            return await userModel.findOne({_id: id}).lean()
        }catch(err){
            return err
        }
    }
    
    async save(user){
        try {
            const newUser = new userModel(user)
            newUser.password = await newUser.encryptPassword(user.password);
            await newUser.save()
    
            return { 'messaje': 'usuario Agregado' }
        } catch (err) {
            return err
        }
    }

    async updateImg(req){
        try{
            const getUpdProd = await userModel.updateOne({_id:req.user._id},{
                $set:{
                    "img": "/img/" + req.file.filename
                }
              })
            return getUpdProd
        }catch(err){
            return err
        }
    }

    async comparePassword(user,password){
        const newUser = new userModel(user)
        const pass = await newUser.matchPassword(password);
        return pass
    }

    static getInstance(){
        if(!instance){
            instance = new DaoUser;
        }
        return instance
    }
}

export default DaoUser;