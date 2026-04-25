// src/pages/DashboardPage.js
import { useState, useEffect } from 'react';
import api from '../api/axios';

const DashboardPage = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [payments, setPayments] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedKey, setSelectedKey] = useState('');

    useEffect(() => {
        // активные подписки
        api.get('/api/subscriptions/')
            .then(res => setSubscriptions(res.data))
            .catch(err => console.log('Ошибка загрузки подписок', err));

        // история платежей
        api.get('/api/payments/')
            .then(res => {
                setPayments(res.data);
                const sum = res.data.reduce((acc, p) => acc + Number(p.money), 0);
                setTotalSpent(sum);
            })
            .catch(err => console.log('Ошибка загрузки платежей', err));
    }, []);

    // открыть модальное окно с полным ключом
    const openKeyModal = (fullKey) => {
        setSelectedKey(fullKey);
        setModalOpen(true);
    };

    // закрыть модальное окно
    const closeKeyModal = () => {
        setModalOpen(false);
        setSelectedKey('');
    };

    // копирование ключа
    const handleCopyKey = () => {
        navigator.clipboard.writeText(selectedKey)
            .then(() => alert('Ключ скопирован!'))
            .catch(() => alert('Не удалось скопировать, скопируйте вручную'));
    };

    // маскировка ключа дашборде
    const maskKey = (key) => {
        if (!key) return '';
        if (key.length <= 8) return key;
        return key.substring(0, 8) + '…';
    };

    return (
        <div className="container">
            <h1>Личный кабинет</h1>

            {/* активные подписки */}
            <h2>Активные подписки</h2>
            {subscriptions.length === 0 && <p>Нет активных подписок</p>}
            {subscriptions.map(sub => (
                <div key={sub.id} className="subscription-card">
                    <strong>{sub.plan.name}</strong>
                    <p>до {new Date(sub.end_date).toLocaleDateString()}</p>
                    {sub.vpn_key ? (
                        <div>
                            {/* обрезанный ключ, клик открывает окно с полным ключом */}
                            <span
                                className="key-preview"
                                onClick={() => openKeyModal(sub.vpn_key)}
                            >
                 {maskKey(sub.vpn_key)}
              </span>
                        </div>
                    ) : (
                        <p style={{ color: '#999' }}>Ключ не назначен</p>
                    )}
                </div>
            ))}

            {/* история */}
            <h2 style={{ marginTop: '2rem' }}>История платежей</h2>
            {payments.length === 0 && <p>Платежей пока не было</p>}
            {payments.map(p => (
                <div key={p.id} className="subscription-card" style={{padding: '1rem'}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{new Date(p.datetime).toLocaleDateString()}</span>
                        <span>{p.plan_name}</span>
                        <span>${p.money}</span>
                    </div>
                </div>
            ))}

            {/* общая сумма */}
            <div className="card" style={{ marginTop: '2rem' }}>
                <h3>Всего потрачено: ${totalSpent.toFixed(2)}</h3>
            </div>

            {/* модальное окно с полным ключом */}
            {modalOpen && (
                <div className="modal-overlay" onClick={closeKeyModal}>
                    {/* чтобы клик внутри окна не закрывал его */}
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={closeKeyModal}>✕</button>
                        <h3>Ваш VPN-ключ</h3>
                        <div className="modal-key">{selectedKey}</div>
                        <button className="copy-btn" onClick={handleCopyKey}>
                             Копировать
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;