import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import CategoryGrid from '../components/CategoryGrid.js'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'


const CategoriesScreen = (props) => {
  const Props = props;

  const renderGridItem = (itemData) => {
    return (

      <CategoryGrid
        title={itemData.item.title}
        color={itemData.item.color}
        OnSelect={() => {
          Props.navigation.navigate('CategoryMeals', { categoryId: itemData.item.id })
        }} />
    );
  }


  return (
    //laout of the screen 
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2} />

  );
};

//we will use the componenet function as an obl=ject to invoke the header 

CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          color='white'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};



const styles = StyleSheet.create({
});

export default CategoriesScreen; 