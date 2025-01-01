import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './AppStyles.css';
import CustomerManager from './components/Customers/CustomerManager';
import ProductManager from './components/Products/ProductManager';
import OrderManager from './components/Orders/OrderManager';
import Home from './components/Home';
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
    return (
        <div className='app-container'>
            <NavigationBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/customers' element={<CustomerManager />} />
                <Route path='/customers/:id' element={<CustomerManager />} />
                <Route path='/products' element={<ProductManager />} />
                <Route path='/products/:id' element={<ProductManager />} />
                <Route path='/orders' element={<OrderManager />} />
                <Route path='/orders/:id' element={<OrderManager />} />
            </Routes>
        </div>
    )
}

export default App
