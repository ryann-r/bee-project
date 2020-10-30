"""CRUD operations."""

from model import Plant, User, Garden, connect_to_db, db


def get_all_plants():
    """Return all plants."""

    return Plant.query.all()


def get_plants_by_region(region):
    """Return plants by region."""

    return Plant.query.filter(Plant.region == region).all()


def get_user(user_id):
    """Return a user."""

    return User.query.filter(User.user_id == user_id).first()


def get_garden_plants(garden_id):
    """Returns garden plants for a given user."""

    return Garden.query.filter(Garden.garden_id == garden_id).all()


def create_user(fname, email, password):
    """Create and return a new user."""

    user = User(fname=fname, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user


def add_garden_plant(garden_id, plant_id):
    """Add a plant to a user's garden."""

    garden_plant = Garden(garden_id, plant_id)

    db.session.add(garden_plant)
    db.session.commit()

    return garden_plant


if __name__ == '__main__':
    from server import app
    connect_to_db(app)