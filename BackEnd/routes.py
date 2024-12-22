from flask import Flask, jsonify
import os

from flasgger import Swagger, swag_from

from swagger_config import swagger_config
from swagger_template import swagger_template

app = Flask(__name__)

swagger = Swagger(app, config=swagger_config, template=swagger_template)

dir_path = os.path.join(os.path.expanduser("~"), "Escritorio")


directories = [ f.path for f in os.scandir(dir_path) if f.is_dir() ]


@app.route('/conexion')
@swag_from('Swagger/conexion.yml')
def conexion():
    directory_names = [os.path.basename(d) for d in directories]
    return jsonify({"mensaje": directory_names})


@app.route('/navegar/<string:directorio>')
@swag_from('Swagger/navegar.yml')
def navegar(directorio):
    directory_names = [os.path.basename(d) for d in directories]
    if (directorio in directory_names):
        subfolders = [ f.path for f in os.scandir(dir_path + '/' + directorio) if f.is_dir()]
    else:
        subfolders = "No existe el subdirectorio"
    return jsonify({"subcarpetas": subfolders})


if __name__ == '__main__':
    app.run(debug=True)