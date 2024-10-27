from . import db
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash
import uuid 


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

    wishlist = db.relationship('Wishlist', backref='owner', lazy=True)
    bookmarks = db.relationship('Bookmark', backref='userbook', lazy=True)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    
    def get_wishlist(self):
        return [item.medicine.to_dict() for item in self.wishlist]
    
    def get_bookmarks(self):
        return [item.shop.to_dict() for item in self.bookmarks]


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

    @staticmethod
    def search_by_name(name):
        return Shop.query.filter(Shop.shop_name.ilike(f"%{name}%")).all()
    

    def to_dict(self):
        return {
            'id': self.id,
            'type':"shop",
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

    @staticmethod
    def search_by_name(name):
        return Medicine.query.filter(Medicine.name.ilike(f"%{name}%")).all()

    def to_dict(self):
        return {
            'id': self.id,
            'type':"medicine",
            'name': self.name,
            'quantity': self.quantity,
            'rating': self.rating,
            'description': self.description,
            'no_of_times_ordered': self.no_of_times_ordered,
            'price': self.price,
            'shop_id': self.shop_id,
            'image': self.image
        }
    

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

class Wishlist(db.Model):
    __tablename__ = 'wishlists'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # User who added the medicine to the wishlist
    medicine_id = db.Column(db.Integer, db.ForeignKey('medicines.id'), nullable=False)  # Medicine in the wishlist

    # Relationships
    user = db.relationship('User', backref='user_wishlist', lazy=True)
    medicine = db.relationship('Medicine', backref='wishlisted_by', lazy=True)


class Bookmark(db.Model):
    __tablename__ = 'bookmarks'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # User who bookmarked the shop
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), nullable=False)  # Bookmarked shop

    # Relationships
    user = db.relationship('User', backref='user_bookmarks', lazy=True)
    shop = db.relationship('Shop', backref='bookmarked_by', lazy=True)

    @staticmethod
    def add_bookmark(user_id, shop_id):
        bookmark = Bookmark(user_id=user_id, shop_id=shop_id)
        db.session.add(bookmark)
        db.session.commit()

    @staticmethod
    def remove_bookmark(user_id, shop_id):
        Bookmark.query.filter_by(user_id=user_id, shop_id=shop_id).delete()
        db.session.commit()



class CartItem(db.Model):
    __tablename__ = 'cart_items'
    id =  db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # The user who owns the cart
    medicine_id = db.Column(db.Integer, db.ForeignKey('medicines.id'), nullable=False)  # The medicine in the cart
    quantity = db.Column(db.Integer, nullable=False, default=1)  # Quantity of the medicine
    price_per_unit = db.Column(db.Float, nullable=False)  # Price at the time of adding
    total_price = db.Column(db.Float, nullable=False)  # Calculated as quantity * price_per_unit

    user = db.relationship('User', backref='cart_items', lazy=True)
    medicine = db.relationship('Medicine', backref='in_carts', lazy=True)

    @staticmethod
    def add_item(user_id, medicine_id, quantity, price_per_unit):
        # Check if the item already exists in the cart for this user
        cart_item = CartItem.query.filter_by(user_id=user_id, medicine_id=medicine_id).first()
        if cart_item:
            # Update the quantity and total price
            cart_item.quantity += quantity
            cart_item.total_price = cart_item.quantity * cart_item.price_per_unit
        else:
            # Create a new item if it doesn’t exist
            total_price = quantity * price_per_unit
            cart_item = CartItem(
                user_id=user_id,
                medicine_id=medicine_id,
                quantity=quantity,
                price_per_unit=price_per_unit,
                total_price=total_price
            )
            db.session.add(cart_item)
        db.session.commit()

    @staticmethod
    def remove_item(user_id, medicine_id):
        CartItem.query.filter_by(user_id=user_id, medicine_id=medicine_id).delete()
        db.session.commit()

    @staticmethod
    def plus_item(user_id, medicine_id, quantity):
        cart_item = CartItem.query.filter_by(user_id=user_id, medicine_id=medicine_id).first()
        if cart_item:
            cart_item.quantity = cart_item.quantity+1
            cart_item.total_price = quantity * cart_item.price_per_unit
            db.session.commit()
    
    @staticmethod
    def minus_item(user_id, medicine_id, quantity):
        cart_item = CartItem.query.filter_by(user_id=user_id, medicine_id=medicine_id).first()
        if cart_item:
            cart_item.quantity = cart_item.quantity-1
            cart_item.total_price = quantity * cart_item.price_per_unit
            db.session.commit()

    @staticmethod
    def get_cart_items(user_id):
        return CartItem.query.filter_by(user_id=user_id).all()

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'medicine_id': self.medicine_id,
            'quantity': self.quantity,
            'price_per_unit': self.price_per_unit,
            'total_price': self.total_price
        }