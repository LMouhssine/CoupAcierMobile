import React, { useState, useEffect } from 'react';
import { TextInput, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5006/products');
        console.log('Response status:', response.status);
        if (!response.ok) throw new Error('Erreur lors de la récupération des produits.');
        
        const data = await response.json();
        console.log('Data received:', data);
        
        if (!Array.isArray(data.data)) {
          throw new Error('Les données récupérées ne sont pas un tableau.');
        }
        
        setProducts(data.data); 
      } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert('Erreur', (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductPage', { id: productId });
  };

  const filteredProducts = products.filter(product =>
    product.nomProduit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <Container>
      <Header>
        <SearchBar
          placeholder="Rechercher un produit"
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={(text: string) => setSearchTerm(text)}
        />
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
            {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Product key={product.idProduit}>
                  <TouchableOpacity onPress={() => handleProductPress(product.idProduit)}>
                    <ProductImageContainer>
                      <ProductImage 
                        source={{ 
                          uri: `http://127.0.0.1:5006/public/${product.imagePrincipale}`,
                          cache: 'force-cache' 
                        }} 
                        onError={() => Alert.alert('Erreur', 'Impossible de charger l\'image.')}
                        style={{ width: 170, height: 170 }}
                      />
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
  border-radius: 20px;
  padding-left: 15px;
  margin-right: 10px;
  background-color: #fff;
`;

const BellIconContainer = styled.View`
  width: 42px;
  height: 42px;
  border: 1px solid #000;
  background-color: #FEE715;
  border-radius: 22.5px;
  justify-content: center;
  align-items: center;
`;

const BellIcon = styled.Image`
  width: 26px;
  height: 26px;
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
  border-radius: 12px;
  overflow: hidden;
`;

const BannerText = styled.View`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
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
  padding: 2px 5px;
  margin-top: 5px;
  border-radius: 5px;
`;

const ProductListContainer = styled.View`
  flex: 1;
  padding: 15px;
`;

const ProductList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Product = styled.View`
  width: 48%;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 12px;
  padding: 0px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  elevation: 3;
  overflow: hidden;
`;

const ProductImageContainer = styled.View`
  width: 100%;
  height: 170px;
  border-radius: 10px 10px 0 0;
  background-color: #f0f0f0;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
  background-color: transparent;
`;

const ProductNameContainer = styled.View`
  background-color: #FEE715;
  width: 100%;
  padding: 10px;
  align-items: center;
`;

const ProductName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #000;
`;

const NoProductsText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  color: #888;
`;

export default HomeScreen;
