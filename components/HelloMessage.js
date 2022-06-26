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
        alignSelf:"flex-start",
        width: 320,
        height: 100,
        backgroundColor: '#121821',
        borderBottomEndRadius: 10,
        borderTopEndRadius: 10,
        marginTop: 10,
        // marginBottom: 10,
    },
    hiMessage : {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFD369',
        marginTop: 15,
        // alignSelf:"center",
    },
    mazeFmText : {
        fontSize: 20,
        color: '#FFD369',

    },
})


// 121821