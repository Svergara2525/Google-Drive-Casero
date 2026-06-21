import os
import shutil


from flask import Flask, jsonify, request, send_file
from werkzeug.utils import secure_filename
from pathlib import Path
from flasgger import Swagger, swag_from
from swagger_config import swagger_config
from swagger_template import swagger_template
from flask_cors import CORS


app = Flask(__name__)

app.config.from_object('config')

CORS(app)

swagger = Swagger(app, config=swagger_config, template=swagger_template)


@app.route('/', methods=['GET'])
@swag_from('swaggerDocs/conexion.yml')
def conexion():
    try:
        dir_path = os.path.join(os.path.expanduser("~"))
        print(dir_path)
        directories = [ f.path for f in os.scandir(dir_path) if f.is_dir()]
        directory_names = [os.path.basename(d) for d in directories]
        return jsonify({"subcarpetas": directory_names}), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al conectar con el directorio", "error": str(e)}), 500


@app.route('/<path:directorio>')
@swag_from('swaggerDocs/navegar.yml')
def navegar(directorio):
    try:
        print("El directorio a añadir: ", directorio)
        dir_path = os.path.join(os.path.expanduser("~"))
        dir_path = os.path.join(dir_path, directorio)
        if os.path.isdir(dir_path):
            subfolders = []
            files = []
            for entry in os.scandir(dir_path):
                if entry.is_dir():
                    subfolders.append(entry.name)
                elif entry.is_file():
                    if not entry.name.startswith('.'):
                        file_path = os.path.join(dir_path, entry.name)
                        file_name, extension = os.path.splitext(os.path.basename(file_path))
                        atributos = {
                            "file_path": file_path,
                            "file_name": file_name,
                            "extension": extension
                        }
                        files.append(atributos)
            return jsonify({"subcarpetas": subfolders, "archivos": files}), 200
        else:
            subfolders = "No existe el subdirectorio"
            return jsonify({"Mensaje": subfolders}), 404
    except Exception as e:
        return jsonify({"mensaje": "Error al navegar el directorio", "error": str(e)}), 500
    

@app.route('/subir_archivo', methods=['POST'])
@swag_from('swaggerDocs/subir_archivo.yml')
def subir_archivo():
    path = request.form.get('path')
    dir_path = os.path.join(os.path.expanduser("~"))
    dir_path = os.path.join(dir_path, path)
    print("Quiero subir archivos a este directorio: ", dir_path)
    if not request.files.getlist('file'):
        return jsonify({"mensaje": "No se ha enviado el archivo"}), 400
    files = request.files.getlist('file')
    if len(files) == 0:
        return jsonify({"mensaje": "No se ha seleccionado el archivo"}), 404
    for file in files:
        filename = secure_filename(file.filename)
        file.save(os.path.join(dir_path, filename))
    return jsonify({"mensaje": "Archivo subido"}), 200


@app.route('/files/<path:filepath>', methods=['GET'])
def servir_archivo(filepath):
    try:
        full_path = os.path.abspath('/' + filepath)
        return send_file(full_path)
    except Exception as e:
        return jsonify({"mensaje": "Error al servir el archivo", "error": str(e)}), 404


@app.route('/download_file/<path:filepath>', methods=['GET'])
def download_file(filepath):
    try:
        full_path = os.path.abspath('/' + filepath)
        return send_file(full_path, as_attachment=True)
    except Exception as e:
        return jsonify({"mensaje": "Error al descargar el archivo", "error": str(e)}), 500
    

@app.route('/crear_carpeta', methods=['POST'])
@swag_from('swaggerDocs/crear_carpeta.yml')
def crear_carpeta():
    path = request.get_json().get('path')
    if not path:
        return jsonify({"mensaje": "No se ha proporcionado el nombre de la carpeta"}), 404
    print("El path de la carpeta a crear: ", path)
    dir_path = os.path.join(os.path.expanduser("~"))
    dir_path = Path(os.path.join(dir_path, path))
    print("Quiero subir archivos a este directorio: ", dir_path)
    try:
        dir_path.mkdir(parents=True)
        return jsonify({"mensaje": "Carpeta creada correctamente"}), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al crear la carpeta", "error": str(e)}), 500
    

@app.route('/eliminar_archivo', methods=['POST'])
@swag_from('swaggerDocs/eliminar_archivo.yml')
def eliminar_archivo():
    try:
        path = request.get_json().get('path')
        if not path:
            return jsonify({"mensaje": "No se ha proporcionado el nombre del archivo"}), 400
        isFile = request.get_json().get("isFile")
        if (isFile):
            os.remove(path)
            return jsonify({"mensaje": "Archivo eliminado correctamente"}), 200
        dir_path = os.path.join(os.path.expanduser("~"))
        dir_path = os.path.join(dir_path, path)
        shutil.rmtree(dir_path)
        return jsonify({"mensaje": "Carpeta eliminada correctamente"}), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al eliminar el archivo", "error": str(e)}), 500
    

@app.route("/renombrar_archivo", methods=['POST'])
@swag_from('swaggerDocs/renombrar_archivo.yml')
def renombrar_archivo():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"mensaje": "No se ha proporcionado el nombre del archivo"}), 400

        old_path = data.get('old_path')
        new_path = data.get('new_path')
        extension = data.get('extension')

        dir_path = os.path.join(os.path.expanduser("~"))
        old_path = os.path.join(dir_path, old_path)
        if extension and extension != "":
            new_path = os.path.join(dir_path, new_path) + extension
        else:
            new_path = os.path.join(dir_path, new_path)

        if not old_path or not new_path:
            return jsonify({"mensaje": "No se ha proporcionado el nombre del archivo antiguo o nuevo"}), 400
        
        os.rename(old_path, new_path)
        return jsonify({"mensaje": "Archivo renombrado correctamente"}), 200
    except Exception as e:
        return jsonify({"mensaje": "Error al renombrar el archivo", "error": str(e)}), 500


    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)