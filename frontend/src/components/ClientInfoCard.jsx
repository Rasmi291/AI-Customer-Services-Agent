function ClientInfoCard({ clientData, handleClientChange }) {
  return (
    <div className="card">

      <h2>Client Information</h2>

      <div className="form-grid">

        <div>
          <label>Client Name</label>
          <input
            type="text"
            name="client_name"
            value={clientData.client_name}
            onChange={handleClientChange}
          />
        </div>

        <div>
          <label>Client Email</label>
          <input
            type="email"
            name="client_email"
            value={clientData.client_email}
            onChange={handleClientChange}
          />
        </div>

        <div>
          <label>Country</label>
          <input
            type="text"
            name="client_country"
            value={clientData.client_country}
            onChange={handleClientChange}
          />
        </div>

        <div>
          <label>Preferred Currency</label>

          <select
            name="currency"
            value={clientData.currency}
            onChange={handleClientChange}
          >
            <option value="INR">🇮🇳 INR</option>
            <option value="USD">🇺🇸 USD</option>
            <option value="EUR">🇪🇺 EUR</option>
            <option value="GBP">🇬🇧 GBP</option>
            <option value="AED">🇦🇪 AED</option>
            <option value="CAD">🇨🇦 CAD</option>
            <option value="AUD">🇦🇺 AUD</option>
            <option value="SGD">🇸🇬 SGD</option>
          </select>

        </div>

      </div>

    </div>
  );
}

export default ClientInfoCard;