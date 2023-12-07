export const getDirectionObj = async(lat, lng) =>{
  const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=${lng},${lat}&f=json`
  try {
    const result = await fetch(url);
    const data = await result.json();

    return data
  } catch (error) {
    console.error(error);
  }
}