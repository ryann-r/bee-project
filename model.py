from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# classes here
# note: errors re: SQLAlchemy, check about SSL linking issue

class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    zipcode = db.Column(db.Integer) #foreign key
    #favorite_plants = db.Column(db.String)

    

    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'

class Plant(db.Model):
    """A plant."""

    __tablename__ = 'plants'

    plant_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    common_name = db.Column(db.String)
    scientific_name = db.Column(db.String)
    plant_type = db.Column(db.String)
    region = db.Column(db.String)
    bloom_period = db.Column(db.String)
    life_cycle = db.Column(db.String)
    flower_color = db.Column(db.String)
    max_height = db.Column(db.Integer)
    water_needs = db.Column(db.String)
    notes = db.Column(db.String)
    # pollinators = db.Column(db.String)

    # foreign key: location

# native bee table -- implement later (location)
# randomizing data is an option


# edit to match your db
#def connect_to_db(flask_app, db_uri='postgresql:///ratings', echo=True):
    #flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    #flask_app.config['SQLALCHEMY_ECHO'] = echo
    #flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    #db.app = flask_app
    #db.init_app(flask_app)

    #print('Connected to the db!')