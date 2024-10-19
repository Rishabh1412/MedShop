from . import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())  

    # Relationships
    locations = db.relationship('UserDeliveryLocation', backref='user_locations', lazy=True)
    search_history = db.relationship('SearchHistory', backref='user_history', lazy=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Shopkeeper(db.Model):
    __tablename__ = 'shopkeepers'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # Relationship: One-to-many with shops
    shop = db.relationship('Shop', backref='shopkeeper', lazy=True, uselist=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Shop(db.Model):
    __tablename__ = 'shops'
    id = db.Column(db.Integer, primary_key=True)
    shop_name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    pincode = db.Column(db.String(10), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Float, default=0)
    image = db.Column(db.String(255), nullable=True)

    shopkeeper_id = db.Column(db.Integer, db.ForeignKey('shopkeepers.id'), nullable=False)
    medicines = db.relationship('Medicine', backref='shop', lazy=True)  # Relationship with medicines
    orders = db.relationship('Order', backref='shop', lazy=True)  # Relationship with orders

    def to_dict(self):
        return {
            'id': self.id,
            'shop_name': self.shop_name,
            'location': self.location,
            'pincode': self.pincode,
            'city': self.city,
            'state': self.state,
            'rating': self.rating,
            'image': self.image
        }
    
    


class Medicine(db.Model):
    __tablename__ = 'medicines'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Float, default=0)
    description=db.Column(db.String,nullable=True)
    no_of_times_ordered = db.Column(db.Integer, default=0)
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)
    image = db.Column(db.String(255), nullable=True)
    price=db.Column(db.Integer,default=0)
    # Relationship with order items
    order_items = db.relationship('OrderItem', backref='medicine', lazy=True)


class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # User who placed the order
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)  # Shop fulfilling the order
    order_status = db.Column(db.String(50), nullable=False, default='pending')  # e.g., pending, completed, canceled
    ordered_at = db.Column(db.DateTime(timezone=True), default=func.now(), nullable=False)  # Timestamp
    total_amount = db.Column(db.Float, nullable=False, default=0)  # Total order amount

    # Relationship with order items
    order_items = db.relationship('OrderItem', backref='order', lazy=True)


class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    medicine_id = db.Column(db.Integer, db.ForeignKey('medicines.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price_per_unit = db.Column(db.Float, nullable=False)  # The price at the time of order
    total_price = db.Column(db.Float, nullable=False)  # quantity * price_per_unit


class UserDeliveryLocation(db.Model):
    __tablename__ = 'user_delivery_locations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    pincode = db.Column(db.String(10), nullable=False)

    # Relationship with users
    user = db.relationship('User', backref='delivery_locations',lazy=True)


class SearchHistory(db.Model):
    __tablename__ = 'search_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    search_query = db.Column(db.String(255), nullable=False)
    searched_at = db.Column(db.DateTime(timezone=True), default=func.now(), nullable=False)

    # Relationship with users
    user = db.relationship('User', backref='search_history_entries')