"""Server for pollinator plants app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify
#from markupsafe import escape
from flask_login import LoginManager
from model import db, connect_to_db, User, Plant, Garden, UserGarden
import crud
import security

app = Flask(__name__)
app.secret_key = 'APP_SECRET_KEY'
login_manager = LoginManager()
login_manager.init_app(app)


@app.route('/')
def index():
    """View homepage."""

    return render_template('main.html', session=session)

@login_manager.user_loader
def load_user(user_id):
    """Given user_id, return associated User object."""

    return crud.get_user_by_id(user_id)

@app.route('/login', methods=['POST', 'GET'])
def login():
    """Log user into app. If already logged in, redirect to dashboard.
    
    If email not registered, redirect to login. If incorrect password,
    redirect to login. If correct, set current user to session, and 
    redirect to user dashboard."""

    email = request.form.get('email')
    password = request.form.get('password')

    current_user = User.query.filter(User.email == email).first

    if session.get('user_id') is not None:
        flash("You're already logged in.")
        return redirect('/dashboard')

    if not current_user:
        flash("Email not registered, please try again.")
        return redirect('/login')

    if current_user.password != password:
        flash("Incorrect password, please try again.")
        return redirect('/login')

    session['fname'] = current_user.fname
    session['user_id'] = current_user.user_id
    session['user_region'] = current_user.user_region
    flash(f'Welcome back, { fname }!')
        
    return redirect('/dashboard')


@app.route('/api/register', methods=['POST'])
def register():
    """Create user, add to the database."""

    email = request.json.get('email')
    fname = request.json.get('fname')
    user_region = request.json.get('user_region')
    password = request.json.get('password')
    if email is None or password is None:
        flash('Invalid email or password, please try again.')
        return redirect('/api/register')
    if User.query.filter(User.email == email).first() is not None:
        flash('Email entered is already registered, please try again.')
        return redirect('/api/register')
    
    new_user = User(email=email, fname=fname, password=password, region=region)
    new_user.hash_password(password)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.user_id
    session['user_region'] = new_user.user_region
    session['fname'] = new_user.fname
    flash(f"Welcome, { fname }!")

    return redirect('/dashboard')


@app.route('/logout')
def logout():
    """Log user out, clear session. Redirect to homepage."""

    session.clear()
    return redirect('/')


# @app.route('/dashboard')
# def dashboard():
#     """Shows logged in user dashboard."""

#     if session.get('user_id') is not None:
#         user_id = session.get('user_id')
#         query for garden



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
        'img_url': plant.image_url})

    return jsonify({'plants': regional_plants_list})


@app.route('/add-to-garden', methods=['POST'])
def add_to_garden(garden_id, plant_id):
    """Add a new garden plant to the database."""

    garden_id = request.json('garden_id')
    plant_id: request.json('plant_id')

    new_garden_plant = Garden(garden_id=garden_id, plant_id=plant_id)
    db.session.add(new_garden_plant)
    db.session.commit()

    return jsonify({'success': True})


@app.route('/api/garden/<user_id>')
def get_garden_plants(user_id):
    """Return all garden plants for a particular user."""

    user_id = session.get('user_id')
    garden_plants = crud.get_garden_plants(user_id)

    return jsonify({'garden plants': garden_plants})


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')