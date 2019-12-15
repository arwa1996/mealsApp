import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE } from '../actoins/meals';
import { SET_FILTERS } from '../actoins/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favouriteMeals: []
}



const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favouriteMeals.findIndex(
                meal => meal.id === action.mealId
            );
            if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favouriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favouriteMeals: updatedFavMeals };
            } else {
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return { ...state, favouriteMeals: state.favouriteMeals.concat(meal) };
            }
        case SET_FILTERS:
            const appliedFilters = action.filters;
            const filteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) { return false; }
                if (appliedFilters.lactoesFree && !meal.isLactoesFree) { return false; }
                if (appliedFilters.vegeterian && !meal.isVegeterian) { return false; }
                if (appliedFilters.vagan && !meal.isVegan) { return false; }
                return true;
            });
            return { ...state, filteredMeals: filteredMeals }
        default:
            return state;
    }
};


export default mealsReducer; 