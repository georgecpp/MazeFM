import React, { useState } from 'react';
import { View,StyleSheet, LogBox, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { loginValidation } from "./utils/Validation";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import axios from "axios";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';




const baseUrl = 'https://mazefm-backend.herokuapp.com';

export const AuthContext = React.createContext();

export default App = ({navigation}) => {

    var user = {
      id: null,
      jwt: null,
      email: null,
      name: null,
      img: null
    };

    GoogleSignin.configure({
      webClientId: '85760580626-vthb3f69o3lhvbdk9h78msgv31vo16kn.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
    });

    LogBox.ignoreLogs([
      "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    ]);
    LogBox.ignoreLogs(['Require cycle:']);

    const Stack = createStackNavigator();

    const [state, dispatch] = React.useReducer(
      (prevState, action) => {
        switch(action.type) {
          case 'RESTORE_TOKEN':
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false
            };
          case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
          case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        }
      }, 
      {
        isLoading: true,
        isSignout: false,
        userToken: null
      }
    );

    React.useEffect(() => {
      // Fetch the token from storage then navigate to our appropriate place
      const bootstrapAsync = async () => {
        let userToken;

        try {
          await AsyncStorage.getItem('user', (err, value) => {
            if(err) {
              console.log(err);
            }
            else {
              user = JSON.parse(value);
              if(user) {
                userToken = user.jwt;
              }
            }
          });
          
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      };

      bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
      () => ({
        signIn: async authData => {
          if(authData.signInType == 'facebook') {
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
                        const userFb = await axios.get(`https://graph.facebook.com/${data.userID}?fields=id,name,email,picture.type(large)&access_token=${data.accessToken}`);

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
                          user = loginResponse.data;
                          await AsyncStorage.setItem('user', JSON.stringify(user));
                          dispatch({ type: 'SIGN_IN', token: user.jwt });
                        }
                    }
                },
                function(error) {
                    console.log("Login fail with error: "+error);
                }
            );
          }
          if(authData.signInType == 'google') {
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
                    user = loginResponse.data;
                    await AsyncStorage.setItem('user', JSON.stringify(user));
                    dispatch({ type: 'SIGN_IN', token: user.jwt });
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
          }
          if(authData.signInType == 'normal') {
            try{
              const email = authData.email;
              const password = authData.password;
              const {error} = loginValidation({email,password})
              if(error)
              {
                console.log(error.details[0].message);
                return;
              }
              const loginResponse = await axios.post(`${baseUrl}/auth/login`,
              {
                email: email,
                password: password
              });
              if(loginResponse.status === 200)
                {
                  user = loginResponse.data;
                  await AsyncStorage.setItem('user', JSON.stringify(user));
                  dispatch({ type: 'SIGN_IN', token: user.jwt });
                }
              }
              catch(error){
                Alert.alert(error.message);
              }
          }
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async authData => {
          // In a production app, we need to send user data to server and get a token
          // We will also need to handle errors if sign up failed
          // After getting token, we need to persist the token using `SecureStore`
          // In the example, we'll use a dummy token
  
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
        },
      }),
      []
    );

    return (
      <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                {state.userToken == null ? (
                    <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        {/* ResetPassword */}
                    </>
                ): (
                    <>
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />  
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
};