import { useState } from "react";
import "./Inventory.css";

function Inventory() {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Diamond Ring",
      category: "Rings",
      stock: 3,
      lowStockLimit: 5,
    },
    {
      id: 2,
      name: "Gold Necklace",
      category: "Necklaces",
      stock: 2,
      lowStockLimit: 5,
    },
    {
      id: 3,
      name: "Silver Bracelet",
      category: "Bracelets",
      stock: 10,
      lowStockLimit: 5,
    },
    {
      id: 4,
      name: "Gold Earrings",
      category: "Earrings",
      stock: 0,
      lowStockLimit: 5,
    },
    {
      id: 5,
      name: "Pearl Pendant",
      category: "Pendants",
      stock: 15,
      lowStockLimit: 5,
    },
  ]);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });


  // Update stock
  const updateStock = (id, change) => {

    setProducts((currentProducts) =>
      currentProducts.map((product) => {

        if (product.id === id) {

          const newStock = Math.max(
            0,
            product.stock + change
          );

          return {
            ...product,
            stock: newStock,
          };
        }

        return product;
      })
    );
  };


  // Calculate summary
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const lowStock = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= product.lowStockLimit
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;


  // Get stock status
  const getStockStatus = (product) => {

    if (product.stock === 0) {
      return "Out of Stock";
    }

    if (product.stock <= product.lowStockLimit) {
      return "Low Stock";
    }

    return "In Stock";
  };


  // Handle column sorting
  const handleSort = (key) => {

    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc"
          ? "desc"
          : "asc",
    }));

  };


  // Sort products
  const sortedProducts = [...products].sort((a, b) => {

    if (!sortConfig.key) {
      return 0;
    }

    let valueA = a[sortConfig.key];
    let valueB = b[sortConfig.key];

    if (typeof valueA === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }

    return 0;
  });


  // Sort arrow
  const getSortArrow = (key) => {

    if (sortConfig.key !== key) {
      return "↕";
    }

    return sortConfig.direction === "asc"
      ? "↑"
      : "↓";
  };


  return (
    <div className="inventory-page">

      {/* Header */}

      <div className="inventory-header">

        <div>
          <h1>Inventory</h1>

          <p>
            Monitor and manage product stock
          </p>
        </div>

      </div>


      {/* Summary Cards */}

      <div className="inventory-stats">

        <div className="inventory-card">
          <span>Total Products</span>
          <strong>{totalProducts}</strong>
        </div>

        <div className="inventory-card">
          <span>Total Stock</span>
          <strong>{totalStock}</strong>
        </div>

        <div className="inventory-card low">
          <span>Low Stock</span>
          <strong>{lowStock}</strong>
        </div>

        <div className="inventory-card out">
          <span>Out of Stock</span>
          <strong>{outOfStock}</strong>
        </div>

      </div>


      {/* Inventory Table */}

      <div className="inventory-table-container">

        <div className="table-header">

          <div>
            <h2>Stock List</h2>

            <p>
              Manage the current stock of your products
            </p>
          </div>

        </div>


        <table>

          <thead>

            <tr>

              <th onClick={() => handleSort("name")}>
                Product {getSortArrow("name")}
              </th>

              <th onClick={() => handleSort("category")}>
                Category {getSortArrow("category")}
              </th>

              <th onClick={() => handleSort("stock")}>
                Current Stock {getSortArrow("stock")}
              </th>

              <th>
                Status
              </th>

              <th>
                Update Stock
              </th>

            </tr>

          </thead>


          <tbody>

            {sortedProducts.map((product) => (

              <tr key={product.id}>

                <td>
                  <strong>{product.name}</strong>
                </td>

                <td>
                  {product.category}
                </td>

                <td>
                  <strong>
                    {product.stock}
                  </strong>
                </td>

                <td>

                  <span
                    className={`stock-status ${
                      product.stock === 0
                        ? "out"
                        : product.stock <= product.lowStockLimit
                        ? "low"
                        : "in"
                    }`}
                  >
                    {getStockStatus(product)}
                  </span>

                </td>

                <td>

                  <div className="stock-controls">

                    <button
                      onClick={() =>
                        updateStock(product.id, -1)
                      }
                      disabled={product.stock === 0}
                    >
                      −
                    </button>

                    <span>
                      {product.stock}
                    </span>

                    <button
                      onClick={() =>
                        updateStock(product.id, 1)
                      }
                    >
                      +
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Inventory;