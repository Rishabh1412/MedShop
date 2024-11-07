from app import app
from app.routes import search_blueprint
from app.cartmanage import cart_blueprint
from app.orders import orders_blueprint
app.register_blueprint(cart_blueprint,url_prefix='/cart')
app.register_blueprint(search_blueprint, url_prefix='/search')
app.register_blueprint(orders_blueprint, url_prefix='/order')


if __name__ == "__main__":
    app.run(debug=True)
