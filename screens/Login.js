import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text, Platform, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions} from "react-native";
import SocialMediaButton from "../components/SocialMediaButton";
import bgImage from '../assets/images/loginBackground.jpg'
import logoIcon from '../assets/icons/rnlogo.png'
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from "../App";

const { width: WIDTH } = Dimensions.get('window')

export default function Login({navigation}) {
        
    [press, setPress] = useState(false);
    [showPass, setShowPass] = useState(true);

    showPasswd = () => {
      if(press == false) {
        setPress(true);
        setShowPass(false);
      }else{
        setPress(false);
        setShowPass(true);
      }
    }
    
   const [email,setEmail]=useState();
   const [password,setPassword]=useState();
   var signInType;

   const {signIn} = React.useContext(AuthContext);

    return (
        <>
        {/* handle Platform if Android or iOS */}
        {Platform.OS === 'android' ? (
            <SafeAreaView style={styles.containerSafeAreaAndroid}>
                   <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                        <View style={styles.logoContainer}>
                          <Image source={logoIcon} style={styles.logo}/>
                          <Text style={styles.logoText}>MazeFM</Text>
                        </View>

                        <View style={styles.inputContainer}>
                          <Icon name={'ios-person-outline'} size = {28} color={'rgba(255,255,255, 0.7)'}
                            style={styles.inputIcon}/>
                          <TextInput 
                            style={styles.input}
                            placeholder={'Email'}
                            onChangeText={(inputEmail) => setEmail(inputEmail)}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            underlineColorAndroid='transparent'/>
                        </View>

                        <View style={styles.inputContainer}>
                          <Icon name={'lock-open-outline'} size = {28} color={'rgba(255,255,255, 0.7)'}
                            style={styles.inputIcon}/>
                          <TextInput 
                            style={styles.input}
                            placeholder={'Password'}
                            secureTextEntry={showPass}
                            onChangeText={(inputPassword) => setPassword(inputPassword)}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            underlineColorAndroid='transparent'/>

                          <TouchableOpacity style={styles.btnEye}
                            onPress={() => showPasswd()}>
                            <Icon name={press == false ? 'ios-eye-outline' : 'ios-eye-off-outline'} size={26} color={'rgba(255,255,255, 0.7)'}/>
                          </TouchableOpacity>

                        </View>

                        <TouchableOpacity style={styles.btnLogin} onPress={() => {
                          signInType = 'normal';
                          signIn({signInType, email, password})
                        }}>
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>

                        <View style={{flexDirection:"row",justifyContent:"space-between", alignSelf:"center", marginTop:10}}>
                            <SocialMediaButton 
                            buttonTitle="Facebook"
                            btnType="facebook"
                            color="white"
                            backgroundColors={["#4c669f", "#3b5998", "#192f6a"]}
                            onPress={() => {
                              signInType = 'facebook';
                              signIn({signInType});
                            }} 
                            />
                            <SocialMediaButton 
                            buttonTitle="Google"
                            btnType="google"
                            color="black"
                            backgroundColors={["#ffffff", "#ffffff"]}
                            source={require("../assets/icons/search.png")}
                            marginLeftIcon={5}
                            onPress={() => {
                              signInType = 'google';
                              signIn({signInType});
                            }}
                            />
                        </View>
                        <TouchableOpacity
                        style={styles.signupNav}
                        onPress={() => navigation.navigate('Register')} // implement navigation to Register Screen
                        > 
                            <View style={{flexDirection:"row"}}>
                                <Text style={styles.navButtonText}>
                                    Don't have an account?
                                </Text>
                                <Text style={[styles.navButtonText, {color:"#5865F2", marginLeft:10}]}>
                                Sign Up
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>
            </SafeAreaView>
            ) : null}
        </>
    );
}

export const styles = StyleSheet.create({
    containerSafeAreaAndroid: {
        paddingTop: 25,
        backgroundColor:"#23272A", 
        alignItems:"center",
         justifyContent:"center",
        flex: 1
    },
    backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50
    },
    logo : {
      width: 120,
      height: 120
    },
    logoText: {
      color: 'white',
      fontSize: 25, 
      fontWeight: 'bold',
      marginTop:10,
      opacity: 0.5
    },
    input : {
      width: WIDTH - 55,
      height: 45,
      borderRadius:  45,
      fontSize: 16,
      paddingLeft: 45,
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      color: 'rgba(255, 255, 255, 0.7)',
      marginHorizontal: 25
    },
    inputIcon:{
      position: 'absolute',
      top: 8,
      left: 37
    },
    inputContainer: {
      marginTop: 10,
    },
    btnEye: {
      position: 'absolute',
      top: 8,
      right: 37
    },
    btnLogin: {
      width: WIDTH - 55,
      height: 45,
      borderRadius:  45,
      backgroundColor: '#432577',
      justifyContent: 'center',
      marginTop: 20
    },
    text: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 16,
      textAlign: 'center',
    },
    signupNav: {
      flex:1,
      justifyContent:"flex-end",
      marginBottom:25
    }
})