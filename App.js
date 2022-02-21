import React from 'react';
import { View,StyleSheet } from 'react-native';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Register';

const App = () => {
    return (
      // <Dashboard />
      <Login />
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#36485f',
      justifyContent: 'center',
      paddingLeft:60,
      paddingRight:60, 
    },
});

export default App;