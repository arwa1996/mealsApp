import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { Switch } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actoins/meals'

const FilterSwitch = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.label}</Text>
      <View style={styles.filterContainer}>
        <Switch value={props.state} onValueChange={props.onChange}
          trackColor={{ true: Colors.primaryColor }}
          thumbColor={Colors.primaryColor}
        />
      </View>
    </View>
  );
}

const FilterScreen = (props) => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoesFree, setIsLactoesFree] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [isVegeterian, setIsVegeterian] = useState(false)


  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {

    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoesFree: isLactoesFree,
      vagan: isVegan,
      vegeterian: isVegeterian
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoesFree, isVegan, isVegeterian, dispatch]);


  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Available Filters / Restriction</Text>
      <FilterSwitch label='Gluten-Free' state={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)} />
      <FilterSwitch label='Lactoes-Free' state={isLactoesFree} onChange={newValue => setIsLactoesFree(newValue)} />
      <FilterSwitch label='Vegan' state={isVegan} onChange={newValue => setIsVegan(newValue)} />
      <FilterSwitch label='vegeterian' state={isVegeterian} onChange={newValue => setIsVegeterian(newValue)} />

    </View>

  );
}

FilterScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filtred Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => { navData.navigation.toggleDrawer(); }}

        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName='ios-save'
          onPress={navData.navigation.getParam('save')}

        />
      </HeaderButtons>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 1
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',

  }
});

export default FilterScreen; 