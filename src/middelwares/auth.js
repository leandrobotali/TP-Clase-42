export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({message:"No esta loggeado"})
};
export const isAdmin = (req, res, next) => {
  if (req.user.rol == "admin") {
    return next();
  }
  res.status(40).json({message:"No esta Autorizado"})
};
