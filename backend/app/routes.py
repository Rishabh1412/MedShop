from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import User, Shopkeeper, SearchHistory, Shop, Medicine, Wishlist,Bookmark
from .auth import register_user, login_user, register_shopkeeper, login_shopkeeper
from . import db
from functools import wraps
from sqlalchemy import func

# Define a blueprint
main_blueprint = Blueprint('main', __name__)
search_blueprint = Blueprint('search', __name__)

# Search suggestions route
@search_blueprint.route('/search-suggestions', methods=['GET'])
@jwt_required()
def search_suggestions():
    query = request.args.get('query', '')
    if not query:
        return jsonify({'suggestions': []}), 200

    medicines = Medicine.query.filter(Medicine.name.ilike(f'%{query}%')).all()
    shops = Shop.query.filter(Shop.shop_name.ilike(f'%{query}%')).all()

    suggestions = [
        {'name': med.name, 'type': 'medicine'} for med in medicines
    ] + [
        {'name': shop.shop_name, 'type': 'shop'} for shop in shops
    ]

    return jsonify({'suggestions': suggestions}), 200


# Route to get the last 5 search history items
@search_blueprint.route('/search-history', methods=['GET'])
@jwt_required()
def search_history():
    try:
        current_user_id = get_jwt_identity()['id']
        history_entries = SearchHistory.query.filter_by(user_id=current_user_id).order_by(SearchHistory.searched_at.desc()).limit(5).all()

        if not history_entries:
            return jsonify({'message': 'No search history found.'}), 404

        history = [{'search_query': entry.search_query} for entry in history_entries]

        return jsonify({'history': history}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Perform search route
@search_blueprint.route('/perform-search', methods=['POST'])
@jwt_required()
def perform_search():
    try:
        current_user_id = get_jwt_identity()['id']
        search_query = request.json.get('search_query', '')

        if not search_query:
            return jsonify({'message': 'Search query is required'}), 400

        # Attempt to save the search history
        new_search = SearchHistory(user_id=current_user_id, search_query=search_query)
        db.session.add(new_search)
        db.session.commit()

        return jsonify({'message': 'Search performed successfully'}), 200

    except Exception as e:
        # Log the error and return a user-friendly message
        db.session.rollback()  # Ensure any partial changes are rolled back
        return jsonify({'error': 'An error occurred while processing the search', 'details': str(e)}), 500



# Custom Decorators for Role-Based Access
def user_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        if current_user['role'] != 'user':
            return jsonify({'message': 'Access restricted to users only'}), 403
        return fn(*args, **kwargs)
    return wrapper

def shopkeeper_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user = get_jwt_identity()
        if current_user['role'] != 'shopkeeper':
            return jsonify({'message': 'Access restricted to shopkeepers only'}), 403
        return fn(*args, **kwargs)
    return wrapper

# User Registration
@main_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    return register_user(data)

# Shopkeeper Registration
@main_blueprint.route('/register-shopkeeper', methods=['POST'])
def register_shopkeeper_route():
    data = request.get_json()
    return register_shopkeeper(data)

# User Login
@main_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return login_user(data)

# Shopkeeper Login
@main_blueprint.route('/login-shopkeeper', methods=['POST'])
def login_shopkeeper_route():
    data = request.get_json()
    return login_shopkeeper(data)

# Common Home Route (Accessible by both User and Shopkeeper)
@main_blueprint.route('/home', methods=['GET'])
@jwt_required()
def home():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Hi there, {current_user["username"]}!'}), 200

# Logout Route
@main_blueprint.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({"message": "Logout successful"})
    return response, 200



# Get Current User Info (for both user and shopkeeper)
@main_blueprint.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(id=current_user['id']).first()
    
    if user:
        return jsonify({
            'username': user.username,
            'email': user.email,
            'user_type': 'user'
        }), 200
    
    shopkeeper = Shopkeeper.query.filter_by(id=current_user['id']).first()
    
    if shopkeeper:
        return jsonify({
            'username': shopkeeper.username,
            'email': shopkeeper.email,
            'user_type': 'shopkeeper'
        }), 200
        
    return jsonify({'message': 'User not found'}), 404



# Update User Password (Restricted to Users)
@main_blueprint.route('/user', methods=['PUT'])
@jwt_required()
@user_required
def update_user():
    data = request.get_json()
    new_password = data.get('password')
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    if user:
        user.set_password(new_password)
        db.session.commit()
        return jsonify({'message': 'Password updated successfully'}), 200
    return jsonify({'message': 'User not found'}), 404


# Delete User (Restricted to Users)
@main_blueprint.route('/user', methods=['DELETE'])
@jwt_required()
@user_required
def delete_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user['username']).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'}), 200
    return jsonify({'message': 'User not found'}), 404


