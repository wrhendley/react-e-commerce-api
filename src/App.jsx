import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AppStyles.css';
import CustomerManager from './components/Customers/CustomerManager';
import ProductForm from './components/Products/ProductForm';
import ProductList from './components/Products/ProductList';
import OrderForm from './components/Orders/OrderForm';
import OrderList from './components/Orders/OrderList';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchCustomers();
        // fetchProducts();
        // fetchOrders();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/customers`);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/orders`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleCustomerUpdated = () => {
        fetchCustomers();
    };

    const handleProductUpdated = () => {
        fetchProducts();
    };

    const handleOrderUpdated = () => {
        fetchOrders();
    };

    return (
        <div className='app-container'>
            <NavigationBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/customers' element={<CustomerManager />} />
                <Route path='/customers/:id' element={<CustomerManager />} />
                <Route path='/products' element={<ProductForm selectedProductId={({ match }) => match.params.id} onProductUpdated={handleProductUpdated} onUpdateProductList={handleProductUpdated} onDeleteProduct={handleProductUpdated} />} />
                <Route path='/products/:id' element={<ProductForm onProductUpdated={handleProductUpdated} />} />
                <Route path='/orders' element={<OrderList />} />
                <Route path='/orders/:id' element={<OrderForm onOrderUpdated={handleOrderUpdated} />} />
            </Routes>
        </div>
    )
}

export default App
