import cloudinary from "../utils/cloudinary.js";

export const uploadDocs = async(req, res, next) =>{
  try {
    if(req.fileerror) return res.status(400).json({error: req.fileerror})

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'csv/',
      resource_type: 'raw',
      public_id: `${req.file.filename}`
    });
    
    req.docsroot = {url: result.secure_url}
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send(error)
  }
}
