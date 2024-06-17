import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../adminComponents/Sidebar/Sidebar';
import Dashboard from '../adminComponents/Dashboard/Dashboard';
import './AdminPage.css'


const CreateOrderPage = lazy(() => import('../adminComponents/CreateOrderPage/CreateOrderPage'));

function AdminPage() {
    return (
        <div className="admin-page">
            <Sidebar />
            <div className="content">
                <Suspense fallback={<div>Загрузка...</div>}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/orders" element={<CreateOrderPage />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default AdminPage;
