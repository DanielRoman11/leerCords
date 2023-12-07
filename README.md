# Resumen del Proyecto

Este proyecto se basa en Node.js y Express para crear una API que aborda la subida y procesamiento de archivos CSV, así como la obtención de información de ubicación a partir de coordenadas geográficas. A continuación, se presenta un breve resumen de las principales funcionalidades:

## 1. Subir Archivos

- **Ruta:** `/files` (POST)
- Permite la subida de archivos CSV.
- Utiliza middleware para gestionar la subida y procesamiento de archivos.
- Muestra la ubicación del archivo después de la subida.

## 2. Obtener Lista de Archivos

- **Ruta:** `/files` (GET)
- Retorna una lista de todos los archivos subidos.

## 3. Obtener Ubicaciones desde Archivo

- **Ruta:** `/files/:id` (GET)
- Permite obtener información de ubicación desde un archivo específico mediante su identificador único.

## 4. Eliminar Archivo

- **Ruta:** `/files/:id` (DELETE)
- Permite eliminar un archivo específico utilizando su identificador único.

## 5. Obtener Ubicación desde Coordenadas

- **Ruta:** `/coords/:lat/:lng` (GET)
- Retorna información de ubicación a partir de las coordenadas de latitud y longitud proporcionadas.

Este proyecto se enfoca en la gestión de archivos CSV y la obtención de datos geográficos, proporcionando una API simple pero efectiva para realizar estas operaciones.



# Documentación de Rutas

## Archivos

### Subir Archivo
- **Método:** POST
- **Ruta:** `/files`
- **Parámetros:**
  - `file` (Tipo de archivo: CSV - [UTF-8]) - Archivo a subir
- **Middleware:**
  - `upload` - Middleware para manejar la subida de archivos.
  - `uploadDocs` - Middleware para procesar la subida de documentos.
- **Controlador:**
  - `showFileLocation` - Muestra la ubicación del archivo después de la subida.

### Obtener Todos los Archivos
- **Método:** GET
- **Ruta:** `/files`
- **Controlador:**
  - `getAllFiles` - Obtiene la lista de todos los archivos.

### Obtener Ubicaciones desde Archivo
- **Método:** GET
- **Ruta:** `/files/:id`
- **Parámetros:**
  - `id` (Tipo: String) - Identificador único del archivo.
- **Controlador:**
  - `getFileLocationsJSON` - Obtiene las ubicaciones desde un archivo específico.

### Eliminar Archivo
- **Método:** DELETE
- **Ruta:** `/files/:id`
- **Parámetros:**
  - `id` (Tipo: String) - Identificador único del archivo.
- **Controlador:**
  - `destroyFile` - Elimina un archivo específico.

## Coordenadas

### Obtener Ubicación desde Coordenadas
- **Método:** GET
- **Ruta:** `/coords/:lat/:lng`
- **Parámetros:**
  - `lat` (Tipo: Número) - Latitud de la ubicación.
  - `lng` (Tipo: Número) - Longitud de la ubicación.
- **Controlador:**
  - `getLocationJSON` - Obtiene información de ubicación a partir de coordenadas.

## Contenido del CSV
| latitud | longitud |
|-----:|------|
|-74.081703794835|4.610072850981|
|double...|double...|
|double...|double...|

