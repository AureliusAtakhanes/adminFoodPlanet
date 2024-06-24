import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../../../store/slices/productsSlice';
import { IoIosArrowBack } from 'react-icons/io';

import './EditProductPage.css'

const EditProductPage = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector((state) => state.products.currentProduct);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
    });

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId));
        }
    }, [dispatch, productId]);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ id: productId, ...formData }));
        navigate('/products');
    };

    return (
        <div className="edit-product-page">
            <h1>Редактировать продукт</h1>
            <div className='backToProducts'>
                <button onClick={() => navigate(-1)}>
                    <IoIosArrowBack />
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <label>
                    Название:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Описание:
                    <textarea
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </label>
                <label>
                    Цена:
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Изображение:
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Сохранить изменения</button>
            </form>
        </div>
    );
};

export default EditProductPage;
