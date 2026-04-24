import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { authTokens, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                MIDAS VPN
            </Link>

            <div className="navbar-links">
                {!authTokens && (
                    <>
                        <Link to="/login" className="nav-link">Войти</Link>
                        <Link to="/register" className="nav-link">Зарегистрироваться</Link>
                    </>
                )}

                {authTokens && (
                    <>
                        <Link to="/dashboard" className="nav-link">Личный кабинет</Link>
                        <button onClick={handleLogout} className="logout-btn">Выйти</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;