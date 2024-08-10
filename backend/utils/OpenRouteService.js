// backend/utils/OpenRouteService.js
import axios from 'axios';

const API_KEY = '5b3ce3597851110001cf6248ea02ef73d3bc4844bec03213d397f8ab'; // Remplacez par votre clé API

export const getDistance = async (start, end) => {
  try {
    const response = await axios.get('https://api.openrouteservice.org/v2/directions/driving-car', {
      headers: {
        'Authorization': API_KEY, // Utilisation de la clé API directement
        'Accept': 'application/geo+json;charset=UTF-8', // L'API attend ce format
        'Content-Type': 'application/json' // Spécifiez le type de contenu attendu
      },
      params: {
        start: `${start.lng},${start.lat}`, // Format: "longitude,latitude"
        end: `${end.lng},${end.lat}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération de la distance:', error.response ? error.response.data : error.message);
    throw error;
  }
};
