import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../Hooks/useFetchdata";
import AddProductModal from "./Addproductmodal";
import "./Home.css"
import { ToastContainer } from "react-toastify";

const Home = () => {
  const { data, isLoading, error } = useFetchData(
    "productsData",
    "https://frontend-assessment-server.onrender.com/api/products"
  );
  const [Sortedproducts, setSortedproducts] = useState()
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

 

    useEffect(() => {
      const sortData = async () => {
        if (data) {
          const sorted = data.sort((a, b) => a.selling_price - b.selling_price);
          setSortedproducts(sorted);
        }
      };
  
      sortData(); // Call sortData on data change
    }, [data]); // Re-run useEffect only when data changes

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // Navigate to product detail using ID
  };

  const handleAddProductClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navigatedashboard =()=>{
    navigate("/dashboard")
  }

  return (
    <div className="home-container">
     <ToastContainer/>
    <h3>Welcome to Homble Frontend Assessment</h3>
    <ul>
    <div className="thejustifyone">
    <button className="openmodal" onClick={handleAddProductClick}>Add Product Button</button>
    <button className="openmodal" onClick={navigatedashboard}>Dashboard</button>
    </div>
      {isLoading ? (
        <h3>Loading....</h3>
      ) : (
        <div className="product-grid">
          {Sortedproducts && Sortedproducts.map((product) => (
            <div className="product-card" key={product.id} onClick={() => handleProductClick(product.id)}>
              <img src={product.productImage} alt={product.name} className="product-image" />
              <p className="product-name">{product.name}</p>
              <p className="product-price">₹{product.selling_price}</p>
            </div>
          ))}
        </div>
      )}
    </ul>
    {showModal && <AddProductModal onClose={handleCloseModal} />}
  </div>
  );
};

export default Home;
