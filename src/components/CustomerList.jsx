import React, { useEffect, useState } from 'react';
import '../AppStyles.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

const CustomerList = ({ onCustomerSelect, onDeleteCustomer }) => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    };

    const handleSelectCustomer = (id) => {
        console.log('Selected customer ID:', id);
        setSelectedCustomerId(id);
    };

    const handleDeleteCustomer = (customerId) => {
        onDeleteCustomer(customerId);
        fetchCustomers();
    };

    return (
        <div>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>
                        <NavLink to={`/customers/${customer.id}`}>
                            <div className='row column-gap-3 text-dark text-decoration-none'>
                                <div className='col-md-2'>{customer.name}</div>
                                <button className="btn btn-primary col-md-2">Delete</button>
                            </div>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

CustomerList.propTypes = {
    onCustomerSelect: PropTypes.func.isRequired,
    onDeleteCustomer: PropTypes.func.isRequired
};

export default CustomerList;