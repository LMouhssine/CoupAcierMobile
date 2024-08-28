import axios from 'axios';

const API_KEY = '5b3ce3597851110001cf6248f2c791a7808946bea01663c249efb2d7'; // Clé API OpenRouteService

export const getDistance = async (start, end) => {
  try {
    const response = await axios.post('https://api.openrouteservice.org/v2/directions/driving-car', {
      coordinates: [
        [start.lng, start.lat], // Format: [longitude, latitude]
        [end.lng, end.lat],
      ]
    }, {
      headers: {
        'Authorization': API_KEY,
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        'Content-Type': 'application/json'
      },
    });

    return response.data.routes[0].summary.distance / 1000; // distance en kilomètres
  } catch (error) {
    console.error('Erreur lors de la récupération de la distance:', error.response ? error.response.data : error.message);
    throw error;
  }
};
