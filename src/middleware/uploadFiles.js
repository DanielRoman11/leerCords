import path from "path";

export const uploadDocs = (req, res, next) =>{
  try {
    const file = req.file; 
    
    if(file)
      req.docsroot = {route: path.join(file.destination, file.filename)}
    next();
  } catch (error) {
    console.error("Algo salio mal!",error);
    return res.status(500).send(error)
  }
}
