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
    #username = session['fname']

    return render_template('main.html',
        fname=session['fname'],
        user_id=session['user_id'],
        user_region=session['user_region'])

@login_manager.user_loader
def load_user(user_id):
    """Given user_id, return associated User object."""

    return crud.get_user_by_id(user_id)

@app.route('/login', methods=['POST'])
def login():
    """Log user into app. If already logged in, redirect to user garden.
    
    If email not registered, redirect to login. If incorrect password,
    redirect to homepage. If correct, add current user to session, and
    redirect to user dashboard."""

    email = request.form.get('email')
    password = request.form.get('password')
    fname = request.form.get('fname')

    current_user = User.query.filter(User.email == email).first()

    if session.get('user_id') is not None:
        flash("You're already logged in.")
        return redirect('/dashboard')

    if not current_user:
        flash("The email you entered is not registered. Please try again or register as a new user.")
        return redirect('/')

    if current_user.password != password:
        flash("Incorrect password, please try again.")
        return redirect('/login')


    session['fname'] = current_user.fname
    session['user_id'] = current_user.user_id
    session['user_region'] = current_user.user_region
    flash(f'Welcome back, { fname }!')
        
    return redirect('/')
    # do I need to pass current session data in here to use as props in Garden component?


@app.route('/api/register', methods=['POST', 'GET'])
def register():
    """Create user, add to the database."""

    #ISSUES: error with hash_password
    # "TOO MANY REDIRECTS"

    email = request.form.get('email')
    fname = request.form.get('fname')
    user_region = request.form.get('user_region')
    password = request.form.get('password')
    #confirm_password = request.form.get('confirm_password')
    #password_hash = hash_password(password)

    #if password != confirm_password:
        #flash("Passwords do not match, please try again.")
        #return redirect('/api/register')
    #elif email is None or password is None:
        #flash('Invalid email or password, please try again.')
        #return redirect('/api/register')
    #elif User.query.filter(User.email == email).first() is not None:
        #flash('Email entered is already registered, please try again.')
        #return redirect('/api/register')
    #else:
    
    new_user = User(email=email, fname=fname, user_region=user_region, password=password)
    db.session.add(new_user)
    db.session.commit()

    # save user_id, user_region, and first name to session
    session['user_id'] = new_user.user_id
    session['user_region'] = new_user.user_region
    session['fname'] = new_user.fname
    
    flash(f"Welcome, { fname }!")

    return redirect('/')
    # how to pass session data to this url ?
    # session data is set as a cookie in the http header as part of the http response
    # flash puts message in buffer so you can pull them out, it won't appear 
    # in browser unless you explicitly do "getflashmessages" MAYBE

@app.route('/logout')
def logout():
    """Log user out, clear session. Redirect to homepage."""

    session.clear()

    return redirect('/')

@app.route('/dashboard/<user_id>')
def dashboard():
    """Display user dashboard."""

    


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
    garden_plants = crud.get_garden_plants(user_id)

    return jsonify({'garden plants': garden_plants})


# @app.route('/api/add-to-garden', methods=['POST'])
# def add_to_garden(user_id, plant_id):
#     """Add a new plant to a user's garden."""

#     user_id = session.get('user_id')
#     plant_id = request.json('plant_id')  # in POST request from addToGarden button
#     # query for plant common name using plant_id for flash message below

#     # query for user garden_id using user_id -- change to join
#     usergarden = UserGarden.query.filter(UserGarden.user_id == user_id).first()
#     garden_id = usergarden.usergarden_id
#     new_garden_plant = Garden(garden_id=garden_id, plant_id=plant_id)
#     db.session.add(new_garden_plant)
#     db.session.commit()

#     # idea: randomly choose phrase to put at beginning of flash message
#     flash("{common_name} has been added to your garden!")

#     return jsonify({'success': True})

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