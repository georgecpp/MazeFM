import { 
    View,
    Text,
    StyleSheet,
    TextInput, 
    TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { registerValidation } from '../utils/Validation';

const [name,setName] = useState();
const [email, setEmail] = useState();
const [password, setPassword] = useState();
const [confirmPassword,setConfirmPassword]=useState();

export default function Register() {
  return (
    <View style={styles.regform}>
        <Text style={styles.header}>Registration</Text>

        <TextInput style={styles.textinput} placeholder="Your name"  placeholderTextColor="#fff" 
        underlineColorAndroid={'transparent'} />

        <TextInput style={styles.textinput} placeholder="Your email" placeholderTextColor="#fff" 
        underlineColorAndroid={'transparent'} />

        <TextInput style={styles.textinput} placeholder="Password" placeholderTextColor="#fff" 
        secureTextEntry={true} underlineColorAndroid={'transparent'} />

        <Text>Password must contain at least a number, a special character and an upper letter</Text>

        <TextInput style={styles.textinput} placeholder="Confirm password" placeholderTextColor="#fff" 
        secureTextEntry={true} underlineColorAndroid={'transparent'} />
    
        <TouchableOpacity style={styles.button} onPress={() => {
        }}>
            <Text style={styles.btntext}>Sign up</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    regform:{
        alignSelf:'stretch',
    },
    header:{
        fontSize:24,
        color:'#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    textinput:{
        alignSelf:'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button:{
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#59cbbd',
        marginTop: 30,
        borderRadius:20
    },
    btntext:{
        color: '#fff',
        fontWeight: 'bold',
    }
});