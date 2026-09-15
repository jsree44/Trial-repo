import { useMemo, useState } from "react";
import { Search, X, Printer, Eye } from "lucide-react";
import "./Orders.css";

const STATUS_OPTIONS = [
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const ORDERS = [
  {
    id: "#1001",
    customer: "Anu",
    email: "anu@gmail.com",
    products: [
      {
        name: "Diamond Ring",
        qty: 1,
        price: 45000,
      },
    ],
    originalAmount: 45000,
    couponCode: null,
    discount: 0,
    finalAmount: 45000,
    date: "12 Sep 2026",
    deliveredDate: null,
    address: "Kochi, Kerala",
    status: "Processing",
  },
  {
    id: "#1002",
    customer: "Meera",
    email: "meera@gmail.com",
    products: [
      {
        name: "Gold Necklace",
        qty: 1,
        price: 82000,
      },
      {
        name: "Gold Earrings",
        qty: 2,
        price: 6500,
      },
    ],
    originalAmount: 95000,
    couponCode: "WELCOME10",
    discount: 9500,
    finalAmount: 85500,
    date: "11 Sep 2026",
    deliveredDate: null,
    address: "Thrissur, Kerala",
    status: "Shipped",
  },
  {
    id: "#1003",
    customer: "Rahul",
    email: "rahul@gmail.com",
    products: [
      {
        name: "Silver Bracelet",
        qty: 2,
        price: 3200,
      },
    ],
    originalAmount: 6400,
    couponCode: null,
    discount: 0,
    finalAmount: 6400,
    date: "10 Sep 2026",
    deliveredDate: "13 Sep 2026",
    address: "Palakkad, Kerala",
    status: "Delivered",
  },
  {
    id: "#1004",
    customer: "Sneha",
    email: "sneha@gmail.com",
    products: [
      {
        name: "Gold Earrings",
        qty: 1,
        price: 6500,
      },
    ],
    originalAmount: 6500,
    couponCode: "SAVE500",
    discount: 500,
    finalAmount: 6000,
    date: "09 Sep 2026",
    deliveredDate: null,
    address: "Kozhikode, Kerala",
    status: "Confirmed",
  },
];

function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return ORDERS.filter((order) => {
      const matchesQuery =
        query === "" ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const getProductSummary = (products) => {
    if (products.length === 1) {
      return `${products[0].name} × ${products[0].qty}`;
    }

    return `${products[0].name} + ${products.length - 1} more`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="orders-page">

      {/* Header */}
      <div className="orders-header">
        <div>
          <h1>Orders</h1>
          <p>Track customer orders and transactions</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="orders-toolbar">

        <div className="search-field">
          <Search size={15} strokeWidth={1.75} />

          <input
            type="text"
            placeholder="Search order ID or customer"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          className="status-filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All statuses</option>

          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <span className="results-count">
          {filteredOrders.length} of {ORDERS.length} orders
        </span>

      </div>

      {/* Orders List */}
      <div className="orders-list">

        {/* List Header */}
        <div className="orders-list-header">
          <span>Order</span>
          <span>Customer</span>
          <span>Products</span>
          <span>Transaction</span>
          <span>Date</span>
          <span>Status</span>
          <span></span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            No orders match your search.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              className="order-row"
              key={order.id}
              onClick={() => setSelectedOrder(order)}
            >
              <div className="order-id">
                {order.id}
              </div>

              <div className="order-customer">
                {order.customer}
              </div>

              <div className="order-products">
                {getProductSummary(order.products)}
              </div>

              {/* Important transaction amount */}
              <div className="order-transaction">
                <strong>
                  ₹{order.finalAmount.toLocaleString("en-IN")}
                </strong>

                {order.discount > 0 && (
                  <span>
                    ₹{order.originalAmount.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <div className="order-date">
                {order.date}
              </div>

              <div>
                <span
                  className={`order-status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Important action */}
              <button
                className="view-details-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedOrder(order);
                }}
              >
                <Eye size={15} strokeWidth={1.8} />
                View
              </button>
            </div>
          ))
        )}

      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="order-modal-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="order-modal"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}
            <div className="modal-header">
              <div>
                <span className="modal-order-label">
                  ORDER DETAILS
                </span>

                <h2>{selectedOrder.id}</h2>

                <p>{selectedOrder.date}</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setSelectedOrder(null)}
              >
                <X size={19} />
              </button>
            </div>

            {/* Customer */}
            <div className="modal-section">
              <h3>Customer</h3>

              <div className="customer-details">

                <div>
                  <span>Name</span>
                  <strong>{selectedOrder.customer}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{selectedOrder.email}</strong>
                </div>

                <div>
                  <span>Delivery Address</span>
                  <strong>{selectedOrder.address}</strong>
                </div>

              </div>
            </div>

            {/* Products */}
            <div className="modal-section">
              <h3>Products</h3>

              <div className="modal-products">

                {selectedOrder.products.map((product, index) => (
                  <div
                    className="modal-product"
                    key={`${product.name}-${index}`}
                  >
                    <div>
                      <strong>{product.name}</strong>
                      <span>
                        ₹{product.price.toLocaleString("en-IN")} ×{" "}
                        {product.qty}
                      </span>
                    </div>

                    <strong>
                      ₹
                      {(product.price * product.qty).toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                ))}

              </div>
            </div>

            {/* Transaction Summary */}
            <div className="modal-section transaction-section">

              <h3>Transaction Summary</h3>

              <div className="amount-row">
                <span>Original Amount</span>

                <span>
                  ₹
                  {selectedOrder.originalAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              {selectedOrder.couponCode && (
                <div className="amount-row discount-row">
                  <span>
                    Coupon ({selectedOrder.couponCode})
                  </span>

                  <span>
                    − ₹
                    {selectedOrder.discount.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              )}

              <div className="total-paid-row">
                <div>
                  <span>Total Paid</span>
                  <small>Final transaction amount</small>
                </div>

                <strong>
                  ₹
                  {selectedOrder.finalAmount.toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>

            </div>

            {/* Order Information */}
            <div className="modal-section">

              <h3>Order Information</h3>

              <div className="order-info-grid">

                <div>
                  <span>Order Date</span>
                  <strong>{selectedOrder.date}</strong>
                </div>

                <div>
                  <span>Delivered Date</span>
                  <strong>
                    {selectedOrder.deliveredDate ||
                      "Not delivered"}
                  </strong>
                </div>

                <div>
                  <span>Status</span>

                  <select
                    className={`modal-status ${selectedOrder.status.toLowerCase()}`}
                    defaultValue={selectedOrder.status}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="modal-footer">

              <button
                className="print-receipt-btn"
                onClick={handlePrint}
              >
                <Printer size={15} />
                Print Receipt
              </button>

            </div>

            {/* Printable Receipt */}
            <div className="print-receipt">

              <div className="receipt-header">
                <h1>JEWELLE</h1>
                <p>Jewelry E-Commerce</p>
              </div>

              <div className="receipt-info">

                <p>
                  <strong>Order ID:</strong>{" "}
                  {selectedOrder.id}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {selectedOrder.date}
                </p>

                <p>
                  <strong>Customer:</strong>{" "}
                  {selectedOrder.customer}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {selectedOrder.email}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {selectedOrder.address}
                </p>

              </div>

              <div className="receipt-products">

                <h3>Products</h3>

                {selectedOrder.products.map((product, index) => (
                  <div
                    className="receipt-product"
                    key={`${product.name}-${index}`}
                  >
                    <span>
                      {product.name} × {product.qty}
                    </span>

                    <span>
                      ₹
                      {(product.price * product.qty).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                ))}

              </div>

              <div className="receipt-total">

                <div>
                  <span>Original Amount</span>

                  <span>
                    ₹
                    {selectedOrder.originalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                {selectedOrder.couponCode && (
                  <div>
                    <span>
                      Discount ({selectedOrder.couponCode})
                    </span>

                    <span>
                      − ₹
                      {selectedOrder.discount.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                )}

                <div className="receipt-final">
                  <strong>Total Paid</strong>

                  <strong>
                    ₹
                    {selectedOrder.finalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

              </div>

              <p className="receipt-thank-you">
                Thank you for shopping with Jewelle!
              </p>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Orders;
