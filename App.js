import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/Tabscenes/HomeScreen';
import DetailsScreen from './src/Tabscenes/DetailScreen';
import SearchScreen from './src/Tabscenes/SearchScreen';



const AppNavigator = createStackNavigator({
  HomeRoute: HomeScreen,
  DetailsRoute: DetailsScreen,
  SearchRoute: SearchScreen
},

  {
    defaultNavigationOptions: {
      header: null
    },
    initialRouteName: 'HomeRoute'
  });


export default createAppContainer(AppNavigator);
