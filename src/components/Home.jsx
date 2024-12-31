import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to our e-commerce site.</p>
            <div className="row column-gap-3">
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Customers</h5>
                        <p className="card-text">Add and edit customers.</p>
                        <Link to="/customers">
                            <button className="btn btn-primary">Go</button>
                        </Link>
                    </div>
                </div>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Products</h5>
                        <p className="card-text">Add and edit products.</p>
                        <Link to="/products">
                            <button className="btn btn-primary">Go</button>
                        </Link>
                    </div>
                </div>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">Orders</h5>
                        <p className="card-text">Add and edit orders.</p>
                        <Link to="/orders">
                            <button className="btn btn-primary">Go</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;