import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { BackgroundImage } from 'react-native-elements/dist/config'

import bgImage from "../assets/images/loginBackground.jpg"
import logoIcon from '../assets/icons/rnlogo.png'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'

const { width: WIDTH } = Dimensions.get('window')

export default function RegisterN() {

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

  return (
    <BackgroundImage source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
            <Image source={logoIcon} style={styles.logo}/>
            <Text style={styles.logoText}>MazeFM</Text>
        </View>

        <View style={styles.inputContainer}>
            <Icon name={'person-outline'} size = {28} color={'rgba(255,255,255, 0.7)'}
                style={styles.inputIcon}/>
            <TextInput 
                style={styles.input} 
                placeholder={'Your Name'}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid='transparent'/>
        </View>

        <View style={styles.inputContainer}>
            <Icon name={'mail-outline'} size = {28} color={'rgba(255,255,255, 0.7)'}
                style={styles.inputIcon}/>
            <TextInput 
                style={styles.input} 
                placeholder={'Email'}
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
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid='transparent'/>
            <TouchableOpacity style={styles.btnEye}
                onPress={() => showPasswd()}>
                <Icon name={press == false ? 'ios-eye-outline' : 'ios-eye-off-outline'} size={26} color={'rgba(255,255,255, 0.7)'}/>
            </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
            <Icon name={'lock-closed-outline'} size = {28} color={'rgba(255,255,255, 0.7)'}
                style={styles.inputIcon}/>
            <TextInput 
                style={styles.input}
                placeholder={'Confirm Password'}
                secureTextEntry={showPass}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid='transparent'/>
        </View>
        
        <TouchableOpacity style={styles.btnSignUp}>
            <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>

    </BackgroundImage>
  )
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        alignItems: 'flex-start',
        marginBottom: 40
        },
    logo : {
        width: 100,
        height: 100
        },
    logoText: {
        color: 'white',
        fontSize: 25, 
        fontWeight: 'bold',
        marginTop:10,
        opacity: 0.5
        },
    inputContainer: {
        marginTop: 10,
    },
    inputIcon:{
        position: 'absolute',
        top: 8,
        left: 37
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
    btnSignUp: {
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
    }
})