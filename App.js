import React from 'react';
import { View,StyleSheet } from 'react-native';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';

const App = () => {
    return (
      // <Dashboard />
      <View style={styles.container}>
         <Register/>
      </View>
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