# Resumen del Proyecto

Este proyecto se basa en Node.js y Express para crear una API que aborda la subida y procesamiento de archivos CSV, así como la obtención de información de ubicación a partir de coordenadas geográficas. A continuación, se presenta un breve resumen de las principales funcionalidades:

- Permite la subida de archivos CSV.
- Utiliza middleware para gestionar la subida y procesamiento de archivos.
- Muestra la ubicación del archivo después de la subida.
- Retorna una lista de todos los archivos subidos.
- Permite obtener información de ubicación desde un archivo específico mediante su identificador único.
- Permite eliminar un archivo específico utilizando su identificador único.
- Retorna información de ubicación a partir de las coordenadas de latitud y longitud proporcionadas.

Este proyecto se enfoca en la gestión de archivos CSV y la obtención de datos geográficos, proporcionando una API simple pero efectiva para realizar estas operaciones.


# Documentación de Rutas
## Upload a CSV File to Cloudinary

**Endpoint:** `POST /files`

**Description:** Uploads a CSV file to Cloudinary.

**Request:**
- Method: `POST`
- Path: `/files`
- Parameters:
  - `file`: The CSV file to be uploaded.
- FileRequirement: `UTF-8` mandatory

**Middleware:**
- `upload.single('file')`: Handles the file upload.
- `uploadDocs`: Middleware for uploading documentation.
- `showFileLocation`: Middleware to display the file location.

**CSV Data Structure:**
| Lat  | Lng |
|----------|----------|
| 40.7128° | -74.0060° |
| 34.0522° | -118.2437° |
| 51.5074° | -0.1278°  |


---

## Get Information from Files

**Endpoint:** `GET /files`

**Description:** Retrieves information about uploaded files.

**Request:**
- Method: `GET`
- Path: `/files`

---

## Get Location Information from a File

**Endpoint:** `GET /files/:id`

**Description:** Retrieves location information from a specific file.

**Request:**
- Method: `GET`
- Path: `/files/:id`
- Parameters:
  - `id`: The ID of the file.

---

## WARNING! Routes for File Deletion

**Endpoints:**
1. `DELETE /files/:id`: Deletes a specific file.
2. `DELETE /files/`: Deletes all files.

**Description:** Deletes files or the entire folder. Use with caution.

**Request:**
- Method: `DELETE`
- Path:
  - `/files/:id` for a specific file deletion.
  - `/files/` for deleting all files.

---

## SEARCH Search according to specified coordinates

**Endpoint:** `GET /coords/:lat/:lng`

**Description:** Search for location information based on specified coordinates.

**Request:**
- Method: `GET`
- Path: `/coords/:lat/:lng`
- Parameters:
  - `lat`: Latitude value.
  - `lng`: Longitude value.
