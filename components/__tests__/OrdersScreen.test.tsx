import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import OrdersScreen from '../../app/(tabs)/OrdersScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('OrdersScreen', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
  });

  it('affiche l\'indicateur de chargement pendant la récupération des commandes', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));
    const { getByText } = render(<OrdersScreen />);

    expect(getByText('Chargement des commandes...')).toBeTruthy();
  });

  it('affiche une erreur si l\'utilisateur n\'est pas connecté', async () => {
    AsyncStorage.getItem = jest.fn()
      .mockResolvedValueOnce(null)  // Pour le token
      .mockResolvedValueOnce(null); // Pour l'ID utilisateur

    const { getByText } = render(<OrdersScreen />);

    await waitFor(() => {
      expect(getByText('Erreur')).toBeTruthy();
      expect(getByText('Utilisateur non connecté')).toBeTruthy();
    });
  });

  it('affiche une erreur si les données reçues ne sont pas valides', async () => {
    AsyncStorage.getItem = jest.fn()
      .mockResolvedValueOnce('mockToken')
      .mockResolvedValueOnce('mockUserId');

    fetchMock.mockResponseOnce(JSON.stringify({ data: 'invalidData' }));

    const { getByText } = render(<OrdersScreen />);

    await waitFor(() => {
      expect(getByText('Erreur')).toBeTruthy();
      expect(getByText('Les données reçues ne sont pas valides.')).toBeTruthy();
    });
  });

  it('affiche une liste de commandes lorsque les données sont valides', async () => {
    AsyncStorage.getItem = jest.fn()
      .mockResolvedValueOnce('mockToken')
      .mockResolvedValueOnce('mockUserId');

    const mockOrders = [
      { idCommande: 1, dateCommande: '2023-08-29T00:00:00.000Z', statusCommande: 'Livrée', type: 'Standard' },
      { idCommande: 2, dateCommande: '2023-08-30T00:00:00.000Z', statusCommande: 'En cours', type: 'Express' },
    ];

    fetchMock.mockResponseOnce(JSON.stringify({ data: mockOrders }));

    const { getByText } = render(<OrdersScreen />);

    await waitFor(() => {
      expect(getByText('Mes Commandes')).toBeTruthy();
      expect(getByText('Commande ID : 1')).toBeTruthy();
      expect(getByText('Commande ID : 2')).toBeTruthy();
    });
  });

  it('affiche un message lorsqu\'aucune commande n\'est trouvée', async () => {
    AsyncStorage.getItem = jest.fn()
      .mockResolvedValueOnce('mockToken')
      .mockResolvedValueOnce('mockUserId');

    fetchMock.mockResponseOnce(JSON.stringify({ data: [] }));

    const { getByText } = render(<OrdersScreen />);

    await waitFor(() => {
      expect(getByText('Aucune commande trouvée.')).toBeTruthy();
    });
  });

  it('gère les erreurs de connexion au serveur', async () => {
    AsyncStorage.getItem = jest.fn()
      .mockResolvedValueOnce('mockToken')
      .mockResolvedValueOnce('mockUserId');

    fetchMock.mockRejectOnce(new Error('Network error'));

    const { getByText } = render(<OrdersScreen />);

    await waitFor(() => {
      expect(getByText('Erreur')).toBeTruthy();
      expect(getByText('Erreur de connexion au serveur: Network error')).toBeTruthy();
    });
  });
});
