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
