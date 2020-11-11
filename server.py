"""Server for pollinator plants app."""
import os
from flask import Flask, render_template, request, flash, session, redirect, jsonify, abort
from jinja2 import StrictUndefined
from flask_debugtoolbar import DebugToolbarExtension
from flask_login import LoginManager
from model import db, connect_to_db, User, Plant, Garden, UserGarden
import crud
from security import pwd_context, hash_password, check_hashed_password


app = Flask(__name__)                       # instance of the flask app

app.secret_key = 'APP_SECRET_KEY'           # required to use Flask sessions and debug toolbar

app.jinja_env.undefined = StrictUndefined   # raises error for undefined variables


login_manager = LoginManager()              # instance of LoginManager for flask login security
login_manager.init_app(app)

# doing app.route with all pages here will 
@app.route('/')
@app.route('/about')
@app.route('/explore')
@app.route('/login')
@app.route('/garden')
@app.route('/register')
@app.route('/logout')
def index():
    """View homepage."""

    if 'user_id' in session.keys():
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



@login_manager.user_loader
def load_user(user_id):
    """Given user_id, return associated User object."""

    return crud.get_user_by_id(user_id)

@app.route('/api/login', methods=['GET', 'POST'])
def login():
    """Log user into app. If already logged in, redirect to user garden.
    
    If email not registered, redirect to login. If incorrect password,
    redirect to homepage. If correct, add current user to session, and
    redirect to user dashboard."""

    # 1. user logging in, submit username, pw, fname in the FORM, grab from form save to session
        # not username: redirect to login, retry
        # pw incorrect: error message, try again
        # redirect to garden
    # 2. user is logged in, manually types in /login
        # already in the session
        # redirect to garden
    # 3. someone who isn't logged in manually types in /login
        # redirect to homepage

    username = request.form.get('username')
    password = request.form.get('password')

    # check hashed pw to hashed pw

    if not username and password:   # scenario 2
        user_id = session.get('user_id')
        if user_id is not None:
            current_user = crud.get_user_by_id(user_id)
            fname = current_user.fname
            flash(f'Welcome back, { fname }!')
    
            # return redirect('/api/garden/' + str(user_id))
            return redirect('/garden')

    # user entered both username and password
    if username and password:
        current_user = User.query.filter(User.username == username, password == password).first()
        saved_hash = current_user.password_hash

        # if correct password associated with username was entered
        if check_hashed_password(password, saved_hash):
            fname = current_user.fname
            user_id = current_user.user_id
            session['fname'] = current_user.fname
            session['user_id'] = current_user.user_id
            session['user_region'] = current_user.user_region
            flash(f'Welcome back, { fname }!')
            return redirect('/garden')
            # return redirect('/api/garden/' + str(user_id))
            # displays jsonified data, not the actual garden page
        
        # if password doesn't match hashed password
        flash("Incorrect username or password, please try again.")
        return redirect('/login')

    return redirect('/')
     
    # do I need to pass current session data in here to use as props in Garden component?


@app.route('/api/register', methods=['POST', 'GET'])
def register():
    """Create user, add to the database."""

    username = request.form.get('username')
    fname = request.form.get('fname')
    user_region = request.form.get('user_region')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm_password')
    
    # submit button disabled if any field is left blank

    # check if username exists, if so redirect to register
    user = crud.get_user_by_username(username)
    if user:
        flash("Username is already registered, please try another name.")
        return redirect('/register')
    
    # if passwords entered don't match
    if password != confirm_password:
        flash("Passwords do not match, please try again.")
        return redirect('/register')
    
    # if password, encrypt
    if password is not None:
        hashed = hash_password(password)

    # ERROR: too many redirects. lots of GET requests and repeat flash messages in browser.
    # infinite loop.

    # create new user in db
        new_user = crud.create_user(username=username,
                                    fname=fname,
                                    password_hash=hashed,
                                    user_region=user_region)
        user_id = new_user.user_id  # for garden url
        # create garden in db associated with new user
        new_usergarden = crud.create_user_garden(new_user.user_id)

        # save user_id, user_region, usergarden_id and fname to session
        session['usergarden_id'] = new_usergarden.usergarden_id
        session['user_id'] = new_user.user_id
        session['user_region'] = new_user.user_region
        session['fname'] = new_user.fname

        flash(f"Welcome, { fname }!")

    return redirect('/garden')
    # ('/api/garden/' + str(user_id)) shows jsonify data, not component
    # Question: will session data be passed to main.html if I do not redirect to the homepage?
    # homepage is where session data is passed in with render_template

@app.route('/api/logout', methods=['POST'])
def logout():
    """Log user out, clear session. Redirect to homepage."""

    fname=session['fname']
    flash(f"You're logged out { fname }, see you soon!")
    session.clear()

    return redirect('/')


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

    garden_plants = []

    for plant in crud.get_garden_plants_data(user_id):
        garden_plants.append({'plant_id': plant.plant_id,
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

    return jsonify({'plants': garden_plants})


@app.route('/api/add-to-garden', methods=['POST'])
def add_to_garden():
    """Add a new plant to a user's garden."""

    user_id = session.get('user_id')
    plant_id = request.json.get('plant_id')
    plant = crud.get_plant_by_id(plant_id)
    common_name = plant.common_name
    
    crud.add_garden_plant(user_id=user_id, plant_id=plant_id)

    flash(f"{common_name} has been added to your garden!")

    return jsonify({'success': True})

@app.route('/api/remove-from-garden', methods=['POST', 'DELETE'])
def remove_from_garden():
    """Remove a plant from a user's garden."""

    user_id = session.get('user_id')
    plant_id = request.json.get('plant_id')
    plant = crud.get_plant_by_id(plant_id)
    common_name = plant.common_name

    crud.remove_garden_plant(user_id, plant_id)
    flash(f"{common_name} has been removed from your garden.")

    return jsonify({'success': True})



if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')