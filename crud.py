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

def get_garden_plants(user_id):
    """Return garden plants for a user."""

    usergardenid = get_usergarden_id(user_id)
    garden_plants = Garden.query.filter(Garden.garden_id == usergardenid).all()

    return garden_plants


def get_garden_plants_data(user_id):
    """Returns json data for all plants in a given user's garden."""

    garden_plants = get_garden_plants(user_id)

    garden_plant_data = []
    for garden_plant in garden_plants:
        plant_id = garden_plant.plant_id
        plant_data = get_plant_by_id(plant_id)
        garden_plant_data.append(plant_data)

    return garden_plant_data

def get_garden_plant_ids(user_id):
    """Returns a list of plant_id's in a user's garden."""

    garden_plants = get_garden_plants(user_id)

    garden_plant_ids = []
    for garden_plant in garden_plants:
        plant_id = garden_plant.plant_id
        garden_plant_ids.append(plant_id)

    return garden_plant_ids


def add_garden_plant(user_id, plant_id):
    """Add a plant to a user's garden."""

    garden_id = get_usergarden_id(user_id)
    new_garden_plant = Garden(garden_id=garden_id, plant_id=plant_id)
    db.session.add(new_garden_plant)
    db.session.commit()

    return new_garden_plant


def remove_garden_plant(user_id, plant_id):
    """Delete a plant from a user's garden."""

    usergarden = UserGarden.query.filter(UserGarden.user_id == user_id).first()
    usergarden_id = usergarden.usergarden_id
    plant_object = Garden.query.filter(Garden.garden_id == usergarden_id,
                                    Garden.plant_id == plant_id).first()
    gardenplant_id = plant_object.garden_plant_id
    plant_to_delete = Garden.query.filter(Garden.garden_plant_id == gardenplant_id).first()

    db.session.delete(plant_to_delete)
    db.session.commit()

    return plant_to_delete

def get_garden_bloom_periods(user_id):
    """Returns a dictionary of bloom periods (early, mid, late, year-round),

    and plant common name values for plants in a user's garden."""

    # bloom_periods = { 'Early': [], 'Mid': [], 'Late': [], 'Year-round': [] }
    bloom_periods = { 'Early': 0, 'Mid': 0, 'Late': 0, 'Year-round': 0}
    for plant in get_garden_plants_data(user_id):
        # common_name = plant.common_name
        bloom_periods_string = plant.bloom_period
        plant_bloom_periods_list = [item.strip() for item in bloom_periods_string.split(',')]
        for period in plant_bloom_periods_list:
            bloom_periods[period] += 1
            # bloom_periods[period].append(common_name)

    return bloom_periods

def get_garden_flower_colors(user_id):
    """Returns a dictionary of flower colors (early, mid, late, year-round),

    and plant common name values for plants in a user's garden."""

    # flower_colors = { 'Blue': [], 'Purple': [], 'Yellow': [],
    #                 'Green': [], 'Orange': [], 'Red': [],
    #                 'Pink': [], 'White': [], 'Brown': []}

    flower_colors = { 'Blue': 0, 'Purple': 0, 'Yellow': 0,
                'Green': 0, 'Orange': 0, 'Red': 0,
                'Pink': 0, 'White': 0, 'Brown': 0}

    for plant in get_garden_plants_data(user_id):
        # common_name = plant.common_name
        flower_colors_string = plant.flower_color
        plant_flower_colors_list = [item.strip() for item in flower_colors_string.split(',')]
        for color in plant_flower_colors_list:
            # flower_colors[color].append(common_name)
            flower_colors[color] += 1

    return flower_colors


if __name__ == '__main__':
    from server import app
    connect_to_db(app)