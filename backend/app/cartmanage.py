from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import User, Shopkeeper, SearchHistory, Shop, Medicine, Wishlist,Bookmark,CartItem
from . import db
from functools import wraps
from sqlalchemy import func
from app.routes import user_required,shopkeeper_required


cart_blueprint = Blueprint('cart', __name__)

@cart_blueprint.route('/cart-items', methods=['GET'])
@jwt_required()
@user_required
def view_cart():
    """View items in the current user's cart."""
    current_user_id = get_jwt_identity()['id']
    cart_items = CartItem.get_cart_items(current_user_id)
    items = [item.to_dict() for item in cart_items]
    return jsonify({'cart': items}), 200


@cart_blueprint.route('/cart-items/add', methods=['POST'])
@jwt_required()
@user_required
def add_cart_item():
    """Add an item to the cart."""
    data = request.json
    current_user_id = get_jwt_identity()['id']
    medicine_id = data.get('medicine_id')
    quantity = data.get('quantity', 1)

    # Fetch the medicine to get its price
    medicine = Medicine.query.get(medicine_id)
    if not medicine:
        return jsonify({'error': 'Medicine not found'}), 404

    price_per_unit = medicine.price
    CartItem.add_item(current_user_id, medicine_id, quantity, price_per_unit)

    return jsonify({'message': 'Item added to cart successfully'}), 201


@cart_blueprint.route('/cart-items/remove', methods=['DELETE'])
@jwt_required()
@user_required
def remove_cart_item():
    """Remove an item from the cart."""
    data = request.json
    current_user_id = get_jwt_identity()['id']
    medicine_id = data.get('medicine_id')

    CartItem.remove_item(current_user_id, medicine_id)

    return jsonify({'message': 'Item removed from cart successfully'}), 200


@cart_blueprint.route('/cart-items/increment', methods=['PUT'])
@jwt_required()
@user_required
def increment_cart_item():
    """Increment the quantity of a cart item."""
    data = request.json
    current_user_id = get_jwt_identity()['id']
    medicine_id = data.get('medicine_id')

    CartItem.plus_item(current_user_id, medicine_id, quantity=1)

    return jsonify({'message': 'Item quantity increased successfully'}), 200


@cart_blueprint.route('/cart-items/decrement', methods=['PUT'])
@jwt_required()
@user_required
def decrement_cart_item():
    """Decrement the quantity of a cart item."""
    data = request.json
    current_user_id = get_jwt_identity()['id']
    medicine_id = data.get('medicine_id')

    # Ensure that the item quantity is not going below 1
    cart_item = CartItem.query.filter_by(user_id=current_user_id, medicine_id=medicine_id).first()
    if cart_item and cart_item.quantity > 1:
        CartItem.minus_item(current_user_id, medicine_id, quantity=1)
        return jsonify({'message': 'Item quantity decreased successfully'}), 200
    else:
        return jsonify({'error': 'Cannot decrement item quantity below 1'}), 400
    

@cart_blueprint.route('/cart-items/<int:medicine_id>', methods=['GET'])
@jwt_required()
@user_required
def get_cart_item(medicine_id):
    user_id=get_jwt_identity()['id']
    cart_item = CartItem.query.filter_by(user_id=user_id, medicine_id=medicine_id).first()
    if cart_item:
        return jsonify({'quantity': cart_item.quantity}), 200
    return jsonify({'quantity': 0}), 200
