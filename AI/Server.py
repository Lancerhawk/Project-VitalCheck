import os
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

IMAGE_SIZE = (150, 150)
BATCH_SIZE = 32
EPOCHS = 40

BRAIN_TUMOR_CLASSES = ['glioma', 'meningioma', 'notumor', 'pituitary']
LUNG_CANCER_CLASSES = ['benign', 'malignant', 'normal']
SKIN_DISEASE_CLASSES = ['acne', 'eczema', 'melanoma', 'normal', 'psoriasis']
TUBERCULOSIS_CLASSES = ['normal', 'tuberculosis']

brain_model_path = 'brain_tumor_model.h5'
if not os.path.exists(brain_model_path):
    raise FileNotFoundError(f'Brain tumor model file not found: {brain_model_path}')

brain_model = tf.keras.models.load_model(brain_model_path)
print('Brain tumor model loaded successfully!')

lung_model_path = 'lung_cancer_model.h5'
if not os.path.exists(lung_model_path):
    raise FileNotFoundError(f'Lung cancer model file not found: {lung_model_path}')

lung_model = tf.keras.models.load_model(lung_model_path)
print('Lung cancer model loaded successfully!')

skin_model_path = 'skin_disease_model.h5'
if not os.path.exists(skin_model_path):
    raise FileNotFoundError(f'Skin disease model file not found: {skin_model_path}')

skin_model = tf.keras.models.load_model(skin_model_path)
print('Skin disease model loaded successfully!')

tb_model_path = 'chest_tuberculosis_model.h5'
if not os.path.exists(tb_model_path):
    raise FileNotFoundError(f'Tuberculosis model file not found: {tb_model_path}')

tb_model = tf.keras.models.load_model(tb_model_path)
print('Tuberculosis model loaded successfully!')

from flask_cors import CORS
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    scan_type = request.form.get('scanType')
    body_part = request.form.get('bodyPart')

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image_bytes = file.read()
        img = Image.open(io.BytesIO(image_bytes))
        img = img.convert('RGB')
        
        if scan_type and body_part:
            if scan_type.lower() == 'mri' and body_part.lower() == 'brain':
                target_size = (150, 150)
                model = brain_model
                classes = BRAIN_TUMOR_CLASSES
            elif scan_type.lower() == 'ct' and body_part.lower() == 'lung':
                target_size = (224, 224)
                model = lung_model
                classes = LUNG_CANCER_CLASSES
            elif scan_type.lower() == 'xray' and body_part.lower() == 'chest':
                target_size = (150, 150)
                model = tb_model
                classes = TUBERCULOSIS_CLASSES
            else:
                return jsonify({'error': 'Unsupported scan type or body part combination'}), 400
        else:
            target_size = (224, 224)
            model = skin_model
            classes = SKIN_DISEASE_CLASSES
            
        img = img.resize(target_size)
        img_array = np.array(img)
        img_array = img_array.astype('float32') / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)
        predicted_class = classes[np.argmax(prediction[0])]
        confidence = float(np.max(prediction[0]))

        return jsonify({
            'status': 'success',
            'class': predicted_class,
            'confidence': confidence
        })
 
    except Exception as e:
        return jsonify({'error': str(e)}), 500


import fitz  
import pandas as pd
from sklearn.preprocessing import StandardScaler

heart_model_path = './Reports/Blood_Reports/HeartDiseaseModel.h5'
if not os.path.exists(heart_model_path):
    raise FileNotFoundError(f'Heart disease model file not found: {heart_model_path}')

heart_model = tf.keras.models.load_model(heart_model_path)
print('Heart disease model loaded successfully!')

heart_df = pd.read_csv("./dataset/BloodReport_HeartDeseise/heart_cleveland_upload.csv").dropna()
heart_scaler = StandardScaler()
heart_features = heart_df.drop('condition', axis=1).columns.tolist()
heart_scaler.fit(heart_df[heart_features])

feature_good_ranges = {
    'age': (0, 50),
    'chol': (0, 200),
    'trestbps': (90, 120),
    'thalach': (100, 200),
    'fbs': (0, 0),  
    'exang': (0, 0),  
    'oldpeak': (0, 1),
    'ca': (0, 0),
}

@app.route('/predict-blood', methods=['POST'])
def predict_blood():
    if 'report' not in request.files:
        return jsonify({'error': 'No report file uploaded'}), 400

    file = request.files['report']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    try:
        pdf_bytes = file.read()
        pdf = fitz.open(stream=pdf_bytes, filetype="pdf")
        text = "\n".join([page.get_text() for page in pdf])
        pdf.close()

        input_data = []
        for feature in heart_features:
            found = False
            for line in text.split('\n'):
                if feature.lower() in line.lower():
                    numbers = [float(word) for word in line.split() if word.replace('.', '', 1).isdigit()]
                    if numbers:
                        input_data.append(numbers[0])
                        found = True
                        break
            if not found:
                input_data.append(0.0)  

        print('DEBUG input_data:', dict(zip(heart_features, input_data)))

        if len(input_data) != len(heart_features):
            return jsonify({'error': 'Incomplete data extracted'}), 400

        healthy = True
        for k, v in zip(heart_features, input_data):
            if k in feature_good_ranges:
                low, high = feature_good_ranges[k]
                if not (low <= v <= high):
                    healthy = False
                    break
        if healthy:
            print('DEBUG: All features in good range, overriding to No Heart Disease')
            return jsonify({
                'status': 'success',
                'prediction': 'No Heart Disease',
                'confidence': 100.0,
                'features_used': {k: float(v) for k, v in zip(heart_features, input_data)}
            })

        input_scaled = heart_scaler.transform([input_data])
        prediction = heart_model.predict(input_scaled)[0][0]
        print('DEBUG model prediction:', prediction)
        result = "Heart Disease Detected" if prediction > 0.5 else "No Heart Disease"
        confidence = prediction if prediction > 0.5 else 1 - prediction

        return jsonify({
            'status': 'success',
            'prediction': result,
            'confidence': float(round(confidence * 100, 2)),
            'features_used': {k: float(v) for k, v in zip(heart_features, input_data)}
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)