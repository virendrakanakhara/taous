import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  
  StyleSheet,
  
} from 'react-native';
import { ContactStackNavigator,ChangelngStackNavigator,SignInStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import ChangeLanguage from "../screens/ChangeLanguage";
import CustomSidebarMenu from './CustomSidebarMenu';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {FONT} from '../style/fonts';

const Drawer = createDrawerNavigator();
import Header from "../components/Header;";

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContentOptions={{
      activeTintColor:'transparent',
      inactiveTintColor:'rgba(0, 0, 0, 1)',
      inactiveBackgroundColor:'transparent',
      labelStyle:{color: '#ffffff',alignSelf:"flex-start",fontFamily:FONT.RobotoRegular},
      itemStyle: {marginVertical: 0,borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#E2E4E8',},
    }}
    drawerContent={(props) => <CustomSidebarMenu {...props} />}
    defaultNavigationOptions={({ navigation }) => {
      return Header(navigation)
  }}
    >

       
      <Drawer.Screen name="Home" component={TabNavigator} 
      
      options={{
        title: 'Home',

        
        drawerIcon: ({focused, size}) => (
           <FeatherIcon
              name="home"
              size={20}
              color="white"
           />
        ),
     }}
      />
      {/* <Drawer.Screen name="Contact" component={ContactStackNavigator} 
          options={{
            title: 'Contact',
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
              color='white'
              name='contacts-outline'
              size={20}
            />
            ),
         }}
      
      /> */}
       <Drawer.Screen name="ChangeLanguage" component={ChangelngStackNavigator} 
          options={{
            title: 'Change Language',
            drawerIcon: ({focused, size}) => (
              <FontAwesomeIcon
              color='white'
              name='language'
              size={20}
            />
            ),
            
         }}
      
      /> 
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;