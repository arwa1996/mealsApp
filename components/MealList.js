import React from 'react';
import { StyleSheet, FlatList, View, ImageBackground, TouchableOpacity } from 'react-native';
import MealItem from './MealItem';
import { useSelector } from 'react-redux';
const MealList = (props) => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
  const renderMealItem = itemData => {
    var obj = { key: '1' }
    // const isFavorite = favoriteMeals.find(meal => meal.id === itemData.item.id)
    return (<MealItem
      title={itemData.item.title}
      duration={itemData.item.duration}
      affordability={itemData.item.affordability}
      complexity={itemData.item.complexity}
      image={itemData.item.imageUrl}
      onSelectMeal={() => { //console.log(itemData.item.id)
        props.navigation.navigate('Meals', {
          mealId: itemData.item.id,
          mealTitle: itemData.item.title,
          isFav: favoriteMeals
        })
      }} />);
  };



  return (<View style={styles.screen} >

    <FlatList data={props.listData}
      keyExtractor={(item, index) => 'key' + index}
      renderItem={renderMealItem} />
  </View>)

}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  }
});

export default MealList;