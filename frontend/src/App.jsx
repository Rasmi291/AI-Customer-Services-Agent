import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import DashboardPage from "./pages/DashboardPage";
import PricingPage from "./pages/PricingPage";
import ServicesPage from "./pages/ServicesPage";
import QuotationPage from "./pages/QuotationPage";
import InvoicePage from "./pages/InvoicePage";
import AssistantPage from "./pages/AssistantPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/quotations" element={<QuotationPage />} />
          <Route path="/invoices" element={<InvoicePage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;