import React from 'react';
import { View,StyleSheet, LogBox } from 'react-native';
import AuthNavigation from './navigation/AuthNavigation';

const App = () => {
    LogBox.ignoreLogs([
      "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    ]);
    return <AuthNavigation />;
};


export default App;