import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MealList from '../components/MealList';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';


const FavouritesScreen = (props) => {

  const favMeals = useSelector(state => state.meals.favouriteMeals);

  if (favMeals.length === 0 || !favMeals) {
    return <View>
      <Text style={styles.content}>No favourite meals </Text>
    </View>
  }

  return (
    <MealList listData={favMeals} navigation={props.navigation} />
  );

}

FavouritesScreen.navigationOptions = navData => {

  return {
    headerTitle: 'Yor Fav!',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => { navData.navigation.toggleDrawer(); }}

        />
      </HeaderButtons>
    )
  }
}


const styles = StyleSheet.create({
  content: {
    textAlign: 'center',
    paddingVertical: 250,
    fontSize: 20
  }
});

export default FavouritesScreen; 