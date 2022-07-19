import DaoUser from '../daos/DaosAuth.js';
import {adminConf} from '../config/config.js'
import logger from './logger.js'

export const createAdminUser = async () => {
  const UserInstance = DaoUser.getInstance()
  const userFound = await UserInstance.find(adminConf.email)

  if (userFound) return;

  const newUser = {
    email: adminConf.email,
    name: adminConf.name,
    password: adminConf.password,
    direccion: adminConf.direccion,
    edad: adminConf.edad,
    nroTel: adminConf.nroTel,
    img: adminConf.img,
    rol: adminConf.rol
};

  await UserInstance.save(newUser)

  logger.info("Admin user created");
};
