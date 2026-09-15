import { useMemo, useState } from "react";
import { Search, ArrowUpDown, Users, UserCheck, UserX, ShoppingBag } from "lucide-react";
import "./Customers.css";

const SORT_COLUMNS = [
  { key: "name", label: "Customer" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "createdDate", label: "Account Created" },
  { key: "orders", label: "Orders" },
  { key: "status", label: "Status" },
];

function Customers() {
  const [customers] = useState([
    {
      id: 1,
      name: "Anu",
      email: "anu@gmail.com",
      phone: "9876543210",
      createdDate: "05 Sep 2026",
      orders: 5,
      status: "Active",
    },
    {
      id: 2,
      name: "Meera",
      email: "meera@gmail.com",
      phone: "9876543211",
      createdDate: "02 Sep 2026",
      orders: 3,
      status: "Active",
    },
    {
      id: 3,
      name: "Rahul",
      email: "rahul@gmail.com",
      phone: "9876543212",
      createdDate: "28 Aug 2026",
      orders: 7,
      status: "Active",
    },
    {
      id: 4,
      name: "Sneha",
      email: "sneha@gmail.com",
      phone: "9876543213",
      createdDate: "20 Aug 2026",
      orders: 1,
      status: "Inactive",
    },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const filteredCustomers = customers.filter((customer) => {
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedCustomers = useMemo(() => {
    return [...filteredCustomers].sort((a, b) => {
      let valueA = a[sortKey];
      let valueB = b[sortKey];

      if (sortKey === "createdDate") {
        valueA = new Date(a.createdDate).getTime();
        valueB = new Date(b.createdDate).getTime();
      } else if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return sortDir === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredCustomers, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const inactiveCustomers = customers.filter((c) => c.status === "Inactive").length;
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);

  return (
    <div className="adm-page">

      {/* Header */}
      <div className="adm-header">
        <h1>Customers</h1>
        <p>View and manage registered customers</p>
      </div>

      {/* Stats */}
      <div className="adm-stats">

        <div className="adm-stat-card">
          <div className="adm-stat-icon">
            <Users size={18} />
          </div>
          <div>
            <span>Total Customers</span>
            <strong>{totalCustomers}</strong>
          </div>
        </div>

        <div className="adm-stat-card">
          <div className="adm-stat-icon">
            <UserCheck size={18} />
          </div>
          <div>
            <span>Active</span>
            <strong>{activeCustomers}</strong>
          </div>
        </div>

        <div className="adm-stat-card">
          <div className="adm-stat-icon">
            <UserX size={18} />
          </div>
          <div>
            <span>Inactive</span>
            <strong>{inactiveCustomers}</strong>
          </div>
        </div>

        <div className="adm-stat-card">
          <div className="adm-stat-icon">
            <ShoppingBag size={18} />
          </div>
          <div>
            <span>Total Orders</span>
            <strong>{totalOrders}</strong>
          </div>
        </div>

      </div>

      {/* Toolbar */}
      <div className="adm-toolbar">

        <div className="adm-search">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search name or email"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          className="adm-filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <span className="adm-count">
          {sortedCustomers.length} customers
        </span>

      </div>

      {/* Customer List */}
      <div className="adm-list customers-list">

        <div className="adm-list-header customers-list-header">
          {SORT_COLUMNS.map((col) => (
            <span
              key={col.key}
              className="adm-sortable-header"
              onClick={() => handleSort(col.key)}
            >
              {col.label}
              <ArrowUpDown
                size={11}
                className={sortKey === col.key ? "sort-active" : ""}
              />
            </span>
          ))}
          <span></span>
        </div>

        {sortedCustomers.length === 0 && (
          <div className="adm-empty">No customers found.</div>
        )}

        {sortedCustomers.map((customer) => (
          <div className="adm-row customers-row" key={customer.id}>

            <strong>{customer.name}</strong>

            <span className="adm-row-secondary">{customer.email}</span>

            <span className="adm-row-secondary">{customer.phone}</span>

            <span className="adm-row-secondary">{customer.createdDate}</span>

            <span>{customer.orders}</span>

            <span
              className={`adm-badge ${customer.status.toLowerCase()}`}
            >
              {customer.status}
            </span>

            <button
              className="adm-view-btn"
              onClick={() => setSelectedCustomer(customer)}
            >
              View
            </button>

          </div>
        ))}

      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div
          className="adm-modal-overlay"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="adm-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="adm-modal-header">
              <div>
                <span>CUSTOMER DETAILS</span>
                <h2>{selectedCustomer.name}</h2>
              </div>

              <button onClick={() => setSelectedCustomer(null)}>✕</button>
            </div>

            <div className="adm-info-grid">

              <div className="adm-info-item">
                <span>Email</span>
                <strong>{selectedCustomer.email}</strong>
              </div>

              <div className="adm-info-item">
                <span>Phone</span>
                <strong>{selectedCustomer.phone}</strong>
              </div>

              <div className="adm-info-item">
                <span>Account Created</span>
                <strong>{selectedCustomer.createdDate}</strong>
              </div>

              <div className="adm-info-item">
                <span>Number of Orders</span>
                <strong>{selectedCustomer.orders}</strong>
              </div>

              <div className="adm-info-item">
                <span>Account Status</span>
                <strong
                  className={`adm-badge ${selectedCustomer.status.toLowerCase()}`}
                >
                  {selectedCustomer.status}
                </strong>
              </div>

            </div>

            <p className="adm-note">
              🔒 Customer password is private and cannot be viewed by Admin.
            </p>

          </div>
        </div>
      )}

    </div>
  );
}

export default Customers;
