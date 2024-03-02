from jsonschema import validate, ValidationError

def get_order_collection_schema():
    OrderCollectionSchema = {
        'validator': {
            '$jsonSchema': {
                'bsonType': 'object',
                'properties': {
                    'orderID': {'bsonType': 'string'},
                    'userID': {'bsonType': 'string'},  # Link to the user placing the order
                    'deviceID': {'bsonType': 'string'},  # Device being ordered
                    'orderStatus': {'bsonType': 'string'},
                    'orderDate': {'bsonType': 'date'},
                    'details': {
                        'bsonType': 'object',
                        'properties': {
                            'price': {'bsonType': 'double'},
                            'description':{'bsonType':'string'},
                            'shippingAddress': {'bsonType': 'string'}
                        },
                        'required': ['price','description']
                    }
                },
                'required': ['orderID', 'userID', 'deviceID', 'orderStatus', 'orderDate', 'details']
            }
        }
    }
    return OrderCollectionSchema

def get_user_collection_schema():
    userCollectionSchema = {
        'validator': {
            '$jsonSchema': {
                'bsonType': 'object',
                'properties': {
                    'userID': {'bsonType': 'string'},
                    'userName': {'bsonType': 'string'},
                    'role': {'bsonType': 'string'},
                    'password': {'bsonType': 'string'},
                    'email': {'bsonType': 'string'},
                    'phoneNumber': {'bsonType': 'string'},
                    'isThirdPartyLogin': {'bsonType': 'bool'},
                    'devices': {
                        'bsonType': 'array',
                        'items': {
                            'bsonType': 'object',
                            'properties': {
                                'deviceID': {'bsonType': 'string'},
                                'deviceType': {'bsonType': 'string'},
                                'brand': {'bsonType': 'string'},
                                'deviceName': {'bsonType': 'string'},
                                'price': {'bsonType': 'double'},
                                'deviceRegistrationDate': {'bsonType': 'date'},
                                'category': {'bsonType': 'string'},
                                'status': {'bsonType': 'string'},
                                'qrID': {'bsonType': 'string'},
                                'qrLink': {'bsonType': 'string'},
                                'dataSecurity': {
                                    'bsonType': 'object',
                                    'properties': {
                                        'dataDetailID': {'bsonType': 'string'},
                                        'dataLink': {'bsonType': 'string'},
                                        'dataWipeConsent': {'bsonType': 'bool'},
                                        'dataRetrievalRequests': {'bsonType': 'string'}
                                    },
                                    'required': ['dataWipeConsent', 'dataRetrievalRequests']
                                }
                            },
                            'required': ['deviceID', 'deviceType', 'deviceName', 'price', 'category', 'status', 'dataSecurity']
                        }
                    },
                },
                'required': ['userID', 'userName', 'password', 'email', 'role', 'phoneNumber', 'isThirdPartyLogin', 'devices']
            }
        }
    }
    return userCollectionSchema
