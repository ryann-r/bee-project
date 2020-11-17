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
    water_needs = db.Column(db.String, nullable=False)
    notes = db.Column(db.String, nullable=False)
    image_url = db.Column(db.String(250), nullable=True)


    def __repr__(self):
        return f'<plant_id={self.plant_id} common_name={self.common_name}>'


class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    fname = db.Column(db.String(32), nullable=False)
    user_region = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)


    def is_authenticated(self):
        """Return True if user is authenticated."""

        return self.authenticated

    def __repr__(self):
        return f'<User user_id={self.user_id} username={self.username}>'



class UserGarden(db.Model):
    """Associates a user and a garden."""

    __tablename__ = 'usergardens'

    usergarden_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

    def __repr__(self):
        return f'<Usergarden_id={self.usergarden_id} user_id={self.user_id}>'


class Garden(db.Model):
    """Plants in a user's garden."""

    __tablename__ = 'gardens'

    garden_plant_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    garden_id = db.Column(db.Integer, db.ForeignKey('usergardens.usergarden_id'), nullable=False)
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.plant_id'), nullable=False)

    plant = db.relationship('Plant', backref=db.backref('gardens'))
    garden = db.relationship('UserGarden', backref=db.backref('gardens'))

    def __repr__(self):
        return f'<Garden_id={self.garden_id} Garden_plant_id={self.garden_plant_id}>'


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