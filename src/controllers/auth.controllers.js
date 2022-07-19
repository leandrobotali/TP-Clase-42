import passport from "passport";
import logger from '../helpers/logger.js'
import { registro, actualizarImg } from "../servicios/servAuth.js";

export const singup = async (req, res, next) => {
  try {
    let user = await registro(req)
    if(user==true){
      logger.info("Usuario Registrado")
      res.status(201).json({message: "Registrado con exito"});
    }else{
      throw user
    }
  } catch (error) {
    logger.error(error)
    res.status(400).json({error: error});
  }
}

export const signin = passport.authenticate("local", {
  successRedirect: "/auth/successLogin",
  failureRedirect: "/auth/failLogin",
  failureMessage: true
});

export const successLogin = async (req, res, next) => {
  res.status(201).json({message: "Bienvenido"});
}

export const failLogin = async (req, res, next) => {
  res.status(401).json({error: "datos incorrectos"});
}

export const uploadImg = async (req, res, next) => {
  try {
    let user = await actualizarImg(req)
    if(user==true){
      logger.info('usuario ' + req.user.email + ' cambio su foto de perfil ')
      res.status(201).json({message: "Imagen actualizada"})
    }else{
      throw user
    }
  } catch (error) {
    logger.error(error)
    res.status(400).json({error: error});
  }
}

export const perfil = async (req, res, next) => {
  res.render("auth/perfil", {email: req.user.email, name: req.user.name, edad: req.user.edad, direccion: req.user.direccion, nroTel: req.user.nroTel, img: req.user.img});
}

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) res.status(400).json({error: err});
    res.status(201).json({message: "Hasta Luego!"})
  });
};
