import React, { useState, useEffect } from "react";
import { usePost } from "../Hooks/usePostdata";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Addproductmodal.css"

const AddProductModal = ({ onClose }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productAllergenInfo, setProductAllergenInfo] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const newProduct = {
    name: productName,
    description: productDescription,
    selling_price: productAllergenInfo,
  };

  const { postData,response, isLoading, error } = usePost();

  useEffect(() => {
    setIsButtonDisabled(
      !productName || !productDescription || !productAllergenInfo
    );
  }, [productName, productDescription, productAllergenInfo]);

  const handleSubmit = async () => {
    // Set the request body based on form inputs
    console.log("New product data:", newProduct); // Debugging log

    try {
      await postData("https://frontend-assessment-server.onrender.com/api/products", newProduct);
      toast.success("Product saved successfully!");
      onClose(true); // Call onClose on successful request
    } catch (error) {
      console.log("An error occurred. Please try again."); // Set a user-friendly error message
    } 
  };

  return (
    <>
    <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => onClose(false)}>&times;</span>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Product Description"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Product Selling Price"
        value={productAllergenInfo}
        onChange={(e) => setProductAllergenInfo(e.target.value)}
      />
      <button className={`theonewithmodal ${isButtonDisabled ? 'disabled' : ''}`} onClick={handleSubmit} disabled={isButtonDisabled}>{isLoading?"Submitting...":"Add"}</button>
    </div>
  </div>
  </>
  );
};

export default AddProductModal;
