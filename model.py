"""Models for pollinator plants app."""

from flask_sqlalchemy import SQLAlchemy
from security import pwd_context, hash_password, check_hashed_password

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


    def __repr__(self):
        return f'<plant_id={self.plant_id} common_name={self.common_name}>'

    # foreign key: location

# native bee table -- implement later (location)
# randomizing data is an option

class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    fname = db.Column(db.String(32), nullable=False)
    user_region = db.Column(db.String, nullable=False)
    # password = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    #authenticated = db.Column(db.Boolean, default=False)

    # did password encryption in server.py
    # def encrypt_password(self, password):
    #     """Encrypt user password, set to self.password_hash."""

    #     self.password_hash = pwd_context.encrypt(password)

    # def verify_password(self, password):
    #     """Verify user password."""

    #     return pwd_context.verify(password, self.password_hash)

    def is_authenticated(self):
        """Return True if user is authenticated."""

        return self.authenticated

    def __repr__(self):
        return f'<User user_id={self.user_id} username={self.username}>'

    #### ADD HASH PW & PYTHON FLASK SECURITY ADD-ON ####


class UserGarden(db.Model):
    """Associates a user and a garden."""

    __tablename__ = 'usergarden'

    usergarden_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    def __repr__(self):
        return f'<Usergarden_id={self.usergarden_id} user_id={self.user_id}>'

class Garden(db.Model):
    """Plants in a user's garden."""

    __tablename__ = 'gardens'

    garden_plant_id = db.Column(db.Integer, primary_key=True)
    garden_id = db.Column(db.Integer, db.ForeignKey('usergarden.usergarden_id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.plant_id'))

    plant = db.relationship('Plant', backref=db.backref('gardens'))
    garden = db.relationship('UserGarden', backref=db.backref('gardens'))

    def __repr__(self):
        return f'<Garden_plant_id={self.garden_plant_id} user garden_id={self.garden_id} plant_id={self.plant_id}>'


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