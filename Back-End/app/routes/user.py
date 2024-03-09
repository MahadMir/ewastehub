from . import user_bp
from flask import jsonify, request
from .. import mongo
from flask_pymongo import ObjectId
from bson import ObjectId

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
        cursor = mongo.db.user_collection.find()
        data = [convert_document(document) for document in cursor]
        data = [x for x in data if x["role"] == "customer"]
        if data:
            return jsonify(data)
    except Exception as e:
        return f'Error fetching data: {e}'
    

@user_bp.route('/users/<user_id>', methods=['GET'])
def get_user_details(user_id):
    try:
        cursor = mongo.db.user_collection.find()
        data = [convert_document(document) for document in cursor]
        data = [x for x in data if x["user_id"] == user_id]
        if data:
            return jsonify(data)
    except Exception as e:
        return f'Error fetching data: {e}'


@user_bp.route('/users/<user_id>/edit', methods=['PUT'])
def edit_user(user_id):
    try:
        data = request.get_json()
        user_dict = {}
        for k, v in data.items():
            user_dict[k] = v

        idToFind = ObjectId(user_dict["_id"])

        query = {'_id': idToFind}
        data.pop('_id', None)

        res = mongo.db.user_collection.update_one(query, {'$set': data})
        
        if res.modified_count > 0:
            result = {f'message': 'User {user_id} processed successfully', 'data': user_dict}
            return jsonify(result)
        else:
            return jsonify({'error': 'Item not found or no changes made'}), 404

    except Exception as e:
        return f'Error: {e}'
    

@user_bp.route('/users/<user_id>/delete', methods=['POST'])
def delete_user(user_id):
    pass


