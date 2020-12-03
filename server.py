"""Server for pollinator plants app."""
import os
from random import choice
from flask import Flask, render_template, request, flash, session, redirect, jsonify
from jinja2 import StrictUndefined
from flask_debugtoolbar import DebugToolbarExtension
from flask_login import LoginManager
from model import db, connect_to_db, User, Plant, Garden, UserGarden
import crud
from security import pwd_context, hash_password, check_hashed_password
from pollinatorfacts import POLLINATOR_FACTS
from gardentips import GARDEN_TIPS


app = Flask(__name__)                       # instance of the flask app

app.secret_key = 'APP_SECRET_KEY'           # required to use Flask sessions and debug toolbar

app.jinja_env.undefined = StrictUndefined   # raises error for undefined variables


login_manager = LoginManager()              # instance of LoginManager for flask login security
login_manager.init_app(app)


@app.route('/')
@app.route('/about')
@app.route('/explore')
@app.route('/login')
@app.route('/garden')
@app.route('/register')
def index():
    """View homepage."""

    if session.get('user_id'):
        fname=session['fname']
        user_id=session['user_id']
        user_region=session['user_region']
    else:
        fname=None
        user_id=None
        user_region=None

    return render_template('main.html',
        fname=fname,
        user_id=user_id,
        user_region=user_region)


@app.route('/api/user-info')
def send_session_data():
    """Session data to send to app.jsx for useContext."""

    if 'user_id' in session.keys():
        fname=session['fname']
        user_id=session['user_id']
        user_region=session['user_region']
    else:
        fname=None
        user_id=None
        user_region=None

    return jsonify({'fname': fname, 'userId': user_id, 'userRegion': user_region})


@login_manager.user_loader
def load_user(user_id):
    """Given user_id, return associated User object."""

    return crud.get_user_by_id(user_id)


@app.route('/api/login', methods=['GET', 'POST'])
def login():
    """Log user into app, check credentials. If username not registered

    or incorrect password, redirect to login ('response': 'failed').
    If correct credentials, add current user to session, and
    redirect to garden ('response': 'success')."""

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # if user is already logged in
    if session.get('user_id'):
        flash("You're already logged in!")
        return jsonify({'response': 'success'})

    # user entered both username and password
    if username and password:
        current_user = User.query.filter(User.username == username, password == password).first()
        if not current_user:
            flash("Incorrect username or password, please try again.")
            return jsonify({'response': 'failed'})
        saved_hash = current_user.password_hash

        # if correct password associated with username was entered
        if check_hashed_password(password, saved_hash):
            # fname = current_user.fname
            session['fname'] = current_user.fname
            session['user_id'] = current_user.user_id
            session['user_region'] = current_user.user_region
            flash(f'Welcome back, { current_user.fname }!')
            return jsonify({'response': 'success'})
        
    # if password doesn't match hashed password
    flash("Incorrect username or password, please try again.")
    return jsonify({'response': 'failed'})
     

@app.route('/api/register', methods=['POST', 'GET'])
def register():
    """Create user, add to the database."""
    
    # submit button disabled if any field is left blank
    # cleared form in component after fetch to resolve infinite loop

    data = request.get_json()
    username = data.get('username')
    fname = data.get('fname')
    user_region = data.get('user_region')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    
    # check if a user is logged in, if so redirect to /garden
    current_user = session.get('user_id')
    if current_user is not None:
        flash("You're already logged in!")
        return jsonify({'response': 'success'})

    # check if username exists in db, if so redirect to /register
    user = crud.get_user_by_username(username)
    if user:
        flash("Username is already registered, please try another name.")
        return jsonify({'response': 'failed'})
    
    # if passwords entered don't match, redirect to /register
    if password != confirm_password:
        flash("Passwords do not match, please try again.")
        return jsonify({'response': 'failed'})
    
    # if password, encrypt
    if password is not None:
        hashed = hash_password(password)

        # create new user in db
        new_user = crud.create_user(username=username,
                                    fname=fname,
                                    password_hash=hashed,
                                    user_region=user_region)
        
        # create garden in db associated with new user
        new_usergarden = crud.create_user_garden(user_id=new_user.user_id)

        # save user_id, user_region, usergarden_id and fname to session
        session['usergarden_id'] = new_usergarden.usergarden_id
        session['user_id'] = new_user.user_id
        session['user_region'] = new_user.user_region
        session['fname'] = new_user.fname

        flash(f"Welcome, { fname }!")

        # redirect to /garden
        return jsonify({'response': 'success'})


