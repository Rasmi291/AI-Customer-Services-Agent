import DashboardStats from "../components/DashboardStats";
import RecentQuotations from "../components/RecentQuotations";
import RecentInvoices from "../components/RecentInvoices";

function DashboardPage() {
  return (
    <>
      <div className="hero">
        <h1>FingertipsTech & FingertipsStatutory</h1>
        <h2>AI Business Assistant Dashboard</h2>
        <p>Business overview, quotations, invoices, and AI-powered services.</p>
      </div>

      <DashboardStats />
      <RecentQuotations />
      <RecentInvoices />
    </>
  );
}

export default DashboardPage;