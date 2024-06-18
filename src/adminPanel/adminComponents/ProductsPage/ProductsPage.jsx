import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../store/slices/productsSlice';
import { Link } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <div className="products-page">
            <h1>Список продуктов</h1>
            {status === 'loading' && <p>Загрузка...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded' && (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <div>
                                <strong>{product.name}</strong> - {product.price}
                            </div>
                            <div>
                                <Link to={`/edit-product/${product.id}`}>Редактировать</Link>
                                <button onClick={() => handleDelete(product.id)}>Удалить</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductsPage;
