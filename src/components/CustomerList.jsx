import { Component } from "react";
import '../AppStyles.css';
import axios from 'axios';

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null
        };
    }

    componentDidMount() {        
        this.fetchCustomers();
    }
    
    fetchCustomers = () => {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }

    selectCustomer = (id) => {
        this.setState({ selectedCustomerId: id });
        this.props.onCustomerSelect(id);
    }

    deleteCustomer = (customerId) => {
        axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(response => {
                console.log('Customer deleted:', response.data);
                this.fetchCustomers();
            })
            .catch(error => {
                console.log('Customer ID:', customerId);
                console.error('Error deleting customer:', error);
            });
    }

    render() {
        const { customers } = this.state;

        return(
            <div className="customer-list">
                <h3>Customers</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id} onClick={() => this.selectCustomer(customer.id)}>
                            {customer.name}
                            <button onClick={() => this.deleteCustomer(customer.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default CustomerList;