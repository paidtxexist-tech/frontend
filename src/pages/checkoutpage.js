import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axios';

const CheckoutPage = () => {
    const { planId } = useParams();
    const navigate = useNavigate();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/plans/')
            .then(res => {
                const found = res.data.find(p => p.id === Number(planId));
                setPlan(found);
                setLoading(false);
            });
    }, [planId]);

    const handlePay = async () => {
        try {
            await api.post('/api/payment/', { plan_id: plan.id });
            alert('Успешный успех ура');
            navigate('/dashboard');
        } catch (err) {
            alert('Неуспешный неуспех :(');
        }
    };

    if (loading) return <div className="container">Загрузка...</div>;
    if (!plan) return <div className="container">Тариф не найден</div>;

    return (
        <div className="container" style={{ maxWidth: '500px' }}>
            <div className="card">
                <h2>Оплата: {plan.name}</h2>
                <p>Сумма: {plan.price} рубю</p>
                <button onClick={handlePay} style={{ width: '100%', marginTop: '1.5rem' }}>
                    Оплатить
                </button>
            </div>
        </div>
    );
};
export default CheckoutPage;