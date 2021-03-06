// import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Fonts from 'expo-font'
import AppLoading from 'expo-app-loading'
import { enableScreens } from 'react-native-screens';

//redux
import mealsReducer from './redux/reducers/meals';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import MealsNavigator from './navigation/MealsNavigator';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,

})

const centralReduxStore = createStore(rootReducer);

const fetchFonts = () => {
  return Fonts.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={centralReduxStore}>
      <MealsNavigator />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {

  },
});
