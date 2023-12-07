import express from "express";
import { upload } from "../middleware/files.js";
import { destroyAllFiles, destroyFile, getAllFiles, getFileLocationsJSON, getLocationJSON, showFileLocation } from "../controllers/data.controller.js";
import { uploadDocs } from "../middleware/uploadFiles.js";

const routes = express.Router()

//TODO: Uploading a csv file to cloudinary
routes.post('/files', upload.single('file'), uploadDocs, showFileLocation);

//TODO: Get information from files
routes.get('/files', getAllFiles);
routes.get('/files/:id', getFileLocationsJSON);

//! WARNING! This routes delete files/folder
routes.delete('/files/:id', destroyFile);
routes.delete('/files/', destroyAllFiles);

//* SEARCH Search according to specified coordinates
routes.get('/coords/:lat/:lng', getLocationJSON);


export default routes;