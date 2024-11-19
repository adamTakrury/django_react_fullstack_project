import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios'; // Import axios

const UpdateProduct = () => {
    const { id } = useParams();

    // State variables for product data
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    // Load product data
    const loadProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/api/${id}`);
            console.log(data);
            setImage(data.image);
            setName(data.name);
            setPrice(data.price);
            setDescription(data.description);
            setCategory(data.category);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        loadProducts(); // Fetch product data on component mount
    }, [id]);

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // Preview image before upload
    };

    // Update product info function
    const updateProductInfo = async () => {
        let formField = new FormData();
        formField.append("name", name);
        formField.append("price", price);
        formField.append("description", description);
        formField.append("category", category);
        if (image !== null) {
            formField.append("image", image); // Add image if it exists
        }

        await axios({
            method: 'PUT',
            url: `http://localhost:8000/api/${id}/`,
            data: formField,
        })
        .then((response) => {
            console.log(response.data); // Log the response data
            alert("Product updated successfully!");
        })
        .catch((error) => {
            console.error("Error updating product:", error);
            alert("Failed to update product. Please try again.");
        });
    };

    return (
        <div>
            <h1>Update Page</h1>

            {/* Image at the top */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                {imagePreview ? (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ width: '150px', height: '300px' }}
                    />
                ) : (
                    image && (
                        <img
                            src={image}
                            alt="Product"
                            className="img-thumbnail"
                            style={{ width: '150px', height: '300px' }}
                        />
                    )
                )}
            </div>

            {/* Form inputs */}
            <div className="form-group">
                <label>Select Image</label>
                <input
                    type="file"
                    className="form-control form-control-lg"
                    name="image"
                    onChange={handleImageChange}
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Product Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Product Price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Product Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Product Category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>

            <button className="btn btn-success" onClick={updateProductInfo}>
                Update Product
            </button>
        </div>
    );
};

export default UpdateProduct;
