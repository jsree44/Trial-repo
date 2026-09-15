import { useState } from "react";
import "./AdminManagement.css";

function AdminManagement() {

  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Anu",
      email: "anu@gmail.com",
      phone: "9876543210",
      status: "Active",
      role: "Admin",
    },
    {
      id: 2,
      name: "Meera",
      email: "meera@gmail.com",
      phone: "9876543211",
      status: "Active",
      role: "Admin",
    },
    {
      id: 3,
      name: "Rahul",
      email: "rahul@gmail.com",
      phone: "9876543212",
      status: "Inactive",
      role: "Admin",
    },
  ]);


  const [showForm, setShowForm] = useState(false);

  const [editingAdmin, setEditingAdmin] = useState(null);

  const [viewingAdmin, setViewingAdmin] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    status: "Active",
  });


  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Open create form
  const handleCreate = () => {

    setEditingAdmin(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      status: "Active",
    });

    setShowForm(true);
  };


  // Open edit form
  const handleEdit = (admin) => {

    setEditingAdmin(admin);

    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      password: "",
      status: admin.status,
    });

    setShowForm(true);
  };


  // Submit create/update
  const handleSubmit = (e) => {

    e.preventDefault();


    if (editingAdmin) {

      // Update existing admin

      setAdmins(
        admins.map((admin) =>
          admin.id === editingAdmin.id
            ? {
                ...admin,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                status: formData.status,
              }
            : admin
        )
      );

    } else {

      // Create new admin

      const newAdmin = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        role: "Admin",
      };

      setAdmins([...admins, newAdmin]);
    }


    setShowForm(false);

    setEditingAdmin(null);
  };


  // Delete admin
  const handleDelete = (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (!confirmed) {
      return;
    }

    setAdmins(
      admins.filter((admin) => admin.id !== id)
    );
  };


  return (
    <div className="admin-management-page">

      {/* Header */}

      <div className="admin-management-header">

        <div>
          <h1>Admin Management</h1>

          <p>
            Create, manage and assign administrators
          </p>
        </div>


        <button
          className="create-admin-btn"
          onClick={handleCreate}
        >
          + Create Admin
        </button>

      </div>


      {/* Admin Table */}

      <div className="admin-table-container">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>


          <tbody>

            {admins.map((admin) => (

              <tr key={admin.id}>

                <td>
                  <strong>{admin.name}</strong>
                </td>

                <td>
                  {admin.email}
                </td>

                <td>
                  {admin.phone}
                </td>

                <td>
                  <span className="role-badge">
                    {admin.role}
                  </span>
                </td>

                <td>

                  <span
                    className={`admin-status ${
                      admin.status === "Active"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {admin.status}
                  </span>

                </td>

                <td>

                  <div className="admin-actions">

                    <button
                      className="view-btn"
                      onClick={() =>
                        setViewingAdmin(admin)
                      }
                    >
                      View
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(admin)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(admin.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* Create / Edit Form */}

      {showForm && (

        <div className="modal-overlay">

          <div className="admin-modal">

            <div className="modal-header">

              <h2>
                {editingAdmin
                  ? "Update Admin"
                  : "Create Admin"}
              </h2>

              <button
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>

            </div>


            <form onSubmit={handleSubmit}>

              <label>
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />


              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />


              <label>
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />


              {!editingAdmin && (
                <>
                  <label>
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </>
              )}


              <label>
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>


              <button
                type="submit"
                className="save-admin-btn"
              >
                {editingAdmin
                  ? "Update Admin"
                  : "Create Admin"}
              </button>

            </form>

          </div>

        </div>

      )}


      {/* View Admin */}

      {viewingAdmin && (

        <div className="modal-overlay">

          <div className="admin-modal">

            <div className="modal-header">

              <h2>
                Admin Details
              </h2>

              <button
                className="close-btn"
                onClick={() =>
                  setViewingAdmin(null)
                }
              >
                ×
              </button>

            </div>


            <div className="admin-details">

              <p>
                <strong>Name:</strong>{" "}
                {viewingAdmin.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {viewingAdmin.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {viewingAdmin.phone}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {viewingAdmin.role}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {viewingAdmin.status}
              </p>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminManagement;