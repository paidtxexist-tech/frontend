import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const { authTokens } = useAuth();
    // редирект на логин без авторизации
    if (!authTokens) {
        return <Navigate to="/login" />;
    }
    return children;
};
export default ProtectedRoute;