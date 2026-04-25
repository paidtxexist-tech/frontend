import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/plans/')
            .then(res => setPlans(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="container">Загрузка...</div>;
    
    return (
        <div className="container">
            <h1 style={{ marginBottom: '2rem' }}>Выберите тариф VPN</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                {plans.map(plan => (
                    <div key={plan.id} className="card">
                        <h2>{plan.name}</h2>
                        <p style={{ color: '#666', margin: '0.8rem 0' }}>{plan.description}</p>
                        <p style={{ fontSize: '1.4rem', fontWeight: '600' }}>${plan.price}</p>
                        <p>{plan.duration} дней</p>
                        <Link to={`/checkout/${plan.id}`}>
                            <button style={{ width: '100%', marginTop: '1rem' }}>Выбрать</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default HomePage;