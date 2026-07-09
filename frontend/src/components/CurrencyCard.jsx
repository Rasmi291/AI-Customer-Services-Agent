function CurrencyCard({ currencyResult }) {
  if (!currencyResult) return null;

  return (
    <div className="card">
      <h2>🌍 Currency Conversion</h2>

      <div className="conversion-row">

        <div>
          <span>Original Amount (INR)</span>
          <strong>
            ₹{currencyResult.original_amount_inr.toLocaleString()}
          </strong>
        </div>

        <div className="arrow">
          ➜
        </div>

        <div>
          <span>
            Converted Amount ({currencyResult.conversion.currency})
          </span>

          <strong>
            {currencyResult.conversion.symbol}
            {currencyResult.conversion.amount.toLocaleString()}
          </strong>
        </div>

      </div>

      <div className="mini-section">

        <p>
          <strong>Exchange Rate:</strong>{" "}
          {currencyResult.conversion.exchange_rate}
        </p>

        <p>
          <strong>Conversion Currency:</strong>{" "}
          {currencyResult.conversion.currency}
        </p>

      </div>

    </div>
  );
}

export default CurrencyCard;