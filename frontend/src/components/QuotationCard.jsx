function QuotationCard({ quotation }) {

  if (!quotation) return null;

  return (
    <div className="card">

      <h2>📄 Professional Quotation</h2>

      <div className="summary-grid">

        <div className="summary-card">
          <span>Quotation No</span>
          <strong>{quotation.quotation_no}</strong>
        </div>

        <div className="summary-card">
          <span>Date</span>
          <strong>{quotation.quotation_date}</strong>
        </div>

        <div className="summary-card">
          <span>Status</span>
          <strong>{quotation.status}</strong>
        </div>

        <div className="summary-card highlight">
          <span>Validity</span>
          <strong>{quotation.validity}</strong>
        </div>

      </div>

      <div className="mini-section">

        <h3>Client Information</h3>

        <p><strong>Name:</strong> {quotation.client.name}</p>
        <p><strong>Email:</strong> {quotation.client.email}</p>
        <p><strong>Country:</strong> {quotation.client.country}</p>

      </div>

      <div className="mini-section">

        <h3>Issued By</h3>

        <p>{quotation.issued_by}</p>

      </div>

      <div className="professional-card">

        <h3>Project Value</h3>

        <h2>
          {quotation.currency_conversion.symbol}
          {quotation.currency_conversion.amount}
        </h2>

        <p>
          ({quotation.currency_conversion.currency})
        </p>

      </div>

    </div>
  );
}

export default QuotationCard;