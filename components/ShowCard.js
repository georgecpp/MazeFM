import React from "react";
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
export default function ShowCard(props) {
    return (
        <Card>
            <CardTitle 
                title={props.title}
                subtitle={props.timeFrom + " - " + props.timeTo}
            />
            <CardContent text={props.description} />
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#222831'
    },
});