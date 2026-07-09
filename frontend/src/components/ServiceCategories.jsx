function ServiceCategories() {
  const categories = [
    {
      icon: "🤖",
      title: "AI Services",
      items: [
        "AI Customer Support Agent",
        "AI Sales Agent",
        "AI HR Assistant",
        "RAG Knowledge Base Setup",
        "WhatsApp AI Agent",
      ],
    },
    {
      icon: "📈",
      title: "Digital Marketing",
      items: [
        "Website SEO",
        "Google Ads",
        "Social Media Marketing",
        "Content Marketing",
        "Lead Generation",
      ],
    },
    {
      icon: "🔐",
      title: "Cyber Security",
      items: [
        "Cyber Health Scanner",
        "Security Audit",
        "VAPT",
        "Risk Assessment",
        "Compliance Support",
      ],
    },
    {
      icon: "📋",
      title: "Business Audit",
      items: [
        "Free Business Audit",
        "Quarterly Audit",
        "Growth Audit",
        "Process Review",
        "Business Report",
      ],
    },
  ];

  return (
    <div className="card">
      <h2>Service Categories</h2>

      <div className="service-category-grid">
        {categories.map((category, index) => (
          <div className="service-category-card" key={index}>
            <h3>
              <span>{category.icon}</span> {category.title}
            </h3>

            <ul>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>✓ {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceCategories;