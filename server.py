from flask import Flask, render_template, request, flash, session, redirect, jsonify
from model import connect_to_db

app = Flask(__name__)

@app.route('/')
def index():
    """View homepage."""
    return render_template('main.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')