import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { path: "/", label: "🏠 Dashboard" },
    { path: "/services", label: "📚 Services" },
    { path: "/pricing", label: "💰 Pricing Calculator" },
    { path: "/quotations", label: "📄 Quotations" },
    { path: "/invoices", label: "🧾 Invoices" },
    { path: "/assistant", label: "💬 AI Assistant" },
    { path: "/settings", label: "⚙ Settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Fingertips</h2>
        <p>AI Business Platform</p>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;