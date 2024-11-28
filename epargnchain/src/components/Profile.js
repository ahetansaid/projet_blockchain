import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';
import countriesData from '../data/countries.json';

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    country: '',
    phoneNumber: '',
    dialCode: ''
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      const country = countriesData.find(c => c.name === user.country);
      let phoneNumber = user.phone_number || '';
      let dialCode = '';
      
      if (country) {
        dialCode = country.dialCode;
        if (phoneNumber.startsWith(dialCode)) {
          phoneNumber = phoneNumber.substring(dialCode.length);
        }
      }

      setFormData({
        username: user.username || '',
        email: user.email || '',
        country: user.country || '',
        phoneNumber: phoneNumber,
        dialCode: dialCode
      });
    }
  }, []);

  const handleCountryChange = (e) => {
    const selectedCountry = countriesData.find(country => country.name === e.target.value);
    setFormData(prev => ({
      ...prev,
      country: selectedCountry.name,
      dialCode: selectedCountry.dialCode
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation des champs
      if (!formData.username || !formData.email || !formData.country || !formData.phoneNumber) {
        toast.error('Tous les champs sont obligatoires');
        return;
      }

      // Validation du format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Format d\'email invalide');
        return;
      }

      // Construction du numéro de téléphone complet
      const fullPhoneNumber = formData.dialCode + formData.phoneNumber;

      const userData = {
        username: formData.username,
        email: formData.email,
        country: formData.country,
        phone_number: fullPhoneNumber
      };

      console.log('Données à envoyer:', userData); // Debug

      await authService.updateProfile(userData);
      toast.success('Profil mis à jour avec succès');
    } catch (error) {
      toast.error(error.message || 'Erreur lors de la mise à jour du profil');
      console.error('Erreur détaillée:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      try {
        await authService.deleteAccount();
        toast.success('Compte supprimé avec succès');
        navigate('/login');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Mon Profil</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pays
            </label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.country}
              onChange={handleCountryChange}
            >
              <option value="">Sélectionnez un pays</option>
              {countriesData.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Numéro de téléphone
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                {formData.dialCode || '+XX'}
              </span>
              <input
                type="tel"
                required
                className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Mise à jour...' : 'Mettre à jour'}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Supprimer le compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile; 