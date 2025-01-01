import { func, number } from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ onOrderUpdated }) => {
    const [date, setDate] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [orderItems, setOrderItems] = useState([ { productId: '', quantity: '' } ]);
    const [errors, setErrors] = useState({});

    const handleOrderItemChange = (index, field, value) => {
        const newOrderItems = [...orderItems];
        newOrderItems[index][field] = value;
        setOrderItems(newOrderItems);
    };

    const addOrderItem = () => {
        setOrderItems([...orderItems, { productId: '', quantity: '' }]);
    };

    const validateForm = () => {
        const errors = {};
        if (!date) errors.date = 'Date is required';
        if (!customerId) errors.customerId = 'Customer ID is required';
        orderItems.forEach((item, index) => {
            if (!item.productId) errors[`productId${index}`] = 'Product ID is required';
            if (!item.quantity) errors[`quantity${index}`] = 'Quantity is required';
            if (item.quantity <= 0) errors[`quantity${index}`] = 'Quantity must be greater than 0';
        });
        console.log(errors);
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                const orderData = { 
                    customer_id: parseInt(customerId), 
                    order_date: date, 
                    order_items: orderItems.map(item => ({ 
                        product_id: parseInt(item.productId), 
                        quantity: parseInt(item.quantity) 
                    }))
                };
                console.log('orderData:', orderData);
                await axios.post(`http://127.0.0.1:5000/orders`, orderData);
                onOrderUpdated();
                setDate('');
                setCustomerId('');
                setOrderItems([ { productId: '', quantity: '' } ]);
            } catch (error) {
                if (error.response) {
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                    console.error('Error response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                } else {
                    console.error('Error:', error.message);
                }
                console.error('Error config:', error.config);
            }
        } else {
            setErrors(errors);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='mb-3 border p-3 bg-light text-dark'>
                <h3 className='mb-3'>Add Order</h3>
                <label>
                    Date:
                    <input type='text' value={date} onChange={(e) => setDate(e.target.value)} className='form-control' />
                    {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
                </label>
                <br />
                <label>
                    Customer ID:
                    <input type='text' value={customerId} onChange={(e) => setCustomerId(e.target.value)} className='form-control' />
                    {errors.customerId && <span style={{ color: 'red' }}>{errors.customerId}</span>}
                </label>
                <br />
                {orderItems.map((item, index) => (
                    <div key={index}>
                        <label>
                            Product ID:
                            <input
                                type="text"
                                value={item.productId}
                                onChange={(e) => handleOrderItemChange(index, 'productId', e.target.value)}
                                className='form-control'
                            />
                            {errors[`productId${index}`] && <span style={{ color: 'red' }}>{errors[`productId${index}`]}</span>}
                        </label>
                        <br />
                        <label>
                            Quantity:
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleOrderItemChange(index, 'quantity', e.target.value)}
                                className='form-control mb-3'
                            />
                            {errors[`quantity${index}`] && <span style={{ color: 'red' }}>{errors[`quantity${index}`]}</span>}
                        </label>
                        <br />
                    </div>
                ))}
                <button type="button" className="btn btn-primary my-2" onClick={addOrderItem}>Add Product</button>
                <br />
                <button type="submit" className='btn btn-success my-2' >Submit Order</button>
            </form>
        </div>
    );
};

OrderForm.propTypes = {
    onOrderUpdated: func.isRequired
};

export default OrderForm;