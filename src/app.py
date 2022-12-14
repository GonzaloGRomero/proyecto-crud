from flask import Flask ,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend

# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:root@localhost/proyecto'
# desde el objeto app configuro la URI de la BBDD    user:clave@localhost/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db= SQLAlchemy(app)
ma=Marshmallow(app)

 
#*********** defino la tabla producto **************
class Producto(db.Model):   # la clase Producto hereda de db.Model     
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    nombre=db.Column(db.String(100))
    precio=db.Column(db.Integer)
    stock=db.Column(db.Integer)
    imagen=db.Column(db.String(100))
    
    # crea el  constructor de la clase productos
    def __init__(self,nombre,precio,stock,imagen):   
        self.nombre=nombre   # no hace falta el id porque lo crea sola mysql por ser auto_incremento
        self.precio=precio
        self.stock=stock
        self.imagen=imagen

#************ defino tabla User *******************

class User(db.Model):   # la clase Producto hereda de db.Model

    # define los campos de la tabla user
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    lastname = db.Column(db.String(100), nullable=False)
    race = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(100),nullable=False, unique=True)
    password = db.Column(db.String(10), nullable=False)

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
# with app.app_context():
#     db.create_all()

#************************************************************
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'lastname', 'race',
                      'gender', 'email', 'password')
user_schema = UserSchema()            # para crear un user
users_schema = UserSchema(many=True)  # multiples registros

class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','nombre','precio','stock','imagen')
producto_schema=ProductoSchema()            # para crear un producto
productos_schema=ProductoSchema(many=True)  # multiples registros
 
# crea los endpoint o rutas (json)
#***********************inicio endpoints productos*************************
@app.route('/productos',methods=['GET'])
def get_Productos():
    all_productos=Producto.query.all()     # query.all() lo hereda de db.Model
    result=productos_schema.dump(all_productos)  # .dump() lo hereda de ma.schema
    return jsonify(result)
 
@app.route('/productos/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)
    return producto_schema.jsonify(producto)

@app.route('/productos/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()
    return producto_schema.jsonify(producto)

@app.route('/productos', methods=['POST'])
def create_producto():
    print(request.json)
    nombre=request.json['nombre']
    precio=request.json['precio']
    stock=request.json['stock']
    imagen=request.json['imagen']
    new_producto=Producto(nombre,precio,stock,imagen)
    db.session.add(new_producto)
    db.session.commit()
    return producto_schema.jsonify(new_producto)

@app.route('/productos/<id>' ,methods=['PUT'])
def update_producto(id):
    producto=Producto.query.get(id)
    nombre=request.json['nombre']
    precio=request.json['precio']
    stock=request.json['stock']
    imagen=request.json['imagen']
    producto.nombre=nombre
    producto.precio=precio
    producto.stock=stock
    producto.imagen=imagen
    db.session.commit()
    return producto_schema .jsonify(producto)

#*****************Fin endpoints productos***********************************


#*********************inicio endpoints users*****************************


# crea los endpoint o rutas (json)


@app.route('/users', methods=['GET'])
def get_Users():
    all_users = User.query.all()     # query.all() lo hereda de db.Model
    result = users_schema.dump(all_users)  # .dump() lo hereda de ma.schema
    return jsonify(result)


@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    return user_schema.jsonify(user)


@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)


@app.route('/users', methods=['POST'])
def create_user():
    print(request.json)
    name = request.json['name']
    lastname = request.json['lastname']
    race = request.json['race']
    gender = request.json['gender']
    email = request.json['email']
    password = request.json['password']
    new_user = User(name, lastname, race, gender, email, password)
    db.session.add(new_user)
    db.session.commit()
    return user_schema.jsonify(new_user)


@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
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
    return user_schema.jsonify(user)

#*********************Fin endpoints users********************************

 
#********************* programa principal *******************************

if __name__=='__main__':  
    app.run(debug=True, port=5000)  

