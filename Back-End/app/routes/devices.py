from . import user_bp
from flask import jsonify, request
from .. import mongo
from bson import ObjectId
import sys
from jsonschema import validate, ValidationError
from ..schemas import get_user_collection_schema

def check_valid_schema(document, schema):
    try:
        validate(document, schema)
        return True
    except:
        return False

def convert_document(document):
    """Convert ObjectId to string for JSON serialization."""
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document


@user_bp.route('/devices', methods=['GET'])
def users():
    try:
        cursor = mongo.db.userCollection.find()
        data = [convert_document(document) for document in cursor]
        if data:
            return jsonify(data)
    except Exception as e:
        return f'Error fetching data: {e}'

@user_bp.route('/users/new', methods=['POST'])
def create_user():
    try:
        data = request.json
        valid_schema = check_valid_schema(data.items, get_user_collection_schema())
        if valid_schema == True:
            mongo.db.userCollection.insert_one(data)
            return "passed", 200
        else:
            return "failed", 400
    except Exception as e:
        return f'Error: {e}'

@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user_details():
    pass


@user_bp.route('/users/<int:user_id>/edit', methods=['PUT'])
def edit_user(user_id):
    pass

@user_bp.route('/users/<int:user_id>/delete', methods=['POST'])
def delete_user(user_id):
    pass

@user_bp.route('/users/<int:user_id>/devices', methods=['GET'])
def get_user_devices():
    pass

@user_bp.route('/users/<int:user_id>/devices/new', methods=['POST'])
def create_user_device():
    pass

@user_bp.route('/users/<int:user_id>/devices/<int:device_id>/edit', methods=['PUT'])
def edit_user_devices():
    pass

@user_bp.route('/users/<int:user_id>/devices/<int:device_id>/delete', methods=['POST'])
def delete_device_user():
    pass

