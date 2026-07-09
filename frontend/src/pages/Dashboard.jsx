import { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardStats from "../components/DashboardStats";
import ServiceCategories from "../components/ServiceCategories";
import PricingForm from "../components/PricingForm";
import RecentQuotations from "../components/RecentQuotations";
import RecentInvoices from "../components/RecentInvoices";
import "../styles/dashboard.css";

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        <div className="hero">
          <h1>FingertipsTech & FingertipsStatutory</h1>
          <h2>AI Business Assistant Dashboard</h2>
          <p>
            Company Assistant • Pricing Calculator • Currency Conversion •
            Quotation • Invoice
          </p>
        </div>

        {activePage === "dashboard" && (
          <>
            <DashboardStats />
            <RecentQuotations />
            <RecentInvoices />
          </>
        )}

        {activePage === "services" && <ServiceCategories />}

        {activePage === "pricing" && <PricingForm />}

        {activePage === "quotations" && <RecentQuotations />}

        {activePage === "invoices" && <RecentInvoices />}

        {activePage === "assistant" && (
          <div className="card">
            <h2>💬 AI Assistant</h2>
            <p>
              AI chat assistant will be connected here using the existing /ask
              endpoint.
            </p>
          </div>
        )}

        {activePage === "settings" && (
          <div className="card">
            <h2>⚙ Settings</h2>
            <p>Settings page will be added here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;