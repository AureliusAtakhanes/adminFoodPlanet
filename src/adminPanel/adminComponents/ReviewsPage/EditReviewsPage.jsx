import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchReviewById, updateReview } from '../../../store/slices/reviewSlice';
import { IoIosArrowBack } from 'react-icons/io';
import './EditReviews.css'
const EditReviewPage = () => {
    const { reviewId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const review = useSelector((state) => state.reviews.currentReview);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        content: '',
    });

    useEffect(() => {
        if (reviewId) {
            dispatch(fetchReviewById(reviewId));
        }
    }, [dispatch, reviewId]);

    useEffect(() => {
        if (review) {
            setFormData({
                name: review.name,
                date: review.date,
                content: review.content,
            });
        }
    }, [review]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateReview({ id: reviewId, ...formData }));
        navigate('/reviews');
    };

    return (
        <div className="edit-review-page">
            <h1>Редактировать отзыв</h1>
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
                        type="text"
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
                <button type="submit">Сохранить изменения</button>
            </form>
        </div>
    );
};

export default EditReviewPage;
