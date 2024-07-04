// src/HomeScreen.tsx
import React from 'react';
import { TextInput, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <Container>
      <Header>
        <SearchBar placeholder="Rechercher un produit" />
        <BellIconContainer>
          <BellIcon source={require('../../assets/images/icons8-bell-48.png')} />
        </BellIconContainer>
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
            <Product>
              <ProductImage source={require('../../assets/images/poutrelles_he_img.gif')} />
              <ProductNameContainer>
                <ProductName>POUTRELLES HE</ProductName>
              </ProductNameContainer>
            </Product>
            <Product>
              <ProductImage source={require('../../assets/images/poutrelles_he_img.gif')} />
              <ProductNameContainer>
                <ProductName>POUTRELLES HE</ProductName>
              </ProductNameContainer>
            </Product>
            <Product>
              <ProductImage source={require('../../assets/images/barres_rondes_img.gif')} />
              <ProductNameContainer>
                <ProductName>BARRES RONDES</ProductName>
              </ProductNameContainer>
            </Product>
            <Product>
              <ProductImage source={require('../../assets/images/barres_rondes_img.gif')} />
              <ProductNameContainer>
                <ProductName>BARRES RONDES</ProductName>
              </ProductNameContainer>
            </Product>
            <Product>
              <ProductImage source={require('../../assets/images/barres_rondes_img.gif')} />
              <ProductNameContainer>
                <ProductName>NOUVEAU PRODUIT</ProductName>
              </ProductNameContainer>
            </Product>
            <Product>
              <ProductImage source={require('../../assets/images/barres_rondes_img.gif')} />
              <ProductNameContainer>
                <ProductName>NOUVEAU PRODUIT</ProductName>
              </ProductNameContainer>
            </Product>
            <Product>
              <ProductImage source={require('../../assets/images/barres_rondes_img.gif')} />
              <ProductNameContainer>
                <ProductName>NOUVEAU PRODUIT</ProductName>
              </ProductNameContainer>
            </Product>
            <Product>
              <ProductImage source={require('../../assets/images/barres_rondes_img.gif')} />
              <ProductNameContainer>
                <ProductName>NOUVEAU PRODUIT</ProductName>
              </ProductNameContainer>
            </Product>
          </ProductList>
        </ProductListContainer>
      </ScrollView>
    </Container>
  );
};

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
`;

const SearchBar = styled.TextInput`
  flex: 1;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-left: 10px;
`;

const BellIconContainer = styled.View`
  width: 35px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #FEE715;
  border-radius: 17px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const BellIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const Banner = styled.View`
  padding: 10px;
  align-items: center;
`;

const BannerImage = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
`;

const BannerText = styled.View`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
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
  margin-left: 100px;
  margin-right: 100px;
`;

const ProductListContainer = styled.View`
  flex: 1;
  padding: 10px;
  align-items: center;
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
  justify-content: space-between;
`;

const ProductImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const ProductNameContainer = styled.View`
  background-color: #FEE715;
  width: 100%;
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

export default HomeScreen;
