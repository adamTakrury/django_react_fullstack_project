import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const ProductDetail = () => {
    const [product, setProduct] = useState(""); // Initialize state for product
    const { id } = useParams(); // Get the product ID from the URL parameters
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // Fetch single product details
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/${id}`);
            console.log(data);
            setProduct(data); // Update the state with the fetched product
        } catch (error) {
            console.error("Error fetching the product:", error);
        }
    };

    useEffect(() => {
        getSingleProduct(); // Fetch the product details on component mount
    }, []);

    // Delete product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/${id}/`); // Fix: Add `await` here
            navigate('/'); // Use navigate to redirect
        } catch (error) {
            console.error("Error deleting the product:", error);
        }
    };

    return (
        <div>
            <h1>Product Detail</h1>
            <div className="single-product-info">
                {product.image && (
                    <img
                        src={product.image}
                        alt={product.name}
                        height="400"
                        width="250"
                    />
                )}
                <p>{product.name}</p>
                <p>{product.price}</p>
                <p>{product.description}</p>
                <p>{product.category}</p>

                <Link className="btn btn-primary" to={`/${product.id}/update`}>
                    Update
                </Link>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
