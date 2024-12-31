import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AppStyles.css';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import CustomerForm from './components/CustomerForm';
import Home from './components/Home';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     selectedCustomerId: null,
  //     selectedOrderId: null
  //   };
  // }
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
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

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleProductUpdated = () => {
        fetchProducts();
        setSelectedProduct(null);
    };

    const handleProductDeleted = () => {
        handleProductUpdated();
    };

    const handleCustomerUpdated = (customerId) => {
        if (customerId) {
            this.setState({ selectedCustomerId: customerId });
        }
        updateCustomerList();
    };

    const updateCustomerList = () => {
        this.customerListRef.fetchCustomers();
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
    };

    const handleOrderUpdated = () => {
        fetchOrders();
        setSelectedOrder(null);
    };

  // render() {
  //   const { selectedCustomerId, selectedOrderId } = this.state;

  //   return (
  //     <div className='app-container'>
  //       <h1>Our Customers</h1>
  //       <CustomerForm customerId={selectedCustomerId} onUpdateCustomerList={this.updateCustomerList}/>
  //       <CustomerList ref={ref => this.customerListRef = ref} onCustomerSelect={this.handleCustomerSelect} />
  //     </div>
  //   );
  // }

    // return (
    //     <div className='app-container'>
    //         <h1>Product Management</h1>
    //         <ProductForm 
    //             selectedProduct={selectedProduct} 
    //             onProductUpdated={handleProductUpdated}
    //         />
    //         <ProductList 
    //             products={products}
    //             onEditProduct={handleEditProduct} 
    //             onProductDeleted={handleProductDeleted}
    //         />
    //     </div>
    // );

    // return (
    //     <div className='app-container'>
    //         <h1>Orders Management</h1>
    //         <OrderForm
    //             selectedOrder={selectedOrder}
    //             onOrderUpdated={handleOrderUpdated}
    //         />
    //         <OrderList
    //             orders={orders}
    //             onEditOrder={handleEditOrder}
    //             onOrderDeleted={handleOrderDeleted}
    //         />
    //     </div>
    // )

    return (
        <div className='app-container'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/customers' element={<CustomerForm selectedCustomerId={({ match }) => match.params.id} onUpdateCustomerList={fetchCustomers} />} />
                <Route path='/customers/:id' element={<CustomerForm selectedCustomerId={({ match }) => match.params.id} onUpdateCustomerList={fetchCustomers} />} />
                <Route path='/products' element={<ProductList />} />
                <Route path='/products/add' element={<ProductForm onProductUpdated={handleProductUpdated} />} />
                <Route path='/products/:id' element={<ProductForm onProductUpdated={handleProductUpdated} />} />
                <Route path='/orders' element={<OrderList />} />
                <Route path='/orders/add' element={<OrderForm onOrderUpdated={handleOrderUpdated} />} />
                <Route path='/orders/:id' element={<OrderForm onOrderUpdated={handleOrderUpdated} />} />
            </Routes>
        </div>
    )
}

export default App
