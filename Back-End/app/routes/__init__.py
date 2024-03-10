from flask import Blueprint

auth_bp = Blueprint('auth', __name__)
user_bp = Blueprint('user', __name__)
device_bp = Blueprint('device', __name__)
order_bp = Blueprint('order', __name__)


from . import auth, user, device, order