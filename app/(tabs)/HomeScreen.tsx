import React, { useState, useEffect } from 'react';
import { TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5006/products');
        console.log('Response status:', response.status);
        if (!response.ok) throw new Error('Erreur lors de la récupération des produits.');
        
        const data = await response.json();
        console.log('Data received:', data);
        
        // Accéder aux produits via data.data
        if (!Array.isArray(data.data)) {
          throw new Error('Les données récupérées ne sont pas un tableau.');
        }
        
        setProducts(data.data); // Mettre à jour le state avec le tableau de produits
      } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert('Erreur', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (productId) => {
    navigation.navigate('ProductPage', { id: productId });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <Container>
      <Header>
        <SearchBar placeholder="Rechercher un produit" placeholderTextColor="#888" />
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <BellIconContainer>
            <BellIcon source={require('../../assets/images/icons8-bell-48.png')} />
          </BellIconContainer>
        </TouchableOpacity>
      </Header>
      <ScrollView>
        <Banner>
          <BannerImage source={require('../../assets/images/cut-metal.jpg')}>
            <BannerText>
              <Tagline>FORGÉ POUR DURER, CHOISISSEZ</Tagline>
              <HighlightedTagline>COUP'ACIER.</HighlightedTagline>
            </BannerText>
          </BannerImage>
        </Banner>
        <ProductListContainer>
          <ProductList>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <Product key={product.idProduit}>
                  <TouchableOpacity onPress={() => handleProductPress(product.idProduit)}>
                    <ProductImageContainer>
                      <ProductImage source={{ uri: `http://127.0.0.1:5006/public/${product.imagePrincipale}` }} />
                    </ProductImageContainer>
                    <ProductNameContainer>
                      <ProductName>{product.nomProduit}</ProductName>
                    </ProductNameContainer>
                  </TouchableOpacity>
                </Product>
              ))
            ) : (
              <NoProductsText>Aucun produit disponible</NoProductsText>
            )}
          </ProductList>
        </ProductListContainer>
      </ScrollView>
    </Container>
  );
};

// Styles

const Container = styled.View`
  margin-top: 70px;
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const SearchBar = styled.TextInput`
  flex: 1;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-left: 10px;
  margin-right: 10px;
  background-color: #fff;
`;

const BellIconContainer = styled.View`
  width: 45px;
  height: 45px;
  border: 1px solid #000;
  background-color: #FEE715;
  border-radius: 22.5px;
  justify-content: center;
  align-items: center;
`;

const BellIcon = styled.Image`
  width: 28px;
  height: 28px;
`;

const Banner = styled.View`
  padding: 10px;
  align-items: center;
`;

const BannerImage = styled(ImageBackground)`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
`;

const BannerText = styled.View`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const Tagline = styled.Text`
  font-weight: bold;
  text-align: center;
  font-style: italic;
  font-size: 20px;
  color: #fff;
`;

const HighlightedTagline = styled.Text`
  font-weight: bold;
  text-align: center;
  font-style: italic;
  font-size: 20px;
  color: #000;
  background-color: #FEE715;
  padding: 2px;
  margin-top: 5px;
`;

const ProductListContainer = styled.View`
  flex: 1;
  padding: 10px;
`;

const ProductList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Product = styled.View`
  width: 48%;
  margin-bottom: 20px;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 2;
`;

const ProductImageContainer = styled.View`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f0f0f0;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const ProductNameContainer = styled.View`
  background-color: #FEE715;
  width: 100%;
  min-width: 150px;
  border: 1px solid #000;
  padding: 5px;
  border-radius: 4px;
  align-items: center;
`;

const ProductName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  max-width: 100%;
  flex-shrink: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoProductsText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

export default HomeScreen;
