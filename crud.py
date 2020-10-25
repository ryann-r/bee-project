"""CRUD operations."""

from model import Plant, User, Garden


def get_all_plants():
    """Return all plants."""

    return Plant.query.all()


def get_plants_by_region(region):
    """Return plants by region."""

    return Plant.query.filter(Plant.region == region).all()


def get_user(user_id):
    """Return a user."""

    return User.query.filter(User.user_id == user_id).first()

def get_garden_plants(user_id):
    """Returns garden plants for a given user."""

    return Garden.query.filter(Garden.user_id == user_id).all()



if __name__ == '__main__':
    from server import app
    connect_to_db(app)