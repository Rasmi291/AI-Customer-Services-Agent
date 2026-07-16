import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serviceCategories } from "../services/data/ServiceCategoriesData";
import "./ServiceCategories.css";

function ServiceCategories() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCategories = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return serviceCategories;
    }

    return serviceCategories.filter((category) => {
      const searchableText = [
        category.title,
        category.description,
        ...category.featuredProducts,
        ...category.featuredServices,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(search);
    });
  }, [searchTerm]);

  const handleExplore = (categoryId) => {
    navigate(`/services/${categoryId}`);
  };

  return (
    <main className="services-page">
      <section className="services-hero">
        <div className="services-hero-content">
          <span className="services-label">Our Business Solutions</span>

          <h1>Explore 210 Micro-Niche Products and Services</h1>

          <p>
            Discover specialized solutions across seven business verticals,
            designed for startups, SMEs and growing organizations.
          </p>

          <div className="services-search-wrapper">
            <input
              type="search"
              placeholder="Search AI, cybersecurity, SEO, HR, accounting..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search services"
            />
          </div>
        </div>
      </section>

      <section className="services-stats">
        <div className="stat-card">
          <strong>210</strong>
          <span>Micro-Niche Offerings</span>
        </div>

        <div className="stat-card">
          <strong>105</strong>
          <span>Products</span>
        </div>

        <div className="stat-card">
          <strong>105</strong>
          <span>Services</span>
        </div>

        <div className="stat-card">
          <strong>7</strong>
          <span>Business Verticals</span>
        </div>
      </section>

      <section className="categories-section">
        <div className="section-heading">
          <span>Explore by vertical</span>
          <h2>Solutions built around specific business needs</h2>
          <p>
            Each vertical includes 15 micro-niche products and 15 professional
            services.
          </p>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="service-categories-grid">
            {filteredCategories.map((category) => (
              <article className="service-category-card" key={category.id}>
                <div className="category-card-header">
                  <div className="category-icon" aria-hidden="true">
                    {category.icon}
                  </div>

                  <div className="category-count">
                    <span>{category.productCount} Products</span>
                    <span>{category.serviceCount} Services</span>
                  </div>
                </div>

                <h3>{category.title}</h3>

                <p className="category-description">
                  {category.description}
                </p>

                <div className="featured-solutions">
                  <div>
                    <h4>Featured Products</h4>
                    <ul>
                      {category.featuredProducts.slice(0, 3).map((product) => (
                        <li key={product}>{product}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Featured Services</h4>
                    <ul>
                      {category.featuredServices.slice(0, 3).map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  className="explore-button"
                  onClick={() => handleExplore(category.id)}
                >
                  Explore All 30 Solutions
                  <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h3>No matching solutions found</h3>
            <p>Try searching with another service or product name.</p>

            <button type="button" onClick={() => setSearchTerm("")}>
              Clear Search
            </button>
          </div>
        )}
      </section>

      <section className="services-cta">
        <div>
          <span>Not sure which solution fits your business?</span>
          <h2>Get a personalized recommendation from our AI Assistant.</h2>
        </div>

        <button
          type="button"
          onClick={() => navigate("/assistant")}
        >
          Ask AI Assistant
        </button>
      </section>
    </main>
  );
}

export default ServiceCategories;