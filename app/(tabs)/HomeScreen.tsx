// src/HomeScreen.tsx
import React from 'react';
import { TextInput, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <Container>
      <Header>
        <SearchBar placeholder="Search Product" />
        <NotificationIcon source={require('../../assets/images/CoupAcierApp.png')} />
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
        <CategoriesTitle>Categories</CategoriesTitle>
        <CategoryBar horizontal>
          <CategoryButton selected>Armchair</CategoryButton>
          <CategoryButton>Mobile</CategoryButton>
          <CategoryButton>Electricity</CategoryButton>
          <CategoryButton>Shoes</CategoryButton>
        </CategoryBar>
        <ProductList>
          <Product>
            <ProductImage source={require('../../assets/images/poutrelles_he_img.gif')} />
            <ProductName>POUTRELLES HE</ProductName>
          </Product>
          <Product>
            <ProductImage source={require('../../assets/images/barres_rondes_img.gif')} />
            <ProductName>BARRES RONDES</ProductName>
          </Product>
          
        </ProductList>
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

const NotificationIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-left: 10px;
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

const CategoriesTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0;
  padding: 0 10px;
`;

const CategoryBar = styled.ScrollView`
  flex-direction: row;
  padding: 0 10px;
`;

const CategoryButton = styled.Text<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? '#4f46e5' : '#e5e7eb')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  padding: 10px 15px;
  border-radius: 20px;
  margin-right: 10px;
`;

const ProductList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
`;

const Product = styled.View`
  width: 48%;
  margin-bottom: 20px;
  align-items: center;
`;

const ProductImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const ProductName = styled.Text`
  font-size: 16px;
`;

export default HomeScreen;
