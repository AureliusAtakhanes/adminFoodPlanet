import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../../../store/slices/reviewSlice';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import './AddReview.css';

const AddReview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        content: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addReview(formData));
        navigate('/reviews');
    };

    return (
        <div className="add-review-page">
            <h1>Добавить отзыв</h1>
            <div className='backToReviews'>
                <button className='backBtn' onClick={() => navigate(-1)}>
                    <IoIosArrowBack />
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Дата:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Содержание:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">Добавить отзыв</button>
            </form>
        </div>
    );
};

export default AddReview;
