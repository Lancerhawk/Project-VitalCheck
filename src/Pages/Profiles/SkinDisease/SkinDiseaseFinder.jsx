import { useState } from 'react';
import './SkinDiseaseFinder.css';

function SkinDiseaseFinder() {
  const [isDragging, setIsDragging] = useState(false);
  const [skinCondition, setSkinCondition] = useState('');
  const [bodyLocation, setBodyLocation] = useState('');

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
    console.log('Files dropped:', files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    console.log('Files selected:', files);
  };

  return (
    <div className='skin-disease-finder'>
      <div className='skin-header'>
        <h1>Skin Analysis</h1>
        <p>Upload skin images for AI-powered assessment</p>
      </div>

      <div className='skin-content'>
        <div className='how-it-works'>
          <h2>How Skin Analysis Works</h2>
          <ol>
            <li>Take a clear, well-lit photo of the skin lesion or condition</li>
            <li>Upload the image through our secure system</li>
            <li>Our AI analyzes the image using machine learning models</li>
            <li>The system classifies the condition and provides a probability score</li>
            <li>You'll receive a detailed analysis with recommendations</li>
          </ol>
          <div className='note'>
            <strong>Tips for good skin photos:</strong> Ensure good lighting, take from multiple angles if possible, include a ruler or coin for size reference if available.
          </div>
        </div>

        <div className='upload-section'>
          <h2>Upload Skin Image</h2>
          <p>Upload a clear image of the skin area you want to analyze</p>

          <div className="form-controls">
            <div className="form-group">
              <label htmlFor="skinCondition">Type of Concern</label>
              <select
                id="skinCondition"
                value={skinCondition}
                onChange={(e) => setSkinCondition(e.target.value)}
              >
                <option value="">Select concern type</option>
                <option value="rash">Rash or Inflammation</option>
                <option value="mole">Mole or Growth</option>
                <option value="acne">Acne</option>
                <option value="other">Other Skin Condition</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bodyLocation">Body Location</label>
              <input
                type="text"
                id="bodyLocation"
                value={bodyLocation}
                onChange={(e) => setBodyLocation(e.target.value)}
                placeholder="e.g., Face, Arm, Back"
              />
            </div>
          </div>

          <div 
            className={`upload-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className='upload-icon'>📷</div>
            <p>Drag and drop your image, or <label className='browse-label'>browse<input type='file' onChange={handleFileSelect} accept='.jpg,.png,.jpeg' /></label></p>
            <p className='file-types'>.jpg, .png, .jpeg up to 15MB</p>
          </div>
        </div>

        <div className='skin-benefits'>
          <h2>Skin Analysis Benefits</h2>
          <div className='benefit-cards'>
            <div className='benefit-card'>
              <div className='card-icon'>⏰</div>
              <h3>Early Detection</h3>
              <p>Detect potential skin issues early when they're more treatable</p>
            </div>
            <div className='benefit-card'>
              <div className='card-icon'>📱</div>
              <h3>No Special Equipment</h3>
              <p>Use any smartphone camera to take and upload images</p>
            </div>
            <div className='benefit-card'>
              <div className='card-icon'>🔍</div>
              <h3>Multiple Conditions</h3>
              <p>Analyze for various conditions including melanoma, carcinoma, and benign growths</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkinDiseaseFinder;