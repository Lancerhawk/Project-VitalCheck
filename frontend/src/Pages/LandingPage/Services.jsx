import './Style.css';
function Services() {
    return (
        <div className="services-page">
            <section className="services-hero">
                <h1>Our AI-Powered Health Services</h1>
                <p>Cutting-edge technology for better healthcare outcomes</p>
            </section>

            <section className="services-grid">
                <div className="service-card">
                    <h3>Disease Screening</h3>
                    <div className="service-icon">🩺</div>
                    <p>Early detection of potential health issues using advanced AI algorithms</p>
                    <button className="learn-more">Learn More</button>
                </div>

                <div className="service-card">
                    <h3>Health Monitoring</h3>
                    <div className="service-icon">📊</div>
                    <p>Continuous tracking and analysis of vital health parameters</p>
                    <button className="learn-more">Learn More</button>
                </div>

                <div className="service-card">
                    <h3>Risk Assessment</h3>
                    <div className="service-icon">⚕️</div>
                    <p>Personalized health risk evaluation and recommendations</p>
                    <button className="learn-more">Learn More</button>
                </div>

                <div className="service-card">
                    <h3>AI Consultation</h3>
                    <div className="service-icon">🤖</div>
                    <p>24/7 AI-powered preliminary health consultations</p>
                    <button className="learn-more">Learn More</button>
                </div>
            </section>

            <section className="why-choose-us">
                <h2>Why Choose Our Services?</h2>
                <div className="benefits-grid">
                    <div className="benefit-item">
                        <span>✓</span>
                        <p>99.9% Accuracy Rate</p>
                    </div>
                    <div className="benefit-item">
                        <span>✓</span>
                        <p>24/7 Availability</p>
                    </div>
                    <div className="benefit-item">
                        <span>✓</span>
                        <p>Instant Results</p>
                    </div>
                    <div className="benefit-item">
                        <span>✓</span>
                        <p>Secure & Private</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services;