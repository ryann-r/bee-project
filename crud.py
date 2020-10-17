"""CRUD operations."""

from model import Plant #db


def get_all_plants():
    """Return all plants."""

    return Plant.query.all()


def get_plants_by_region(region):
    """Return plants by region."""

    return Plant.query.filter(Plant.region == region).all()


def get_plant(plant_id):
    """Return a single plant by plant_id."""

    return Plant.query.filter(Plant.plant_id == plant_id).first()



if __name__ == '__main__':
     from server import app
     connect_to_db(app)