import fs from 'fs/promises';
import path from "path";
import { getDirectionObj } from '../functions/direcciones.js';
import csv from "csv-parser";
import { error } from 'console';

export const uploadDocs = (req, res) =>{
  const file = req.file;
  console.log(file);
  return res.status(200).send(file);
}

export const getAllFiles = async(req, res) =>{
  const directory = `./src/public/csv/`;
  const allFiles = []; 

  try {
    const files = await fs.readdir(directory);
    for(let file of files){
      const objFile = {}
      objFile.name = file
      
      let content = await fs.readFile(path.join(directory, file), 'utf-8')
      
      content = content.replace(/^\ufeff/, '')

      objFile.content = content;
      allFiles.push(objFile)

    }

    console.log(allFiles);
    
    res.status(200).send(allFiles)
  } catch (err) {
    console.error(err);
    return res.status(500).json(err)
  }  
}

export const destroyFile = async(req, res) =>{
  const { id } = req.params;

  const filePath = `./src/public/csv/${id}.${'csv' || 'txt'}`
  await fs.unlink(filePath)
    .then(() => {
      return res.status(204).end()
    }).catch((err) => {
      res.status(404).json({error: "No se encontró el archivo"})
      console.error(err);
    })
}

export const getLocationJSON = async(req,res) =>{
  const {lat, lng} = req.params
  
  if(isNaN(parseFloat(lat)) || isNaN(parseFloat(lng)) || !isFinite(lat) || !isFinite(lng)) 
    return res.status(400).json({error: "Coordenadas invalidas"})
  try {
    const coords = await getDirectionObj(lat, lng);
    
    console.log(coords);
    return res.status(200).send(coords);
  } catch (error) {
    console.error(error);
  }
}

export const getFileLocationsJSON = async(req, res) =>{
  const directory = `./src/public/csv/`;
  const infoArr = [];

  try {
    const files = await fs.readdir(directory);
    
    for(let file of files){
      const objFile = {}
      objFile.name = file
      
      let absoluteRoot = await fs.readFile(path.join(directory, file), 'utf-8')
      fs.createReadStream(absoluteRoot)
        .pipe(csv())
        .on('data', async row =>{
          console.log(row);
          const lat = row.latitud;
          const lng = row.longitud;

          const directions = await getDirectionObj(lat, lng);
          infoArr.push(directions);
        })
        .on('end', ()=>{
          console.log("Direcciones obtenidas: ", directions);
        })
    }
  }
  catch (err){
    console.error(err);
    res.status(500).json(err);
  }
}
