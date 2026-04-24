import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            navigate('/login');
        } catch (err) {
            setError('Что-то пошло не так...');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '3rem' }}>
            <form onSubmit={handleSubmit} className="card">
                <h2>Регистрация</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input placeholder="Имя пользователя" value={username}
                       onChange={e => setUsername(e.target.value)} required />
                <input type="password" placeholder="Пароль" value={password}
                       onChange={e => setPassword(e.target.value)} required style={{ marginTop: '0.8rem' }} />
                <button type="submit" style={{ width: '100%', marginTop: '1.2rem' }}>Зарегистрироваться</button>
            </form>
        </div>
    );
};
export default RegisterPage;