import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../../store/slices/productsSlice';
import './Dashboard.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);

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
                <input type="text" placeholder="Поиск..." />
                <div className="user">
                    <img src="https://via.placeholder.com/30" alt="Пользователь" />
                    <span>Администратор</span>
                </div>
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
