import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../adminComponents/Sidebar/Sidebar';
import Dashboard from '../adminComponents/Dashboard/Dashboard';
import './AdminPage.css';

const CreateOrderPage = lazy(() => import('../adminComponents/CreateOrderPage/CreateOrderPage'));
const ProductsPage = lazy(() => import('../adminComponents/ProductsPage/ProductsPage'));
const EditProductPage = lazy(() => import('../adminComponents/EditProductPage/EditProductPage'));

function AdminPage() {
    return (
        <div className="admin-page">
            <Sidebar />
            <div className="content">
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/createProduct" element={<CreateOrderPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/edit-product/:productId" element={<EditProductPage />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default AdminPage;
