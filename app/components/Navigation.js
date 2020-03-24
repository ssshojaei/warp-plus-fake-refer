import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {HomeScreen, SettingsScreen, AboutScreen, HelpScreen} from '../screens'

const Stack = createStackNavigator()

const HomeNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
  </Stack.Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
)
