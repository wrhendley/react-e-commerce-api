import { Component } from 'react';
import './AppStyles.css';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';
import ProductList from './components/ProductList';
import CustomerForm from './components/CustomerForm';
import ProductForm from './components/ProductForm';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomerId: null,
      selectedOrderId: null
    };
  }

  handleCustomerSelect = (customerId) => {
    this.setState({ selectedCustomerId: customerId });
  }

  updateCustomerList = () => {
    this.customerListRef.fetchCustomers();
  }

  render() {
    const { selectedCustomerId, selectedOrderId } = this.state;

    return (
      <div className='app-container'>
        <h1>Our Customers</h1>
        <CustomerForm customerId={selectedCustomerId} onUpdateCustomerList={this.updateCustomerList}/>
        <CustomerList ref={ref => this.customerListRef = ref} onCustomerSelect={this.handleCustomerSelect} />
      </div>
    );
  }
}

export default App
