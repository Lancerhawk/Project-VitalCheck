import { useState } from 'react';
import './Reportss.css';

function DiseaseFinderScans() {
  const [isDragging, setIsDragging] = useState(false);
  const [scanType, setScanType] = useState('');
  const [bodyPart, setBodyPart] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    // Handle file upload logic here
    console.log('Files dropped:', files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    // Handle file upload logic here
    console.log('Files selected:', files);
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
              <input
                type="text"
                id="bodyPart"
                value={bodyPart}
                onChange={(e) => setBodyPart(e.target.value)}
                placeholder="e.g., Brain, Chest, Knee"
              />
            </div>
          </div>

          <div 
            className={`upload-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className='upload-icon'>🔍</div>
            <p>Drag and drop your image, or <label className='browse-label'>browse<input type='file' onChange={handleFileSelect} accept='.jpg,.png,.jpeg,.dicom' /></label></p>
            <p className='file-types'>.jpg, .png, .jpeg, .dicom up to 20MB</p>
          </div>
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