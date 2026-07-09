import { useState } from "react";
import api from "../services/api";

import ClientInfoCard from "./ClientInfoCard";
import PricingCalculatorCard from "./PricingCalculator";
import PricingSummaryCard from "./PricingSummaryCard";
import CurrencyCard from "./CurrencyCard";
import QuotationCard from "./QuotationCard";
import InvoiceCard from "./InvoiceCard";

function PricingForm() {
  const [formData, setFormData] = useState({
    service_name: "AI Customer Support Agent",
    quantity: 1,
    users: 120,
    integrations: 3,
    languages: 5,
  });

  const [clientData, setClientData] = useState({
    client_name: "ABC Pvt Ltd",
    client_email: "client@example.com",
    client_country: "Germany",
    currency: "USD",
  });

  const [pricing, setPricing] = useState(null);
  const [currencyResult, setCurrencyResult] = useState(null);
  const [quotation, setQuotation] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleServiceChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleClientChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const calculatePricing = async () => {
    try {
      setLoading(true);

      const response = await api.post("/pricing/calculate", {
        items: [formData],
      });

      setPricing(response.data);
      setCurrencyResult(null);
      setQuotation(null);
      setInvoice(null);
    } catch (error) {
      console.error(error);
      alert("Pricing calculation failed.");
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = async () => {
    if (!pricing) {
      alert("Please calculate pricing first.");
      return;
    }

    try {
      const response = await api.post("/pricing/convert", {
        amount: pricing.grand_total,
        currency: clientData.currency,
      });

      setCurrencyResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Currency conversion failed.");
    }
  };

  const generateQuotation = async () => {
    try {
      const response = await api.post("/quotation/generate", {
        ...clientData,
        items: [formData],
      });

      setQuotation(response.data);
    } catch (error) {
      console.error(error);
      alert("Quotation generation failed.");
    }
  };

  const generateInvoice = async () => {
    try {
      const response = await api.post("/invoice/generate", {
        ...clientData,
        items: [formData],
      });

      setInvoice(response.data);
    } catch (error) {
      console.error(error);
      alert("Invoice generation failed.");
    }
  };

  return (
    <>
      <ClientInfoCard
        clientData={clientData}
        handleClientChange={handleClientChange}
      />

      <PricingCalculatorCard
        formData={formData}
        handleServiceChange={handleServiceChange}
        calculatePricing={calculatePricing}
        loading={loading}
      />

      <PricingSummaryCard
        pricing={pricing}
        convertCurrency={convertCurrency}
        generateQuotation={generateQuotation}
        generateInvoice={generateInvoice}
      />

      <CurrencyCard currencyResult={currencyResult} />

      <QuotationCard quotation={quotation} />

      <InvoiceCard invoice={invoice} />
    </>
  );
}

export default PricingForm;