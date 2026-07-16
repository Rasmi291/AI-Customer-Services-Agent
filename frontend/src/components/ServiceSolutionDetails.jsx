import React from "react";
import { Link, useParams } from "react-router-dom";
import { serviceCategories } from "../services/data/ServiceCategoriesData";
import "./ServiceSolutionDetails.css";

function ServiceSolutionDetails() {
  const { categoryId, solutionName } = useParams();

  const category = serviceCategories.find(
    (item) => item.id === categoryId
  );

  const decodedSolutionName = decodeURIComponent(solutionName);

  if (!category) {
    return (
      <main className="solution-details-page">
        <div className="solution-not-found">
          <h1>Category not found</h1>

          <Link to="/services">
            ← Back to Services
          </Link>
        </div>
      </main>
    );
  }

  const isProduct =
    category.featuredProducts.includes(decodedSolutionName);

  const isService =
    category.featuredServices.includes(decodedSolutionName);

  if (!isProduct && !isService) {
    return (
      <main className="solution-details-page">
        <div className="solution-not-found">
          <h1>Solution not found</h1>

          <Link to={`/services/${categoryId}`}>
            ← Back to {category.title}
          </Link>
        </div>
      </main>
    );
  }

  const solutionType = isProduct
    ? "Micro-Niche Product"
    : "Professional Service";

  return (
    <main className="solution-details-page">
      <section className="solution-details-hero">
        <Link
          to={`/services/${categoryId}`}
          className="solution-back-link"
        >
          ← Back to {category.title}
        </Link>

        <span className="solution-category-label">
          {category.title}
        </span>

        <h1>{decodedSolutionName}</h1>

        <p>
          A specialized {category.title.toLowerCase()} solution designed
          to address specific business requirements and improve operational
          performance.
        </p>

        <div className="solution-badges">
          <span>{solutionType}</span>
          <span>{category.title}</span>
        </div>
      </section>

      <section className="solution-content-grid">
        <article className="solution-info-card">
          <h2>Overview</h2>

          <p>
            {decodedSolutionName} helps organizations solve targeted
            business challenges through a focused and practical solution.
          </p>
        </article>

        <article className="solution-info-card">
          <h2>Problem Solved</h2>

          <p>
            It reduces manual effort, improves consistency and supports
            better business decisions in the {category.title.toLowerCase()}
            vertical.
          </p>
        </article>

        <article className="solution-info-card">
          <h2>Who It Is For</h2>

          <ul>
            <li>Startups</li>
            <li>Small and medium businesses</li>
            <li>Growing organizations</li>
            <li>Industry-specific teams</li>
          </ul>
        </article>

        <article className="solution-info-card">
          <h2>Key Benefits</h2>

          <ul>
            <li>Specialized business solution</li>
            <li>Improved efficiency</li>
            <li>Scalable implementation</li>
            <li>Professional support</li>
          </ul>
        </article>
      </section>

      <section className="solution-details-cta">
        <div>
          <span>Need more information?</span>

          <h2>
            Ask our AI Assistant about {decodedSolutionName}.
          </h2>
        </div>

        <Link
          to={`/assistant?solution=${encodeURIComponent(
            decodedSolutionName
          )}&category=${encodeURIComponent(category.title)}`}
        >
          Ask AI Assistant →
        </Link>
      </section>
    </main>
  );
}

export default ServiceSolutionDetails;