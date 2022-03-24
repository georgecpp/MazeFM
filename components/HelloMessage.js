import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function HelloMessage(properties) {
  return (
      <View backgroundColor='#222831'>
        <View style={styles.container} alignItems="center">
            <Text style = {styles.hiMessage} numberOfLines={1} adjustFontSizeToFit={true}>Hi, {properties.name}!</Text>
            <Text style = {styles.mazeFmText}>Find the path to your Music!</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create( {
    container: {
        alignSelf:"center",
        width: '80%',
        height: '35%',
        backgroundColor: '#121821',
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    hiMessage : {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFD369',
        marginTop: 10,
        alignSelf:"center",
    },
    mazeFmText : {
        fontSize: 20,
        color: '#FFD369',

    },
})