import { array } from 'prop-types';

const OrderList = ({ orders }) => {
    return (
        <div className='container bg-white border'>
            <h2 className='mt-2 mb-3 ms-4'>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id} className='row column-gap-3 text-dark text-decoration-none me-4'>
                        Order ID: {order.id} - Order Date: {order.order_date} - Customer ID: {order.customer_id} - Total: ${order.total_price.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

OrderList.propTypes = {
    orders: array,
};

export default OrderList;