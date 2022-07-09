import React, { useEffect } from "react";
import {View, Text, SafeAreaView, Image, StyleSheet, ScrollView, Dimensions, TextInput} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')
import { AuthContext } from "../App";



export default function ProfileScreen({route, navigation}) {

    const {email, name, img} = route.params;
    const {signOut} = React.useContext(AuthContext);

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
                </View>
                <View style={{alignSelf: 'center'}}>
                    <View style={styles.profileImage} >
                        <Image source={{uri: img}} style={styles.image} resizeMode="contain"></Image>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.infoContainer}>
                            <View style={styles.iconContainer}>
                                <Icon style={styles.nameIcon} name={'person'} size={25} position="absolute"></Icon>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>{name}</Text> 
                            </View>
                        </View>
                        <View style={styles.infoContainer} marginTop={5}>
                            <View style={styles.iconContainer}>
                                <Icon style={styles.nameIcon} name={'mail'} size={25} position="absolute"></Icon>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>{email}</Text> 
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton}
                            onPress={() => {
                        signOut();
                    }}>
                    <View style={styles.textContainer}>
                        <Text style={{fontFamily:'HelveticaNeue',
                                      fontWeight:'700',
                                      color:'white',
                                      fontSize: 20,}}>LOG OUT NOW!</Text> 
                    </View>
                    <View style={styles.iconContainer}>
                        <Icon style={{color: 'white'}} name={'exit'} size={28} position="absolute"></Icon>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121821'
    },
    text: {
        fontFamily:'HelveticaNeue',
        fontWeight:'700',
        color:'rgba(255, 255, 255, 0.6)',
        fontSize: 20,
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
        alignSelf: 'center',
        marginTop: 30,
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
        borderColor: 'rgba(255 ,255, 255, 0)',
        borderThickness: 10
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: 'center',
    },
    logoutButton: {
        width: 250,
        height: 45,
        borderRadius:  15,
        backgroundColor: '#e64539',
        justifyContent: 'center',
        marginTop: 30,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    textContainer: {
        width: undefined,
        height: 35,
        borderRadius:  45,
        backgroundColor: 'transparent',
        marginHorizontal: 10,
        alignContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        paddingTop: 5
    },
    nameIcon: {
        color: '#FFD369', 
        marginTop: 5,  
    },
    iconContainer: {
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: 'transparent',
        alignContent: "center",
        alignItems: "center",
        alignSelf: 'center',  
        paddingTop: 3      
    },
    dataContainer: {
        alignSelf: 'center',
        marginTop: 60
    },
    inputContainer: {
        marginTop: 10,
    },
    inputIcon:{
        position: 'absolute',
        top: 8,
        left: 37
    },
});