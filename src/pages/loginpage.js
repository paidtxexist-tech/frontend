import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Неверное имя или пароль');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '3rem' }}>
            <form onSubmit={handleSubmit} className="card">
                <h2>Вход</h2>
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
                <input type="text" placeholder="Имя пользователя" value={username}
                       onChange={e => setUsername(e.target.value)} required />
                <input type="password" placeholder="Пароль" value={password}
                       onChange={e => setPassword(e.target.value)} required style={{ marginTop: '0.8rem' }} />
                <button type="submit" style={{ width: '100%', marginTop: '1.2rem' }}>Войти</button>
            </form>
        </div>
    );
};
export default LoginPage;