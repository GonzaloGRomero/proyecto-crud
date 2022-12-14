from flask import Flask, jsonify, request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app = Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app)  # modulo cors es para que me permita acceder desde el frontend al backend
# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@localhost/proyecto'
# desde el objeto app configuro la URI de la BBDD    user:clave@localhost/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)

# defino tabla


class User(db.Model):   # la clase Producto hereda de db.Model

    # define los campos de la tabla user
    runnerId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), )
    lastname = db.Column(db.String(100), )
    race = db.Column(db.Integer)
    gender = db.Column(db.Integer)
    email = db.Column(db.String(100), )
    password = db.Column(db.String(100), )

    # crea el  constructor de la clase user
    def __init__(self, name, lastname, race, gender, email, password):
        # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.name = name
        self.lastname = lastname
        self.race = race
        self.gender = gender
        self.email = email
        self.password = password


with app.app_context():
    db.create_all()  # crea las tablas

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'lastname', 'race',
                      'gender', 'email', 'password')
userSchema = UserSchema()            # para crear un user
userSchema = UserSchema(many=True)  # multiples registros

# crea los endpoint o rutas (json)


@app.route('/users', methods=['GET'])
def get_Users():
    all_user = UserSchema.query.all()     # query.all() lo hereda de db.Model
    result = userSchema.dump(all_user)  # .dump() lo hereda de ma.schema
    return jsonify(result)


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    user = UserSchema.query.get(id)
    return userSchema.jsonify(user)


@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    user = UserSchema.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return userSchema.jsonify(user)


@app.route('/users', methods=['POST'])
def create_user():
    print(request.json)
    name = request.json['name']
    lastname = request.json['lastname']
    race = request.json['race']
    gender = request.json['gender']
    email = request.json['email']
    password = request.json['password']
    new_user = UserSchema(name, lastname, race, gender, email, password)
    db.session.add(new_user)
    db.session.commit()
    return userSchema.jsonify(new_user)


@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    user = UserSchema.query.get(id)
    name = request.json['name']
    lastname = request.json['lastname']
    race = request.json['race']
    gender = request.json['gender']
    email = request.json['email']
    password = request.json['password']
    user.name = name
    user.lastname = lastname
    user.race = race
    user.gender = gender
    user.email = email
    user.password = password
    db.session.commit()
    return userSchema .jsonify(user)


# programa principal *******************************
if __name__ == '__main__':
    app.run(debug=True, port=5000)
