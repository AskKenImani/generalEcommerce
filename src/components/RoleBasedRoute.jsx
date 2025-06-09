
import { Navigate } from 'react-router-dom';
import { useUserProfile } from '../hooks/useUserProfile';
import Store from '../pages/Store';
import Index from '../pages/Index';
import styles from './RoleBasedRoute.module.css';

const RoleBasedRoute = ({ children, requiredRole }) => {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.spinner}></div>
          <p className={styles.text}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (!requiredRole) {
    return profile.role === 'admin' ? <Index /> : <Store />;
  }

  // Check if user has required role
  if (profile.role !== requiredRole) {
    // Redirect to appropriate dashboard based on actual role
    if (profile.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/store" replace />;
    }
  }

  return children;
};

export default RoleBasedRoute;
