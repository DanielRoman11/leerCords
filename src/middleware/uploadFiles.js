import cloudinary from "../utils/cloudinary.js";

export const uploadDocs = async(req, res, next) =>{
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'csv/',
      format: ''
    });
    
    console.log(result)
    res.status(201).json(result)
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send(error)
  }
}
