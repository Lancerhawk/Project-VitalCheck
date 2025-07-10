import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

IMAGE_SIZE = (150, 150)
CLASSES = ['glioma', 'meningioma', 'notumor', 'pituitary']
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEST_DIR = os.path.join(BASE_DIR, 'dataset', 'Testing')
MODEL_PATH = os.path.join(BASE_DIR, 'brain_tumor_model.h5')

if not os.path.exists(TEST_DIR):
    raise FileNotFoundError(f'Test directory not found: {TEST_DIR}')
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f'Model file not found: {MODEL_PATH}')

model = load_model(MODEL_PATH)

def preprocess_image(image_path):
    img = Image.open(image_path)
    img = img.resize(IMAGE_SIZE)
    img_array = np.array(img)
    img_array = img_array / 255.0
    return np.expand_dims(img_array, axis=0)

def evaluate_single_image(image_path):
    img_array = preprocess_image(image_path)
    
    prediction = model.predict(img_array)
    predicted_class = CLASSES[np.argmax(prediction[0])]
    confidence = float(np.max(prediction[0]))
    
    actual_class = image_path.split(os.sep)[-2]
    
    return {
        'image': os.path.basename(image_path),
        'actual': actual_class,
        'predicted': predicted_class,
        'confidence': confidence
    }

def plot_confusion_matrix(y_true, y_pred):
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=CLASSES,
                yticklabels=CLASSES)
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.savefig('confusion_matrix.png')
    plt.close()

def main():
    print("\nBrain Tumor Classification System")
    print("Available classes:", ", ".join(CLASSES))
    print(f"\nPlease enter the image path (relative to {TEST_DIR})")
    print("Example: meningioma/Te-me_0122.jpg")
    
    while True:
        relative_path = input("\nEnter image path (or 'q' to quit): ").strip()
        
        if relative_path.lower() == 'q':
            print("Exiting program...")
            break
        
        image_path = os.path.join(TEST_DIR, relative_path)
        
        try:
            if not os.path.exists(image_path):
                print(f'Error: Image file not found - {image_path}')
                continue
                
            if not image_path.lower().endswith(('.png', '.jpg', '.jpeg')):
                print('Error: File must be an image (PNG, JPG, or JPEG)')
                continue
            
            parent_dir = os.path.dirname(image_path)
            if not os.path.exists(parent_dir) or not os.path.abspath(parent_dir).startswith(os.path.abspath(TEST_DIR)):
                print(f'Error: Invalid image directory - {parent_dir}')
                continue
            
            print('\nProcessing image...')
            result = evaluate_single_image(image_path)
            
            print(f"\nResults for: {result['image']}")
            print(f"Predicted class: {result['predicted']}")
            print(f"Confidence: {result['confidence']:.2%}")
            
            choice = input("\nWould you like to process another image? (y/n): ").strip().lower()
            if choice != 'y':
                print("Exiting program...")
                break
                
        except Exception as e:
            print(f'Error processing image: {str(e)}')


if __name__ == '__main__':
    main()