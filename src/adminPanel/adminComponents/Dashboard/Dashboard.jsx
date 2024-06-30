import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../../store/slices/productsSlice';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value.trim() !== '') {
            const results = products.filter(product =>
                product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                product.description.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const productCounts = products.reduce((acc, product) => {
        if (acc[product.productType]) {
            acc[product.productType]++;
        } else {
            acc[product.productType] = 1;
        }
        return acc;
    }, {});

    const items = [
        { title: 'Пицца', count: productCounts[1] || 0 },
        { title: 'Бургер', count: productCounts[2] || 0 },
        { title: 'Суши', count: productCounts[3] || 0 },
        { title: 'Роллы', count: productCounts[4] || 0 },
        { title: 'Салаты', count: productCounts[5] || 0 },
        { title: 'Десерты', count: productCounts[6] || 0 },
        { title: 'Напитки', count: productCounts[7] || 0 }
    ];

    return (
        <div className="dashboard">
            <div className="header">
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="user">
                    <img src="https://via.placeholder.com/30" alt="Пользователь" />
                    <span>Администратор</span>
                </div>
            </div>
            <div className="search-results">
                {searchResults.length > 0 && (
                    <div className="search-options">
                        <h3>Результаты поиска:</h3>
                        {searchResults.map((product, index) => (
                            <div key={index} className="search-option">
                                <Link to={`/products/edit-product/${product.id}`}>
                                    <p>{product.name}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="cards">
                {items.map((item, index) => (
                    <div key={index} className={`card ${item.title === 'Бургер' ? 'active' : ''}`}>
                        <h3>{item.title}</h3>
                        <p>{item.count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
