import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews, deleteReview } from '../../../store/slices/reviewSlice';
import { Link } from 'react-router-dom';
import './Reviews.css';

const Reviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews.items);
    const status = useSelector((state) => state.reviews.status);
    const error = useSelector((state) => state.reviews.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchReviews());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteReview(id));
    };

    return (
        <div className="reviews-page">
            <h1>Отзывы</h1>
            <div className='add'>
                <Link to="/reviews/addReview">Создать комментарий</Link>
            </div>
            {status === 'loading' && <p>Загрузка...</p>}
            {status === 'failed' && <p>{error}</p>}
            {status === 'succeeded' && (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <div>
                                <h4>{review.name}</h4>
                            </div>
                            <div>{review.content}</div>
                            <div className='editing'>
                                <Link to={`/reviews/edit-review/${review.id}`}>Редактировать</Link>
                                <button className='remove' onClick={() => handleDelete(review.id)}>Удалить</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Reviews;
