import React, { useState, useEffect } from "react";
import { useGetdata } from "../Hooks/usegetdata";
import "./Dashboard.css";

const Dashboard = () => {
  const { getData, data, isLoading, error } = useGetdata();
  const [products, setProducts] = useState([]); // Store fetched products
  const [searchText, setSearchText] = useState(""); // Search input state
  const [sortField, setSortField] = useState("id"); // Default sorting field
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    async function fetchData() {
      await getData("https://frontend-assessment-server.onrender.com/api/dashboard"); // Replace with your endpoint
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setProducts(data); // Set products on data fetch
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSort = (field) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order); // Toggle sort order
    setSortField(field); // Update sort field

    const sortedData = [...products].sort((a, b) => {
      if (field === "id" || field === "selling_price" || field === "cost_price") {
        return order === "asc" ? a[field] - b[field] : b[field] - a[field];
      } else if (field === "name") {
        return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else {
        return 0; // Default sorting
      }
    });

    setProducts(sortedData); // Update products with sorted data
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase()); // Search with lowercase
  };

  const handleRemoveProduct = (productId) => {
    // Implement logic to remove product from server (if applicable)
    // Update products in state without the removed product
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="dashboard-container">
      <h1>Product Dashboard</h1>
      {isSmallScreen ? (
        <div className="small-screen-message">
          Please switch to a bigger device for the dashboard view.
        </div>
      ):
      <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID or Name (contains)"
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>
                <button onClick={() => handleSort("id")}>
                  ID {sortField === "id" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                </button>
              </th>
              <th>
                <button onClick={() => handleSort("selling_price")}>
                  Selling Price {sortField === "selling_price" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                </button>
              </th>
              <th>
                <button onClick={() => handleSort("name")}>
                  Name {sortField === "name" && (sortOrder === "asc" ? "⬆️" : "⬇️")}
                </button>
              </th>
              <th>Image</th>
              <th>Description</th>
              <th>Cost Price</th>
              <th>Allergen Info</th>
              <th>Cooking Instruction</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) => {
                // Filter products based on search text
                return (
                  product.id.toString().includes(searchText) ||
                  product.name.toLowerCase().includes(searchText)
                );
              })
              .map((product) => (
                <tr key={product.id} className="product-row">
                  <td>{product.id}</td>
                  <td>₹{product.selling_price}</td>
                  <td>{product.name}</td>
                  <td>
                    <img src={product.productImage} alt={product.name} className="product-imageofdash" />
                  </td>
                  <td>{product.description}</td>
                  <td>₹{product.cost_price}</td>
                  <td>{product.allergen_info}</td>
                  <td>{product.cooking_instruction}</td>
                  <td>
                    <button className="remove-button" onClick={() => handleRemoveProduct(product.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {error && <p>Error fetching products: {error}</p>}
      </>
    }
    </div>
  );
};

export default Dashboard;
