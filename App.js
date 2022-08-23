/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor } from './redux/store';
import SplashScreen from 'react-native-splash-screen';
import {Colors} from './style/colors';
import {FONT} from './style/fonts';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
console.disableYellowBox = true;

//import './assets/i18n/i18n';
//import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  
} from 'react-native';

import {
 
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';
import DrawerNavigator from "./navigation/DrawerNavigator";
import TabNavigator from "./navigation/TabNavigator";
import AppIntroSlider from 'react-native-app-intro-slider';
import {RobotoRegular} from "./style/fonts";


import FlashMessage from "react-native-flash-message";





const App = () => {
  const [timePassed,setTimePassed] = useState(true);
 
 useEffect(()=>{

  //setTimeout(() => {setTimePassed(true)}, 10)

 },[]);
 

 
 
  
  

  const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  if(!timePassed)
  return (<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"large"} color={Colors.greenBtnColor} /></View>)



  if(timePassed)
  return (
    <Provider store={store}>

      <PersistGate loading={null} persistor={persistor}>
          
          <View style={{flex:1}}>
          <MyStatusBar backgroundColor={Colors.greenBtnColor} barStyle="light-content" />
          
          <View style={{flex:1}}>
              <NavigationContainer>   
                  <TabNavigator />
              </NavigationContainer>    
              <FlashMessage position="top" />
          </View>    
          </View>    
          
          
      </PersistGate>
    </Provider>
  );
  
}
export default App

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: Colors.greenBtnColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  title:{
    color:Colors.drawerHeaderBackground,
    fontSize:20,
    fontFamily:FONT.RobotoBold,
    
  },
  text:{
    color:Colors.greenBtnColor,
    fontSize:16,
    fontFamily:FONT.RobotoMedium
  },
  image:{
    width:250,
    height:400,
    resizeMode:"contain"
  }
  
  
});
