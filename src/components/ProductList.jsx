import { array, func } from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ onEditProduct, onProductDeleted }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            onProductDeleted();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className='product-list'>
            <h3>Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id} className="row column-gap-3 text-dark text-decoration-none">
                        <div className="col-md-4">{product.name} (ID: {product.id})</div>
                        <button 
                            className="btn btn-primary col-md-2" 
                            onClick={() => {
                                window.location.href = `/products/${product.id}`;
                            }}>
                            Edit
                        </button>
                        <button 
                            className="btn btn-danger col-md-2" 
                            onClick={() => {
                                if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
                                    handleDeleteProduct(product.id);
                                }
                            }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProductList.propTypes = {
    products: array,
    onEditProduct: func,
    onProductDeleted: func
};

ProductList.defaultProps = {
    products: [],
    onEditProduct: () => {},
    onProductDeleted: () => {}
};

export default ProductList;