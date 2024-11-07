from flask import Blueprint, request, jsonify
from .models import db, UserDeliveryLocation, Order, CartItem, OrderItem, User,Medicine,Shop
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.routes import user_required,shopkeeper_required
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



@orders_blueprint.route('/user/orders', methods=['GET'])
@jwt_required()
@user_required
def get_user_orders():
    user_id = get_jwt_identity()['id']
    orders = Order.query.filter_by(user_id=user_id).all()

    orders_data = []
    for order in orders:
        order_data = {
            'order_id': order.id,
            'order_status': order.order_status,
            'ordered_at': order.ordered_at,
            'total_amount': order.total_amount,
            'items': [
                {
                    'medicine_name': Medicine.query.filter_by(id=item.medicine_id).first().name,
                    'medicine_id': item.medicine_id,
                    'quantity': item.quantity,
                    'price_per_unit': item.price_per_unit,
                    'total_price': item.total_price
                }
                for item in order.order_items
            ]
        }
        orders_data.append(order_data)

    return jsonify({'orders': orders_data}), 200



@orders_blueprint.route('/shop/orders', methods=['GET'])
@jwt_required()
@shopkeeper_required
def get_shop_orders():
    # Get the shopkeeper_id from the JWT token (or the user context)
    shopkeeper_id = get_jwt_identity()['id']
    
    # Fetch the shop_id by the shopkeeper_id
    shop = Shop.query.filter_by(shopkeeper_id=shopkeeper_id).first()
    if not shop:
        return jsonify({'error': 'Shop not found for this shopkeeper'}), 404

    shop_id = shop.id

    # Fetch orders for the shop
    orders = Order.query.filter_by(shop_id=shop_id).all()

    orders_data = []
    for order in orders:
        order_data = {
            'order_id': order.id,
            'order_status': order.order_status,
            'ordered_at': order.ordered_at,
            'total_amount': order.total_amount,
            'items': [
                {
                    'medicine_id': item.medicine_id,
                    'medicine_name': Medicine.query.get(item.medicine_id).name,  
                    'quantity': item.quantity,
                    'price_per_unit': item.price_per_unit,
                    'total_price': item.total_price
                }
                for item in order.order_items
            ]
        }
        orders_data.append(order_data)

    return jsonify({'orders': orders_data}), 200
