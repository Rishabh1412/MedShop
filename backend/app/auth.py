from flask_jwt_extended import create_access_token
from flask import jsonify
from .models import User, Shopkeeper,Shop
from . import db

# Register a new user
def register_user(data):
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists.'}), 400

    new_user = User(username=username, email=email)
    new_user.set_password(password)  # Ensure you're calling set_password correctly
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully.'}), 201

# Register a new shopkeeper
def register_shopkeeper(data):
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    # Shop details
    shop_name = data.get('shop_name')
    location = data.get('location')
    pincode = data.get('pincode')
    city = data.get('city')
    state = data.get('state')

    # Check if the shopkeeper already exists
    if Shopkeeper.query.filter_by(username=username).first():
        return jsonify({'message': 'Shopkeeper already exists.'}), 400

    # Create new shopkeeper
    new_shopkeeper = Shopkeeper(username=username, email=email)
    new_shopkeeper.set_password(password)
    
    # Create new shop associated with this shopkeeper
    new_shop = Shop(
        shop_name=shop_name,
        location=location,
        pincode=pincode,
        city=city,
        state=state,
        shopkeeper=new_shopkeeper
    )
    
    # Add both shopkeeper and shop to the session
    db.session.add(new_shopkeeper)
    db.session.add(new_shop)
    db.session.commit()

    return jsonify({'message': 'Shopkeeper and shop created successfully.'}), 201


# Login as user
def login_user(data):
    username = data.get('username')
    password = data.get('password')

    # Fetch user based on the username
    user = User.query.filter_by(username=username).first()
    
    # Check if user exists and password is correct
    if user and user.check_password(password):
        # Create access token including user's id, username, and role
        access_token = create_access_token(identity={'id': user.id, 'username': user.username, 'role': 'user'})
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401


# Login as shopkeeper
# Shopkeeper Login
def login_shopkeeper(data):
    username = data.get('username')
    password = data.get('password')

    shopkeeper = Shopkeeper.query.filter_by(username=username).first()
    if shopkeeper and shopkeeper.check_password(password):
        # Include shop_id in the token
        access_token = create_access_token(identity={
            'id': shopkeeper.id, 
            'username': shopkeeper.username, 
            'role': 'shopkeeper', 
            'shop_id': shopkeeper.id
        })
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401


