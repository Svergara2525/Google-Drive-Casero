import os
from flask import Flask, jsonify, request, send_file
from werkzeug.utils import secure_filename
from pathlib import Path

from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flasgger import Swagger, swag_from

from jobRunner import run_jobs_and_save_output

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
    dir_path = os.path.join(os.path.expanduser("~"))
    print(dir_path)
    directories = [ f.path for f in os.scandir(dir_path) if f.is_dir()]
    directory_names = [os.path.basename(d) for d in directories]
    return jsonify({"subcarpetas": directory_names}), 200


@app.route('/<path:directorio>')
@swag_from('swaggerDocs/navegar.yml')
def navegar(directorio):
    print("El directorio a añadir: ", directorio)
    dir_path = os.path.join(os.path.expanduser("~"))
    dir_path = os.path.join(dir_path, directorio);
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
    full_path = os.path.abspath('/' + filepath)
    print("El path del archivo a servir: ", full_path)
    return send_file(full_path)
    

@app.route('/crear_carpeta', methods=['POST'])
@swag_from('swaggerDocs/crear_carpeta.yml')
def crear_carpeta():
    path = request.form.get('path')
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


    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)