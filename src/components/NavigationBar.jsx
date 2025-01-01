import { NavLink } from "react-router-dom";

const NavigationBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand text-light" to="/">E-Commerce</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item bg-dark">
                            <NavLink className="nav-link text-light" to="/customers">Customers</NavLink>
                        </li>
                        <li className="nav-item bg-dark">
                            <NavLink className="nav-link text-light" to="/products">Products</NavLink>
                        </li>
                        <li className="nav-item bg-dark">
                            <NavLink className="nav-link text-light" to="/orders">Orders</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavigationBar;