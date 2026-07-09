function PricingSummaryCard({
  pricing,
  convertCurrency,
  generateQuotation,
  generateInvoice,
}) {
  if (!pricing) return null;

  const item = pricing.items?.[0];

  return (
    <div className="card">
      <h2>Pricing Summary</h2>

      <div className="summary-grid">

        <div className="summary-card">
          <span>Status</span>
          <strong>{pricing.decision_status}</strong>
        </div>

        <div className="summary-card">
          <span>Subtotal</span>
          <strong>₹{pricing.subtotal.toLocaleString()}</strong>
        </div>

        <div className="summary-card">
          <span>GST</span>
          <strong>₹{pricing.gst_amount.toLocaleString()}</strong>
        </div>

        <div className="summary-card highlight">
          <span>Grand Total</span>
          <strong>₹{pricing.grand_total.toLocaleString()}</strong>
        </div>

        {item && (
          <>
            <div className="summary-card">
              <span>Complexity</span>
              <strong>{item.complexity_level}</strong>
            </div>

            <div className="summary-card">
              <span>Complexity Charge</span>
              <strong>₹{item.complexity_charge.toLocaleString()}</strong>
            </div>

            <div className="summary-card">
              <span>Estimated Timeline</span>
              <strong>{item.estimated_timeline_weeks} Weeks</strong>
            </div>

            <div className="summary-card">
              <span>Pricing Status</span>
              <strong>{item.pricing_status}</strong>
            </div>
          </>
        )}
      </div>

      {item?.complexity_reasons?.length > 0 && (
        <div className="mini-section">
          <h3>Why this complexity?</h3>

          <ul>
            {item.complexity_reasons.map((reason, index) => (
              <li key={index}>✅ {reason}</li>
            ))}
          </ul>
        </div>
      )}

      {pricing.follow_up_required && (
        <div className="mini-section">
          <h3>Additional Information Required</h3>

          <ul>
            {pricing.follow_up_questions.map((question, index) => (
              <li key={index}>❓ {question}</li>
            ))}
          </ul>
        </div>
      )}

      {pricing.escalation_required && (
        <div className="mini-section escalation">
          <h3>Human Consultant Required</h3>

          <ul>
            {pricing.escalation_reasons.map((reason, index) => (
              <li key={index}>⚠️ {reason}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="button-row">

        <button onClick={convertCurrency}>
          🌍 Convert Currency
        </button>

        <button onClick={generateQuotation}>
          📄 Generate Quotation
        </button>

        <button onClick={generateInvoice}>
          🧾 Generate Invoice
        </button>

      </div>
    </div>
  );
}

export default PricingSummaryCard;