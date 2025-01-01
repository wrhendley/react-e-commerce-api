import { array, func } from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = ({ products, onProductDeleted }) => {    
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            onProductDeleted();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className='container border'>
            <h3>Products</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id} className="row column-gap-3 text-dark text-decoration-none me-4">
                        <div className="col-md-4">{product.name} (ID: {product.id})</div>
                        
                        <Link to={`/products/${product.id}`} className="btn btn-primary col-md-2">
                            Edit
                        </Link>

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