@app.route('/api/logout', methods=['POST', 'GET'])
def logout():
    """Log user out, set session data to None. Redirect to homepage."""

    flash("You're logged out, see you soon!")
    # reset session data to None
    session['fname'] = None
    session['user_region'] = None
    session['user_id'] = None

    return jsonify({'success': True})
    # redirected to '/' in logout component app.jsx


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
        'notes': plant.notes,
        'image_url': plant.image_url})

    return jsonify({'plants': plants_list})


@app.route('/api/plants/<region>')
def get_regional_plants_json(region):
    """Return plants of a given region."""

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
        'notes': plant.notes,
        'image_url': plant.image_url})

    return jsonify({'plants': regional_plants_list})


@app.route('/api/garden/<user_id>')
def get_garden_plants(user_id):
    """Return all garden plants for a user."""

    user_id = session.get('user_id')
    if user_id is None:
        flash("Please sign up or log in to continue.")
        return redirect('/')

    plants = []

    for plant in crud.get_garden_plants_data(user_id):
        plants.append({'plant_id': plant.plant_id,
        'region': plant.region,
        'common_name': plant.common_name,
        'scientific_name': plant.scientific_name,
        'plant_type': plant.plant_type,
        'flower_color': plant.flower_color,
        'bloom_period': plant.bloom_period,
        'life_cycle': plant.life_cycle,
        'max_height': plant.max_height,
        'notes': plant.notes,
        'image_url': plant.image_url})

    return jsonify({'plants': plants})


@app.route('/api/add-to-garden', methods=['POST'])
def add_to_garden():
    """Add a new plant to a user's garden."""

    user_id = session.get('user_id')
    plant_id = request.json.get('plant_id')
    plant = crud.get_plant_by_id(plant_id)
    # common_name = plant.common_name

    crud.add_garden_plant(user_id=user_id, plant_id=plant_id)

    # flash(f"{common_name} has been added to your garden!")

    return jsonify({'success': True})


@app.route('/api/remove-from-garden', methods=['POST', 'DELETE'])
def remove_from_garden():
    """Remove a plant from a user's garden."""

    user_id = session.get('user_id')
    plant_id = request.json.get('plant_id')
    plant = crud.get_plant_by_id(plant_id)
    # common_name = plant.common_name

    crud.remove_garden_plant(user_id, plant_id)
    # flash(f"{common_name} was removed from your garden.")

    return jsonify({'success': True})
    # return jsonify({'success': True})
    # reloaded page on react side, so try switching this back to success: True

@app.route('/api/garden-plant-ids')
def get_garden_plant_ids():
    """Returns a list of plant_ids of plants in a user's garden."""

    user_id = session.get('user_id')

    garden_plant_ids = []
    
    for plant_id in crud.get_garden_plant_ids(user_id):
        garden_plant_ids.append(plant_id)
    
    return jsonify({'garden_plant_ids': garden_plant_ids})


@app.route('/api/pollinator-facts')
def generate_bee_fact():
    """Returns a random pollinator fact as a jsonified string."""

    pollinator_fact = choice(POLLINATOR_FACTS)

    return jsonify({'pollinator_fact': pollinator_fact})


@app.route('/api/garden-tips')
def generate_garden_tip():
    """Returns a random garden tip as a jsonified string."""

    garden_tip = choice(GARDEN_TIPS)

    return jsonify({'garden_tip': garden_tip})


@app.route('/api/garden-plant-bloom-periods')
def get_garden_plant_bloom_periods():
    """Returns a dictionary of key bloom times (early, mid, late, year-round),

    and plant common_name values."""

    user_id = session.get('user_id')
    garden_bloom_periods = crud.get_garden_bloom_periods(user_id)

    return jsonify({'garden_bloom_periods': garden_bloom_periods})
    # note: bloom_times is a dictionary of periods and lists of common_names


@app.route('/api/garden-plant-flower-colors')
def get_garden_plant_flower_colors():
    """Returns a dictionary of key flower colors and common_name values."""

    user_id = session.get('user_id')
    garden_flower_colors = crud.get_garden_flower_colors(user_id)

    return jsonify({'garden_flower_colors': garden_flower_colors})
    # note: flower_colors is a dictionary


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')