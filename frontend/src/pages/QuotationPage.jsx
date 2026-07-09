import RecentQuotations from "../components/RecentQuotations";

function QuotationPage() {
  return (
    <>
      <div className="hero">
        <h1>Quotations</h1>
        <p>View recent quotation records.</p>
      </div>

      <RecentQuotations />
    </>
  );
}

export default QuotationPage;