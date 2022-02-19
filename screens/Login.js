import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, Alert} from "react-native";
import GlobalStyles from "../styles/GlobalStyles";
import { Platform } from "react-native";
import SocialMediaButton from "../components/SocialMediaButton";
import { windowWidth, windowHeight } from "../utils/Dimensions";
import { loginValidation } from "../utils/Validation";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import axios from "axios";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';


const baseUrl = 'https://mazefm-backend.herokuapp.com';


export default function Login() {
    
    GoogleSignin.configure({
        webClientId: '85760580626-vthb3f69o3lhvbdk9h78msgv31vo16kn.apps.googleusercontent.com',
        offlineAccess: true,
        hostedDomain: '',
    })
    return (
        <>
        {/* handle Platform if Android or iOS */}
        {Platform.OS === 'android' ? (
            <SafeAreaView style={styles.containerSafeAreaAndroid}>
                    {/* <Text style={[styles.navButtonText, {paddingStart:10}]}>...Or Login with:</Text> */}
                    <View style={{flexDirection:"row",justifyContent:"space-between", alignSelf:"center", marginTop:10}}>
                        <SocialMediaButton 
                        buttonTitle="Facebook"
                        btnType="facebook"
                        color="white"
                        backgroundColors={["#4c669f", "#3b5998", "#192f6a"]}
                        onPress={async () => {
                                await LoginManager.logInWithPermissions(["public_profile", "email"]).then(
                                async function(result) {
                                    if(result.isCancelled) {
                                        console.log("Login cancelled.");
                                    }
                                    else {
                                        console.log(
                                            "Login success with permissions: " +
                                                result.grantedPermissions.toString()
                                          );
                                          
                                          // Once signed in, get the user's AcessToken
                                          const data = await AccessToken.getCurrentAccessToken();
                                          if(!data) {
                                              console.log("Something went wrong obtaining access token");
                                              return; 
                                            }                       
                                        const userFb = await axios.get(`https://graph.facebook.com/${data.userID}?fields=id,name,email,picture&access_token=${data.accessToken}`);
                                        
                                        const {name, email, picture} = userFb.data;
                                        const img = picture.data.url;
                                        const loginResponse = await axios.post(`${baseUrl}/auth/social-auth`, 
                                        {
                                            name,
                                            email,
                                            img
                                        });
                                        if(loginResponse.status === 200 || loginResponse.status === 201) {
                                            // user registered with facebook.
                                            // received jwt in header and user id.
                                            Alert.alert("Maze.fm Auth", "Signed in Successfully with Facebook! Enjoy!");
                                        }
                                    }
                                },
                                function(error) {
                                    console.log("Login fail with error: "+error);
                                }
                            );
                        }} 
                        />
                        <SocialMediaButton 
                        buttonTitle="Google"
                        btnType="google"
                        color="black"
                        backgroundColors={["#ffffff", "#ffffff"]}
                        source={require("../assets/icons/search.png")}
                        marginLeftIcon={5}
                        onPress={async () => {
                            try {
                                await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
                                const userInfo = await GoogleSignin.signIn();
                                const {name, email, photo} = userInfo.user;
                                const loginResponse = await axios.post(`${baseUrl}/auth/social-auth`, 
                                {
                                    name: name,
                                    email: email,
                                    img: photo
                                });
                                if(loginResponse.status === 200 || loginResponse.status === 201) {
                                    // user registered with google.
                                    // received jwt in header and user id.
                                    Alert.alert("Maze.fm Auth", "Signed in Successfully with Google! Enjoy!");
                                }
                              } catch (error) {
                                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                                    Alert.alert('User Cancelled the Login Flow');
                                } else if (error.code === statusCodes.IN_PROGRESS) {
                                    Alert.alert('Signing In');
                                } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                                    Alert.alert('Play Services Not Available or Outdated');
                                } else {
                                    Alert.alert(error.message);
                                }
                              }
                        }}
                        />
                        
                    </View>
            </SafeAreaView>
            ) : null}
        </>
    );
}

const styles = StyleSheet.create({
    containerSafeAreaAndroid: {
        paddingTop: 25,
        backgroundColor:"#23272A", 
        alignItems:"center",
         justifyContent:"center",
        flex: 1
    },
});