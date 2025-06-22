from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)  # <-- Enable CORS for all routes

# Load model & vectorizer
with open('model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')
    if not text.strip():
        return jsonify({'error': 'No text provided'}), 400

    vect = vectorizer.transform([text])
    pred = model.predict(vect)[0]
    return jsonify({'prediction': 'Real' if pred == 1 else 'Fake'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
