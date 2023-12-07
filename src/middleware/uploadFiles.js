import path from "path";

export const uploadDocs = (req, res, next) =>{
  const file = req.file;

  if(file)
    req.docsroot = {route: path.join(file.destination, file.filename)}
  next();
}
