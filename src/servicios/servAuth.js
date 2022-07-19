import DaoUser from '../daos/DaosAuth.js';
import logger from '../helpers/logger.js'
import { adminConf } from "../config/config.js";
import transporter from '../helpers/transportMail.js'

const UserInstance = DaoUser.getInstance()

export const registro = async (req) => {
    try {
      console.log(req.body);
      const { name, email, password, confirm_password, direccion, edad, cod_pais,cod_area, nro_tel } = req.body;
      if (!password) throw "Falta password."
      if (!confirm_password) throw "Falta confirm_password."
      if (password !== confirm_password) throw "Passwords no coinciden.";
      if (password.length < 4) throw "Passwords deben tener como minimo 4 caracteres."  
      if (!direccion) throw "Falta el campo Direccion."
      if (!edad) throw "Falta el campo Edad."
      if (!cod_area) throw "Falta el codigo de ciudad."
      if (!nro_tel) throw "Falta el numero de telefono."
      
      const userFound = await UserInstance.find(email);
      if (userFound) throw { text: "El email ya esta en uso." }

      let nroTel = cod_area + nro_tel

      let userNew = { name: name, email: email, password: password, direccion: direccion, edad: edad, nroTel: nroTel}

      await UserInstance.save(userNew)
  
      const mailOption = {
        from:'Servidor Node js',
        to: adminConf.email,
        subject: 'Nuevo Registro',
        text: 'nuevo usuario:\n nombre: ' + name + '\n email: ' + email + '\n direccion: ' + direccion + '\n edad: ' + edad + '\n numero de telefono: ' + nroTel,
      }
  
      await transporter.sendMail(mailOption)
  
      return true   
    } catch (error) {
      logger.error(error)
      return error
    }
  };

  export const actualizarImg = async (req) => {
    const file = req.file
      if (!file) throw "Debe cargar una imagen"
      try {
        await UserInstance.updateImg(req)
        return await UserInstance.findById(req.user._id)
      } catch (error) {
        logger.error(error)
        return error
      }
  }