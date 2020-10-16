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

    return jsonify({'regional plants': regional_plants_list})


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