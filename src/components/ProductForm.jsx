import { useEffect, useState } from 'react';
import axios from 'axios';
import { func, number } from 'prop-types';

const ProductForm = ({ selectedProduct, onProductUpdated }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setPrice(selectedProduct.price);
            setStock(selectedProduct.stock);
        }
    }, [selectedProduct]);

    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!price) errors.price = 'Price is required';
        if (price <= 0) errors.price = 'Price must be greater than 0';
        if (!stock) errors.stock = 'Stock is required';
        if (stock < 0) errors.stock = 'Stock must be 0 or greater';
        console.log(errors);
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const productData = { name, price, stock };
            try {
                if (selectedProduct) {
                    await axios.put(`http://127.0.0.1:5000/products/${selectedProduct.id}`, productData);
                } else {
                    await axios.post(`http://127.0.0.1:5000/products`, productData);
                }
                onProductUpdated();
                setName('');
                setPrice('');
                setStock('');
            }
            catch (error) {
                console.error('Error submitting product:', error);
            }
        } else {
            setErrors(errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{selectedProduct ? 'Edit' : 'Add'} Product</h3>
            <label>
                Name:
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
            </label>
            <br />
            <label>
                Price:
                <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
                {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
            </label>
            <br />
            <label>
                Stock:
                <input type='number' value={stock} onChange={(e) => setStock(e.target.value)} />
                {errors.stock && <span style={{ color: 'red' }}>{errors.stock}</span>}
            </label>
            <br />
            <button type='submit'>Submit</button>
        </form>
    );
}

export default ProductForm;