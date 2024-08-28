import { warehouses } from './warehouses';
import { getDistance } from './OpenRouteService';

// Étape 2 : Calculer la distance entre l'entrepôt et l'adresse du client
export const calculateDistanceToClient = async (clientAddress) => {
  const closestWarehouse = warehouses[0]; // Sélectionnez l'entrepôt le plus proche

  const distance = await getDistance(
    { lat: closestWarehouse.lat, lng: closestWarehouse.lng },
    clientAddress
  );

  return { distance, warehouse: closestWarehouse };
};

// Étape 3 : Calculer le coût de livraison en fonction du poids et de la distance
export const calculateShippingCost = (weight, distance) => {
  let cost = 40 + (0.3 * distance); // Coût de base plus coût basé sur la distance

  if (weight > 200) {
    const extraWeight = weight - 200;
    const extraCharges = Math.ceil(extraWeight / 200) * 20; // 20€ par tranche de 200kg supplémentaire
    cost += extraCharges;
  }

  return cost;
};

export const calculateTotalCost = (weight, distance) => {
  const shippingCostHT = calculateShippingCost(weight, distance);
  const tax = shippingCostHT * 0.2; // TVA 20%
  return {
    costHT: shippingCostHT,
    totalCost: shippingCostHT + tax,
    tax: tax,
  };
};
