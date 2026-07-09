import { useEffect, useState } from "react";
import api from "../services/api";

function PricingCalculatorCard({
  formData,
  handleServiceChange,
  calculatePricing,
  loading,
}) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await api.get("/services");
      setServices(response.data.services);
    } catch (error) {
      console.error("Unable to load services:", error);
    }
  };

  return (
    <div className="card">

      <h2>Pricing Calculator</h2>

      <div className="form-grid">

        <div>
          <label>Service</label>

          <select
            name="service_name"
            value={formData.service_name}
            onChange={handleServiceChange}
          >
            {services.map((service) => (
              <option
                key={service.service_name}
                value={service.service_name}
              >
                {service.service_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity</label>

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleServiceChange}
          />
        </div>

        <div>
          <label>Users</label>

          <input
            type="number"
            name="users"
            value={formData.users}
            onChange={handleServiceChange}
          />
        </div>

        <div>
          <label>Integrations</label>

          <input
            type="number"
            name="integrations"
            value={formData.integrations}
            onChange={handleServiceChange}
          />
        </div>

        <div>
          <label>Languages</label>

          <input
            type="number"
            name="languages"
            value={formData.languages}
            onChange={handleServiceChange}
          />
        </div>

      </div>

      <button
        onClick={calculatePricing}
        disabled={loading}
      >
        {loading ? "Calculating..." : "Calculate Pricing"}
      </button>

    </div>
  );
}

export default PricingCalculatorCard;