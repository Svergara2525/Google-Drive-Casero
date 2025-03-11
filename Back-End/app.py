import os
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename

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


# Obtener la ruta del escritorio
dir_path = os.path.join(os.path.expanduser("~"), "Desktop")



@app.route('/conexion', methods=['GET'])
@swag_from('swaggerDocs/conexion.yml')
def conexion():
    directories = [ f.path for f in os.scandir(dir_path) if f.is_dir()]
    directory_names = [os.path.basename(d) for d in directories]
    return jsonify({"mensaje": directory_names}), 200


@app.route('/navegar/<string:directorio>')
@swag_from('swaggerDocs/navegar.yml')
def navegar(directorio):
    global dir_path
    directories = [ f.path for f in os.scandir(dir_path) if f.is_dir()]
    directory_names = [os.path.basename(d) for d in directories]
    if (directorio in directory_names):
        subfolders = [ f.path for f in os.scandir(dir_path + '/' + directorio) if f.is_dir()]
        dir_path = dir_path + '/' + directorio
        app.config['UPLOAD_FOLDER'] = dir_path
    else:
        subfolders = "No existe el subdirectorio"
    return jsonify({"mensaje": subfolders}), 200


@app.route('/retroceder')
@swag_from('swaggerDocs/retroceder.yml')
def retroceder():
    global dir_path
    print(dir_path)
    if (dir_path == os.path.join(os.path.expanduser("~"), "Desktop")):
        return jsonify({"mensaje": "No se puede retroceder más"}), 401
    
    dir_path = os.path.dirname(dir_path)
    subfolders = [ f.path for f in os.scandir(dir_path) if f.is_dir()]
    app.config['UPLOAD_FOLDER'] = dir_path
    return jsonify({"mensaje": subfolders}), 200



@app.route('/subir_archivo', methods=['POST'])
@swag_from('swaggerDocs/subir_archivo.yml')
def subir_archivo():
    if 'file' not in request.files:
        return jsonify({"mensaje": "No se ha enviado el archivo"}), 400
    files = request.files.getlist('file')
    if len(files) == 0:
        return jsonify({"mensaje": "No se ha seleccionado el archivo"}), 404
    for file in files:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return jsonify({"mensaje": "Archivo subido"}), 200
    
if __name__ == '__main__':
    app.run(debug=True)