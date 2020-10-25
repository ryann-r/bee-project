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
        'scientific_name': plant.scientific_name})

    return jsonify({'plants': plants_list})


@app.route('/api/plants/<region>')
def get_regional_plants_json(region):
    """Return plants of a particular region."""

    regional_plants_list = []
    for plant in crud.get_plants_by_region(region):
        regional_plants_list.append({'plant_id': plant.plant_id,
        'region': plant.region,
        'common_name': plant.common_name,
        'scientific_name': plant.scientific_name})

    return jsonify({'plants': regional_plants_list})


@app.route('/create-user', methods=['POST'])
def create_user():
    """Create user, add to the database."""

    fname = request.form.get('first name')
    email = request.form.get('email')
    password = request.form.get('password')
    region = request.form.get('region')

    new_user = User(fname=fname, email=email, password=password, region=region)
    #db.session.add(new_user)
    #db.session.commit()

    return jsonify({'success': True})

# add plant to Garden table (user_id, plant_id)
@app.route('/add-plant-to-garden', methods=['POST'])
def add_plant_to_garden(user_id, plant_id):
    """Add a plant to the Garden table of database."""

    # user_id: get from current logged in user
    # plant_id: get from plant component clicked

    #new_garden_plant = Garden(user_id=user_id, plant_id=plant_id)
    #db.session.add(new_garden_plant)
    #db.session.commit()

    #return jsonify({'success': True})


# get all plants a particular user added to their garden (user_id)
@app.route('/api/garden/<user_id>')
def get_garden_plants(user_id):
    """Return plants saved in garden for a particular user."""

    garden_plants = crud.get_garden_plants(user_id)
    return jsonify({'garden plants': garden_plants})


@app.route('/api/plants/<plant_id>')
def get_plant_by_id(plant_id):
    """Return plant by plant id."""

    plant = crud.get_plant(plant_id)
    return jsonify({'plant': plant.plant_id,
    'common_name': plant.common_name,
    'scientific_name': plant.scientific_name})


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')