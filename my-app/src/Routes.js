import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantHome from './RestaurantHome';
import Authform from './AuthForm';
import AdminDashboard from './AdminDashboard';
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantHome />} />
        <Route path="/login" element={<Authform />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;