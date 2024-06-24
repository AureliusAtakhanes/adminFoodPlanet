import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../../store/slices/productsSlice';
import { Link } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const [filter, setFilter] = useState('');

    const categoryMapping = {
        1: "Пицца",
        2: "Бургер",
        3: "Суши",
        4: "Роллы",
        5: "Салаты",
        6: "Десерты",
        7: "Напитки"
    };

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const filteredProducts = filter
        ? products.filter((product) => categoryMapping[product.productType] === filter)
        : products;

    return (
        <div className="products-page">
            <h1>Список продуктов</h1>
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
            >
                <option value="">Все категории</option>
                <option value="Пицца">Пицца</option>
                <option value="Бургер">Бургер</option>
                <option value="Суши">Суши</option>
                <option value="Роллы">Роллы</option>
                <option value="Салаты">Салаты</option>
                <option value="Десерты">Десерты</option>
                <option value="Напитки">Напитки</option>
            </select>
            {status === 'loading' && <p>Загрузка...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded' && (
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id}>
                            <div>
                                <strong>{product.name}</strong> - {product.price}
                            </div>
                            <div className='editing'>
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
