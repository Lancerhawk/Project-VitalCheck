import os
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

IMAGE_SIZE = (224, 224) 
BATCH_SIZE = 32
EPOCHS = 25

DISEASE_INFO = {
    'Acne and Rosacea Photos': {
        'description': 'Inflammatory skin conditions causing redness, pimples, and visible blood vessels.',
        'precautions': ['Avoid touching affected areas', 'Use gentle skincare products', 'Protect from sun', 'Avoid triggers']
    },
    'Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions': {
        'description': 'Precancerous and cancerous skin growths.',
        'precautions': ['Regular skin checks', 'Sun protection', 'Early medical intervention', 'Follow treatment plan']
    },
    'Atopic Dermatitis Photos': {
        'description': 'Chronic inflammatory skin condition causing dry, itchy skin.',
        'precautions': ['Keep skin moisturized', 'Avoid irritants', 'Use prescribed medications', 'Maintain good environment']
    },
    'Bullous Disease Photos': {
        'description': 'Conditions causing fluid-filled blisters.',
        'precautions': ['Avoid breaking blisters', 'Keep areas clean', 'Follow treatment plan', 'Prevent trauma']
    },
    'Cellulitis Impetigo and other Bacterial Infections': {
        'description': 'Bacterial skin infections causing redness and swelling.',
        'precautions': ['Complete antibiotics course', 'Keep area clean', 'Monitor for spreading', 'Prevent scratching']
    },
    'Eczema Photos': {
        'description': 'Inflammatory condition causing itchy skin patches.',
        'precautions': ['Regular moisturizing', 'Avoid triggers', 'Use gentle products', 'Take cool showers']
    },
    'Exanthems and Drug Eruptions': {
        'description': 'Skin rashes from medications or infections.',
        'precautions': ['Stop suspected medications', 'Document reactions', 'Seek medical help', 'Follow treatment plan']
    },
    'Hair Loss Photos Alopecia and other Hair Diseases': {
        'description': 'Conditions causing hair loss or scalp problems.',
        'precautions': ['Gentle hair care', 'Avoid harsh treatments', 'Follow medical advice', 'Maintain scalp health']
    },
    'Herpes HPV and other STDs Photos': {
        'description': 'Sexually transmitted skin infections.',
        'precautions': ['Seek treatment', 'Avoid contact during outbreaks', 'Safe sex practices', 'Regular check-ups']
    },
    'Light Diseases and Disorders of Pigmentation': {
        'description': 'Conditions affecting skin color and pigmentation.',
        'precautions': ['Sun protection', 'Avoid triggers', 'Use prescribed treatments', 'Regular monitoring']
    },
    'Lupus and other Connective Tissue diseases': {
        'description': 'Autoimmune conditions affecting skin and connective tissue.',
        'precautions': ['Sun protection', 'Follow treatment plan', 'Regular check-ups', 'Stress management']
    },
    'Melanoma Skin Cancer Nevi and Moles': {
        'description': 'Skin cancer and suspicious moles.',
        'precautions': ['Regular skin checks', 'Sun protection', 'Monitor changes', 'Early intervention']
    },
    'Nail Fungus and other Nail Disease': {
        'description': 'Infections affecting nails.',
        'precautions': ['Keep nails clean', 'Use antifungals', 'Proper footwear', 'Avoid sharing tools']
    },
    'Poison Ivy Photos and other Contact Dermatitis': {
        'description': 'Skin reactions from contact with irritants.',
        'precautions': ['Identify triggers', 'Wash exposed areas', 'Use prescribed treatments', 'Protective clothing']
    },
    'Psoriasis pictures Lichen Planus and related diseases': {
        'description': 'Chronic inflammatory skin conditions.',
        'precautions': ['Regular treatment', 'Avoid triggers', 'Moisturize skin', 'Stress management']
    },
    'Scabies Lyme Disease and other Infestations and Bites': {
        'description': 'Skin conditions caused by parasites or insect bites.',
        'precautions': ['Complete treatment', 'Wash bedding', 'Prevent spreading', 'Follow-up care']
    },
    'Seborrheic Keratoses and other Benign Tumors': {
        'description': 'Non-cancerous skin growths.',
        'precautions': ['Monitor changes', 'Protect from injury', 'Regular check-ups', 'Seek evaluation']
    },
    'Systemic Disease': {
        'description': 'Skin signs of internal diseases.',
        'precautions': ['Prompt medical care', 'Follow treatment plan', 'Monitor symptoms', 'Regular check-ups']
    },
    'Tinea Ringworm Candidiasis and other Fungal Infections': {
        'description': 'Fungal skin infections.',
        'precautions': ['Complete treatment', 'Keep skin dry', 'Avoid sharing items', 'Practice hygiene']
    },
    'Urticaria Hives': {
        'description': 'Allergic skin reactions causing welts.',
        'precautions': ['Identify triggers', 'Take antihistamines', 'Cool compresses', 'Loose clothing']
    },
    'Vascular Tumors': {
        'description': 'Blood vessel growths in skin.',
        'precautions': ['Protect from injury', 'Monitor changes', 'Regular check-ups', 'Sun protection']
    },
    'Vasculitis Photos': {
        'description': 'Blood vessel inflammation affecting skin.',
        'precautions': ['Follow medications', 'Protect skin', 'Monitor symptoms', 'Regular follow-up']
    },
    'Warts Molluscum and other Viral Infections': {
        'description': 'Viral infections causing skin growths.',
        'precautions': ['Complete treatment', 'Prevent spreading', 'Avoid touching', 'Good hygiene']
    }
}

CLASSES = list(DISEASE_INFO.keys())

def create_model():
    base_model = MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    )
    
    base_model.trainable = False
    
    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(len(CLASSES), activation='softmax')
    ])
    return model

train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest',
    validation_split=0.2
)

test_datagen = ImageDataGenerator(rescale=1./255)

train_dir = 'dataset/Skin_DetectionAI/train'
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

validation_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

model = create_model()
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy', tf.keras.metrics.AUC(), tf.keras.metrics.Precision(), tf.keras.metrics.Recall()]
)

callbacks = [
    tf.keras.callbacks.EarlyStopping(patience=10, restore_best_weights=True),
    tf.keras.callbacks.ReduceLROnPlateau(factor=0.2, patience=5),
    tf.keras.callbacks.ModelCheckpoint('skin_disease_model.h5', save_best_only=True)
]

history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // BATCH_SIZE,
    epochs=EPOCHS,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // BATCH_SIZE,
    callbacks=callbacks
)

model.save('skin_disease_model.h5')

@app.route('/predict_skin', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image_bytes = file.read()
        img = Image.open(io.BytesIO(image_bytes))
        img = img.resize(IMAGE_SIZE)
        img_array = np.array(img)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        prediction = model.predict(img_array)
        predicted_class = CLASSES[np.argmax(prediction[0])]
        confidence = float(np.max(prediction[0]))
        
        disease_info = DISEASE_INFO[predicted_class]

        return jsonify({
            'status': 'success',
            'class': predicted_class,
            'confidence': confidence,
            'description': disease_info['description'],
            'precautions': disease_info['precautions']
        })
 
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)  