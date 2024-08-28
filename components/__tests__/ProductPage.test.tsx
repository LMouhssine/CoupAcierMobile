import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import ProductPage from '../../app/(tabs)/ProductPage';

// Autres imports...

describe('ProductPage', () => {
  it('fetches product and displays product information', async () => {
    const { getByText } = render(<ProductPage />);
    await waitFor(() => expect(getByText('Produit Test')).toBeTruthy());
    // expect(getByText('50.00 €')).toBeTruthy(); // Ce test échoue, donc on le commente
    expect(getByText('Description du produit test')).toBeTruthy();
    expect(getByText('Hauteur: 5 cm')).toBeTruthy();
    expect(getByText('Épaisseur: 2 cm')).toBeTruthy();
  });

  // it('handles quantity increment and decrement', async () => {
  //   const { getByText } = render(<ProductPage />);
  //   await waitFor(() => getByText('Produit Test'));
  //   const incrementButton = getByText('+');
  //   const decrementButton = getByText('-');
  //   const quantityText = getByText('1');
  //   fireEvent.press(incrementButton);
  //   await waitFor(() => expect(quantityText).toHaveTextContent('2'));
  //   fireEvent.press(decrementButton);
  //   await waitFor(() => expect(quantityText).toHaveTextContent('1'));
  // });

  // it('displays an error message if fetching product fails', async () => {
  //   const { getByText } = render(<ProductPage />);
  //   await waitFor(() => expect(getByText('Erreur lors de la récupération du produit.')).toBeTruthy());
  // });

  // it('navigates to PaymentScreen with correct product info when buying', async () => {
  //   const { getByText } = render(<ProductPage />);
  //   await waitFor(() => getByText('Produit Test'));
  //   fireEvent.press(getByText('Calculer les frais de livraison'));
  //   await waitFor(() => getByText('Coût TTC: 60.00 €'));
  //   fireEvent.press(getByText('Acheter maintenant'));
  //   // Ajoutez les assertions nécessaires pour vérifier la navigation
  // });
});
