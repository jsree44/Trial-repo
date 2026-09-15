import { useState } from "react";
import "./Reviews.css";

function Reviews() {
  const [activeTab, setActiveTab] = useState("product");

  const [productReviews, setProductReviews] = useState([
    {
      id: 1,
      customer: "Anu",
      product: "Lakshmi Bridal Set",
      image: "",
      rating: 5,
      review: "Beautiful bridal set and excellent quality!",
      date: "12 Sep 2026",
    },
    {
      id: 2,
      customer: "Meera",
      product: "Gold Necklace Set",
      image: "/images/gold-necklace-set.jpg",
      rating: 4,
      review: "Really elegant design. Loved it.",
      date: "11 Sep 2026",
    },
    {
      id: 3,
      customer: "Sneha",
      product: "Traditional Jhumka",
      image: "/images/traditional-jhumka.jpg",
      rating: 5,
      review: "Very pretty and exactly as shown.",
      date: "10 Sep 2026",
    },
  ]);

  const [appReviews, setAppReviews] = useState([
    {
      id: 1,
      customer: "Rahul",
      rating: 5,
      review:
        "Very easy to use and the shopping experience was great.",
      date: "12 Sep 2026",
    },
    {
      id: 2,
      customer: "Priya",
      rating: 4,
      review:
        "Good collection and smooth checkout process.",
      date: "09 Sep 2026",
    },
    {
      id: 3,
      customer: "Arjun",
      rating: 3,
      review:
        "The website is good but loading can be improved.",
      date: "07 Sep 2026",
    },
  ]);

  // Delete Product Review
  const deleteProductReview = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    setProductReviews(
      productReviews.filter((review) => review.id !== id)
    );
  };

  // Delete App Review
  const deleteAppReview = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) {
      return;
    }

    setAppReviews(
      appReviews.filter((review) => review.id !== id)
    );
  };

  // Display stars
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="reviews-page">

      {/* Header */}
      <div className="reviews-header">
        <div>
          <h1>Reviews</h1>
          <p>
            Manage product and app reviews
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="review-tabs">
        <button
          className={
            activeTab === "product"
              ? "review-tab active"
              : "review-tab"
          }
          onClick={() => setActiveTab("product")}
        >
          Product Reviews
        </button>

        <button
          className={
            activeTab === "app"
              ? "review-tab active"
              : "review-tab"
          }
          onClick={() => setActiveTab("app")}
        >
          App Reviews
        </button>
      </div>

      {/* Product Reviews */}
      {activeTab === "product" && (
        <>
          {/* Product Highlights */}
          <div className="review-highlights">

            {/* Top Rated Product */}
            <div className="review-highlight-card">

              <div className="highlight-image">
                <img
                  src="/images/lakshmi-bridal-set.jpg"
                  alt="Lakshmi Bridal Set"
                />
              </div>

              <div className="highlight-content">
                <span className="highlight-label">
                  TOP RATED PRODUCT
                </span>

                <h3>Lakshmi Bridal Set</h3>

                <div className="highlight-rating">
                  <span>★★★★★</span>
                  <strong>5.0</strong>
                </div>

                <p>48 Reviews</p>
              </div>

            </div>

            {/* Most Reviewed Product */}
            <div className="review-highlight-card">

              <div className="highlight-image">
                <img
                  src="/images/gold-necklace-set.jpg"
                  alt="Gold Necklace Set"
                />
              </div>

              <div className="highlight-content">
                <span className="highlight-label">
                  MOST REVIEWED PRODUCT
                </span>

                <h3>Gold Necklace Set</h3>

                <div className="highlight-rating">
                  <span>★★★★☆</span>
                  <strong>4.6</strong>
                </div>

                <p>72 Reviews</p>
              </div>

            </div>

          </div>

          {/* Product Review List */}
          <div className="reviews-container">

            <div className="reviews-title">
              <h2>All Product Reviews</h2>

              <p>
                Reviews submitted for individual products
              </p>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {productReviews.map((review) => (
                  <tr key={review.id}>

                    {/* Customer */}
                    <td>
                      <strong>
                        {review.customer}
                      </strong>
                    </td>

                    {/* Product with Image */}
                    <td>
                      <div className="review-product">

                        <img
                          src={review.image}
                          alt={review.product}
                          className="review-product-image"
                        />

                        <div className="review-product-info">
                          <strong>
                            {review.product}
                          </strong>

                          <span>
                            Product
                          </span>
                        </div>

                      </div>
                    </td>

                    {/* Rating */}
                    <td className="stars">
                      {renderStars(review.rating)}
                    </td>

                    {/* Review */}
                    <td>
                      <span className="review-text">
                        {review.review}
                      </span>
                    </td>

                    {/* Date */}
                    <td>
                      {review.date}
                    </td>

                    {/* Action */}
                    <td>
                      <button
                        className="delete-review-btn"
                        onClick={() =>
                          deleteProductReview(review.id)
                        }
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>

          </div>
        </>
      )}

      {/* App Reviews */}
      {activeTab === "app" && (
        <div className="reviews-container">

          <div className="reviews-title">
            <h2>App Reviews</h2>

            <p>
              Reviews and feedback about the overall application
            </p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {appReviews.map((review) => (
                <tr key={review.id}>

                  <td>
                    <strong>
                      {review.customer}
                    </strong>
                  </td>

                  <td className="stars">
                    {renderStars(review.rating)}
                  </td>

                  <td>
                    <span className="review-text">
                      {review.review}
                    </span>
                  </td>

                  <td>
                    {review.date}
                  </td>

                  <td>
                    <button
                      className="delete-review-btn"
                      onClick={() =>
                        deleteAppReview(review.id)
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>

        </div>
      )}

    </div>
  );
}

export default Reviews;