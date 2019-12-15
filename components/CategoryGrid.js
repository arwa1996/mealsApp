import React from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity } from 'react-native';


const CategoryGrid = (props) => {
    return(
    <TouchableOpacity style={styles.gridItem} onPress={props.OnSelect}>  
    <View style={{...styles.container,...{backgroundColor: props.color}}} >
      <Text style={styles.title}>{props.title}</Text>
    </View>
    </TouchableOpacity> 
    );
}


const styles = StyleSheet.create({
        gridItem: {
          flex: 1,
          //alignItems: 'center',
          //justifyContent: 'center',
          margin: 10,
          height:100,
          elevation: 3,
        },
        container:{
            flex: 1,
            borderRadius: 10,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width:0, height: 2},
            shadowRadius: 10,
           
            padding: 10 ,
            justifyContent: 'center',
            alignItems:'flex-end'
        },
        title: {
            fontFamily: 'open-sans-bold',
            fontSize: 22,
            textAlignVertical:'center',
            //textAlign:'center'
        }
});
  
export default CategoryGrid;
