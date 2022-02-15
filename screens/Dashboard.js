import React from "react";
import {View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, StyleSheet, StatusBar} from "react-native";
import MusicPlayer from "../components/MusicPlayer";

export default function Dashboard() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <MusicPlayer />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });