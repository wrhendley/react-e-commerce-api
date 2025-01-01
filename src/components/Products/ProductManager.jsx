import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

const ProductManager = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/products`);
            setProducts(response.data);
        }
        catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <div>
            <ProductForm products={products} productId={id} onProductUpdated={fetchProducts} />
            <ProductList products={products} onProductDeleted={fetchProducts} />
        </div>
    );
}

export default ProductManager;