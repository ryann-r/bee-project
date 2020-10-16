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
@app.route('/plants')
def get_plants_json():
    """Return all plants."""

    plants_list = []
    for plant in crud.get_all_plants():
        plants_list.append({'region': plant.region,
        'common_name': plant.common_name,
        'scientific_name': plant.scientific_name})

    return jsonify({'plants': plants_list})




if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')