export const renderIndex = (req, res) => {
  res.status(200).json({message: "Bienvenidos"})
};

export const forWsp = (req, res) => {
  res.end();
};