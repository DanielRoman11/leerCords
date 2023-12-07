import fs from 'fs';
import fsp from 'fs/promises';
import path from "path";
import { getDirectionObj } from '../functions/direcciones.js';
import cloudinary from '../utils/cloudinary.js';

export const showFileLocation = async(req, res) =>{
  const { url } = req.docsroot;
  try {
    const response = await fetch(url);
    let data = await response.text();

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
  try {
    const {resources} = await cloudinary.search
      .expression('folder=csv')
      .execute()
    
    const files = new Array();
    resources.map(file =>{
      const fileObjDesc ={
        filename: file.filename,
        format: file.format,
        created_at: file.created_at,
        updated_at: file.updated_at,
        size: file.bytes,
        url: file.secure_url,
        created_by: file.created_by.access_key,
        uploaded_by: file.uploaded_by.access_key
      }
      files.push(fileObjDesc)
    })
    
    res.status(200).json(files)
  } catch (err) {
    console.error(err);
    return res.status(500).json(err)
  }  
}

export const destroyFile = async(req, res) =>{
  const { id } = req.params;
  
  try {
    cloudinary.api
      .delete_resources([`csv/${id}.csv`], 
        { type: 'upload', resource_type: 'raw' })
      .then(console.log);      
    res.status(204)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const destroyAllFiles = (req, res) =>{
  try {
    cloudinary.api
      .delete_folder('/csv')
      .then(console.log);
    res.status(204);
  } catch (error) {
    console.error(error);
  }
}

export const getFileLocationsJSON = async(req, res) =>{
  const { id } = req.params;

  try {
    const absoluteRoot = `csv/${id}.csv`
    const resource = await cloudinary.search
      .expression('public_id='+absoluteRoot).execute()
    
    const response = await fetch(resource.resources[0].secure_url);
    if(!response.ok) return res.status(400).json(response.statusText);
    let data = await response.text()
    console.log(data);
    
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
