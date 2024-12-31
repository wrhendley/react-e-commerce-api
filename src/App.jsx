import { useState, useEffect } from 'react';
import './AppStyles.css';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import CustomerForm from './components/CustomerForm';
import axios from 'axios';

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

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
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

  // handleCustomerSelect = (customerId) => {
  //   this.setState({ selectedCustomerId: customerId });
  // };

  // updateCustomerList = () => {
  //   this.customerListRef.fetchCustomers();
  // };

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

    return (
        <div className='app-container'>
            <h1>Product Management</h1>
            <ProductForm 
                selectedProduct={selectedProduct} 
                onProductUpdated={handleProductUpdated}
            />
            <ProductList 
                products={products}
                onEditProduct={handleEditProduct} 
                onProductDeleted={handleProductDeleted}
            />
        </div>
    );
}

export default App
