"""CRUD operations."""

from model import db, connect_to_db, User, Plant, Garden, UserGarden


def get_all_plants():
    """Return all plants."""

    return Plant.query.all()


def get_plants_by_region(region):
    """Return plants by region."""

    return Plant.query.filter(Plant.region == region).all()


def get_user_by_id(user_id):
    """Return a user by user_id."""

    return User.query.filter(User.user_id == user_id).first()

def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()


def get_garden_plants(user_id):
    """Returns garden plants for a given user."""

    usergarden = UserGarden.query.filter(UserGarden.user_id == user_id).first()
    usergardenid = usergarden.usergarden_id
    garden_plants = Garden.query.filter(Garden.garden_id == usergardenid).all()
    return garden_plants


def create_user(fname, email, password, region):
    """Create and return a new user."""

    # or region=session[region] ?

    user = User(fname=fname, email=email, password=password, region=region)

    db.session.add(user)
    db.session.commit()

    return user


def add_garden_plant(user_id, plant_id):
    """Add a plant to a user's garden."""

    # query UserGarden table with user_id for garden_id
    garden_id = UserGarden.query.filter(UserGarden.user_id == user_id).first
    garden_plant = Garden(garden_id, plant_id)

    db.session.add(garden_plant)
    db.session.commit()

    return garden_plant


if __name__ == '__main__':
    from server import app
    connect_to_db(app)