import ServiceCategories from "../components/ServiceCategories";

function ServicesPage() {
  return (
    <>
      <div className="hero">
        <h1>Services</h1>
        <p>Explore company service categories and business verticals.</p>
      </div>

      <ServiceCategories />
    </>
  );
}

export default ServicesPage;