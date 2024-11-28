import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class AuthService {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login/', credentials);
      console.log('Réponse du serveur:', response.data);

      if (response.data.tokens && response.data.user) {
        localStorage.setItem('token', response.data.tokens.access);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        return {
          success: true,
          data: {
            user: response.data.user,
            token: response.data.tokens.access
          }
        };
      }
      
      return {
        success: false,
        message: "Format de réponse invalide"
      };
    } catch (error) {
      console.error('Erreur de connexion:', error.response?.data);
      throw new Error(error.response?.data?.detail || "Erreur lors de la connexion");
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/auth/register/', userData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return this.getToken() !== null;
  }

  async getUserProfile() {
    try {
      const response = await api.get('/auth/profile/');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Erreur lors de la récupération du profil");
    }
  }

  async updateProfile(userData) {
    try {
      console.log('Données envoyées pour la mise à jour:', userData);
      
      const token = this.getToken();
      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await api.put('/auth/profile/update/', userData);
      console.log('Réponse de mise à jour:', response.data);

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      }
      
      throw new Error('Format de réponse invalide');
    } catch (error) {
      console.error('Erreur détaillée:', error.response?.data);
      if (error.response?.status === 401) {
        throw new Error('Session expirée, veuillez vous reconnecter');
      }
      throw new Error(error.response?.data?.message || "Erreur lors de la mise à jour du profil");
    }
  }

  async deleteAccount() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await api.delete('/auth/profile/delete/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Nettoyage du localStorage après suppression
      this.logout();
      return response.data;
    } catch (error) {
      console.error('Erreur de suppression:', error.response?.data);
      throw new Error(error.response?.data?.detail || "Erreur lors de la suppression du compte");
    }
  }
}

// Ajout d'un intercepteur pour logger toutes les requêtes
api.interceptors.request.use(request => {
  console.log('Requête sortante:', {
    url: request.url,
    method: request.method,
    data: request.data,
    headers: request.headers
  });
  return request;
});

// Ajout d'un intercepteur pour logger toutes les réponses
api.interceptors.response.use(
  response => {
    console.log('Réponse reçue:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('Erreur de réponse:', {
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export const authService = new AuthService();