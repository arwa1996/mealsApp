import React, { useEffect, useCallback } from 'react';

import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import DefaultText from '../components/DefaultText';
import { toggleFavourite } from '../store/actoins/meals'

const ListItem = (props) => {
  return <View style={styles.ListItem}>

    <DefaultText>{props.children}</DefaultText>

  </View>
}



const MealsScreen = (props) => {

  const availableMeals = useSelector(state => state.meals.meals);
  const mealId = props.navigation.getParam('mealId');
  const selectedMeal = availableMeals.find(meals => meals.id === mealId);
  currentMealIsFavourite = useSelector(state => state.meals.favoriteMeals);


  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });

  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavourite });
  }, [currentMealIsFavourite]);


  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />

      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity}</DefaultText>
        <DefaultText>{selectedMeal.affordability}</DefaultText>
      </View>

      <Text style={styles.title}>Ingridients</Text>

      {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>
        {ingredient}
      </ListItem>)}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => <ListItem key={step}>
        {step}
      </ListItem>)}
    </ScrollView>
  );
}

MealsScreen.navigationOptions = navigationData => {

  const toggleFavourite = navigationData.navigation.getParam('toggleFav');
  const mealTitle = navigationData.navigation.getParam('mealTitle')
  const isFavorite = navigationData.navigation.getParam('isFav')

  return {
    headerTitle: mealTitle,
    headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Favourite' iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavourite} />
    </HeaderButtons>)
  };
};



const styles = StyleSheet.create({
  image: {

    width: '100%',
    height: 200

  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center'
  },
  ListItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  }
});

export default MealsScreen; 