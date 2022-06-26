import React, { useCallback, useState, useEffect } from "react";
import {View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert} from "react-native";
import MusicPlayer from "../components/MusicPlayer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelloMessage from "../components/HelloMessage";
import Icon from 'react-native-vector-icons/FontAwesome'
import ShowCard from "../components/ShowCard";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import axios from "axios";
import { Avatar, Accessory } from 'react-native-elements';


export default function Dashboard({navigation}) {
    var user;
    const [email, setEmail] = useState('email');
    const [id, setId] = useState('id');
    const [img, setImg] = useState('img');
    const [jwt, setJwt] = useState('jwt');
    const [name, setName] = useState('name');
    const [showsData, setShowsData] = useState([]);
    const baseUrl = 'https://mazefm-backend.herokuapp.com';

    useEffect(() => {
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

    useEffect(() => {

      const fetchShowsToday = async () => {
        try {
          const { data: response } = await axios.get(`${baseUrl}/dashboard/fetch-shows-today`);
          setShowsData(response);
        } catch (error) {
          console.error(error)
        }
      };

      fetchShowsToday();
    }, []);

    const isToday = (someDate) => {
      const today = new Date()
      return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <HelloMessage name={name}/>
          <TouchableOpacity style={{paddingLeft: 13}} onPress={() => {
                navigation.navigate('ProfileScreen', {email: email, name: name, img: img})}}>
                <Avatar
                  size="small"
                  rounded
                  source={{
                    uri: img
                  }}>
                  <Accessory />
                </Avatar>
          </TouchableOpacity>
        </View>
        
        <View style={{flex: 1, marginTop: 15}}>
          <ScrollView >
            {showsData && showsData.filter(show => moment.utc(show.timeFrom).isSame(new Date(), "day")).map((show, index) => (
              <ShowCard key={index} 
              title={show.title}
              timeFrom={moment.utc(show.timeFrom).calendar()}
              timeTo={moment.utc(show.timeTo).calendar()}
              description={show.description}/>
            ))}
          </ScrollView>
          <MusicPlayer />
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222831'
    },
});