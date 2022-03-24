import React, { useCallback, useState } from "react";
import {View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, StyleSheet, StatusBar} from "react-native";
import MusicPlayer from "../components/MusicPlayer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelloMessage from "../components/HelloMessage";
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Dashboard({navigation}) {
    var user;
    const [email, setEmail] = useState('email');
    const [id, setId] = useState('id');
    const [img, setImg] = useState('img');
    const [jwt, setJwt] = useState('jwt');
    const [name, setName] = useState('name');


    React.useEffect(() => {
      let isMounted = true ;
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
        try {
          var value = await AsyncStorage.getItem('user');
          user = JSON.parse(value);
          setEmail(user.email);
          setId(user.id);
          setImg(user.img);
          setJwt(user.jwt);
          setName(user.name);
        }
        catch(e) {
          console.log(e);
        }
      };
      bootstrapAsync()
      return () => {
        
      }
    }, []);

    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        {/* <View>
          <Text>{email}</Text>
          <Text>{name}</Text>
        </View> */}
        
          
          {/* <TouchableOpacity style = {{backgroundColor:"#222831"}} onPress={() => {
            navigation.navigate('ProfileScreen', {email: email, name: name, img: img})}}>
            <Icon name='user-circle' size={26} color={'white'}></Icon>
          </TouchableOpacity> */}

        <HelloMessage name={name}/>
        <TouchableOpacity style = {{backgroundColor:"#222831"}} onPress={() => {
            navigation.navigate('ProfileScreen', {email: email, name: name, img: img})}}>
            <Icon name='user-circle' size={26} color={'rgba(255,255,255, 0.6)'}></Icon>
          </TouchableOpacity>
        
        <MusicPlayer />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });