import { array } from 'prop-types';

const OrderList = ({ orders }) => {
    return (
        <div className='order-list'>
            <h3>Orders</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
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