from model import db, User
#also import classes from model.py

# functions to add stuff to the db

def create_user(fname, email, password, zipcode):

    user = User(fname=fname, email=email, password=password, zipcode=zipcode)

    db.session.add(user)
    db.session.commit()

    return user


if __name__ == '__main__':
    from server import app
    #connect_to_db(app)