import './Style.css';
function Prices() {
    return (
        <div className="pricing-page">
            <section className="pricing-header">
                <h1>Choose Your Plan</h1>
                <p>Select the perfect plan for your healthcare needs</p>
            </section>

            <section className="pricing-grid">
                <div className="price-card basic">
                    <div className="card-header">
                        <h3>Basic</h3>
                        <div className="price">
                            <span className="amount">29</span>
                            <span className="currency">rs</span>
                            <span className="period">/month</span>
                        </div>
                    </div>
                    <ul className="features-list">
                        <li>✓ Basic Health Screening</li>
                        <li>✓ Monthly Health Report</li>
                        <li>✓ Email Support</li>
                        <li>✓ Mobile App Access</li>
                    </ul>
                    <button className="subscribe-btn">Get Started</button>
                </div>

                <div className="price-card pro">
                    <div className="popular-tag">Most Popular</div>
                    <div className="card-header">
                        <h3>Professional</h3>
                        <div className="price">
                            <span className="amount">79</span>
                            <span className="currency">rs</span>
                            <span className="period">/month</span>
                        </div>
                    </div>
                    <ul className="features-list">
                        <li>✓ Advanced Health Screening</li>
                        <li>✓ Weekly Health Reports</li>
                        <li>✓ 24/7 Priority Support</li>
                        <li>✓ Mobile App Access</li>
                        <li>✓ Family Health Tracking</li>
                    </ul>
                    <button className="subscribe-btn pro-btn">Get Started</button>
                </div>

                <div className="price-card enterprise">
                    <div className="card-header">
                        <h3>Enterprise</h3>
                        <div className="price">
                            
                            <span className="amount">199</span>
                            <span className="currency">rs</span>
                            <span className="period">/month</span>
                        </div>
                    </div>
                    <ul className="features-list">
                        <li>✓ Complete Health Screening</li>
                        <li>✓ Daily Health Reports</li>
                        <li>✓ 24/7 Dedicated Support</li>
                        <li>✓ Mobile App Access</li>
                        <li>✓ Multi-Family Health Tracking</li>
                        <li>✓ Custom Integration</li>
                    </ul>
                    <button className="subscribe-btn">Contact Sales</button>
                </div>
            </section>

            <section className="guarantee-section">
                <div className="guarantee-content">
                    <h2>100% Satisfaction Guarantee</h2>
                    <p>Try our service risk-free for 30 days. If you're not completely satisfied, we'll refund your payment.</p>
                </div>
            </section>
        </div>
    )
}

export default Prices;