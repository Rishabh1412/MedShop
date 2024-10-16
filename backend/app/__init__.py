from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()


app = Flask(__name__)
    
    # Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///swiggymed.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'this-secret-is-easy'
app.config['SECRET_KEY'] = 'your-very-secret-key'

    # Initialize extensions
db.init_app(app)
jwt.init_app(app)
CORS(app)

    # Import Blueprints (routes)
from .routes import main_blueprint
app.register_blueprint(main_blueprint)
