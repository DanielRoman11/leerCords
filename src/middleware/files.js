import fs from "fs";
import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    try {
      const destinationPath = path.resolve('public')+'/csv/';
      
      if(!fs.existsSync(destinationPath)){
        fs.mkdirSync(destinationPath, {recursive: true});
      }
      cb(null, destinationPath);
    } catch (error) {
      console.error(error);
    }
  },
  filename: function(req, file, cb) {
    cb(null, `${nanoid(5)}${path.extname(file.originalname)}`)
  }
})

const fileFilter = (req, file, cb) => {
  try {
    const allowedExtensions = ['.csv', '.txt'];
  
    const fileExtension = path.extname(file.originalname).toLowerCase();
  
    if (allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      const error = new Error('Tipo de archivo no permitido');
      error.statusCode = 400;
      cb(error, false);
    }
  } catch (error) {
    console.error(error);
  }
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 10485760
  }
})