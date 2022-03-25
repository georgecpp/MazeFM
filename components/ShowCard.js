import React from "react";
import {View, Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
export default function ShowCard() {
    return (
        <Card>
            <CardTitle 
                title="This is a title" 
                subtitle="This is subtitle"
            />
            <CardContent text="Your device will reboot in few seconds once successful, be patient meanwhile" />
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#222831'
    },
});