from flask import Blueprint, request, jsonify
from .models import db, UserDeliveryLocation, Order, CartItem, OrderItem, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.routes import user_required
from sqlalchemy.exc import SQLAlchemyError

orders_blueprint = Blueprint('orders', __name__)

# Get all addresses for a user
@orders_blueprint.route('/user-addresses', methods=['GET'])
@jwt_required()
@user_required
def get_user_addresses():
    user_id = get_jwt_identity()['id']
    addresses = UserDeliveryLocation.get_user_all_addresses(user_id)
    return jsonify({'addresses': [address.to_dict() for address in addresses]}), 200

# Place an order

@orders_blueprint.route('/placing-order', methods=['POST'])
@jwt_required()
@user_required
def placing_order():
    try:
        user_id = get_jwt_identity()['id']
        data = request.get_json()
        address_id = data.get('address_id')
        shop_id = data.get('shop_id')  # Retrieve shop_id from the request data

        if not address_id:
            return jsonify({'error': 'Address is required'}), 400

        if not shop_id:
            return jsonify({'error': 'Shop is required'}), 400  # Ensure shop_id is provided

        address = UserDeliveryLocation.query.filter_by(id=address_id, user_id=user_id).first()
        if not address:
            return jsonify({'error': 'Invalid address for the user'}), 400

        cart_items = CartItem.get_cart_items(user_id)
        if not cart_items:
            return jsonify({'error': 'Cart is empty'}), 400

        total_amount = sum(item.total_price for item in cart_items)
        order = Order.place_order(user_id, address_id, total_amount, shop_id)  # Pass shop_id to place_order

        OrderItem.add_order_items(order.id, cart_items)

        CartItem.query.filter_by(user_id=user_id).delete()
        db.session.commit()

        return jsonify({'message': 'Order placed successfully!', 'order_id': order.id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500




# Add a new delivery location
@orders_blueprint.route('/add-delivery-location', methods=['POST'])
@jwt_required()
@user_required
def add_delivery_location():
    data = request.get_json()
    user_id = get_jwt_identity()['id']
    address = data.get('address')
    city = data.get('city')
    state = data.get('state')
    pincode = data.get('pincode')
    phone = data.get('phone_number')

    # Create a new delivery location entry
    delivery_location = UserDeliveryLocation(
        user_id=user_id,
        address=address,
        city=city,
        state=state,
        pincode=pincode,
        phone=phone
    )

    db.session.add(delivery_location)
    db.session.commit()

    return jsonify({"message": "Delivery location added successfully!"}), 201

