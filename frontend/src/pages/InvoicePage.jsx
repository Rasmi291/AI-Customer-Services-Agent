import RecentInvoices from "../components/RecentInvoices";

function InvoicePage() {
  return (
    <>
      <div className="hero">
        <h1>Invoices</h1>
        <p>View recent invoice records and payment status.</p>
      </div>

      <RecentInvoices />
    </>
  );
}

export default InvoicePage;