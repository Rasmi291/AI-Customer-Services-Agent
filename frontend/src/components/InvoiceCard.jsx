function InvoiceCard({ invoice }) {

  if (!invoice) return null;

  return (
    <div className="card">

      <h2>🧾 Professional Invoice</h2>

      <div className="summary-grid">

        <div className="summary-card">
          <span>Invoice No</span>
          <strong>{invoice.invoice_no}</strong>
        </div>

        <div className="summary-card">
          <span>Invoice Date</span>
          <strong>{invoice.invoice_date}</strong>
        </div>

        <div className="summary-card">
          <span>Due Date</span>
          <strong>{invoice.due_date}</strong>
        </div>

        <div className="summary-card highlight">
          <span>Payment Status</span>
          <strong>{invoice.payment_status}</strong>
        </div>

      </div>

      <div className="mini-section">

        <h3>Client Information</h3>

        <p><strong>Name:</strong> {invoice.client.name}</p>
        <p><strong>Email:</strong> {invoice.client.email}</p>
        <p><strong>Country:</strong> {invoice.client.country}</p>

      </div>

      <div className="mini-section">

        <h3>Issued By</h3>

        <p>{invoice.issued_by}</p>

      </div>

      <div className="professional-card">

        <h3>Invoice Summary</h3>

        <p>
          <strong>Quotation Reference:</strong>{" "}
          {invoice.quotation_reference}
        </p>

        <p>
          <strong>Total Amount:</strong>
        </p>

        <h2>
          ₹{invoice.pricing.grand_total.toLocaleString()}
        </h2>

        <p>
          Status:
          <strong> {invoice.status}</strong>
        </p>

      </div>

      <div className="mini-section">

        <h3>Payment Terms</h3>

        <ul>
          {invoice.payment_terms.map((term, index) => (
            <li key={index}>
              {term}
            </li>
          ))}
        </ul>

      </div>

      <div className="mini-section">

        <h3>Bank / Payment Information</h3>

        <p>
          <strong>Account Name:</strong>{" "}
          {invoice.bank_details.account_name}
        </p>

        <p>
          <strong>Payment Mode:</strong>{" "}
          {invoice.bank_details.payment_mode}
        </p>

        <p>
          <strong>Note:</strong>{" "}
          {invoice.bank_details.note}
        </p>

      </div>

    </div>
  );
}

export default InvoiceCard;