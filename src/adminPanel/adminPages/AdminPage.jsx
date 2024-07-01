import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../adminComponents/Sidebar/Sidebar';
import Dashboard from '../adminComponents/Dashboard/Dashboard';
import './AdminPage.css';

const CreateOrderPage = lazy(() => import('../adminComponents/CreateOrderPage/CreateOrderPage'));
const ProductsPage = lazy(() => import('../adminComponents/ProductsPage/ProductsPage'));
const EditProductPage = lazy(() => import('../adminComponents/EditProductPage/EditProductPage'));
const ReviewsPage = lazy(() => import('../adminComponents/ReviewsPage/Reviews'));
const EditReviewPage = lazy(() => import('../adminComponents/ReviewsPage/EditReviewsPage'))
const AddReview = lazy(() => import('../adminComponents/ReviewsPage/AddReview'));

function AdminPage() {
    return (
        <div className="admin-page">
            <Sidebar />
            <div className="content">
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/createProduct" element={<CreateOrderPage />} />
                        <Route path="/products/*" element={<ProductsRoutes />} />
                        <Route path="/reviews" element={<ReviewsPage />} />
                        <Route path="/reviews/addReview" element={<AddReview />} />
                        <Route path="/reviews/edit-review/:reviewId" element={<EditReviewPage />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

const ProductsRoutes = () => (
    <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/edit-product/:productId" element={<EditProductPage />} />
    </Routes>
);

export default AdminPage;
