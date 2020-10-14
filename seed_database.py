from flask_sqlalchemy import SQLAlchemy

import os
import json

import crud
#import model
from model import Plant, User, db, connect_to_db
import server
from parsing import parse_file

os.system('dropdb plantsdb')
os.system('createdb plantsdb')

connect_to_db(server.app)
db.create_all()

# to get parsing.py data into table, use SQLAlchemy
import pdb
def load_plants():
    """Loads plants from plants into database."""

    for d in parse_file('pollinator-plants.txt'):
        if d.get('notes') == None:
            pdb.set_trace()
        #print(d['common_name'])
        plant = Plant(
            region=d['region'],
            plant_type=d['plant_type'],
            bloom_period=d['bloom_period'],
            common_name=d['common_name'],
            scientific_name=d['scientific_name'],
            life_cycle=d['life_cycle'],
            flower_color=d['flower_color'],
            max_height=d['max_height'],
            water_needs=d['water_needs'],
            notes=d['notes'],
        )

        #print(plant)
        db.session.add(plant)

    db.session.commit()

load_plants()

#def load_users():
    #"""Load users into database."""

    # necessary? create_user in crud.py

    
if __name__ == '__main__':
    from server import app

    connect_to_db(app)
