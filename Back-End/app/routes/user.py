from . import user_bp
from flask import jsonify, request
from .. import mongo
from flask_pymongo import ObjectId
from bson import ObjectId
from ..webscraper import itemToBeFound

def convert_document(document):
    """Convert ObjectId to string for JSON serialization."""
    for key, value in document.items():
        if isinstance(value, ObjectId):
            document[key] = str(value)
    return document


@user_bp.route('/users', methods=['GET'])
def users():
    try:
        cursor = mongo.db.user_collection.find()
        data = [convert_document(document) for document in cursor]
        if data:
            return jsonify(data)
    except Exception as e:
        return f'Error fetching data: {e}'


@user_bp.route('/users/new', methods=['POST'])
def create_user():
    try:
        data = request.json
        user_dict = {}
        for k, v in data.items():
            user_dict[k] = v
        res = mongo.db.user_collection.insert_one(user_dict)
        res = mongo.db.user_collection.find_one(user_dict)
        res = convert_document(res)
        return jsonify(res), 200
    except Exception as e:
        return f'Error fetching data: {e}'
    

@user_bp.route('/users/<user_id>', methods=['GET'])
def get_user_details(user_id):
    try:
        userid_dict = {"user_id": user_id}
        res=mongo.db.user_collection.find_one(userid_dict)
        if res != None:
            return jsonify(convert_document(res)), 200
    except Exception as e:
        return f'Error fetching data: {e}'


@user_bp.route('/users/<user_id>/edit', methods=['PUT'])
def edit_user(user_id):
    try:
        data = request.get_json()
        user_dict = {}
        for k, v in data.items():
            user_dict[k] = v

        search_criteria = {'user_id': data.get('user_id')}


        res = mongo.db.user_collection.update_one(search_criteria, {'$set': data})
        
        if res.modified_count > 0:
            return jsonify(user_dict), 200
        else:
            return jsonify({'error': 'Item not found or no changes made'}), 404

    except Exception as e:
        return f'Error: {e}'
    

@user_bp.route('/users/<user_id>/delete', methods=['GET'])
def delete_user(user_id):
    try:
        user_dict = {"user_id": user_id}


        item_to_delete = mongo.db.user_collection.find_one(user_dict)



        if item_to_delete != None:

            res = mongo.db.user_collection.delete_one(user_dict)
            
            if res.deleted_count > 0:
                return jsonify(convert_document(item_to_delete)), 200
        else:
            return jsonify({'error': 'Item not found or no changes made'}), 404

    except Exception as e:
        return f'Error: {e}'
    
@user_bp.route('/users/<user_id>/devices', methods=['GET'])
def get_user_devices(user_id):
    try:
        user_dict = {"user_id": user_id}
        devices_to_find = mongo.db.order_collection.find_one(user_dict)
        if devices_to_find  != None:
            return jsonify(convert_document(devices_to_find)), 200

    except Exception as e:
        return f'Error: {e}', 404
    

@user_bp.route('/scraper/cex/<string:device_name>', methods=['GET'])
def get_device_from_web(device_name):
    try:
        return jsonify(itemToBeFound(device_name))
    except Exception as e:
        return f'Error: {e}', 404

