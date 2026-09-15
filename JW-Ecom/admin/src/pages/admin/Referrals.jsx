import { useState, useMemo } from "react";
import {
  Search,
  Eye,
  X,
  Users,
  CheckCircle,
  Clock,
  IndianRupee,
  Trophy,
  Download,
  AlertTriangle,
  ArrowUpDown,
  RefreshCcw,
} from "lucide-react";
import "./Referrals.css";

const INITIAL_REFERRALS = [
  {
    id: "#REF001",
    code: "ANU-4F2K",
    referrer: "Anu",
    referrerEmail: "anu@gmail.com",
    referredUser: "Sanu",
    referredEmail: "sanu@gmail.com",
    date: "12 Sep 2026",
    orderId: "#1008",
    orderAmount: 4500,
    reward: 500,
    status: "Completed",
    note: "",
  },
  {
    id: "#REF002",
    code: "MEE-9XQ1",
    referrer: "Meera",
    referrerEmail: "meera@gmail.com",
    referredUser: "Rahul",
    referredEmail: "rahul@gmail.com",
    date: "11 Sep 2026",
    orderId: null,
    orderAmount: 0,
    reward: 500,
    status: "Pending",
    note: "",
  },
  {
    id: "#REF003",
    code: "PRI-7T3M",
    referrer: "Priya",
    referrerEmail: "priya@gmail.com",
    referredUser: "Arjun",
    referredEmail: "arjun@gmail.com",
    date: "10 Sep 2026",
    orderId: "#1005",
    orderAmount: 6200,
    reward: 500,
    status: "Completed",
    note: "",
  },
  {
    id: "#REF004",
    code: "RAH-2B8N",
    referrer: "Rahul",
    referrerEmail: "rahul@gmail.com",
    referredUser: "Sneha",
    referredEmail: "sneha@gmail.com",
    date: "08 Sep 2026",
    orderId: null,
    orderAmount: 0,
    reward: 500,
    status: "Pending",
    note: "",
  },
  {
    id: "#REF005",
    code: "MEE-9XQ1",
    referrer: "Meera",
    referrerEmail: "meera@gmail.com",
    referredUser: "Sneha",
    referredEmail: "sneha@gmail.com",
    date: "09 Sep 2026",
    orderId: null,
    orderAmount: 0,
    reward: 500,
    status: "Pending",
    note: "",
  },
  {
    id: "#REF006",
    code: "PRI-7T3M",
    referrer: "Priya",
    referrerEmail: "priya@gmail.com",
    referredUser: "Priya",
    referredEmail: "priya@gmail.com",
    date: "07 Sep 2026",
    orderId: "#1002",
    orderAmount: 3100,
    reward: 500,
    status: "Completed",
    note: "",
  },
];

const SORT_COLUMNS = [
  { key: "id", label: "Referral" },
  { key: "referrer", label: "Referrer" },
  { key: "referredUser", label: "Referred User" },
  { key: "date", label: "Date" },
  { key: "reward", label: "Reward" },
  { key: "status", label: "Status" },
];

function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

// Flags a referral as risky: self-referral (same email both sides) or
// a referred user/email that shows up under more than one referral.
function getFlags(referral, all) {
  const flags = [];

  if (referral.referrerEmail === referral.referredEmail) {
    flags.push("Self-referral");
  }

  const duplicateCount = all.filter(
    (r) => r.referredEmail === referral.referredEmail
  ).length;

  if (duplicateCount > 1) {
    flags.push("Duplicate referred user");
  }

  return flags;
}

