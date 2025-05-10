import React, { useState } from 'react';
import './Reportss.css';

function DiseaseFinderScans() {
  const [isDragging, setIsDragging] = useState(false);
  const [scanType, setScanType] = useState('');
  const [bodyPart, setBodyPart] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (scanType !== 'mri' || bodyPart !== 'brain') {
      setError('Currently, only Brain MRI scans are supported. Other scan types will be available soon.');
      return;
    }

    setError(null);
    setPrediction(null);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setPrediction(data);
    } catch (err) {
      setError(err.message || 'Failed to analyze the image');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  return (
    <div className='reportss-container'>
      <div className='reportss-header'>
        <h1>Scan Analysis</h1>
        <p>Upload and analyze medical imaging scans</p>
      </div>

      <div className='reportss-content'>
        <div className='how-it-works'>
          <h2>How Scan Analysis Works</h2>
          <ol>
            <li>Upload your medical scan image (MRI, CT, X-ray, etc.)</li>
            <li>Our AI system will process and analyze the image</li>
            <li>The system identifies areas of interest and potential abnormalities</li>
            <li>You'll receive a visualization with highlighted regions</li>
            <li>A detailed analysis report will be generated</li>
          </ol>
          <div className='note'>
            <strong>Note:</strong> While our AI system is highly accurate, always consult with healthcare professionals for medical decisions.
          </div>
        </div>

        <div className='upload-section'>
          <h2>Upload Medical Scan</h2>
          <p>Upload your MRI, CT scan, X-ray, or other medical imaging</p>

          <div className="form-controls">
            <div className="form-group">
              <label htmlFor="scanType">Scan Type</label>
              <select
                id="scanType"
                value={scanType}
                onChange={(e) => setScanType(e.target.value)}
              >
                <option value="">Select scan type</option>
                <option value="mri">MRI Scan</option>
                <option value="ct">CT Scan</option>
                <option value="xray">X-Ray</option>
                <option value="other">Other Medical Imaging</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bodyPart">Body Part/Region</label>
              <select
                id="scanType"
                value={bodyPart}
                onChange={(e) => setBodyPart(e.target.value)}
              >
                <option value="">Select Body type</option>
                <option value="brain">Brain</option>
                <option value="chest">Chest</option>
              </select>
            </div>
          </div>

          <div 
            className={`upload-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div className='preview-container'>
                <img src={previewUrl} alt='Scan preview' className='scan-preview' />
                <button className='remove-preview' onClick={() => {
                  setPreviewUrl(null);
                  setSelectedFile(null);
                  setPrediction(null);
                }}>✖</button>
              </div>
            ) : (
              <>
                <div className='upload-icon'>🔍</div>
                <p>Drag and drop your Scans, or <label className='browse-label'>browse<input type='file' onChange={handleFileSelect} accept='.jpg,.png,.jpeg,.dicom' /></label></p>
                <p className='file-types'>.jpg, .png, .jpeg, .dicom up to 20MB</p>
              </>
            )}
          </div>

          {previewUrl && !prediction && !loading && (
            <button 
              className='submit-button' 
              onClick={handleSubmit}
              disabled={!selectedFile}
            >
              Analyze Scan
            </button>
          )}

          {loading && (
            <div className='analysis-status'>
              <div className='loading-spinner'></div>
              <p>Analyzing your scan...</p>
            </div>
          )}

          {error && (
            <div className='error-message'>
              <p>❌ {error}</p>
            </div>
          )}

          {prediction && (
            <div className='prediction-results'>
              <h3>Analysis Results 🎯</h3>
              <div className='result-card'>
                <div className='result-header'>
                  <h4>Prediction</h4>
                </div>
                <div className='result-content'>
                  <p className='prediction-class'>
                    <strong>Detected Condition:</strong> {prediction.class.charAt(0).toUpperCase() + prediction.class.slice(1)}
                  </p>
                  <p className='prediction-confidence'>
                    <strong>Confidence Score:</strong> {(prediction.confidence * 100).toFixed(2)}%
                  </p>
                </div>
                <div className='result-footer'>
                  <p className='result-note'>
                    ⚠️ This is an AI-assisted analysis. Please consult with a healthcare professional for proper medical diagnosis.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='supported-types'>
          <h2>Supported Scan Types</h2>
          <div className='type-cards'>
            <div className='type-card'>
              <div className='card-icon'>🧠</div>
              <h3>MRI Scans</h3>
              <p>Brain, spine, abdomen, joints, and other MRI images</p>
            </div>
            <div className='type-card'>
              <div className='card-icon'>🫁</div>
              <h3>CT Scans</h3>
              <p>Head, chest, abdomen, pelvis CT imaging</p>
            </div>
            <div className='type-card'>
              <div className='card-icon'>🦴</div>
              <h3>X-Ray Images</h3>
              <p>Chest, bone, dental, and other X-ray images</p>
            </div>
            <div className='type-card'>
              <div className='card-icon'>📷</div>
              <h3>Other Medical Imaging</h3>
              <p>PET scans, ultrasound images, mammograms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseFinderScans;