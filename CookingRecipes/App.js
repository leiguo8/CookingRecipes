import React from 'react';
import { StyleSheet, Text, View,} from 'react-native';
import 'react-native-gesture-handler';
import User from './Users/User';
import UserProfile from './Users/UserProfile';
import Recipes from './Recipes/Recipes';
import AddRecipes from './Recipes/AddRecipes';
import MyRecipes from './Recipes/MyRecipes';
import EditRecipes from './Recipes/EditRecipes';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={User}/>
        <Stack.Screen name="User Profile" component={UserProfile}/>
        <Stack.Screen name="All Recipes" component={Recipes}/>
        <Stack.Screen name="Add Recipes" component={AddRecipes}/>
        <Stack.Screen name="My Recipes" component={MyRecipes}/>
        <Stack.Screen name="Edit Recipes" component={EditRecipes}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

