import React,{useState} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MainStackNavigator,CategoryStackNavigator,SearchStackNavigator,MyaccountStackNavigator,ContactStackNavigator,LocalpickupStackNavigator, MyItemsStackNavigator, WishListStackNavigator, AuthStackNavigator,IntroStackNavigator } from "./StackNavigator";
import '../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Anticon from 'react-native-vector-icons/AntDesign';
import {Colors} from "../style/colors";
import { FONT } from "../style/fonts";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  
  const {t, i18n} = useTranslation();
  
  const {user} = useSelector(state => state.userReducer);
  const {lang} = useSelector(state=>state.langReducer);
  const {gettingStart} = useSelector(state=>state.firsttimeReducer);
  
  

  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
    
    //RNRestart.Restart();
    
  }
  
  
  return (
    <Tab.Navigator screenOptions={{ headerShown: false ,tabBarActiveTintColor:Colors.lightGreen1,tabBarInactiveTintColor:Colors.greenBtnColor
      ,tabBarLabelStyle: {
        fontSize: 11,
        fontFamily:FONT.RobotoSemiBold
      },
     
            }}
       
      >
      <Tab.Screen name="Home" component={gettingStart===1?IntroStackNavigator:MainStackNavigator} options={{
      tabBarLabel: t('bottom_tab_home_label'),
      
      tabBarIcon: ({ focused,color, size }) => 
        
         (
        <Ionicon
              name={focused?"home":"home-outline"}
              size={25}
              color={focused?Colors.lightGreen1:Colors.greenBtnColor}
           />
      )
    
   ,
    }} />
      <Tab.Screen name="Myitems" component={Object.keys(user).length>0?MyItemsStackNavigator:AuthStackNavigator}
      options={{
        tabBarLabel: t('bottom_tab_myitems_label'),
        tabBarIcon: ({ focused,color, size }) => (
          <Ionicon
                name={focused?"ios-download":"ios-download-outline"}
                size={25}
                color={focused?Colors.lightGreen1:Colors.greenBtnColor}
             />
        ),
      }}
      />
      
      <Tab.Screen name="Search" component={SearchStackNavigator} 
      options={{
        tabBarLabel: t('bottom_tab_search_label'),
        tabBarIcon: ({ focused,color, size }) => (
          <Ionicon
                name={focused?"search-circle":"search-circle-outline"}
                size={30}
                color={focused?Colors.lightGreen1:Colors.greenBtnColor}
             />
        ),
      }}
      />
      <Tab.Screen name="Wishlist" component={Object.keys(user).length > 0 ? WishListStackNavigator:AuthStackNavigator}
      options={{
        tabBarLabel: t('bottom_tab_wishlist_label'),
        tabBarIcon: ({ focused,color, size }) => (
          <Anticon
                name={focused?"heart":"hearto"}
                size={25}
                color={focused?Colors.lightGreen1:Colors.greenBtnColor}
             />
        ),
      }}
      />
      <Tab.Screen name="User" component={Object.keys(user).length > 0 ? MyaccountStackNavigator:AuthStackNavigator} 
      options={{
        tabBarLabel: t('bottom_tab_account_label'),
        tabBarIcon: ({ focused,color, size }) => (
          <FontAwesomeIcon
                name={focused?"user":"user-o"}
                size={25}
                color={focused?Colors.lightGreen1:Colors.greenBtnColor}
             />
        ),
      }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;