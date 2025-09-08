'use client';

import ProtectedRoute from '@/lib/ProtectedRoute';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1>Welcome User</h1>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
