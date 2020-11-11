"""CRUD operations."""

from model import db, connect_to_db, User, Plant, Garden, UserGarden


def get_all_plants():
    """Return all plants."""

    return Plant.query.all()


def get_plants_by_region(region):
    """Return plants by region."""

    return Plant.query.filter(Plant.region == region).all()


def get_plant_by_id(plant_id):
    """Return plant by plant_id."""

    return Plant.query.filter(Plant.plant_id == plant_id).first()


def get_user_by_id(user_id):
    """Return a user by user_id."""

    return User.query.filter(User.user_id == user_id).first()


def get_user_by_username(username):
    """Return a user by email."""

    return User.query.filter(User.username == username).first()


def create_user(username, fname, password_hash, user_region):
    """Create and return a new user."""

    user = User(username=username,
                fname=fname,
                password_hash=password_hash,
                user_region=user_region)
    db.session.add(user)
    db.session.commit()

    return user


def create_user_garden(user_id):
    """Create garden for a new user."""

    usergarden = UserGarden(user_id=user_id)

    db.session.add(usergarden)
    db.session.commit()

    return usergarden

def get_usergarden_id(user_id):
    """Return usergarden_id of a particular user."""

    usergarden = UserGarden.query.filter(UserGarden.user_id == user_id).first()
    usergarden_id = usergarden.usergarden_id

    return usergarden_id


def get_garden_plants_data(user_id):
    """Returns a list of garden plant ids for a given user's garden."""

    usergarden = UserGarden.query.filter(UserGarden.user_id == user_id).first()
    if usergarden is None:
        return {}

    usergardenid = usergarden.usergarden_id
    garden_plants = Garden.query.filter(Garden.garden_id == usergardenid).all()

    garden_plant_data = []
    for garden_plant in garden_plants:
        plant_id = garden_plant.plant_id
        plant_data = get_plant_by_id(plant_id)
        garden_plant_data.append(plant_data)

    return garden_plant_data


def add_garden_plant(user_id, plant_id):
    """Add a plant to a user's garden."""

    garden_id = get_usergarden_id(user_id)
    new_garden_plant = Garden(garden_id=garden_id, plant_id=plant_id)
    db.session.add(new_garden_plant)
    db.session.commit()

    return new_garden_plant


def remove_garden_plant(user_id, plant_id):
    """Delete a plant from a user's garden."""

    garden_id = UserGarden.query.filter(UserGarden.user_id == user_id).first()
    plant_to_remove = Garden.query.filter(Garden.garden_id == garden_id, Garden.plant_id == plant_id).first()
    delete_gardenplant_id = plant_to_remove.garden_plant_id
    
    db.session.delete(delete_gardenplant_id)
    db.session.commit()

    return delete_gardenplant_id

    # error: object <Usergarden_id=1 user_id=1> is not legal as a sql literal value
    # fix query


if __name__ == '__main__':
    from server import app
    connect_to_db(app)