import "./Dashboard.css";
import {
  Gem,
  Users,
  ShoppingBag,
  Wallet,
  AlertTriangle,
  Star,
  Trash2,
} from "lucide-react";

function Dashboard() {
  // Dashboard statistics
  const stats = [
    {
      title: "Total Products",
      value: "120",
      icon: Gem,
      description: "Jewelry products",
    },
    {
      title: "Total Customers",
      value: "540",
      icon: Users,
      description: "Registered customers",
    },
    {
      title: "Total Orders",
      value: "86",
      icon: ShoppingBag,
      description: "Orders received",
    },
    {
      title: "Total Revenue",
      value: "\u20B92,45,000",
      icon: Wallet,
      description: "Overall revenue",
    },
  ];

  // Low stock products
  const lowStockProducts = [
    {
      name: "Diamond Ring",
      stock: 3,
    },
    {
      name: "Gold Necklace",
      stock: 2,
    },
    {
      name: "Silver Bracelet",
      stock: 4,
    },
  ];

  // Recent orders
  const recentOrders = [
    {
      id: "#1001",
      customer: "Anu",
      product: "Diamond Ring",
      amount: "\u20B94,500",
      status: "Processing",
    },
    {
      id: "#1002",
      customer: "Meera",
      product: "Gold Necklace",
      amount: "\u20B98,200",
      status: "Shipped",
    },
    {
      id: "#1003",
      customer: "Rahul",
      product: "Silver Bracelet",
      amount: "\u20B93,200",
      status: "Delivered",
    },
    {
      id: "#1004",
      customer: "Sneha",
      product: "Gold Earrings",
      amount: "\u20B96,500",
      status: "Confirmed",
    },
  ];

  // Recent customer reviews
  const recentReviews = [
    {
      id: 1,
      customer: "Anu",
      product: "Diamond Ring",
      rating: 5,
      review: "Beautiful ring and excellent quality.",
    },
    {
      id: 2,
      customer: "Meera",
      product: "Gold Necklace",
      rating: 4,
      review: "Really elegant design. Loved it.",
    },
    {
      id: 3,
      customer: "Sneha",
      product: "Gold Earrings",
      rating: 5,
      review: "Very pretty and exactly as shown.",
    },
  ];

  // Delete review
  const handleDeleteReview = (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (confirmed) {
      console.log("Delete review:", reviewId);

      // Later:
      // Call backend API here
      // DELETE /api/reviews/:reviewId
    }
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="welcome">Welcome back, Admin</p>
          <h1>Dashboard</h1>
          <p className="subtitle">
            Here is what is happening with your jewelry store.
          </p>
        </div>

        <div className="header-badge">
          <Gem size={24} strokeWidth={1.75} />
        </div>
      </div>


      {/* Statistics */}
      <div className="stats-container">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-icon">
                <Icon size={22} strokeWidth={1.75} />
              </div>

              <div className="stat-info">
                <p>{stat.title}</p>
                <h2>{stat.value}</h2>
                <span>{stat.description}</span>
              </div>
            </div>
          );
        })}
      </div>


      {/* Low Stock + Recent Orders */}
      <div className="dashboard-grid">

        {/* Low Stock */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Low Stock Products</h2>
              <p>Products that need attention</p>
            </div>

            <span className="card-icon">
              <AlertTriangle size={17} strokeWidth={1.75} />
            </span>
          </div>

          <div className="stock-list">
            {lowStockProducts.map((product) => (
              <div className="stock-item" key={product.name}>
                <div className="product-icon">
                  <Gem size={17} strokeWidth={1.75} />
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>Only {product.stock} left</p>
                </div>

                <span className="badge low-stock">Low Stock</span>
              </div>
            ))}
          </div>
        </div>


        {/* Recent Orders */}
        <div className="dashboard-card orders-card">
          <div className="card-header">
            <div>
              <h2>Recent Orders</h2>
              <p>Latest customer orders</p>
            </div>

            <span className="card-icon">
              <ShoppingBag size={17} strokeWidth={1.75} />
            </span>
          </div>

          <div className="orders-list">
            <div className="order-row orders-list-header">
              <span>Order</span>
              <span>Product</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {recentOrders.map((order) => (
              <div className="order-item" key={order.id}>
                <div className="order-row">
                  <div className="order-id">
                    <strong>{order.id}</strong>
                    <span>{order.customer}</span>
                  </div>

                  <div className="order-product">{order.product}</div>

                  <div className="order-amount">{order.amount}</div>

                  <span
                    className={`status ${order.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>


      {/* Recent Reviews */}
      <div className="dashboard-card reviews-card">
        <div className="card-header">
          <div>
            <h2>Recent Reviews</h2>
            <p>Latest customer feedback</p>
          </div>

          <span className="card-icon">
            <Star size={17} strokeWidth={1.75} />
          </span>
        </div>

        <div className="reviews-list">
          {recentReviews.map((review) => (
            <div className="review-item" key={review.id}>
  <div className="review-product">
    <div className="review-product-image">
      💎
    </div>

    <div className="review-details">
      <div className="review-top">
        <div>
          <h3>{review.customer}</h3>
          <p>{review.product}</p>
        </div>

        <div className="rating">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={15}
              strokeWidth={1.75}
              fill={index < review.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>

      <p className="review-text">
        &ldquo;{review.review}&rdquo;
      </p>

      <button
        className="delete-review"
        onClick={() => handleDeleteReview(review.id)}
      >
        <Trash2 size={14} strokeWidth={1.75} />
        Delete Review
      </button>
    </div>
  </div>
</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
