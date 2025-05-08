import { useState } from 'react';
import './Reportsr.css';

function DiseaseFinderReports() {
  const [isDragging, setIsDragging] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [targetDisease, setTargetDisease] = useState('');

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
    <div className='reports-container'>
      <div className='reports-header'>
        <h1>Report Analysis</h1>
        <p>Upload medical reports for AI analysis</p>
      </div>

      <div className='reports-content'>
        <div className='how-it-works'>
          <h2>How Report Analysis Works</h2>
          <ol>
            <li>Upload your lab report in PDF or image format</li>
            <li>Our AI system will extract key information from the report</li>
            <li>The system analyzes values and flags abnormal results</li>
            <li>You'll receive a comprehensive analysis with recommendations</li>
            <li>You can share results with your healthcare provider</li>
          </ol>
          <div className='note'>
            <strong>Note:</strong> While our AI system is highly accurate, always consult with healthcare professionals for medical decisions.
          </div>
        </div>

        <div className='upload-section'>
          <h2>Upload Medical Report</h2>
          <p>Upload your lab reports, blood tests, or other medical documents</p>

          <div className="form-controls">
            <div className="form-group">
              <label htmlFor="documentType">Document Type</label>
              <select
                id="documentType"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
              >
                <option value="">Select document type</option>
                <option value="blood_test">Blood Test Report</option>
                <option value="pathology">Pathology Report</option>
                <option value="diagnostic">Diagnostic Report</option>
                <option value="other">Other Medical Document</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="targetDisease">Target Disease/Condition</label>
              <input
                type="text"
                id="targetDisease"
                value={targetDisease}
                onChange={(e) => setTargetDisease(e.target.value)}
                placeholder="e.g., Diabetes, Heart Disease"
              />
            </div>
          </div>

          <div 
            className={`upload-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className='upload-icon'>📄</div>
            <p>Drag and drop your document, or <label className='browse-label'>browse<input type='file' onChange={handleFileSelect} accept='.pdf,.jpg,.png,.jpeg' /></label></p>
            <p className='file-types'>.pdf, .jpg, .png, .jpeg up to 10MB</p>
          </div>
        </div>

        <div className='supported-types'>
          <h2>Supported Report Types</h2>
          <div className='type-cards'>
            <div className='type-card'>
              <div className='card-icon'>🩸</div>
              <h3>Blood Test Reports</h3>
              <p>Complete blood count, lipid profile, liver function tests</p>
            </div>
            <div className='type-card'>
              <div className='card-icon'>🔬</div>
              <h3>Pathology Reports</h3>
              <p>Biopsy results, cytology reports, histopathology</p>
            </div>
            <div className='type-card'>
              <div className='card-icon'>📊</div>
              <h3>Diagnostic Reports</h3>
              <p>Tumor marker tests, genetic analysis, specialized tests</p>
            </div>
            <div className='type-card'>
              <div className='card-icon'>📋</div>
              <h3>Other Medical Documents</h3>
              <p>Discharge summaries, clinical notes, medical certificates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseFinderReports;