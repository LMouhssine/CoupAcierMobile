import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import ProductPage from '../app/(tabs)/ProductPage';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { geocodeAddress } from '../backend/utils/geocoding';
import { calculateDistanceToClient, calculateTotalCost } from '../backend/utils/costCalculations';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('../../backend/utils/geocoding', () => ({
  geocodeAddress: jest.fn(),
}));

jest.mock('../../backend/utils/costCalculations', () => ({
  calculateDistanceToClient: jest.fn(),
  calculateTotalCost: jest.fn(),
}));

describe('ProductPage', () => {
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  const route = { params: { id: 10 } };

  beforeEach(() => {
    useNavigation.mockReturnValue(navigation);
    useRoute.mockReturnValue(route);
    AsyncStorage.getItem.mockResolvedValue(null);
  });

  it('renders loading indicator when product is loading', () => {
    const { getByTestId } = render(<ProductPage />);
    expect(getByTestId('loading')).toBeTruthy();
  });

  it('displays product details after loading', async () => {
    const product = {
      id: 10,
      nomProduit: 'Produit Test',
      prixMetre: 50,
      imagePrincipale: 'image1.jpg',
      image1: 'image2.jpg',
      image2: 'image3.jpg',
      description: 'Description du produit',
      hauteur: 10,
      epaisseur: 5,
      masseLineaire: 2.5,
      referenceProduit: 'REF123',
      idCategorie: 3,
      marge: 20,
      tva: 10,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: product }),
      })
    );

    const { getByText } = render(<ProductPage />);
    
    await waitFor(() => {
      expect(getByText('Produit Test')).toBeTruthy();
    });

    expect(getByText(/50.00 €/)).toBeTruthy();
    expect(getByText(/Description du produit/)).toBeTruthy();
    expect(getByText(/REF123/)).toBeTruthy();
  });

  it('calculates and displays shipping cost', async () => {
    geocodeAddress.mockResolvedValue({ lat: 48.8566, lng: 2.3522 });
    calculateDistanceToClient.mockResolvedValue({ distance: 15, warehouse: { name: 'Paris' } });
    calculateTotalCost.mockReturnValue({ costHT: 10, totalCost: 12, tax: 2 });

    const { getByPlaceholderText, getByText } = render(<ProductPage />);

    fireEvent.changeText(getByPlaceholderText('Entrez votre adresse'), '1 rue de Paris');
    fireEvent.changeText(getByPlaceholderText('Entrez le poids'), '10');
    
    fireEvent.press(getByText('Calculer les frais de livraison'));

    await waitFor(() => {
      expect(screen.getByText(/Distance: 15.00 km/)).toBeTruthy();
      expect(screen.getByText(/Coût HT: 10.00 €/)).toBeTruthy();
    });
  });

  it('prevents purchase if not logged in', async () => {
    const alertSpy = jest.spyOn(global, 'alert').mockImplementation(() => {});
    const { getByText } = render(<ProductPage />);

    fireEvent.press(getByText('Acheter maintenant'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'Veuillez vous connecter',
        'Vous devez être connecté pour passer une commande.'
      );
    });
  });

  // - Test du calcul de la masse et du prix
  // - Test de la navigation lors de l'achat
});
