import math
import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense
from keras.layers import LSTM
from sklearn.metrics import mean_squared_error

def closing_price_prediction():
    #importing dataset from yahoo finance for training
    dataset = pd.read_csv('C:/Users/ankur/Documents/CLOSING_PRICE_PREDICTION/back_end/data/GOOGL.csv')
    training_data = dataset.iloc[:, 4:5].values
    print(training_data)

    #feature scaling
    sc = MinMaxScaler()
    training_data = sc.fit_transform(training_data)

    #Getting the inputs and the outputs
    X_train = training_data[0: 2516]
    Y_train = training_data[1: 2517]

    #Reshaping
    X_train = np.reshape(X_train, (2516, 1, 1))

    #Initialising the RNN
    regressor = Sequential()

    #Adding the input layer
    regressor.add(LSTM(units = 4, activation = 'sigmoid', input_shape = (None, 1)))

    #Adding the output layer
    regressor.add(Dense(units = 1))

    #Compiling the RNN
    regressor.compile(optimizer = 'adam', loss = 'mean_squared_error')

    #Fitting the RNN to the training set
    regressor.fit(X_train, Y_train, batch_size = 32, epochs = 200)

    #Getting the test data
    test_data = pd.read_csv('C:/Users/ankur/Documents/CLOSING_PRICE_PREDICTION/back_end/data/GOOGL_test.csv')
    real_stock_price = test_data.iloc[:, 4:5].values
    avg= sum(real_stock_price)/len(real_stock_price)

    #Getting the predicted stock price of google
    inputs = real_stock_price
    inputs = sc.transform(inputs)
    inputs = np.reshape(inputs,(20, 1, 1))
    predicted_stock_price = regressor.predict(inputs)
    predicted_stock_price = sc.inverse_transform(predicted_stock_price)
    prediction = predicted_stock_price.reshape(20)
    round_off_values = np.round(prediction, decimals=3)
    prediction = round_off_values.tolist()
    prediction = [' {0} '.format(elem) for elem in prediction]
    #prediction_final = ' '.join(map(str, prediction))
    

    rmse = math.sqrt(mean_squared_error(real_stock_price, predicted_stock_price))
    rmse_percent = rmse/1818.48334031

    return prediction


def real_stock_price_value():
    test_data = pd.read_csv('C:/Users/ankur/Documents/CLOSING_PRICE_PREDICTION/back_end/data/GOOGL_test.csv')
    real_stock_price = test_data.iloc[:, 4:5].values
    real_stock_price = real_stock_price.reshape(20)
    real_stock_price = real_stock_price.tolist()
    real_stock_price = [' {0} '.format(elem) for elem in real_stock_price]

    return real_stock_price

