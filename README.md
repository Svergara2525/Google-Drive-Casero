# Google Drive Casero

Sirve para guardar fotos en tu ordenador como si fuera una web de almacenamiento en la nube.

Permite:

- Navegar por carpetas y consultar sus archivos.
- Subir y descargar archivos.
- Crear carpetas.
- Renombrar y eliminar archivos y carpetas.
- Previsualizar imágenes y documentos compatibles con el navegador.

## Requisitos

Docker y Docker Compose instalados. En Windows y macOS puedes utilizar Docker Desktop; debe estar iniciado.

## Configurar la carpeta de archivos

Antes de iniciar la aplicación, abre `docker-compose.yml` y modifica la ruta del volumen del servicio `backend`. Esta es la ruta de una carpeta de tu ordenador, no una URL web.

Sustituye la parte anterior a `:/data` por la ruta absoluta de la carpeta que quieras gestionar. Crea esa carpeta si todavía no existe.

**Windows (desde PowerShell o CMD):**

```yaml
volumes:
  - "C:/Users/TU_USUARIO/Documents/Fotos:/data"
```

Usa barras `/` y sustituye `TU_USUARIO` por tu usuario de Windows.

**macOS:**

```yaml
volumes:
  - "/Users/TU_USUARIO/Documents/Fotos:/data"
```

**Linux:**

```yaml
volumes:
  - "/home/TU_USUARIO/Fotos:/data"
```

Mantén `/data`: es la carpeta interna del contenedor que utiliza el backend. Los archivos que subas y los cambios que hagas desde la aplicación, incluidas las eliminaciones, se aplican a la carpeta local seleccionada.

## Construir e iniciar la aplicación

Abre una terminal en la carpeta del proyecto, donde está `docker-compose.yml`. Los comandos son los mismos en Windows, macOS y Linux:

```sh
docker compose build
docker compose up -d
```

También puedes construir e iniciar los servicios con un único comando:

```sh
docker compose up -d --build
```

Si estas en linux y no funciona, tal vez tengas que usar el comando sudo:

```sh
sudo docker compose build
sudo docker compose up -d
```

Cuando los servicios estén listos, abre la aplicación en [http://localhost:5173](http://localhost:5173). El backend utiliza el puerto `5001`.

Si cambias la ruta de la carpeta después de iniciar la aplicación, ejecuta de nuevo `docker compose up -d` para aplicar la configuración.

Para detener y retirar los contenedores:

```sh
docker compose down
```

Los archivos de la carpeta local se conservan al retirar los contenedores.
