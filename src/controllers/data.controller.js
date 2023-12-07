import fs from 'fs';
import fsp from 'fs/promises';
import path from "path";
import { getDirectionObj } from '../functions/direcciones.js';

const directory = path.resolve('public')+'/csv/';
export const showFileLocation = async(req, res) =>{
  const { route } = req.docsroot;

  try {
    if(!fs.existsSync(route)){
      return res.status(404).json({error: "Archivo no encontrado"});
    }

    let data = await fsp.readFile(route, {encoding: 'utf-8'});
    data = data.replace(/^\ufeff/, '').trim();

    const lines = data.split(/\r?\n/);
    const table = lines.map(line => line.split(';'));

    const locations = new Array();
    for (let coords = 1; coords < table.length; coords++) {
      const [lat, lng] = table[coords];
      const data = await getDirectionObj(lat, lng);
      locations.push(data);
    }

    console.log(locations);
    res.status(200).json(locations);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
}

export const getAllFiles = async(req, res) =>{
  const directory = path.resolve('src')+'/public/csv/';
  const allFiles = []; 

  try {
    const files = await fsp.readdir(directory);
    for(let file of files){
      const objFile = {};
      objFile.name = file;
      
      let content = await fsp.readFile(path.join(directory, file), 'utf-8')
      
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
  try {
    const directory = path.resolve('public')+'/csv/';
    const absoluteRoot = path.join(directory, id)+'.csv';

    await fsp.unlink(absoluteRoot)
    .then(() => {
      return res.status(204).end()
    })
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getLocationJSON = async(req,res) =>{
  const {lat, lng} = req.params;
  
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
  const { id } = req.params;
  const directory = path.resolve('public')+'/csv/';

  try {
    const absoluteRoot = path.join(directory, id)+'.csv';
    console.log(absoluteRoot);

    if(!fs.existsSync(absoluteRoot)){
      return res.status(404).json({error: "Archivo no encontrado"})
    }

    let data = await fsp.readFile(absoluteRoot, {encoding: 'utf-8'});
    data = data.replace(/^\ufeff/, '').trim();
    const lines = data.split(/\r?\n/);
    const table = lines.map(line => line.split(';'));

    const locations = new Array();
    for (let coords = 1; coords < table.length; coords++) {
      const [lat, lng] = table[coords]
      const data = await getDirectionObj(lat, lng)
      locations.push(data.address)
    }
    console.log(locations);
    res.status(200).json(locations);
  }
  catch (err){
    console.error(err);
    res.status(500).json(err);
  }
}
