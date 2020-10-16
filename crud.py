"""CRUD operations."""

from model import Plant #User #db


def get_all_plants():
    """Return all plants."""

    return Plant.query.all()


def get_plants_by_region(region):
    """Return plants by region."""

    return Plant.query.filter(Plant.region == region).all()


def get_regional_plant(region, common_name):
    """Returns a plant of a particular region."""

    return Plant.query.filter(Plant.region == region,
        Plant.common_name == common_name)


def get_regional_plants_by_common_name(region, common_name):
    """Return plants by region and common name."""

    return Plant.query.filter(Plant.region == region, Plant.common_name == common_name).first()


def get_regional_plants_by_scientific_name(region, scientific_name):
    """Return plants by region and scientific name."""

    return Plant.query.filter(Plant.region == region,
        Plant.scientific_name == scientific_name).first()




#implement user later
#def create_user(fname, email, password, zipcode):
    #"""Create a new user and add to database."""

    #user = User(fname=fname, email=email, password=password, zipcode=zipcode)

    #db.session.add(user)
    #db.session.commit()

    #return user



# if __name__ == '__main__':
#     from server import app
#     connect_to_db(app)