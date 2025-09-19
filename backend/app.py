from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)

def clean_mood(mood):
    return ''.join(char.lower() for char in mood if char.isalpha())

def prepare_training_data(df):
    df = df.copy()
    df['mood'] = df['mood'].apply(clean_mood)
    df['gender'] = df['gender'].str.lower()

    mood_enc = LabelEncoder()
    gender_enc = LabelEncoder()

    df['gender'] = gender_enc.fit_transform(df['gender'])
    df['mood'] = mood_enc.fit_transform(df['mood'])

    X = df[['age', 'gender', 'blood_pressure', 'heart_rate', 'mood', 'cholesterol']]
    y = (df['mental_status'] == 'Negative').astype(int)

    return X, y, gender_enc, mood_enc

def train_model():
    df = pd.read_csv('mental_health_data.csv')
    X, y, gender_enc, mood_enc = prepare_training_data(df)
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model, gender_enc, mood_enc

# ✅ Train model and encoders globally (so they are available to routes)
model, gender_encoder, mood_encoder = train_model()

def validate_inputs(data):
    errors = []
    if not (0 <= data['age'] <= 120):
        errors.append("Age must be between 0 and 120")
    if not (40 <= data['heart_rate'] <= 200):
        errors.append("Heart rate must be between 40 and 200")
    if not (70 <= data['blood_pressure'] <= 200):
        errors.append("Blood pressure must be between 70 and 200")
    if not (100 <= data['cholesterol'] <= 600):
        errors.append("Cholesterol must be between 100 and 600")
    return errors

def assess_risk_factors(data, prediction):
    risk_factors = []
    severity = "low"
    if data['age'] < 30 and prediction == 1:
        risk_factors.append("Young age with concerning indicators")
        severity = "high"
    if data['heart_rate'] < 60:
        risk_factors.append("Low heart rate detected")
        severity = "moderate"
    elif data['heart_rate'] > 100:
        risk_factors.append("High heart rate detected")
        severity = "high"
    if data['blood_pressure'] < 90:
        risk_factors.append("Low blood pressure detected")
        severity = "high"
    elif data['blood_pressure'] > 140:
        risk_factors.append("High blood pressure detected")
        severity = "high"
    mood_str = clean_mood(data['mood'])
    if mood_str in ['sad', 'angry', 'isolated', 'anxious']:
        risk_factors.append(f"Negative mood state: {mood_str}")
        severity = "high"
    return risk_factors, severity

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        errors = validate_inputs(data)
        if errors:
            return jsonify({'error': errors}), 400

        cleaned_mood = clean_mood(data['mood'])
        cleaned_gender = data['gender'].lower()

        features = [
            data['age'],
            gender_encoder.transform([cleaned_gender])[0],
            data['blood_pressure'],
            data['heart_rate'],
            mood_encoder.transform([cleaned_mood])[0],
            data['cholesterol']
        ]

        prediction = model.predict([features])[0]
        risk_factors, severity = assess_risk_factors(data, prediction)

        return jsonify({
            'prediction': 'negative' if prediction == 1 else 'positive',
            'risk_factors': risk_factors,
            'severity': severity
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Do NOT use `if __name__ == '__main__'` block on Render or production
# app.run() is handled by Gunicorn / Render
