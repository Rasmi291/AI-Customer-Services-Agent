function RecentQuotations() {

  const quotations = [
    {
      no: "QT-20260709-001",
      client: "ABC Pvt Ltd",
      country: "Germany",
      amount: "$1062",
      status: "Ready"
    },
    {
      no: "QT-20260709-002",
      client: "TechNova",
      country: "India",
      amount: "₹88500",
      status: "Sent"
    },
    {
      no: "QT-20260709-003",
      client: "Sky Ltd",
      country: "UAE",
      amount: "AED 3900",
      status: "Pending"
    }
  ];

  return (

    <div className="card">

      <h2>Recent Quotations</h2>

      <table className="dashboard-table">

        <thead>

          <tr>
            <th>Quotation No</th>
            <th>Client</th>
            <th>Country</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {quotations.map((q,index)=>(
            <tr key={index}>
              <td>{q.no}</td>
              <td>{q.client}</td>
              <td>{q.country}</td>
              <td>{q.amount}</td>
              <td>
                <span className="status ready">
                  {q.status}
                </span>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );

}

export default RecentQuotations;