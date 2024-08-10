// backend/utils/geocoding.js
import axios from 'axios';

const API_KEY = 'MA-CLÉ'; // Clé API OpenCage

export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        q: address,
        key: API_KEY,
      },
    });

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } else {
      throw new Error('Aucune coordonnée trouvée pour cette adresse.');
    }
  } catch (error) {
    console.error('Erreur lors du géocodage:', error.message);
    throw error;
  }
};
