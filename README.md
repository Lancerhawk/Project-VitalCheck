# VitalCheck: AI-Powered Healthcare Platform

## 1. Project Overview

**VitalCheck** is an advanced healthcare platform that empowers doctors to manage patients, register new cases, and leverage cutting-edge AI for disease prediction and report analysis.

### Key Features
- Doctor dashboard with secure patient management
- AI-powered predictions for brain tumors, lung cancer, skin diseases, chest tuberculosis, and heart disease from blood reports
- Appointment scheduling and calendar
- Patient image upload and management
- JWT-based authentication and role-based access

---

## 2. AI Models & Usage

### Supported AI Predictions
- **Brain Tumor Detection (MRI)**
- **Lung Cancer Detection (CT)**
- **Chest Tuberculosis Detection (X-ray)**
- **Skin Disease Classification (Image)**
- **Heart Disease Prediction (Blood Report PDF)**

### Model Training & Data
- **Brain Tumor**: Trained on MRI images, 4 classes (glioma, meningioma, notumor, pituitary). See `AI/train_brain_tumor_MRI.py`.
- **Lung Cancer**: Trained on CT scans, 3 classes (benign, malignant, normal). See `AI/train_lung_cancer_CT.py`.
- **Chest Tuberculosis**: Trained on X-ray images, 2 classes (normal, tuberculosis). Dataset details in `AI/dataset/TB_Chest_Radiography_Database/README.md.txt`.
- **Skin Disease**: Trained on a large, multi-class dataset using transfer learning (MobileNetV2). See `AI/train_skin_disease.py`.
- **Heart Disease**: Trained on structured blood report data, predicts risk from PDF extraction. See `AI/BloodReport_HeartDiseasedetectionModel.py`.

### How AI is Used
- The **AI server** (`AI/Server.py`) exposes REST endpoints:
  - `/predict` for image-based predictions (brain, lung, chest, skin)
  - `/predict-blood` for PDF blood report analysis
- Models are loaded at startup; predictions are made on uploaded files and return class and confidence.
- **Example usage**:
  - Upload an MRI image to `/predict` with `scanType=MRI` and `bodyPart=brain` for brain tumor prediction.
  - Upload a blood report PDF to `/predict-blood` for heart disease risk.

---

## 3. Backend Architecture

- **Tech Stack**: Node.js, Express, MongoDB, Mongoose, JWT, Multer, Nodemailer
- **Key Endpoints**:
  - `/login`, `/register`, `/forgot-password`, `/reset-password` for authentication
  - `/register-patient` (with image upload), `/patients` (CRUD) for patient management
  - Appointment endpoints for scheduling and viewing
- **Security**:
  - JWT authentication for all sensitive routes
  - Doctor-patient association: Each patient is linked to the registering doctor; only their patients are visible
  - Auto-generated patient credentials (email/password) shown to the doctor after registration
- **Image Handling**:
  - Patient images are uploaded and stored; default image fallback is provided

---

## 4. Frontend Architecture

- **Tech Stack**: React, Vite, MUI, Axios, React Router, React Calendar
- **Features**:
  - Doctor dashboard: View, register, update, and delete patients
  - Patient registration form (no email required; credentials auto-generated)
  - Modal to copy patient credentials after registration
  - Appointment calendar for managing patient appointments
  - AI prediction UI: Upload images or PDFs, view results with confidence scores
  - Patient image preview and fallback to default
- **Authentication**:
  - JWT token stored and sent with all API requests
  - Role-based UI: Only show patients and appointments for the logged-in doctor

---

## 5. Setup & Installation

### Prerequisites
- Node.js
- Python 3.8+
- MongoDB

### AI Server
```bash
cd AI
pip install -r requirements.txt
python Server.py
```

### Backend
```bash
cd Backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 6. Usage Guide

- **Register/Login as Doctor**: Access the dashboard
- **Register Patient**: Fill the form, upload image (optional), copy credentials
- **AI Predictions**: Use the prediction UI to upload scans or reports
- **Appointments**: Schedule and view appointments for your patients
- **Patient Management**: View, update, or delete your patients only

---

## 7. Data & Model Sources

- **Chest Tuberculosis Dataset**: [Details & Citations](AI/dataset/TB_Chest_Radiography_Database/README.md.txt)
- **Other Models**: Trained on public datasets (see training scripts for details)

---

## 8. Security & Best Practices

- All sensitive actions require JWT authentication
- Patient data is only accessible to the registering doctor
- Passwords are securely hashed and never exposed except at registration
- Image uploads are validated and size-limited

---

## 9. Project Structure

```
AI/           # AI models, training scripts, and Flask server
Backend/      # Node.js/Express backend, MongoDB models, API endpoints
frontend/     # React frontend, UI components, pages, assets
```

---

## 10. Contributing & License

- PRs and issues welcome!
- Cite datasets and models as required by their licenses

---

**Ready for production?**  
- Secure environment variables for secrets and DB credentials  
- Use HTTPS in deployment  
- Set up proper CORS and rate limiting
