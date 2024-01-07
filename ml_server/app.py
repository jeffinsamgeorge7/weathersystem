from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Load CSV file into a Pandas DataFrame
csv_path = "t1.csv"
df = pd.read_csv(csv_path)

# Assuming the last column is the target variable and the rest are features
X = df.iloc[:, :-1]  # Features
y = df.iloc[:, -1]   # Target variable

# Initialize the KNN classifier (you can adjust the number of neighbors 'n_neighbors')
knn_classifier = KNeighborsClassifier(n_neighbors=3)
knn_classifier.fit(X, y)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input array from the request
        data = request.get_json(force=True)
        input_array = np.array(data['input_array']).reshape(1, -1)

        # Make predictions using the model
        prediction = knn_classifier.predict(input_array)

        # Return the prediction as JSON
        return jsonify({'prediction': prediction.tolist()})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000)
