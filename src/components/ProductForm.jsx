import { useRef, useState } from 'react';

const ProductForm = () => {
    const nameRef = useRef(null);
    const priceRef = useRef(null);
    const stockRef = useRef(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        const name = nameRef.current.value;
        const price = priceRef.current.value;
        const stock = stockRef.current.value;
        if (!name) errors.name = 'Name is required';
        if (!price) errors.price = 'Price is required';
        if (price <= 0) errors.price = 'Price must be greater than 0';
        if (!stock) errors.stock = 'Stock is required';
        if (stock < 0) errors.stock = 'Stock must be 0 or greater';
        return errors;
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const name = nameRef.current.value;
            const price = priceRef.current.value;
            const stock = stockRef.current.value;
            console.log('Submitted product:', { name, price, stock });
        } else {
            setErrors(errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add/Edit Product</h3>
            <label>
                Name:
                <input type='text' ref={nameRef} />
                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
            </label>
            <br />
            <label>
                Price:
                <input type='number' ref={priceRef} />
                {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
            </label>
            <br />
            <label>
                Stock:
                <input type='number' ref={stockRef} />
                {errors.stock && <span style={{ color: 'red' }}>{errors.stock}</span>}
            </label>
            <br />
            <button type='submit'>Submit</button>
        </form>
    );
}

export default ProductForm;