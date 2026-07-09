function RecentInvoices() {

  const invoices = [
    {
      no:"INV-20260709-001",
      client:"ABC Pvt Ltd",
      country:"Germany",
      amount:"$1062",
      status:"Pending"
    },
    {
      no:"INV-20260709-002",
      client:"TechNova",
      country:"India",
      amount:"₹88500",
      status:"Paid"
    },
    {
      no:"INV-20260709-003",
      client:"Sky Ltd",
      country:"UAE",
      amount:"AED3900",
      status:"Pending"
    }
  ];

  return(

    <div className="card">

      <h2>Recent Invoices</h2>

      <table className="dashboard-table">

        <thead>

          <tr>
            <th>Invoice No</th>
            <th>Client</th>
            <th>Country</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {invoices.map((inv,index)=>(

            <tr key={index}>

              <td>{inv.no}</td>
              <td>{inv.client}</td>
              <td>{inv.country}</td>
              <td>{inv.amount}</td>
              <td>
                <span className="status pending">
                  {inv.status}
                </span>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default RecentInvoices;