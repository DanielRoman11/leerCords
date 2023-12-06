import express from "express";
import { upload } from "../middleware/files.js";
import { destroyFile, getAllFiles, getFileLocationsJSON, getLocationJSON, uploadDocs } from "../controllers/data.controller.js";

const routes = express.Router()

routes.post('/files', upload.single('file'), uploadDocs);
routes.get('/files', getAllFiles);
routes.get('/coords/:lat/:lng', getLocationJSON);
routes.get('/files/locations', getFileLocationsJSON);
routes.delete('/files/:id', destroyFile);


export default routes;