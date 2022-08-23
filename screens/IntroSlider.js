import React,{ useEffect,useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Modal,
  Pressable,
  TextInput,
  StatusBar,
  Alert 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';

import { getBooks ,addBookmark, removeBookmark,addToCart,createAndAddToWishlist, setFirstTime,getTopItems,getUserAddresses,addMultipleToCart,setWishlist,getUserWishlists, setLang} from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart'; 
import SplashScreen from 'react-native-splash-screen'
import { Colors } from "../style/colors";
import { SliderBox } from "react-native-image-slider-box";
import ProductItem from "../components/ProductItem";
import ProductItemHome from "../components/ProductItemHome";
import RecentProductItem from "../components/RecentProductItem";
import EssentialItem from "../components/EssentialItem";
import FavouriteDepartmentItem from "../components/FavouriteDepartmentItem";
import { panGestureHandlerCustomNativeProps } from "react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler";
import { APICONFIG } from "../config/api";
import {FONT} from '../style/fonts';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import CardView from 'react-native-cardview'
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useFocusEffect } from '@react-navigation/native';
import {chekProductExistsInWishlist,getWishlistWithProduct} from '../commonfunctions';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';


import base64 from 'react-native-base64';


const IntroSlider = (props) => {
    
    const dispatch = useDispatch();
    const [showRealApp,setShowRealApp] = useState(false);
    const [isFirstTime,setFirstTimeValue] = useState("-1");
    const {gettingStart} = useSelector(state=>state.firsttimeReducer);
    const {lang} = useSelector(state=>state.langReducer)
  
    
  

    useFocusEffect(
        React.useCallback(() => {

            // hide
            const parent = props.navigation.dangerouslyGetParent();
            parent.setOptions({
                tabBarStyle: {display:'none'},
            });

            // reveal after changing screen
            return () =>
                parent.setOptions({
                    tabBarStyle: {display:'none'},
                });

        }, []),
    );
   
    const slides = [
        {
          key: 1,
          title: "Start your order",
          text: 'Groceries & Many More ',
          image: require('../assets/images/intro_image_1.jpg'),
          backgroundColor: 'white',
          /* backgroundColor: '#59b2ab', */
        },
        {
          key: 2,
          title: 'Save Big',
          text: 'By Using Gift Cards',
          image: require('../assets/images/intro_image_2.jpg'),
          backgroundColor: 'white',
          /* backgroundColor: '#febe29', */
        },
        {
          key: 3,
          title: '60 Days',
          text: 'Free Delivery',
          image: require('../assets/images/intro_image_3.jpg'),
          backgroundColor: 'white',
          /* backgroundColor: '#22bcb5', */
        }
      ];
  
    
   
    //const {t, i18n} = useTranslation();
    //SplashScreen.hide()
    const _renderItem = ({ item }) => {
      return (
        <View style={[styles.slide,{backgroundColor:item.backgroundColor}]}>
          
          <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      );
    }
   const _renderNextButton = () => {
      return (
        <View style={styles.buttonCircle}>
          <Icon
            name="arrow-forward"
            color="rgba(255, 255, 255, .9)"
            size={24}
          />
        </View>
      );
    };
    const _renderDoneButton = () => {
      return (
        <View style={styles.buttonCircle}>
          <Icon
            name="md-checkmark"
            color="rgba(255, 255, 255, .9)"
            size={24}
          />
        </View>
      );
    };
    const _onDone = () => {
      
      // User finished the introduction. Show real app through
      // navigation or simply by controlling state
      //setShowRealApp(true);
      handleFirstTime();
  
     // store.dispatch(store.firsttimeReducer.setFirstTime(false));
  
    }
    handleFirstTime = () => {
       
        dispatch(setFirstTime(false));
        //dispatch(setLang("fr"));
        setTimeout(() =>{RNRestart.Restart()},10);
        
      }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"white"}}>
    <View style={{flex:1}}>
<AppIntroSlider
    renderItem={_renderItem}
    onDone={_onDone}
    data={slides}
    renderDoneButton={_renderDoneButton}
    renderNextButton={_renderNextButton}
    activeDotStyle={{backgroundColor:Colors.drawerHeaderBackground}}
    dotStyle={{backgroundColor:Colors.greenBtnColor}}
  />
   </View>    
  </SafeAreaView>
  );
};
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

export default IntroSlider;