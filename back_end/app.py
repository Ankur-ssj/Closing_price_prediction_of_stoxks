from flask import Flask
import googleModel as gm
from flask import jsonify


app = Flask(__name__)


@app.route("/api", methods = ['GET'])
def index():
    real_data = gm.closing_price_prediction()
    actual_value = gm.real_stock_price_value()
    print(real_data)
    return{
        'data' : real_data,
        'real_price_value': actual_value
    } 

if __name__ == "__main__":
    app.run(debug=True)