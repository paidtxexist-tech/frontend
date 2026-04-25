import { useState, useEffect } from 'react';
import api from '../api/axios';

const DashboardPage = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [payments, setPayments] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        api.get('/api/subscriptions/')
            .then(res => setSubscriptions(res.data));

        api.get('/api/payments/')
            .then(res => {
                setPayments(res.data);
                const sum = res.data.reduce((acc, p) => acc + Number(p.money), 0);
                setTotalSpent(sum);
            });
    }, []);

    return (
        <div className="container">
            <h1>Личный кабинет</h1>

            <div className="card">
                <h2>Подписки</h2>
                {subscriptions.length > 0 ? subscriptions.map(sub => (
                    <div key={sub.id}>
                        <strong>{sub.plan.name}</strong>
                        <p>до {new Date(sub.end_date).toLocaleDateString()}</p>
                        {sub.vpn_key && (
                            <p className="vpn-key">
                                КЛЮЧ: {sub.vpn_key}
                            </p>
                        )}
                    </div>
                )) : <p>Нет активных подписок</p>}
            </div>
            <div className="card">
                <h2>История платежей</h2>
                {payments.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{new Date(p.datetime).toLocaleDateString()}</span>
                        <span>{p.plan_name}</span>
                        <span>${p.money}</span>
                    </div>
                ))}
            </div>

            <div className="card">
                <h2>Всего потрачено: ${totalSpent.toFixed(2)}</h2>
            </div>
        </div>
    );
};
export default DashboardPage;