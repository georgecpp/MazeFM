import { View, Text, StyleSheet, ImageBackground, Image, TextInput, Dimensions } from 'react-native'
import React, { Component } from 'react'

import bgImage from '../assets/images/loginBackground.jpg'
import logoIcon from '../assets/icons/rnlogo.png'
import Icon from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native'

const { width: WIDTH } = Dimensions.get('window')
export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      showPass: true,
      press: false
    }
  }

  showPass = () => {
    if(this.state.press == false) {
      this.setState({showPass: false, press: true})
    }else{
      this.setState({showPass: true, press: false})
    }
  }

  render() {
    return (
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
            placeholder={'Username'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'/>
        </View>
  
        <View style={styles.inputContainer}>
          <Icon name={'ios-lock-outline'} size = {28} color={'rgba(255,255,255, 0.7)'}
            style={styles.inputIcon}/>
          <TextInput 
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid='transparent'/>
  
          <TouchableOpacity style={styles.btnEye}
            onPress={this.showPass.bind(this)}>
            <Icon name={this.state.press == false ? 'ios-eye-outline' : 'ios-eye-off-outline'} size={26} color={'rgba(255,255,255, 0.7)'}/>
          </TouchableOpacity>
  
        </View>
  
        <TouchableOpacity style={styles.btnLogin}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
  
      </ImageBackground>
    )
  }
  
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
    alignItems: 'center',
    marginBottom: 50
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
  }
})