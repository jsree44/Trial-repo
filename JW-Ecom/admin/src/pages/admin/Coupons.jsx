import { useMemo, useState } from "react";
import { Search, Eye, X, Pencil, Trash2, Plus } from "lucide-react";
import {
  calculateDiscount,
  formatCurrency,
  isCouponValid,
} from "../../utils/couponUtils";
import "./Coupons.css";

function Coupons() {
  const [showForm, setShowForm] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [coupons, setCoupons] = useState([
  {
    id: 1,
    code: "WELCOME10",
    discountType: "Percentage",
    discountValue: 10,
    usageLimit: 100,
    used: 24,
    expiryDate: "2026-12-31",
    status: "Active",
  },
  {
    id: 2,
    code: "FRIEND500",
    discountType: "Fixed",
    discountValue: 500,
    usageLimit: 50,
    used: 12,
    expiryDate: "2026-10-15",
    status: "Active",
  },
  {
    id: 3,
    code: "SUMMER20",
    discountType: "Percentage",
    discountValue: 20,
    usageLimit: 200,
    used: 200,
    expiryDate: "2026-06-30",
    status: "Inactive",
  },
  {
    id: 4,
    code: "FESTIVE15",
    discountType: "Percentage",
    discountValue: 15,
    usageLimit: 150,
    used: 67,
    expiryDate: "2026-11-30",
    status: "Active",
  },
  {
    id: 5,
    code: "SAVE1000",
    discountType: "Fixed",
    discountValue: 1000,
    usageLimit: 75,
    used: 31,
    expiryDate: "2026-12-15",
    status: "Active",
  },
  {
    id: 6,
    code: "NEWUSER20",
    discountType: "Percentage",
    discountValue: 20,
    usageLimit: 100,
    used: 58,
    expiryDate: "2026-10-31",
    status: "Active",
  },
  {
    id: 7,
    code: "FIRSTORDER",
    discountType: "Fixed",
    discountValue: 300,
    usageLimit: 100,
    used: 42,
    expiryDate: "2026-09-30",
    status: "Active",
  },
  {
    id: 8,
    code: "DIWALI25",
    discountType: "Percentage",
    discountValue: 25,
    usageLimit: 300,
    used: 184,
    expiryDate: "2026-11-05",
    status: "Active",
  },
  {
    id: 9,
    code: "FLAT750",
    discountType: "Fixed",
    discountValue: 750,
    usageLimit: 80,
    used: 76,
    expiryDate: "2026-10-20",
    status: "Active",
  },
  {
    id: 10,
    code: "WELCOME500",
    discountType: "Fixed",
    discountValue: 500,
    usageLimit: 120,
    used: 95,
    expiryDate: "2026-08-31",
    status: "Inactive",
  },
  {
    id: 11,
    code: "FASHION15",
    discountType: "Percentage",
    discountValue: 15,
    usageLimit: 250,
    used: 103,
    expiryDate: "2026-12-20",
    status: "Active",
  },
  {
    id: 12,
    code: "VIP20",
    discountType: "Percentage",
    discountValue: 20,
    usageLimit: 50,
    used: 18,
    expiryDate: "2026-11-15",
    status: "Active",
  },
]);

  const [formData, setFormData] = useState({
    code: "",
    discountType: "Percentage",
    discountValue: "",
    usageLimit: "",
    expiryDate: "",
    status: "Active",
  });

  const [previewAmount, setPreviewAmount] = useState("4500");

  /* =====================================================
     SEARCH
     ===================================================== */

  const filteredCoupons = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return coupons;

    return coupons.filter((coupon) => {
      return (
        coupon.code.toLowerCase().includes(search) ||
        coupon.discountType.toLowerCase().includes(search) ||
        coupon.status.toLowerCase().includes(search)
      );
    });
  }, [coupons, searchTerm]);

  /* =====================================================
     ADD COUPON
     ===================================================== */

  const handleAddCoupon = () => {
    setEditingCoupon(null);

    setFormData({
      code: "",
      discountType: "Percentage",
      discountValue: "",
      usageLimit: "",
      expiryDate: "",
      status: "Active",
    });

    setShowForm(true);
  };

  /* =====================================================
     EDIT COUPON
     ===================================================== */

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);

    setFormData({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      usageLimit: coupon.usageLimit || "",
      expiryDate: coupon.expiryDate || "",
      status: coupon.status,
    });

    setSelectedCoupon(null);
    setShowForm(true);
  };

  /* =====================================================
     INPUT CHANGE
     ===================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================================
     SAVE COUPON
     ===================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingCoupon) {
      setCoupons((previous) =>
        previous.map((coupon) =>
          coupon.id === editingCoupon.id
            ? {
                ...coupon,
                code: formData.code.toUpperCase(),
                discountType: formData.discountType,
                discountValue: Number(formData.discountValue),
                usageLimit: formData.usageLimit
                  ? Number(formData.usageLimit)
                  : null,
                expiryDate: formData.expiryDate,
                status: formData.status,
              }
            : coupon
        )
      );
    } else {
      const newCoupon = {
        id: Date.now(),
        code: formData.code.toUpperCase(),
        discountType: formData.discountType,
        discountValue: Number(formData.discountValue),
        usageLimit: formData.usageLimit
          ? Number(formData.usageLimit)
          : null,
        used: 0,
        expiryDate: formData.expiryDate,
        status: formData.status,
      };

      setCoupons((previous) => [...previous, newCoupon]);
    }

    setShowForm(false);
    setEditingCoupon(null);
  };

  /* =====================================================
     DELETE COUPON
     ===================================================== */

  const handleDeleteCoupon = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this coupon?"
    );

    if (confirmed) {
      setCoupons((previous) =>
        previous.filter((coupon) => coupon.id !== id)
      );

      setSelectedCoupon(null);
    }
  };

  /* =====================================================
     VIEW COUPON
     ===================================================== */

  const handleViewCoupon = (coupon) => {
    setSelectedCoupon(coupon);
  };

  /* =====================================================
     PREVIEW
     ===================================================== */

  const previewCoupon = {
    discountType: formData.discountType,
    discountValue: Number(formData.discountValue) || 0,
  };

  const previewDiscount = calculateDiscount(
    previewAmount,
    previewCoupon
  );

  const previewFinal = formatCurrency(
    Number(previewAmount || 0) - previewDiscount
  );

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <div className="coupons-page">

      {/* =================================================
          PAGE HEADER
          ================================================= */}

      <div className="coupons-header">
        <div>

          <h1>Coupons</h1>

          <p>
            Create and manage discount coupons for your customers.
          </p>
        </div>

        <button
          className="add-coupon-btn"
          onClick={handleAddCoupon}
        >
          <Plus size={15} />
          Create Coupon
        </button>
      </div>


      {/* =================================================
          COUPON LIST
          ================================================= */}

      {!showForm && (
        <div className="coupons-card">

          <div className="table-header">
            <div>
              <h2>Coupons</h2>
              <span>
                {filteredCoupons.length} of {coupons.length} Coupons
              </span>
            </div>
          </div>


          {/* SEARCH ONLY */}

          <div className="coupon-toolbar">

            <div className="coupon-search">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search coupons..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />
            </div>

          </div>


          {/* TABLE */}

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Coupon</th>
                  <th>Discount</th>
                  <th>Usage</th>
                  <th>Expiry</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredCoupons.length > 0 ? (
                  filteredCoupons.map((coupon) => {

                    const valid = isCouponValid(coupon);

                    return (
                      <tr key={coupon.id}>

                        {/* Coupon */}

                        <td>
                          <div className="coupon-main">
                            <strong className="coupon-code">
                              {coupon.code}
                            </strong>

                            <span>
                              {coupon.discountType}
                            </span>
                          </div>
                        </td>


                        {/* Discount */}

                        <td>
                          <span className="coupon-value">
                            {coupon.discountType === "Percentage"
                              ? `${coupon.discountValue}%`
                              : formatCurrency(
                                  coupon.discountValue
                                )}
                          </span>
                        </td>


                        {/* Usage */}

                        <td>
                          <span className="coupon-usage">
                            {coupon.used}
                            {coupon.usageLimit
                              ? ` / ${coupon.usageLimit}`
                              : " / Unlimited"}
                          </span>
                        </td>


                        {/* Expiry */}

                        <td>
                          <span className="coupon-date">
                            {coupon.expiryDate || "—"}
                          </span>
                        </td>


                        {/* Status */}

                        <td>
                          <span
                            className={`coupon-status ${
                              valid
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            {valid
                              ? "Active"
                              : coupon.status === "Active"
                              ? "Expired"
                              : "Inactive"}
                          </span>
                        </td>


                        {/* VIEW */}

                        <td>
                          <button
                            className="coupon-view-btn"
                            onClick={() =>
                              handleViewCoupon(coupon)
                            }
                          >
                            <Eye size={14} />
                            View
                          </button>
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="empty-row"
                    >
                      No coupons found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}


      {/* =================================================
          CREATE / EDIT FORM
          ================================================= */}

      {showForm && (
        <div className="coupon-form-card">

          <div className="form-header">

            <div>
              <p className="page-label">
                {editingCoupon
                  ? "Edit Coupon"
                  : "New Coupon"}
              </p>

              <h2>
                {editingCoupon
                  ? "Edit Coupon"
                  : "Create Coupon"}
              </h2>
            </div>

            <button
              className="close-btn"
              onClick={() => {
                setShowForm(false);
                setEditingCoupon(null);
              }}
            >
              <X size={17} />
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              <div className="form-group">
                <label>Coupon Code</label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="e.g. WELCOME10"
                  required
                />
              </div>


              <div className="form-group">
                <label>Discount Type</label>

                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                >
                  <option value="Percentage">
                    Percentage off
                  </option>

                  <option value="Fixed">
                    Fixed amount off
                  </option>
                </select>
              </div>


              <div className="form-group">

                <label>
                  Discount Value
                  {formData.discountType === "Percentage"
                    ? " (%)"
                    : " (₹)"}
                </label>

                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  placeholder={
                    formData.discountType === "Percentage"
                      ? "e.g. 10"
                      : "e.g. 500"
                  }
                  min="0"
                  required
                />

              </div>


              <div className="form-group">

                <label>Usage Limit (optional)</label>

                <input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                  placeholder="Leave blank for unlimited"
                  min="0"
                />

              </div>


              <div className="form-group">

                <label>Expiry Date</label>

                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

              </div>

            </div>


            {/* PREVIEW */}

            <div className="coupon-preview">

              <p className="preview-label">
                Preview
              </p>

              <div className="preview-row">

                <label>
                  Sample order amount (₹)
                </label>

                <input
                  type="number"
                  value={previewAmount}
                  onChange={(event) =>
                    setPreviewAmount(event.target.value)
                  }
                  min="0"
                />

              </div>

              <div className="preview-result">

                <span>
                  Original:{" "}
                  {formatCurrency(previewAmount)}
                </span>

                <span className="preview-arrow">
                  →
                </span>

                <span className="preview-final">
                  After coupon: {previewFinal}
                </span>

              </div>

            </div>


            {/* FORM ACTIONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowForm(false);
                  setEditingCoupon(null);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-btn"
              >
                {editingCoupon
                  ? "Update Coupon"
                  : "Create Coupon"}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* =================================================
          VIEW COUPON MODAL
          ================================================= */}

      {selectedCoupon && (
        <div
          className="coupon-modal-overlay"
          onClick={() => setSelectedCoupon(null)}
        >

          <div
            className="coupon-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="coupon-modal-header">

              <div>
                <p className="page-label">
                  Coupon Details
                </p>

                <h2>
                  {selectedCoupon.code}
                </h2>
              </div>

              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedCoupon(null)
                }
              >
                <X size={17} />
              </button>

            </div>


            {/* DETAILS */}

            <div className="coupon-detail-grid">

              <div className="coupon-detail-item">
                <span>Coupon Code</span>
                <strong>
                  {selectedCoupon.code}
                </strong>
              </div>

              <div className="coupon-detail-item">
                <span>Discount Type</span>
                <strong>
                  {selectedCoupon.discountType}
                </strong>
              </div>

              <div className="coupon-detail-item">
                <span>Discount</span>
                <strong>
                  {selectedCoupon.discountType === "Percentage"
                    ? `${selectedCoupon.discountValue}%`
                    : formatCurrency(
                        selectedCoupon.discountValue
                      )}
                </strong>
              </div>

              <div className="coupon-detail-item">
                <span>Usage</span>
                <strong>
                  {selectedCoupon.used}
                  {selectedCoupon.usageLimit
                    ? ` / ${selectedCoupon.usageLimit}`
                    : " / Unlimited"}
                </strong>
              </div>

              <div className="coupon-detail-item">
                <span>Expiry Date</span>
                <strong>
                  {selectedCoupon.expiryDate || "—"}
                </strong>
              </div>

              <div className="coupon-detail-item">
                <span>Status</span>

                <span
                  className={`coupon-status ${
                    isCouponValid(selectedCoupon)
                      ? "active"
                      : "inactive"
                  }`}
                >
                  {isCouponValid(selectedCoupon)
                    ? "Active"
                    : selectedCoupon.status === "Active"
                    ? "Expired"
                    : "Inactive"}
                </span>
              </div>

            </div>


            {/* ACTIONS */}

            <div className="coupon-modal-actions">

              <button
                className="modal-edit-btn"
                onClick={() =>
                  handleEditCoupon(selectedCoupon)
                }
              >
                <Pencil size={14} />
                Edit Coupon
              </button>

              <button
                className="modal-delete-btn"
                onClick={() =>
                  handleDeleteCoupon(
                    selectedCoupon.id
                  )
                }
              >
                <Trash2 size={14} />
                Delete Coupon
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Coupons;