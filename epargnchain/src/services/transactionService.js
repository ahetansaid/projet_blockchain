class TransactionService {
  constructor() {
    this.API_URL = 'http://localhost:8000/api/auth/';
  }

  async getTransactions() {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const response = await fetch(`${this.API_URL}transactions/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des transactions');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }

  async createTransaction(transactionData) {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const response = await fetch(`${this.API_URL}transactions/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création de la transaction');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }

  async updateTransaction(transactionId, transactionData) {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const response = await fetch(`${this.API_URL}transactions/${transactionId}/update/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la transaction');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }

  async deleteTransaction(transactionId) {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const response = await fetch(`${this.API_URL}transactions/${transactionId}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${tokens.access}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la transaction');
      }

      return true;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  }
}

export const transactionService = new TransactionService(); 