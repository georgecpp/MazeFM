import React from "react";
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
export default function ShowCard(props) {
    return (
        <Card mediaSource={{uri: props.img}}>
            <CardTitle title={props.title} subtitle={"⌚ " + props.timeFrom + " - " + props.timeTo} subtitleStyle={{fontSize: 15}} />
            <CardContent text={"🗣️ " + props.description} textStyle={{ fontSize: 15}} />
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#222831'
    },
});

//titleStyle={{ fontSize: 15}}
//subtitleStyle={{fontSize: 15}}
//textStyle={{ fontSize: 15}}