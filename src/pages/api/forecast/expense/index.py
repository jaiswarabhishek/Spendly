from flask import Flask, jsonify
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from prophet import Prophet
import psycopg2
import json
from dotenv import load_dotenv
import os

# Load environment variables from .env.local
load_dotenv('.env.local')

# Initialize Flask app
app = Flask(__name__)

# Database configuration loaded from environment variables
DB_CONFIG = {
    'host': os.getenv('PGHOST'),
    'dbname': os.getenv('PGDATABASE'),
    'user': os.getenv('PGUSER'),
    'password': os.getenv('PGPASSWORD'),
    'port': os.getenv('PGPORT')
}

def fetch_data_from_postgres():
    # Establish a connection to the PostgreSQL database
    conn = psycopg2.connect(**DB_CONFIG)

    # Define SQL query to fetch expense data (make sure your table name and column names match)
    query = "SELECT date, SUM(amount) AS amount FROM expenses WHERE date>='2024-09-15' GROUP BY date;"
    
    # Load data into a pandas DataFrame
    df = pd.read_sql(query, conn)
    
    # Close the connection
    conn.close()

    return df

@app.route('/api/forecast/expense/forecast', methods=['GET'])
def forecast():
    # Fetch data from PostgreSQL
    df = fetch_data_from_postgres()

    # Data Cleaning: Rename columns to match Prophet's format and convert 'date' to datetime
    df.rename(columns={'date': 'ds', 'amount': 'y'}, inplace=True)
    df['ds'] = pd.to_datetime(df['ds'])

    # Outlier detection using IQR
    Q1 = df['y'].quantile(0.25)
    Q3 = df['y'].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    # Remove outliers
    df.loc[(df['y'] < lower_bound) | (df['y'] > upper_bound), 'y'] = None


    # Split the cleaned data into training and testing sets
    train_df, test_df = train_test_split(df, test_size=0.2, shuffle=False)

    # Initialize Prophet model
    model = Prophet(seasonality_mode='multiplicative')
    

    # Fit the model with training data
    model.fit(df)

    # Future dataframe for predictions (10 days into the future)
    future_dates = model.make_future_dataframe(periods=10)

    # Make predictions
    forecast = model.predict(future_dates)

    # Convert 'ds' back to a readable date string (e.g., 'YYYY-MM-DD')
    forecast['ds'] = forecast['ds'].dt.strftime('%Y-%m-%d')

    # Extract the forecasted 'ds' (date) and 'yhat' values for the next 10 days
    yhat_forecast = forecast[['ds', 'yhat']].tail(10)

    # Calculate Performance Metrics on the test set
    y_true = test_df['y'].values  # Actual values
    y_pred = forecast['yhat'][:len(test_df)].values  # Predicted values (same length as test set)

    # Convert the forecast DataFrame to JSON
    result = yhat_forecast.to_json(orient='records')
    

    # Return the forecast as JSON response
    return jsonify(json.loads(result))

if __name__ == '__main__':
    app.run(debug=True)
