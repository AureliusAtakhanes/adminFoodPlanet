import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const items = [
        { name: 'Пицца', count: 60 },
        { name: 'Бургер', count: 16 },
        { name: 'Суши', count: 43 },
        { name: 'Роллы', count: 64 },
        { name: 'Салаты', count: 60 },
        { name: 'Десерты', count: 60 },
        { name: 'Напитки', count: 43 },
        { name: 'Роллы', count: 64 }
    ];

    return (
        <div className="dashboard">
            <div className="header">
                <input type="text" placeholder="Search..." />
                <div className="user">
                    <img src="https://via.placeholder.com/30" alt="User" />
                    <span>Администратор</span>
                </div>
            </div>
            <div className="cards">
                {items.map((item, index) => (
                    <div key={index} className={`card ${item.name === 'Бургер' ? 'active' : ''}`}>
                        <h3>{item.name}</h3>
                        <p>{item.count}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
