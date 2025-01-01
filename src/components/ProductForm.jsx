import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';

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
        <div className='bg-light'>
            <form onSubmit={handleSubmit } className='mb-3 border p-3 bg-light text-dark'>
                <h3>{selectedProduct ? 'Edit' : 'Add'} Product</h3>
                <label className="form-label">
                    Name:
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='form-control' />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </label>
                <br />
                <label className="form-label">
                    Price:
                    <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} className='form-control' />
                    {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
                </label>
                <br />
                <label className="form-label">
                    Stock:
                    <input type='number' value={stock} onChange={(e) => setStock(e.target.value)} className='form-control' />
                    {errors.stock && <span style={{ color: 'red' }}>{errors.stock}</span>}
                </label>
                <br />
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>
            {/* <ProductList /> */}
        </div>
    );
}

export default ProductForm;