import os
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename

from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from flasgger import Swagger, swag_from

from jobRunner import run_jobs_and_save_output

from swagger_config import swagger_config
from swagger_template import swagger_template
from config import URL_FOLDER
from flask_cors import CORS


app = Flask(__name__)

app.config.from_object('config')

CORS(app)

swagger = Swagger(app, config=swagger_config, template=swagger_template)



@app.route('/', methods=['GET'])
@swag_from('swaggerDocs/conexion.yml')
def conexion():
    dir_path = os.path.join(os.path.expanduser("~"), "Desktop")
    print(dir_path)
    directories = [ f.path for f in os.scandir(dir_path) if f.is_dir()]
    directory_names = [os.path.basename(d) for d in directories]
    return jsonify({"mensaje": directory_names}), 200


@app.route('/<path:directorio>')
@swag_from('swaggerDocs/navegar.yml')
def navegar(directorio):
    dir_path = os.path.join(os.path.expanduser("~"), "Desktop")
    dir_path = os.path.join(dir_path, directorio);
    print(dir_path)
    if os.path.isdir(dir_path):
        subfolders = [f.name for f in os.scandir(dir_path) if f.is_dir()]
        return jsonify({"directorio": directorio, "subcarpetas": subfolders}), 200
    else:
        subfolders = "No existe el subdirectorio"
        return jsonify({"Mensaje": subfolders}), 404
    


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