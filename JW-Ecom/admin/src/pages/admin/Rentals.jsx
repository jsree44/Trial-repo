import { useState, useMemo } from "react";
import {
  Search,
  Eye,
  X,
  CalendarDays,
  CheckCircle,
  Clock,
  IndianRupee,
  AlertTriangle,
  Download,
  RefreshCcw,
} from "lucide-react";
import "./Rentals.css";

const INITIAL_RENTALS = [
  {
    id: "REN001",
    customer: "Anjali Menon",
    phone: "9876543210",
    email: "anjali@gmail.com",

    product: "Lakshmi Bridal Set",
    category: "Bridal Set",

    bookingDate: "10 Sep 2026",
    startDate: "12 Sep 2026",
    returnDate: "15 Sep 2026",

    actualReturnDate: "-",
    days: 3,
    pricePerDay: 2500,
    rentalAmount: 7500,

    advancePaid: 3000,
    balanceAmount: 4500,
    securityDeposit: 5000,

    status: "Active",
    paymentStatus: "Advance Paid",

    returnCondition: "-",
    returnNotes: "",
    depositRefunded: 0,
    deduction: 0,
    lateFee: 0,
  },

  {
    id: "REN002",
    customer: "Meera Nair",
    phone: "9876543211",
    email: "meera@gmail.com",

    product: "Maharani Necklace Set",
    category: "Necklace Set",

    bookingDate: "05 Sep 2026",
    startDate: "08 Sep 2026",
    returnDate: "10 Sep 2026",

    actualReturnDate: "10 Sep 2026",
    days: 2,
    pricePerDay: 2000,
    rentalAmount: 4000,

    advancePaid: 4000,
    balanceAmount: 0,
    securityDeposit: 5000,

    status: "Returned",
    paymentStatus: "Fully Paid",

    returnCondition: "Good",
    returnNotes: "Returned in good condition.",
    depositRefunded: 5000,
    deduction: 0,
    lateFee: 0,
  },

  {
    id: "REN003",
    customer: "Priya Krishnan",
    phone: "9876543212",
    email: "priya@gmail.com",

    product: "Temple Jewellery Set",
    category: "Temple Jewellery",

    bookingDate: "15 Sep 2026",
    startDate: "20 Sep 2026",
    returnDate: "23 Sep 2026",

    actualReturnDate: "-",
    days: 3,
    pricePerDay: 1800,
    rentalAmount: 5400,

    advancePaid: 2000,
    balanceAmount: 3400,
    securityDeposit: 4000,

    status: "Pre-booked",
    paymentStatus: "Advance Paid",

    returnCondition: "-",
    returnNotes: "",
    depositRefunded: 0,
    deduction: 0,
    lateFee: 0,
  },

  {
    id: "REN004",
    customer: "Lakshmi R",
    phone: "9876543213",
    email: "lakshmi@gmail.com",

    product: "Bridal Kasu Mala",
    category: "Necklace",

    bookingDate: "01 Sep 2026",
    startDate: "05 Sep 2026",
    returnDate: "07 Sep 2026",

    actualReturnDate: "-",
    days: 2,
    pricePerDay: 1500,
    rentalAmount: 3000,

    advancePaid: 3000,
    balanceAmount: 0,
    securityDeposit: 3000,
    bookingDate: "15 Sep 2026",
paymentStatus: "Advance Paid",
bookingStatus: "Pre-booked",

    status: "Overdue",
    paymentStatus: "Fully Paid",

    returnCondition: "-",
    returnNotes: "",
    depositRefunded: 0,
    deduction: 0,
    lateFee: 500,
  },

  {
    id: "REN005",
    customer: "Devika S",
    phone: "9876543214",
    email: "devika@gmail.com",

    product: "Traditional Jhumka Set",
    category: "Earrings",

    bookingDate: "28 Aug 2026",
    startDate: "02 Sep 2026",
    returnDate: "04 Sep 2026",

    actualReturnDate: "04 Sep 2026",
    days: 2,
    pricePerDay: 1000,
    rentalAmount: 2000,

    advancePaid: 1000,
    balanceAmount: 1000,
    securityDeposit: 2000,
    bookingDate: "15 Sep 2026",
    paymentStatus: "Advance Paid",
    bookingStatus: "Pre-booked",

    status: "Returned",
    paymentStatus: "Fully Paid",

    returnCondition: "Minor Damage",
    returnNotes: "Small scratch noticed on the product.",
    depositRefunded: 1700,
    deduction: 300,
    lateFee: 0,
  },
];
function formatCurrency(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

const STATUS_OPTIONS = [
  "All",
  "Upcoming",
  "Active",
  "Returned",
  "Overdue",
  "Pre-booked",
];

function Rentals() {
  const [rentals, setRentals] = useState(INITIAL_RENTALS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All time");
  const [selectedRental, setSelectedRental] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const withinDateFilter = (dateStr) => {
    if (dateFilter === "All time") return true;

    const rentalDate = new Date(dateStr);
    const today = new Date();

    const start = new Date(today);

    if (dateFilter === "Today") {
      start.setHours(0, 0, 0, 0);
    } else if (dateFilter === "This week") {
      start.setDate(today.getDate() - 6);
    } else if (dateFilter === "This month") {
      start.setDate(1);
    }

    return rentalDate >= start && rentalDate <= today;
  };

  const filteredRentals = rentals.filter((rental) => {
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      rental.id.toLowerCase().includes(query) ||
      rental.customer.toLowerCase().includes(query) ||
      rental.product.toLowerCase().includes(query) ||
      rental.category.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" ||
      rental.status === statusFilter;

    const matchesDate = withinDateFilter(rental.startDate);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const sortedRentals = useMemo(() => {
    return [...filteredRentals].sort((a, b) => {
      return (
        new Date(b.startDate).getTime() -
        new Date(a.startDate).getTime()
      );
    });
  }, [filteredRentals]);

  const totalRentals = rentals.length;

  const activeRentals = rentals.filter(
    (rental) => rental.status === "Active"
  ).length;

  const upcomingRentals = rentals.filter(
    (rental) => rental.status === "Upcoming"
  ).length;

  const overdueRentals = rentals.filter(
    (rental) => rental.status === "Overdue"
  ).length;

  const returnedRentals = rentals.filter(
    (rental) => rental.status === "Returned"
  ).length;

  const totalAdvance = rentals.reduce(
    (total, rental) => total + rental.advancePaid,
    0
  );

  const exportCSV = () => {
    const header = [
      "Rental ID",
      "Customer",
      "Product",
      "Start Date",
      "Return Date",
      "Days",
      "Rental Amount",
      "Advance Paid",
      "Balance",
      "Deposit",
      "Status",
    ];

    const rows = sortedRentals.map((rental) => [
      rental.id,
      rental.customer,
      rental.product,
      rental.startDate,
      rental.returnDate,
      rental.days,
      rental.rentalAmount,
      rental.advancePaid,
      rental.balanceAmount,
      rental.securityDeposit,
      rental.status,
    ]);

    const csvContent = [header, ...rows]
      .map((row) =>
        row.map((cell) => `"${cell}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "rentals.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  const markAsReturned = (rental) => {
    const updatedRental = {
      ...rental,
      status: "Returned",
      actualReturnDate: new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
      returnCondition: "Good",
      depositRefunded: rental.securityDeposit,
    };

    setRentals(
      rentals.map((item) =>
        item.id === rental.id ? updatedRental : item
      )
    );

    setSelectedRental(updatedRental);
  };

  return (
    <div className="rentals-page">

      {/* Header */}
      <div className="rentals-header">
        <div>
          <h1>Rentals</h1>
          <p>
            Track rental bookings, payments and returns
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="rental-stats">

        <div className="rental-stat-card">
          <div className="rental-stat-icon">
            <CalendarDays size={18} />
          </div>

          <div>
            <span>Total Rentals</span>
            <strong>{totalRentals}</strong>
          </div>
        </div>

        <div className="rental-stat-card">
          <div className="rental-stat-icon">
            <Clock size={18} />
          </div>

          <div>
            <span>Currently Rented</span>
            <strong>{activeRentals}</strong>
          </div>
        </div>

        <div className="rental-stat-card">
          <div className="rental-stat-icon">
            <CalendarDays size={18} />
          </div>

          <div>
            <span>Upcoming</span>
            <strong>{upcomingRentals}</strong>
          </div>
        </div>

        <div className="rental-stat-card">
          <div className="rental-stat-icon">
            <AlertTriangle size={18} />
          </div>

          <div>
            <span>Overdue</span>
            <strong>{overdueRentals}</strong>
          </div>
        </div>

      </div>

      {/* Toolbar */}
      <div className="rentals-toolbar">

        <div className="rental-search">
          <Search size={15} />

          <input
            type="text"
            placeholder="Search rental, customer or product"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <select
          className="rental-filter"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status === "All"
                ? "All Status"
                : status}
            </option>
          ))}
        </select>

        <select
          className="rental-filter"
          value={dateFilter}
          onChange={(event) =>
            setDateFilter(event.target.value)
          }
        >
          <option value="All time">All time</option>
          <option value="Today">Today</option>
          <option value="This week">This week</option>
          <option value="This month">This month</option>
        </select>

        <button
          className="toolbar-icon-btn"
          onClick={handleRefresh}
        >
          <RefreshCcw size={14} />
        </button>

        <button
          className="toolbar-icon-btn"
          onClick={exportCSV}
        >
          <Download size={14} />
          Export
        </button>

        <span className="rental-count">
          {sortedRentals.length} rentals
        </span>

      </div>

      {/* Rental List */}
      <div className="rentals-list">

        <div className="rentals-list-header">
          <span>Rental</span>
          <span>Customer</span>
          <span>Product</span>
          <span>Rental Period</span>
          <span>Advance Paid</span>
          <span>Status</span>
          <span></span>
        </div>

        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <div
              className="rental-row skeleton-row"
              key={index}
            >
              <div className="skeleton-bar" />
              <div className="skeleton-bar" />
              <div className="skeleton-bar" />
              <div className="skeleton-bar" />
              <div className="skeleton-bar" />
              <div className="skeleton-bar" />
              <div className="skeleton-bar" />
            </div>
          ))}

        {!isLoading &&
          sortedRentals.map((rental) => (
            <div
              className="rental-row"
              key={rental.id}
            >

              <div className="rental-id">
                {rental.id}

                <span>
                  {rental.days} rental days
                </span>
              </div>

              <div>
                <strong>{rental.customer}</strong>
                <span>{rental.phone}</span>
              </div>

              <div>
                <strong>{rental.product}</strong>
                <span>{rental.category}</span>
              </div>

              <div className="rental-date">
                <strong>{rental.startDate}</strong>
                <span>
                  Return: {rental.returnDate}
                </span>
              </div>

              <div className="rental-payment">
                {formatCurrency(rental.advancePaid)}
                <span>
                  of {formatCurrency(rental.rentalAmount)}
                </span>
              </div>

              <div>
                <span
                  className={`rental-status ${rental.status.toLowerCase()}`}
                >
                  {rental.status}
                </span>
              </div>

              <button
                className="rental-view-btn"
                onClick={() =>
                  setSelectedRental(rental)
                }
              >
                <Eye size={14} />
                View
              </button>

            </div>
          ))}

        {!isLoading &&
          sortedRentals.length === 0 && (
            <div className="rental-empty">
              No rentals found.
            </div>
          )}

      </div>

      {/* Details Modal */}
      {selectedRental && (
        <div
          className="rental-modal-overlay"
          onClick={() =>
            setSelectedRental(null)
          }
        >

          <div
            className="rental-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Modal Header */}
            <div className="rental-modal-header">

              <div>
                <span>RENTAL DETAILS</span>
                <h2>{selectedRental.id}</h2>
              </div>

              <button
                onClick={() =>
                  setSelectedRental(null)
                }
              >
                <X size={18} />
              </button>

            </div>

            {/* Status Banner */}
            {selectedRental.status === "Overdue" && (
              <div className="modal-warning">
                <AlertTriangle size={15} />
                This rental is overdue for return.
              </div>
            )}

            {/* Customer + Product */}
            <div className="rental-people">

              <div className="rental-person-card">
                <span className="person-label">
                  CUSTOMER
                </span>

                <strong>
                  {selectedRental.customer}
                </strong>

                <p>
                  {selectedRental.phone}
                </p>

                <p>
                  {selectedRental.email}
                </p>
              </div>

              <div className="rental-arrow">
                →
              </div>

              <div className="rental-person-card">
                <span className="person-label">
                  RENTAL PRODUCT
                </span>

                <strong>
                  {selectedRental.product}
                </strong>

                <p>
                  {selectedRental.category}
                </p>

                <p>
                  {formatCurrency(
                    selectedRental.pricePerDay
                  )}{" "}
                  / day
                </p>
              </div>

            </div>

            {/* Rental Information */}
            <div className="rental-info-card">

              <div className="info-item">
                <span>Rental Start</span>
                <strong>
                  {selectedRental.startDate}
                </strong>
              </div>
            <div className="info-item">
              <span>Booked On</span>
                <strong> 
                  {selectedRental.bookingDate}
                </strong>
              </div>

              <div className="info-item">
                <span>Expected Return</span>
                <strong>
                  {selectedRental.returnDate}
                </strong>
              </div>

              <div className="info-item">
                <span>Rental Days</span>
                <strong>
                  {selectedRental.days} days
                </strong>
              </div>

              <div className="info-item">
                <span>Rental Amount</span>
                <strong>
                  {formatCurrency(
                    selectedRental.rentalAmount
                  )}
                </strong>
              </div>

              <div className="info-item">
                <span>Advance Paid</span>
                <strong>
                  {formatCurrency(
                    selectedRental.advancePaid
                  )}
                </strong>
              </div>

              <div className="info-item">
                <span>Balance</span>
                <strong>
                  {formatCurrency(
                    selectedRental.balanceAmount
                  )}
                </strong>
              </div>

              <div className="info-item">
                <span>Security Deposit</span>
                <strong>
                  {formatCurrency(
                    selectedRental.securityDeposit
                  )}
                </strong>
              </div>

              <div className="info-item">
                <span>Status</span>

                <strong
                  className={`modal-rental-status ${selectedRental.status.toLowerCase()}`}
                >
                  {selectedRental.status}
                </strong>
              </div>

              <div className="info-item">
                <span>Actual Return</span>
                <strong>
                  {selectedRental.actualReturnDate ||
                    "Not returned"}
                </strong>
              </div>

            </div>

            {/* Return Information */}
            <div className="return-section">

              <div className="section-title">
                <CheckCircle size={15} />
                Return Information
              </div>

              {selectedRental.status === "Returned" ? (
                <div className="return-grid">

                  <div className="info-item">
                    <span>Condition</span>
                    <strong>
                      {selectedRental.returnCondition}
                    </strong>
                  </div>

                  <div className="info-item">
                    <span>Deposit Refunded</span>
                    <strong>
                      {formatCurrency(
                        selectedRental.depositRefunded
                      )}
                    </strong>
                  </div>

                  <div className="info-item">
                    <span>Deduction</span>
                    <strong>
                      {formatCurrency(
                        selectedRental.deduction
                      )}
                    </strong>
                  </div>

                  <div className="info-item">
                    <span>Late Fee</span>
                    <strong>
                      {formatCurrency(
                        selectedRental.lateFee
                      )}
                    </strong>
                  </div>

                  <div className="return-notes">
                    <span>Return Notes</span>

                    <p>
                      {selectedRental.returnNotes ||
                        "No notes added."}
                    </p>
                  </div>

                </div>
              ) : (
                <div className="not-returned">
                  <Clock size={15} />

                  <span>
                    This item has not been returned yet.
                  </span>
                </div>
              )}

            </div>

            {/* Actions */}
            {selectedRental.status === "Active" ||
              selectedRental.status === "Overdue" ? (
              <div className="modal-actions">

                <button
                  className="mark-returned-btn"
                  onClick={() =>
                    markAsReturned(selectedRental)
                  }
                >
                  <CheckCircle size={14} />
                  Mark as Returned
                </button>

              </div>
            ) : null}

          </div>

        </div>
      )}

    </div>
  );
}

export default Rentals;