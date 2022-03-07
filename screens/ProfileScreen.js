import React, { useEffect } from "react";
import {View, Text, SafeAreaView, Image, StyleSheet, ScrollView} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ProfileScreen({route, navigation}) {

    const {email, name, img} = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <TouchableOpacity onPress={() => {
                        if(navigation.canGoBack()) {
                            navigation.goBack();
                        }
                    }} >
                        <Ionicons name={"arrow-back"} size={24} color="#52575D" />
                    </TouchableOpacity>
                    <Ionicons name={"md-menu"} size={24} color="#52575D" />
                </View>

                <View style={{alignSelf: 'center'}}>
                    <View style={styles.profileImage}>
                        <Image source={{uri: img}} style={styles.image} resizeMode="contain"></Image>
                    </View>
                    <Text>{name}</Text>
                    <Text>{email}</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    text: {
        fontfamily:'HelveticaNeue',
        color:'#52575D'
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    titleBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        marginHorizontal: 16
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    }
});