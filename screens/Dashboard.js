import React, { useState } from "react";
import {View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, StyleSheet, StatusBar} from "react-native";
import MusicPlayer from "../components/MusicPlayer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard() {
    var user;
    const [email, setEmail] = useState('email');
    const [id, setId] = useState('id');
    const [img, setImg] = useState('img');
    const [jwt, setJwt] = useState('jwt');
    const [name, setName] = useState('name');


    React.useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
        let userToken;
        try {
          await AsyncStorage.getItem('user', (err, value) => {
            if(err) {
              console.log(err);
            }
            else {
              user = JSON.parse(value);
              setEmail(user.email);
              setId(user.id);
              setImg(user.img);
              setJwt(user.jwt);
              setName(user.name);
            }
          });
          
        } catch (e) {
          console.log(e);
        }
      };

      bootstrapAsync();
    }, []);

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View>
          <Text>{email}</Text>
          <Text>{name}</Text>
        </View>
        <MusicPlayer />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });