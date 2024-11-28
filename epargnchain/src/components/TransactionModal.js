import React, { useState, useEffect } from 'react';
import { TransactionModal } from '../components/TransactionModal';
import { ArrowUpCircleIcon, ArrowDownCircleIcon } from 'lucide-react';

const Dashboard = () => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/transactions/balance/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Erreur lors de la récupération du solde:', error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div>
      {/* ... reste du code ... */}
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setShowDepositModal(true)}
          className="bg-green-500 text-white p-4 rounded-xl shadow-lg flex flex-col items-center"
        >
          <ArrowUpCircleIcon className="h-8 w-8 mb-2" />
          <span>Déposer</span>
        </button>
        <button
          onClick={() => setShowWithdrawModal(true)}
          className="bg-blue-500 text-white p-4 rounded-xl shadow-lg flex flex-col items-center"
        >
          <ArrowDownCircleIcon className="h-8 w-8 mb-2" />
          <span>Retirer</span>
        </button>
      </div>

      {/* Modals */}
      <TransactionModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        type="deposit"
      />
      <TransactionModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        type="withdrawal"
      />
    </div>
  );
};

export default Dashboard; 