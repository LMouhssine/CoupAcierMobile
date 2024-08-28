import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfileScreen from '../../app/(tabs)/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('ProfileScreen', () => {
  it('renders loading state correctly', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Chargement...')).toBeTruthy();
  });

  it('renders login prompt when not logged in', () => {
    const { getByText } = render(<ProfileScreen />);
    expect(getByText('Veuillez vous connecter pour voir votre profil.')).toBeTruthy();
  });

  it('navigates to login screen when "Se connecter" button is pressed', () => {
    const { getByText } = render(<ProfileScreen />);
    fireEvent.press(getByText('Se connecter'));
    const navigation = require('@react-navigation/native').useNavigation();
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('navigates to sign up screen when "Pas de compte ? Je m\'inscris !" is pressed', () => {
    const { getByText } = render(<ProfileScreen />);
    fireEvent.press(getByText("Pas de compte ? Je m'inscris !"));
    const navigation = require('@react-navigation/native').useNavigation();
    expect(navigation.navigate).toHaveBeenCalledWith('TypeScreen');
  });

  it('renders user information correctly when logged in', async () => {
    const mockClientInfo = {
      email: 'test@example.com',
      nomClient: 'Doe',
      prenomClient: 'John',
      telephone: '1234567890',
      profilClient: 'Standard',
      dateCreation: '2021-01-01T00:00:00Z',
    };

    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(async (key) => {
      if (key === 'accessToken') return 'mockAccessToken';
      if (key === 'userId') return 'mockUserId';
      return null;
    });

    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockClientInfo }),
    } as any);

    const { getByText } = render(<ProfileScreen />);

    await waitFor(() => expect(getByText('Bonjour John 👋')).toBeTruthy());
    expect(getByText('Email : test@example.com')).toBeTruthy();
    expect(getByText('Nom : Doe')).toBeTruthy();
    expect(getByText('Prénom : John')).toBeTruthy();
    expect(getByText('Téléphone : 1234567890')).toBeTruthy();
    expect(getByText('Profil : Standard')).toBeTruthy();
    expect(getByText('Date de création : 01/01/2021')).toBeTruthy();
  });

  it('calls handleLogout and navigates to login screen', async () => {
    const removeItemSpy = jest.spyOn(AsyncStorage, 'removeItem').mockResolvedValueOnce();
    const navigate = jest.fn();
    const { getByText } = render(<ProfileScreen />);
    fireEvent.press(getByText('Se déconnecter'));
    
    await waitFor(() => expect(removeItemSpy).toHaveBeenCalledWith('accessToken'));
    await waitFor(() => expect(removeItemSpy).toHaveBeenCalledWith('userId'));
    expect(navigate).toHaveBeenCalledWith('Login');
  });
});
