"""Server for pollinator plants app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db
import crud

app = Flask(__name__)


@app.route('/')
def index():
    """View homepage."""
    return render_template('main.html')


#Database and API routes
@app.route('/api/plants')
def get_plants_json():
    """Return all plants."""

    plants_list = []
    for plant in crud.get_all_plants():
        plants_list.append({'plant_id': plant.plant_id,
        'region': plant.region,
        'common_name': plant.common_name,
        'scientific_name': plant.scientific_name,
        'plant_type': plant.plant_type,
        'flower_color': plant.flower_color,
        'bloom_period': plant.bloom_period,
        'life_cycle': plant.life_cycle,
        'max_height': plant.max_height,
        'notes': plant.notes})

    return jsonify({'plants': plants_list})

# ADD OTHER PROPERTIES
@app.route('/api/plants/<region>')
def get_regional_plants_json(region):
    """Return plants of a particular region."""

    regional_plants_list = []
    for plant in crud.get_plants_by_region(region):
        regional_plants_list.append({'plant_id': plant.plant_id,
        'region': plant.region,
        'common_name': plant.common_name,
        'scientific_name': plant.scientific_name,
        'plant_type': plant.plant_type,
        'flower_color': plant.flower_color,
        'bloom_period': plant.bloom_period,
        'life_cycle': plant.life_cycle,
        'max_height': plant.max_height,
        'notes': plant.notes})

    return jsonify({'plants': regional_plants_list})


@app.route('/create-account', methods=['POST'])
def create_user():
    """Create user, add to the database."""

    fname = request.json('fname')
    email = request.json('email')
    password = request.json('password')

    new_user = User(fname=fname, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    # Errors: User and db undefined

    return jsonify({'success': True})

# add plant to Garden table (user_id, plant_id)
@app.route('/add-to-garden', methods=['POST'])
def add_to_garden(garden_id, plant_id):
    """Add a plant to the Garden table of database."""

    garden_id = request.json('garden_id')
    plant_id: request.json('plant_id')

    new_garden_plant = Garden(garden_id=garden_id, plant_id=plant_id)
    db.session.add(new_garden_plant)
    db.session.commit()

    return jsonify({'success': True})


# get all plants a particular user added to their garden (user_id)
@app.route('/api/garden/<garden_id>')
def get_garden_plants(garden_id):
    """Return plants saved in garden for a particular user."""

    garden_plants = crud.get_garden_plants(garden_id)
    return jsonify({'garden plants': garden_plants})




if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')