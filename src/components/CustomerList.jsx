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
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                this.setState({ customers: response.data });
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });   
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedCustomerId !== this.state.selectedCustomerId) {
            console.log('New customer selected: ID', this.state.selectedCustomerId);
        }
    }

    componentWillUnmount() {
        console.log('CustomerList component is being unmounted');
    }

    selectCustomer = (id) => {
        this.setState({ selectedCustomerId: id });
        this.props.onCustomerSelect(id);
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
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default CustomerList;