function Referrals() {
  const [referrals, setReferrals] = useState(INITIAL_REFERRALS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All time");
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [view, setView] = useState("list"); // "list" | "leaderboard"
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");

  const withinDateFilter = (dateStr) => {
    if (dateFilter === "All time") return true;

    const referralDate = new Date(dateStr);
    const today = new Date();
    const start = new Date(today);

    if (dateFilter === "Today") {
      start.setHours(0, 0, 0, 0);
    } else if (dateFilter === "This week") {
      start.setDate(today.getDate() - 6);
    } else if (dateFilter === "This month") {
      start.setDate(1);
    }

    return referralDate >= start && referralDate <= today;
  };

  const filteredReferrals = referrals.filter((referral) => {
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      referral.id.toLowerCase().includes(query) ||
      referral.referrer.toLowerCase().includes(query) ||
      referral.referredUser.toLowerCase().includes(query) ||
      referral.code.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || referral.status === statusFilter;

    const matchesDate = withinDateFilter(referral.date);

    return matchesSearch && matchesStatus && matchesDate;
  });

  const sortedReferrals = useMemo(() => {
    const sorted = [...filteredReferrals].sort((a, b) => {
      let valueA = a[sortKey];
      let valueB = b[sortKey];

      if (sortKey === "date") {
        valueA = new Date(a.date).getTime();
        valueB = new Date(b.date).getTime();
      }

      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return sortDir === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredReferrals, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const totalReferrals = referrals.length;

  const completedReferrals = referrals.filter(
    (referral) => referral.status === "Completed"
  ).length;

  const pendingReferrals = referrals.filter(
    (referral) => referral.status === "Pending"
  ).length;

  const totalRewards = referrals
    .filter((referral) => referral.status === "Completed")
    .reduce((total, referral) => total + referral.reward, 0);

  const leaderboard = useMemo(() => {
    const grouped = {};

    referrals.forEach((referral) => {
      if (!grouped[referral.referrer]) {
        grouped[referral.referrer] = {
          referrer: referral.referrer,
          totalReferrals: 0,
          completed: 0,
          totalReward: 0,
        };
      }

      grouped[referral.referrer].totalReferrals += 1;

      if (referral.status === "Completed") {
        grouped[referral.referrer].completed += 1;
        grouped[referral.referrer].totalReward += referral.reward;
      }
    });

    return Object.values(grouped)
      .sort((a, b) => b.totalReward - a.totalReward || b.completed - a.completed)
      .slice(0, 5);
  }, [referrals]);

  // Selection

  const toggleSelect = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === sortedReferrals.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sortedReferrals.map((r) => r.id)));
    }
  };

  const handleBulkStatus = (status) => {
    setReferrals(
      referrals.map((referral) =>
        selectedIds.has(referral.id) ? { ...referral, status } : referral
      )
    );
    setSelectedIds(new Set());
  };

  // Modal status override

  const openReferral = (referral) => {
    setSelectedReferral(referral);
    setNoteDraft(referral.note || "");
  };

  const updateReferralStatus = (status) => {
    setReferrals(
      referrals.map((referral) =>
        referral.id === selectedReferral.id
          ? { ...referral, status, note: noteDraft }
          : referral
      )
    );
    setSelectedReferral({ ...selectedReferral, status, note: noteDraft });
  };

  // CSV export

  const exportCSV = () => {
    const header = [
      "Referral",
      "Code",
      "Referrer",
      "Referred User",
      "Date",
      "Order ID",
      "Order Amount",
      "Reward",
      "Status",
    ];

    const rows = sortedReferrals.map((r) => [
      r.id,
      r.code,
      r.referrer,
      r.referredUser,
      r.date,
      r.orderId || "",
      r.orderAmount,
      r.reward,
      r.status,
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "referrals.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 700);
  };

  return (
    <div className="referrals-page">

      {/* Header */}
      <div className="referrals-header">
        <div>
          <h1>Referrals</h1>
          <p>Track customer referrals and referral rewards</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="referral-stats">

        <div className="referral-stat-card">
          <div className="referral-stat-icon">
            <Users size={18} />
          </div>
          <div>
            <span>Total Referrals</span>
            <strong>{totalReferrals}</strong>
          </div>
        </div>

        <div className="referral-stat-card">
          <div className="referral-stat-icon">
            <CheckCircle size={18} />
          </div>
          <div>
            <span>Completed</span>
            <strong>{completedReferrals}</strong>
          </div>
        </div>

        <div className="referral-stat-card">
          <div className="referral-stat-icon">
            <Clock size={18} />
          </div>
          <div>
            <span>Pending</span>
            <strong>{pendingReferrals}</strong>
          </div>
        </div>

        <div className="referral-stat-card">
          <div className="referral-stat-icon">
            <IndianRupee size={18} />
          </div>
          <div>
            <span>Rewards Given</span>
            <strong>{formatCurrency(totalRewards)}</strong>
          </div>
        </div>

      </div>

      {/* View Tabs */}
      <div className="view-tabs">
        <button
          className={`view-tab ${view === "list" ? "active" : ""}`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`view-tab ${view === "leaderboard" ? "active" : ""}`}
          onClick={() => setView("leaderboard")}
        >
          <Trophy size={14} />
          Leaderboard
        </button>
      </div>

      {view === "leaderboard" && (
        <div className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <div className="leaderboard-item" key={entry.referrer}>
              <div className={`leaderboard-rank rank-${index + 1}`}>
                {index + 1}
              </div>

              <div className="leaderboard-info">
                <strong>{entry.referrer}</strong>
                <span>
                  {entry.completed} completed of {entry.totalReferrals} total
                </span>
              </div>

              <div className="leaderboard-reward">
                {formatCurrency(entry.totalReward)}
              </div>
            </div>
          ))}

          {leaderboard.length === 0 && (
            <div className="referral-empty">No referrers yet.</div>
          )}
        </div>
      )}

      {view === "list" && (
        <>
          {/* Toolbar */}
          <div className="referrals-toolbar">

            <div className="referral-search">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search referral, code, referrer or customer"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <select
              className="referral-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              className="referral-filter"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            >
              <option value="All time">All time</option>
              <option value="Today">Today</option>
              <option value="This week">This week</option>
              <option value="This month">This month</option>
            </select>

            <button className="toolbar-icon-btn" onClick={handleRefresh}>
              <RefreshCcw size={14} />
            </button>

            <button className="toolbar-icon-btn" onClick={exportCSV}>
              <Download size={14} />
              Export
            </button>

            <span className="referral-count">
              {sortedReferrals.length} referrals
            </span>

          </div>

          {/* Bulk action bar */}
          {selectedIds.size > 0 && (
            <div className="bulk-bar">
              <span>{selectedIds.size} selected</span>
              <button onClick={() => handleBulkStatus("Completed")}>
                Mark Completed
              </button>
              <button onClick={() => handleBulkStatus("Pending")}>
                Mark Pending
              </button>
              <button
                className="bulk-clear"
                onClick={() => setSelectedIds(new Set())}
              >
                Clear
              </button>
            </div>
          )}

          {/* Referral List */}
          <div className="referrals-list">

            <div className="referrals-list-header">
              <input
                type="checkbox"
                checked={
                  selectedIds.size > 0 &&
                  selectedIds.size === sortedReferrals.length
                }
                onChange={toggleSelectAll}
              />

              {SORT_COLUMNS.map((col) => (
                <span
                  key={col.key}
                  className="sortable-header"
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

            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div className="referral-row skeleton-row" key={i}>
                  <div className="skeleton-bar" style={{ width: "16px" }} />
                  <div className="skeleton-bar" />
                  <div className="skeleton-bar" />
                  <div className="skeleton-bar" />
                  <div className="skeleton-bar" style={{ width: "60px" }} />
                  <div className="skeleton-bar" style={{ width: "50px" }} />
                  <div className="skeleton-bar" style={{ width: "60px" }} />
                </div>
              ))}

            {!isLoading &&
              sortedReferrals.map((referral) => {
                const flags = getFlags(referral, referrals);

                return (
                  <div className="referral-row" key={referral.id}>

                    <input
                      type="checkbox"
                      checked={selectedIds.has(referral.id)}
                      onChange={() => toggleSelect(referral.id)}
                    />

                    <div className="referral-id">
                      {referral.id}
                      <span className="referral-code">{referral.code}</span>
                    </div>

                    <div>
                      <strong>{referral.referrer}</strong>
                      <span>{referral.referrerEmail}</span>
                    </div>

                    <div>
                      <strong>{referral.referredUser}</strong>
                      <span>{referral.referredEmail}</span>
                      {flags.length > 0 && (
                        <span className="flag-badge" title={flags.join(", ")}>
                          <AlertTriangle size={11} />
                          {flags[0]}
                        </span>
                      )}
                    </div>

                    <div className="referral-date">{referral.date}</div>

                    <div className="referral-reward">
                      {formatCurrency(referral.reward)}
                    </div>

                    <div>
                      <span
                        className={`referral-status ${referral.status.toLowerCase()}`}
                      >
                        {referral.status}
                      </span>
                    </div>

                    <button
                      className="referral-view-btn"
                      onClick={() => openReferral(referral)}
                    >
                      <Eye size={14} />
                      View
                    </button>

                  </div>
                );
              })}

            {!isLoading && sortedReferrals.length === 0 && (
              <div className="referral-empty">No referrals found.</div>
            )}

          </div>
        </>
      )}

      {/* Details Modal */}
      {selectedReferral && (
        <div
          className="referral-modal-overlay"
          onClick={() => setSelectedReferral(null)}
        >
          <div
            className="referral-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="referral-modal-header">
              <div>
                <span>REFERRAL DETAILS</span>
                <h2>{selectedReferral.id}</h2>
              </div>

              <button onClick={() => setSelectedReferral(null)}>
                <X size={18} />
              </button>
            </div>

            {getFlags(selectedReferral, referrals).length > 0 && (
              <div className="modal-flag-banner">
                <AlertTriangle size={14} />
                {getFlags(selectedReferral, referrals).join(" · ")}
              </div>
            )}

            <div className="referral-people">
              <div className="person-card">
                <span className="person-label">REFERRER</span>
                <strong>{selectedReferral.referrer}</strong>
                <p>{selectedReferral.referrerEmail}</p>
              </div>

              <div className="referral-arrow">→</div>

              <div className="person-card">
                <span className="person-label">REFERRED CUSTOMER</span>
                <strong>{selectedReferral.referredUser}</strong>
                <p>{selectedReferral.referredEmail}</p>
              </div>
            </div>

            <div className="referral-info-card">
              <div className="info-item">
                <span>Referral Code</span>
                <strong>{selectedReferral.code}</strong>
              </div>

              <div className="info-item">
                <span>Referral Date</span>
                <strong>{selectedReferral.date}</strong>
              </div>

              <div className="info-item">
                <span>Order ID</span>
                <strong>{selectedReferral.orderId || "No order yet"}</strong>
              </div>

              <div className="info-item">
                <span>Order Amount</span>
                <strong>
                  {selectedReferral.orderAmount
                    ? formatCurrency(selectedReferral.orderAmount)
                    : "—"}
                </strong>
              </div>

              <div className="info-item reward-item">
                <span>Reward</span>
                <strong>{formatCurrency(selectedReferral.reward)}</strong>
              </div>

              <div className="info-item">
                <span>Status</span>
                <strong
                  className={`modal-referral-status ${selectedReferral.status.toLowerCase()}`}
                >
                  {selectedReferral.status}
                </strong>
              </div>
            </div>

            <div className="modal-note-section">
              <label>Note (optional)</label>
              <textarea
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                placeholder="Reason for approving, rejecting, or adjusting this referral"
                rows="2"
              />
            </div>

            <div className="modal-status-actions">
              <button
                className="mark-pending-btn"
                onClick={() => updateReferralStatus("Pending")}
              >
                Mark Pending
              </button>
              <button
                className="mark-completed-btn"
                onClick={() => updateReferralStatus("Completed")}
              >
                Mark Completed
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Referrals;
