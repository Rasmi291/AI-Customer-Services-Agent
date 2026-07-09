function DashboardStats() {
  const stats = [
    {
      title: "Business Verticals",
      value: "7",
      note: "AI, Digital Marketing, Cybersecurity, Legal, HR, Accounting, Audit",
    },
    {
      title: "Micro-Niche Services",
      value: "210+",
      note: "Products and services across multiple divisions",
    },
    {
      title: "Global Reach",
      value: "18+",
      note: "Countries targeted for service delivery",
    },
    {
      title: "AI Support",
      value: "24×7",
      note: "Customer assistance and business support",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item, index) => (
        <div className="stat-card" key={index}>
          <span>{item.title}</span>
          <h3>{item.value}</h3>
          <p>{item.note}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;