import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from '../../../store/slices/productsSlice';
import './CreateOrderPage.css'; // Импортируйте CSS файл

const CreateOrderPage = () => {
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.products);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [productType, setProductType] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, description, price, productType, image, news: true };
        dispatch(addProduct(newProduct));
        if (status === 'succeeded') {
            alert('Товар добавлен');
            setName('');
            setDescription('');
            setPrice('');
            setProductType('');
            setImage('');
        }
    };

    return (
        <div className="create-order-page">
            <h2>Добавить новый продукт</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Название:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Описание:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Цена:</label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Тип продукта:</label>
                    <select
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        required
                    >
                        <option value="">Выберите тип продукта</option>
                        <option value="1">Пицца</option>
                        <option value="2">Бургер</option>
                        <option value="3">Суши</option>
                        <option value="4">Роллы</option>
                        <option value="5">Салаты</option>
                        <option value="6">Десерты</option>
                        <option value="7">Напитки</option>
                    </select>
                </div>
                <div>
                    <label>URL Изображения:</label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button type="submit">Добавить продукт</button>
            </form>
            {status === 'loading' && <p className="loading">Загрузка...</p>}
            {status === 'failed' && <p className="error">Ошибка: {error}</p>}
        </div>
    );
};

export default CreateOrderPage;