# Get medicines for the shop
@main_blueprint.route('/shop/medicines', methods=['GET'])
@jwt_required()
def get_medicines():
    current_user = get_jwt_identity()
    shop_id = current_user.get('shop_id')

    if not shop_id:
        return jsonify({'message': 'Shop ID not found in token'}), 403

    try:
        medicines = Medicine.query.filter_by(shop_id=shop_id).all()

        if not medicines:
            return jsonify({'medicines': []}), 200

        medicine_list = [{'id': med.id, 'name': med.name, 'orderCount': med.no_of_times_ordered,
                          'quantity': med.quantity, 'price': med.price} for med in medicines]

        return jsonify({'medicines': medicine_list}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main_blueprint.route('/shop', methods=['GET'])
@jwt_required()
def get_shop_by_id():
    shop_id = get_jwt_identity()['id']
    
    
    shop = Shop.query.get(shop_id)  
    if not shop:
        return jsonify({'message': 'Shop not found'}), 404  
    shop_data = {
        'id': shop.id,
        'shop_name': shop.shop_name,
        'location': shop.location,
        'pincode': shop.pincode,
        'city': shop.city,
        'state': shop.state,
        'rating': shop.rating,
        'image': shop.image,
        'shopkeeper_id': shop.shopkeeper_id  # Include shopkeeper ID if needed
    }

    return jsonify({'shop': shop_data}), 200

# Add medicine for the shop
@main_blueprint.route('/shop/medicines', methods=['POST'])
@jwt_required()
def add_medicine():
    current_user = get_jwt_identity()
    shop_id = current_user.get('shop_id')

    if not shop_id:
        return jsonify({'message': 'Shop ID not found in token'}), 403

    data = request.get_json()
    if not data:
        return jsonify({'message': 'No data provided'}), 400

    name = data.get('name')
    quantity = data.get('quantity')
    description = data.get('description')
    image = data.get('image')
    price=data.get('price')

    if not name or quantity is None:  # Check if quantity is None
        return jsonify({'message': 'Name and quantity are required'}), 400

    try:
        new_medicine = Medicine(
            name=name,
            quantity=quantity,
            description=description,
            image=image,
            price=price,
            shop_id=shop_id
        )
        db.session.add(new_medicine)
        db.session.commit()

        return jsonify({
            'medicine': {
                'id': new_medicine.id,
                'name': new_medicine.name,
                'quantity': new_medicine.quantity,
                'description': new_medicine.description,
                'image': new_medicine.image
            }
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Delete specific medicine by ID
@main_blueprint.route('/shop/medicines/<int:medicine_id>', methods=['DELETE'])
@jwt_required()
@shopkeeper_required
def delete_medicine(medicine_id):
    current_user = get_jwt_identity()
    shop_id = current_user.get('shop_id')

    if not shop_id:
        return jsonify({'message': 'Shop ID not found in token'}), 403

    try:
        medicine = Medicine.query.filter_by(id=medicine_id, shop_id=shop_id).first()
        if not medicine:
            return jsonify({'message': 'Medicine not found'}), 404
        
        db.session.delete(medicine)
        db.session.commit()
        return jsonify({'message':'Medicine deleted successfully'}), 204
    except Exception as e:
        return jsonify({'error': str(e)}), 500



# Update the quantity of a specific medicine
@main_blueprint.route('/shop/medicines/<int:medicine_id>', methods=['PUT'])
@jwt_required()
@shopkeeper_required
def update_medicine_stock(medicine_id):
    current_user = get_jwt_identity()
    shop_id = current_user.get('shop_id')

    if not shop_id:
        return jsonify({'message': 'Shop ID not found in token'}), 403

    data = request.get_json()
    new_quantity = data.get('quantity')

    if new_quantity is None:
        return jsonify({'message': 'Quantity is required'}), 400

    try:
        # Find the medicine in the shop's inventory
        medicine = Medicine.query.filter_by(id=medicine_id, shop_id=shop_id).first()

        if not medicine:
            return jsonify({'message': 'Medicine not found'}), 404

        # Update the medicine's quantity
        medicine.quantity = new_quantity
        db.session.commit()

        return jsonify({
            'message': 'Medicine quantity updated successfully',
            'medicine': {
                'id': medicine.id,
                'name': medicine.name,
                'quantity': medicine.quantity,
                'price': medicine.price,
                'description': medicine.description
            }
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main_blueprint.route('/shops', methods=['GET'])
@jwt_required()
@user_required
def get_all_shop():
    user_id=get_jwt_identity()['id']
    try:
        shops=[]
        all_shops = Shop.query.order_by(func.random()).all()
        wishlisted_shop_ids = (
            db.session.query(Bookmark.shop_id)
            .filter_by(user_id=user_id)
            .all()
        )
        
        # Convert list of tuples to a set of shop IDs for quick lookup
        wishlisted_shop_ids = set([shop_id for (shop_id,) in wishlisted_shop_ids])

        # Add wishlisted property to each shop
        for shop in all_shops:
            shop_dict = shop.to_dict()
            shop_dict['wishlisted'] = 1 if shop.id in wishlisted_shop_ids else 0
            shops.append(shop_dict)

        return jsonify(shops), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main_blueprint.route('/display-meds',methods=['GET'])
@jwt_required()
@user_required
def display_meds():
    try:
        random_meds = Medicine.query.order_by(func.random()).limit(10).all()
        
        # Manually convert each medicine to a dictionary
        meds = []
        for med in random_meds:
            med_dict = {
                'id': med.id,
                'name': med.name,
                'description': med.description,
                'quantity':med.quantity,
                'rating':med.rating,
                'ordered':med.no_of_times_ordered,
                'price': med.price,
                
            }
            meds.append(med_dict)

        return jsonify(meds), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@main_blueprint.route('/get-shop-data', methods=['GET'])
@jwt_required()
@user_required
def get_shop_data():
    try:
        shop_name = request.args.get('shop_name')
        if not shop_name:
            return jsonify({'message': 'Shop name is required'}), 400

        shop = Shop.query.filter_by(shop_name=shop_name).first()
        if not shop:
            return jsonify({'message': 'Shop not found'}), 404
        
        wishlisted = Bookmark.query.filter_by(user_id=get_jwt_identity()['id'], shop_id=shop.id).first() is not None

        medicines = Medicine.query.filter_by(shop_id=shop.id).all()
        medicines_list = [
            {
                'id': med.id,
                'name': med.name,
                'quantity': med.quantity,
                'price': med.price,
                'description': med.description,
                'image': med.image
            }
            for med in medicines
        ]

        # Construct the response with shop data and associated medicines
        shop_data = {
            'shop_id': shop.id,
            'shop_name': shop.shop_name,
            'location': shop.location,
            'pincode': shop.pincode,
            'city': shop.city,
            'state': shop.state,
            'rating': shop.rating,
            'image': shop.image,
            'wishlisted':wishlisted,
            'medicines': medicines_list
        }

        return jsonify({'shop_data': shop_data}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@main_blueprint.route('/toggle-wishlist', methods=['POST'])
@jwt_required()
@user_required
def toggle_wishlist():
    user_id = get_jwt_identity()['id']
    data = request.get_json()
    shop_id = data.get('shop_id')
    wishlisted = data.get('wishlisted')

    try:
        wishlist_entry = Bookmark.query.filter_by(user_id=user_id, shop_id=shop_id).first()

        if wishlisted:
            if not wishlist_entry:
                # Add to wishlist
                new_entry = Bookmark(user_id=user_id, shop_id=shop_id)
                db.session.add(new_entry)
                print("Shop added to wishlist.")
            else:
                print("Shop is already in the wishlist.")
        else:
            if wishlist_entry:
                # Remove from wishlist
                db.session.delete(wishlist_entry)
                print("Shop removed from wishlist.")
            else:
                print("Shop not found in wishlist, nothing to delete.")

        db.session.commit()
        return jsonify({"message": "Wishlist updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Roll back the session in case of error
        print(f"Error updating wishlist: {str(e)}")
        return jsonify({"error": "An error occurred while updating the wishlist."}), 500


@main_blueprint.route('/fetchdata', methods=['GET'])
@jwt_required()
@user_required
def fetch_data():
    search_term = request.args.get('query', '').strip()

    results = {
        "shops": [],
        "medicines": [],
    }

    if search_term:  
        results['shops'] = [shop.to_dict() for shop in Shop.search_by_name(search_term)]  # Convert to dict
        results['medicines'] = [medicine.to_dict() for medicine in Medicine.search_by_name(search_term)]  # Convert to dict
    else:
        return jsonify({"error": "Search term cannot be empty"}), 400  

    return jsonify(results) 