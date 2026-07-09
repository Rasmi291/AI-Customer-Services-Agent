import PricingForm from "../components/PricingForm";

function PricingPage() {
  return (
    <>
      <div className="hero">
        <h1>Pricing Calculator</h1>
        <p>Calculate pricing, currency conversion, quotation, and invoice.</p>
      </div>

      <PricingForm />
    </>
  );
}

export default PricingPage;