import { Component } from "react";
import axios from 'axios';

class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            address: '',
            errors: {}
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.customerId !== prevProps.customerId) {
            this.setState({ selectedCustomerId: this.props.customerId });

            if (this.props.customerId) {
                axios.get(`http://127.0.0.1:5000/customers/${this.props.customerId}`)
                    .then(response => {
                        const customerData = response.data;
                        this.setState({
                            name: customerData.name,
                            email: customerData.email,
                            phone: customerData.phone,
                            address: customerData.address
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching customer data:', error);
                    });
            } else {
                this.setState({
                    name: '',
                    email: '',
                    phone: '',
                    address: ''
                });
            }
        }
    }                

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    validateForm = () => {
        const { name, username, password, email, phone, address } = this.state;
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!username) errors.username = 'Username is required';
        if (!password) errors.password = 'Password is required';
        if (!email) errors.email = 'Email is required';
        if (!phone) errors.phone = 'Phone is required';
        if (!address) errors.address = 'Address is required';
        return errors;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if(Object.keys(errors).length === 0) {
            const customerData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim(),
                address: this.state.address.trim(),
                username: this.state.username.trim(),
                password: this.state.password.trim()
            };
            const apiUrl = this.state.selectedCustomerId
                ? `http://127.0.0.1:5000/customers/${this.state.selectedCustomerId}`
                : 'http://127.0.0.1:5000/customers';

            const httpMethod = this.state.selectedCustomerId ? axios.put : axios.post;

            httpMethod(apiUrl, customerData)
                .then(response => {
                        this.props.onUpdateCustomerList();

                        this.setState({
                            name: '',
                            username: '',
                            password: '',
                            email: '',
                            phone: '',
                            address: ''
                        });
                    })
                    .catch(error => {
                        console.error('Error submitting the form: ', error);
                    });
                } else {
                    this.setState({ errors });
                }
            };

    render() {
        const { name, username, password, email, phone, address, errors } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Add/Edit Customer</h3>
                <label>
                    Name:
                    <input type='text' name="name" value={name} onChange={this.handleChange} />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </label>
                <br />
                <label>
                    Username:
                    <input type='text' name="username" value={username} onChange={this.handleChange} />
                    {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                </label>
                <br />
                <label>
                    Password:
                    <input type='password' name="password" value={password} onChange={this.handleChange} />
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </label>
                <br />
                <label>
                    Email:
                    <input type='email' name="email" value={email} onChange={this.handleChange} />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </label>
                <br />
                <label>
                    Phone:
                    <input type='tel' name="phone" value={phone} onChange={this.handleChange} />
                    {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
                </label>
                <br />
                <label>
                    Address:
                    <input type='text' name="address" value={address} onChange={this.handleChange} />
                    {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
                </label>
                <br />
                <button type='submit'>Submit</button>
            </form>
        );
    }
}

export default CustomerForm;