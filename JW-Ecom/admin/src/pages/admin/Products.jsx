import { useState, useMemo } from "react";
import { Search, ArrowUpDown, ImagePlus } from "lucide-react";
import "./Products.css";

const CATEGORIES = [
  { name: "Rings", icon: "💍" },
  { name: "Necklaces", icon: "📿" },
  { name: "Bracelets", icon: "✨" },
  { name: "Earrings", icon: "💎" },
  { name: "Pendants", icon: "🔸" },
  { name: "Anklets", icon: "🔗" },
  { name: "Chains", icon: "⛓️" },
];

const SORT_COLUMNS = [
  { key: "name", label: "Product" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "material", label: "Material" },
  { key: "weight", label: "Weight" },
  { key: "size", label: "Size" },
  { key: "stock", label: "Stock" },
  { key: "status", label: "Status" },
];

function parsePrice(price) {
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
}

function parseWeight(weight) {
  return Number(String(weight).replace(/[^0-9.]/g, "")) || 0;
}

function Products() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Diamond Ring",
      category: "Rings",
      price: "₹45,000",
      material: "Gold",
      weight: "5g",
      size: "16",
      stock: 3,
      status: "Active",
      image: "💍",
    },
    {
      id: 2,
      name: "Ruby Ring",
      category: "Rings",
      price: "₹52,000",
      material: "Gold",
      weight: "6g",
      size: "17",
      stock: 5,
      status: "Active",
      image: "💍",
    },
    {
      id: 3,
      name: "Gold Necklace",
      category: "Necklaces",
      price: "₹82,000",
      material: "Gold",
      weight: "12g",
      size: "18 inch",
      stock: 2,
      status: "Active",
      image: "📿",
    },
    {
      id: 4,
      name: "Pearl Necklace",
      category: "Necklaces",
      price: "₹28,000",
      material: "Silver",
      weight: "15g",
      size: "20 inch",
      stock: 6,
      status: "Active",
      image: "📿",
    },
    {
      id: 5,
      name: "Silver Bracelet",
      category: "Bracelets",
      price: "₹3,200",
      material: "Silver",
      weight: "8g",
      size: "Medium",
      stock: 10,
      status: "Active",
      image: "✨",
    },
    {
      id: 6,
      name: "Gold Bangle",
      category: "Bracelets",
      price: "₹35,000",
      material: "Gold",
      weight: "10g",
      size: "Medium",
      stock: 1,
      status: "Active",
      image: "✨",
    },
    {
      id: 7,
      name: "Gold Earrings",
      category: "Earrings",
      price: "₹6,500",
      material: "Gold",
      weight: "4g",
      size: "Small",
      stock: 0,
      status: "Out of Stock",
      image: "💎",
    },
    {
      id: 8,
      name: "Diamond Studs",
      category: "Earrings",
      price: "₹18,500",
      material: "Gold",
      weight: "2g",
      size: "Small",
      stock: 8,
      status: "Active",
      image: "💎",
    },
    {
      id: 9,
      name: "Om Pendant",
      category: "Pendants",
      price: "₹9,200",
      material: "Silver",
      weight: "3g",
      size: "Small",
      stock: 12,
      status: "Active",
      image: "🔸",
    },
    {
      id: 10,
      name: "Heart Locket",
      category: "Pendants",
      price: "₹15,000",
      material: "Gold",
      weight: "4g",
      size: "Small",
      stock: 0,
      status: "Out of Stock",
      image: "🔸",
    },
    {
      id: 11,
      name: "Silver Anklet",
      category: "Anklets",
      price: "₹4,500",
      material: "Silver",
      weight: "6g",
      size: "Medium",
      stock: 7,
      status: "Active",
      image: "🔗",
    },
    {
      id: 12,
      name: "Gold Chain",
      category: "Chains",
      price: "₹65,000",
      material: "Gold",
      weight: "20g",
      size: "22 inch",
      stock: 2,
      status: "Active",
      image: "⛓️",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    material: "",
    weight: "",
    size: "",
    stock: "",
    image: "",
    status: "Active",
  });

  const handleAddProduct = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      category: selectedCategory || "",
      description: "",
      price: "",
      material: "",
      weight: "",
      size: "",
      stock: "",
      image: "",
      status: "Active",
    });

    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      category: product.category,
      description: "",
      price: product.price,
      material: product.material,
      weight: product.weight,
      size: product.size,
      stock: product.stock,
      image: product.image || "",
      status: product.status,
    });

    setShowForm(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Reads the chosen file and stores it as a data URL, so it can be
  // previewed immediately and saved directly onto the product.
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingProduct) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: formData.name,
                category: formData.category,
                price: formData.price,
                material: formData.material,
                weight: formData.weight,
                size: formData.size,
                stock: Number(formData.stock),
                status: formData.status,
                image: formData.image || product.image,
              }
            : product
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        price: formData.price,
        material: formData.material,
        weight: formData.weight,
        size: formData.size,
        stock: Number(formData.stock),
        status: formData.status,
        image:
          formData.image ||
          CATEGORIES.find((c) => c.name === formData.category)?.icon ||
          "💎",
      };

      setProducts([...products, newProduct]);
    }

    setShowForm(false);
  };

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const categoryCounts = CATEGORIES.reduce((counts, cat) => {
    counts[cat.name] = products.filter(
      (product) => product.category === cat.name
    ).length;
    return counts;
  }, {});

  const categoryProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const filteredProducts = categoryProducts.filter((product) => {
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.material.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || product.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      let valueA;
      let valueB;

      if (sortKey === "price") {
        valueA = parsePrice(a.price);
        valueB = parsePrice(b.price);
      } else if (sortKey === "weight") {
        valueA = parseWeight(a.weight);
        valueB = parseWeight(b.weight);
      } else if (sortKey === "stock") {
        valueA = a.stock;
        valueB = b.stock;
      } else {
        valueA = String(a[sortKey]).toLowerCase();
        valueB = String(b[sortKey]).toLowerCase();
      }

      if (valueA < valueB) return sortDir === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredProducts, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="products-page">

      {/* Header */}
      <div className="products-header">

        <div>
          

          <h1>
            {selectedCategory ? selectedCategory : "Product Management"}
          </h1>

          <p>
            {selectedCategory
              ? `Browsing ${selectedCategory.toLowerCase()} in your catalog.`
              : "Manage your jewelry products, inventory and product details."}
          </p>
        </div>

        <button className="add-product-btn" onClick={handleAddProduct}>
          + Add Product
        </button>

      </div>


      {/* Category Grid */}
      {!showForm && !selectedCategory && (
        <div className="category-grid">

          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              className="category-card"
              onClick={() => setSelectedCategory(category.name)}
            >
              <div className="category-icon">{category.icon}</div>

              <h3>{category.name}</h3>

              <span>
                {categoryCounts[category.name]}{" "}
                {categoryCounts[category.name] === 1 ? "product" : "products"}
              </span>
            </button>
          ))}

        </div>
      )}


      {/* Product Table (within a selected category) */}
      {!showForm && selectedCategory && (
        <div className="products-card">

          <div className="table-header">

            <div className="table-header-title">
              <button
                className="back-link"
                onClick={() => setSelectedCategory(null)}
              >
                ← All Categories
              </button>

              <h2>{selectedCategory}</h2>
            </div>

            <span>
              {sortedProducts.length}{" "}
              {sortedProducts.length === 1 ? "Product" : "Products"}
            </span>

          </div>


          {/* Toolbar */}
          <div className="products-toolbar">

            <div className="product-search">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search by name or material"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <select
              className="product-filter"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>

          </div>


          <div className="table-container">

            <table>

              <thead>
                <tr>
                  {SORT_COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className="sortable-th"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                      <ArrowUpDown
                        size={11}
                        className={sortKey === col.key ? "sort-active" : ""}
                      />
                    </th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>


              <tbody>

                {sortedProducts.length === 0 && (
                  <tr>
                    <td colSpan="9" className="empty-row">
                      No products match here.
                    </td>
                  </tr>
                )}

                {sortedProducts.map((product) => (

                  <tr key={product.id}>

                    <td>
                      <div className="product-name">

                        <div className="product-image">
                          {product.image && product.image.startsWith("data:") ? (
                            <img src={product.image} alt={product.name} />
                          ) : (
                            product.image
                          )}
                        </div>

                        <strong>{product.name}</strong>

                      </div>
                    </td>

                    <td>{product.category}</td>

                    <td>{product.price}</td>

                    <td>{product.material}</td>

                    <td>{product.weight}</td>

                    <td>{product.size}</td>

                    <td>
                      <span
                        className={
                          product.stock <= 3 ? "stock-low" : "stock-normal"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`product-status ${product.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {product.status}
                      </span>
                    </td>

                    <td>

                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
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

        </div>
      )}


      {/* Add / Edit Product Form */}
      {showForm && (

        <div className="product-form-card">

          <div className="form-header">

            <div>
              <p className="page-label">
                {editingProduct ? "Edit Product" : "New Product"}
              </p>

              <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
            </div>

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* Product Name */}
              <div className="form-group">
                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>


              {/* Category */}
              <div className="form-group">
                <label>Category</label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>


              {/* Description */}
              <div className="form-group full-width">
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  rows="4"
                />
              </div>


              {/* Product Image */}
              <div className="form-group full-width">
                <label>Product Image</label>

                <div className="image-upload">

                  <div className="image-preview-box">
                    {formData.image && formData.image.startsWith("data:") ? (
                      <img
                        src={formData.image}
                        alt="Product preview"
                        className="image-preview"
                      />
                    ) : (
                      <div className="image-placeholder">
                        <ImagePlus size={22} />
                        <span>No image selected</span>
                      </div>
                    )}
                  </div>

                  <label className="image-upload-btn">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </label>

                </div>
              </div>


              {/* Price */}
              <div className="form-group">
                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>


              {/* Material */}
              <div className="form-group">
                <label>Material</label>

                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  placeholder="e.g. Gold"
                  required
                />
              </div>


              {/* Weight */}
              <div className="form-group">
                <label>Weight</label>

                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 5g"
                />
              </div>


              {/* Size */}
              <div className="form-group">
                <label>Size</label>

                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. Medium / 18 inch"
                />
              </div>


              {/* Stock */}
              <div className="form-group">
                <label>Stock Quantity</label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                />
              </div>


              {/* Status */}
              <div className="form-group">
                <label>Product Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

            </div>


            {/* Form Buttons */}
            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button type="submit" className="save-btn">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}

export default Products;
