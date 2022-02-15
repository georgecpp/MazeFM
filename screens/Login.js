import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity} from "react-native";
import GlobalStyles from "../styles/GlobalStyles";
import { Platform } from "react-native";
import SocialMediaButton from "../components/SocialMediaButton";
import { windowWidth, windowHeight } from "../utils/Dimensions";
import { loginValidation } from "../utils/Validation";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";



export default function Login() {

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
                                          }
                                          else{
                                              console.log(data);
                                          }

                                          // now create a MongoDb credential with the AccessToken

                                          // Sign-in user with the credential.
                                    }
                                },
                                function(error) {
                                    console.log("Login fail with error: "+error);
                                }
                            );
                        }} 
                        />
                        {/* <SocialMediaButton 
                        buttonTitle="Google"
                        btnType="google"
                        color="black"
                        backgroundColors={["#ffffff", "#ffffff"]}
                        source={require("../assets/icons/search.png")}
                        marginLeftIcon={5}
                        onPress={async () => {
                            try {   

                                // Get the users ID token
                                const {idToken} = await GoogleSignin.signIn();
                                console.log(idToken);

                                // Create a Google credential with the token

                                // Sign-in the user with the credential
                            }
                            catch(error) {
                                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                                    // user cancelled the login flow
                                  } else if (error.code === statusCodes.IN_PROGRESS) {
                                    // operation (e.g. sign in) is in progress already
                                  } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                                    // play services not available or outdated
                                  } else {
                                    // some other error happened
                                  }
                            }  
                        }} // implement Google Sign In - AuthContext
                        /> */}
                        
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