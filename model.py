"""Models for pollinator plants app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Plant(db.Model):
    """A plant."""

    __tablename__ = 'plants'

    plant_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    common_name = db.Column(db.String, nullable=False)
    scientific_name = db.Column(db.String, nullable=False)
    plant_type = db.Column(db.String, nullable=False)
    region = db.Column(db.String, nullable=False)
    bloom_period = db.Column(db.String, nullable=False)
    life_cycle = db.Column(db.String, nullable=False)
    flower_color = db.Column(db.String, nullable=False)
    max_height = db.Column(db.String, nullable=False)
    # made this a string because issue with ints and floats due to ranges
    # check if issue for searching later
    water_needs = db.Column(db.String, nullable=False)
    notes = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String(250), nullable=True)
    # pollinators = db.Column(db.String)

    garden_plants = db.relationship('Garden')

    def __repr__(self):
        return f'<plant_id={self.plant_id} common_name={self.common_name}>'

    # foreign key: location

# native bee table -- implement later (location)
# randomizing data is an option

class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    region = db.Column(db.String, nullable=True)

    # user_id is foreign key to FavoritePlants
    garden_plants = db.relationship('Garden')


    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'

class Garden(db.Model):
    """Plants added to user gardens."""

    __tablename__ = 'garden plants'

    garden_plants_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.plant_id'), nullable=False)

    user = db.relationship('User')
    plant = db.relationship('Plant')

    def __repr__(self):
        return f'<User user_id={self.user_id} plant_id={self.plant_id}>'





def connect_to_db(flask_app, db_uri='postgresql:///plantsdb', echo=True):
    """Connect to the database."""

    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')

if __name__ == '__main__':
    from server import app

    connect_to_db(app)