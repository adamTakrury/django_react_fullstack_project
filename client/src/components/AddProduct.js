import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If using React Router v6
import axios from 'axios';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate(); // Replace with `useHistory` if using React Router v5

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setImage(null);
        setName('');
        setPrice('');
        setDescription('');
        setCategory('');
        setImagePreview(null);
    };

    const AddProductInfo = async () => {
        let formField = new FormData();

        formField.append('name', name);
        formField.append('price', price);
        formField.append('description', description);
        formField.append('category', category);
        if (image !== null) {
            formField.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/', formField);
            console.log(response.data);
            resetForm();
            navigate('/'); // Use history.push('/') if using React Router v5
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Add Product</h1>
            <div className="form-group">
                <label>Select Image</label>
                <input 
                    type="file" 
                    className="form-control form-control-lg" 
                    name="image"
                    onChange={handleImageChange} 
                />
                {imagePreview && <img src={imagePreview} alt="Preview" className="img-thumbnail" style={{ width: '200px', marginTop: '10px' }} />}
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

            <button className="btn btn-success" onClick={AddProductInfo}>Add Product</button>
        </div>
    );
};

export default AddProduct;
