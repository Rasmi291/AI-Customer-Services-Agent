import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { serviceCategories } from "../services/data/ServiceCategoriesData";
import "./ServiceCategoryDetails.css";

function ServiceCategoryDetails() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  const category = serviceCategories.find(
    (item) => item.id === categoryId
  );

  if (!category) {
    return (
      <main className="category-details-page">
        <div className="category-not-found">
          <h1>Category not found</h1>
          <p>The requested service category does not exist.</p>

          <Link to="/services" className="back-services-button">
            ← Back to Services
          </Link>
        </div>
      </main>
    );
  }

  const products =
    category.products || category.featuredProducts || [];

  const services =
    category.services || category.featuredServices || [];

  const displayedItems =
    activeTab === "products" ? products : services;

  return (
    <main className="category-details-page">
      <section className="category-details-hero">
        <Link to="/services" className="back-link">
          ← Back to all services
        </Link>

        <div className="category-details-icon">
          {category.icon}
        </div>

        <span className="category-label">
          Business Vertical
        </span>

        <h1>{category.title}</h1>

        <p>{category.description}</p>

        <div className="category-summary">
          <div>
            <strong>{category.productCount}</strong>
            <span>Micro-Niche Products</span>
          </div>

          <div>
            <strong>{category.serviceCount}</strong>
            <span>Professional Services</span>
          </div>

          <div>
            <strong>
              {category.productCount + category.serviceCount}
            </strong>
            <span>Total Solutions</span>
          </div>
        </div>
      </section>

      <section className="category-solutions-section">
        <div className="solutions-heading">
          <span>Explore our offerings</span>

          <h2>{category.title} Solutions</h2>

          <p>
            Browse specialized products and professional services
            designed for specific business requirements.
          </p>
        </div>

        <div className="solution-tabs">
          <button
            type="button"
            className={
              activeTab === "products" ? "active-tab" : ""
            }
            onClick={() => setActiveTab("products")}
          >
            Products ({category.productCount})
          </button>

          <button
            type="button"
            className={
              activeTab === "services" ? "active-tab" : ""
            }
            onClick={() => setActiveTab("services")}
          >
            Services ({category.serviceCount})
          </button>
        </div>

        <div className="solutions-list-grid">
          {displayedItems.map((item, index) => (
            <article className="solution-item-card" key={item}>
              <div className="solution-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <span className="solution-type">
                  {activeTab === "products"
                    ? "Micro-Niche Product"
                    : "Professional Service"}
                </span>

                <h3>{item}</h3>

                <p>
                  Specialized {category.title.toLowerCase()} solution
                  designed to address real business requirements.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/assistant?question=${encodeURIComponent(
                      `Explain ${item} in detail. Include its purpose, key features, benefits, target customers, use cases, implementation process, and pricing information if available.`
                    )}`
                  )
                }
              >
                Explore with AI →
              </button>
            </article>
          ))}
        </div>

        {displayedItems.length < 15 && (
          <div className="catalog-notice">
            <strong>
              Currently showing featured{" "}
              {activeTab === "products"
                ? "products"
                : "services"}.
            </strong>

            <p>
              The complete 15-item catalog will appear here after we
              add all offering names to ServiceCategoriesData.js.
            </p>
          </div>
        )}
      </section>

      <section className="category-details-cta">
        <div>
          <span>Need help selecting a solution?</span>
          <h2>
            Ask our AI Assistant for a personalized recommendation.
          </h2>
        </div>

        <Link to="/assistant">Ask AI Assistant →</Link>
      </section>
    </main>
  );
}

export default ServiceCategoryDetails;