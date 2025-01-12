import random
from . import auth_bp
from flask import jsonify, request
from .. import mongo
from .. import app
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash, check_password_hash

mail = Mail(app)


@auth_bp.route('/forgotPassword', methods=['POST', 'GET'])
def forgotPassword():
    data = request.json  # Assume the frontend submits the email address
    email = data.get('email')

    user_dict = {"email": email}
    random_new_secret = ''.join(random.choices('0123456789', k=8))
    res = mongo.db.user_collection.find_one(user_dict)

    if res:
        # change this user's secret
        res = mongo.db.user_collection.update_one({"email": email},
                                                  {"$set": {"password": generate_password_hash(random_new_secret)}})
        res = mongo.db.user_collection.find_one(user_dict)

        # Send user's secret to this email
        msg = Message("This is your new password (E-waste).", sender='your_email@example.com', recipients=[email])
        msg.body = random_new_secret

        mail.send(msg)

        return jsonify({'status': 'successful', 'message': 'Password send to this email'})

    else:
        # Invalid credentials, return an error response
        return jsonify({'status': 'error', 'message': 'This email has not been registered'}), 401


@auth_bp.route('/resetPassword', methods=['POST'])
def resetPassword():
    # Assume the frontend submits the email address and new password
    data = request.json
    email = data.get('email')
    new_password = data.get('newPassword')

    user_dict = {"email": email}
    res = mongo.db.user_collection.find_one(user_dict)
    if res:
        # change this user's password
        res = mongo.db.user_collection.update_one({"email": email},
                                                  {"$set": {"password": generate_password_hash(new_password)}})

        return jsonify({'status': 'successful', 'message': 'Password has benn reset.'})
    else:
        # Invalid credentials, return an error response
        return jsonify({'status': 'error', 'message': 'This email has not been registered'}), 401
