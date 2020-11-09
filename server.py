"""Server for pollinator plants app."""
import os
from flask import Flask, render_template, request, flash, session, redirect, jsonify
from jinja2 import StrictUndefined
from flask_debugtoolbar import DebugToolbarExtension
#from markupsafe import escape
from flask_login import LoginManager
from model import db, connect_to_db, User, Plant, Garden, UserGarden
import crud
from security import pwd_context, hash_password, check_hashed_password


app = Flask(__name__)                       # instance of the flask app

app.secret_key = 'APP_SECRET_KEY'           # required to use Flask sessions and debug toolbar

app.jinja_env.undefined = StrictUndefined   # raises error for undefined variables


login_manager = LoginManager()              # instance of LoginManager for flask login security
login_manager.init_app(app)


@app.route('/')
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
            return redirect('/api/garden/' + str(user_id))

    if username and password:   # in form scenario 1
        current_user = User.query.filter(User.username == username, User.password == password).first()
        if not current_user:
            flash("Incorrect username or password, please try again.")
            return redirect('/api/login')
        fname = current_user.fname
        user_id = current_user.user_id
        session['fname'] = current_user.fname
        session['user_id'] = current_user.user_id
        session['user_region'] = current_user.user_region
        flash(f'Welcome back, { fname }!')
        return redirect('/api/garden/' + str(user_id))

    return redirect('/')
     
    # do I need to pass current session data in here to use as props in Garden component?


@app.route('/api/register', methods=['POST', 'GET'])
def register():
    """Create user, add to the database."""

    #ISSUES: error with hash_password
    # "TOO MANY REDIRECTS"

    username = request.form.get('username')
    fname = request.form.get('fname')
    user_region = request.form.get('user_region')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm_password')
    #password_hash = hash_password(password)

    if password != confirm_password:
        flash("Passwords do not match, please try again.")
        return redirect('/api/register')
    if username is None or password is None:
        flash('Invalid email or password, please try again.')
        return redirect('/api/register')
    if User.query.filter(User.username == username).first() is not None:
        flash('Username is already registered, please try again.')
        return redirect('/api/register')
    
    new_user = crud.create_user(username, fname, password, user_region)
    user_id = new_user.user_id
    new_usergarden = crud.create_user_garden(new_user.user_id)

    session['usergarden_id'] = new_usergarden.usergarden_id
    session['user_id'] = new_user.user_id
    session['user_region'] = new_user.user_region
    session['fname'] = new_user.fname
    # save user_id, user_region, and first name to session

    flash(f"Welcome, { fname }!")

    return redirect('/api/garden/' + str(user_id))
    # how to pass session data to this url ?
    # session data is set as a cookie in the http header as part of the http response
    # flash puts message in buffer so you can pull them out, it won't appear 
    # in browser unless you explicitly do "getflashmessages" MAYBE

@app.route('/logout')
def logout():
    """Log user out, clear session. Redirect to homepage."""

    session.clear()

    return redirect('/')

# @app.route('/explore')
# def explore():
#     """Display clickable map to view plants by region."""

# conditionally render regions_div for map for this route


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
        'notes': plant.notes,
        'image_url': plant.image_url})

    return jsonify({'plants': regional_plants_list})


@app.route('/api/garden/<user_id>')
def get_garden_plants(user_id):
    """Return all garden plants for a particular user."""

    user_id = session.get('user_id')
    if user_id is None:
        flash("Please sign up or log in to continue.")
        return redirect('/')

    # query for garden plants, get plant_id of each
    # 
    garden_plants = []

    plants = crud.get_garden_plants_data(user_id)
    for plant in plants:
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

    return jsonify({'garden plants': garden_plants})


@app.route('/api/add-to-garden', methods=['POST'])
def add_to_garden():
    """Add a new plant to a user's garden."""
    # addPlant in component is correct

    user_id = session.get('user_id')
    plant_id = request.json.get('plant_id')
    plant = crud.get_plant_by_id(plant_id)
    common_name = plant.common_name

    garden_id = crud.get_usergarden_id(user_id)
    new_garden_plant = Garden(garden_id=garden_id, plant_id=plant_id)
    db.session.add(new_garden_plant)
    db.session.commit()

    flash("{common_name} has been added to your garden!")

    return jsonify({'success': True})

# @app.route('/api/remove-from-garden', methods=['POST', 'DELETE'])    # is this a post or get request?
# def remove_from_garden(user_id, plant_id):
#     """Remove a plant from a user's garden."""

#     user_id = session.get('user_id')
#     plant_id = request.json('plant_id') # is request.json correct?

#     # plant_to_delete = query for garden_plant_id in Garden table
#     # db.session.delete(plant_to_delete)
#     # db.session.commit()

#     return jsonify({'success': True})



if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')