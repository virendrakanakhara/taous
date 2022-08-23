import React,{ useEffect } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { getBooks } from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "../style/colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {FONT} from '../style/fonts';
import {useTranslation} from 'react-i18next';

const Wallet = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  
  

  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <ScrollView>
    <View style={{ flex: 1,margin:20 }}>
      <View style={{width:"100%",height:700}}>
      <View style={{height:45,backgroundColor:"white",width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoBold,fontSize:20,textAlign:"left"}}>{t('wallet_paymentmethods_lbl')}</Text></View>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('wallet_cashondelivery_lbl')}</Text></View>
         <View style={{height:110,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
             <View style={{margin:10}}><Text style={{fontFamily:FONT.RobotoLight,fontSize:16,marginStart:10,textAlign:"left"}} numberOfLines={2}>{t('wallet_cashondelivery_subtitle_lbl')}</Text></View>
             <View style={{margin:10}}><Text style={{fontFamily:FONT.RobotoMedium,fontSize:18,color:Colors.greenBtnColor,marginStart:10,textAlign:"left"}} >{t('wallet_paywithcash_lbl')}</Text></View>
             
         </View>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('wallet_storecreditpayment_lbl')}</Text></View>
         <View style={{height:110,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
         <View style={{margin:10}}><Text style={{fontFamily:FONT.RobotoLight,fontSize:16,marginStart:10,textAlign:"left"}} numberOfLines={2}>{t('wallet_storepayment_subtitle_lbl')}</Text></View>
             <View style={{margin:10}}><Text style={{fontFamily:FONT.RobotoMedium,fontSize:18,color:Colors.greenBtnColor,marginStart:10,textAlign:"left"}} >{t('wallet_paywithstore_lbl')}</Text></View>
             
         </View>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('wallet_creditdebitcard_lbl')}</Text></View>
         <View style={{height:110,borderWidth:1,borderColor:Colors.commonbg,width:"100%",justifyContent:"center",alignItems:"center"}} >
         <TouchableOpacity style={{height:45,width:"50%"}}><View style={{height:"100%",width:"100%",backgroundColor:Colors.greenBtnColor,borderRadius:5,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:14,fontFamily:FONT.RobotoBold}}>{t('wallet_addcreditdebitcard_lbl')}</Text></View></TouchableOpacity>
            
             
         </View>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('wallet_digitalwallet_lbl')}</Text></View>
         <View style={{height:130,borderWidth:1,borderColor:Colors.commonbg,width:"100%",justifyContent:"center",alignItems:"center"}} >
         <TouchableOpacity style={{height:35,width:"50%"}}><View style={{height:"100%",width:"100%"}}><Image source={{uri:"https://beta.taous.ma/wp-content/themes/imartnew/images/orange_money_btn.png"}} style={{resizeMode:"contain",width:"100%",height:"100%"}} /></View></TouchableOpacity>
         <TouchableOpacity style={{height:35,width:"50%",marginTop:10}}><View style={{height:"100%",width:"100%"}}><Image source={{uri:"https://beta.taous.ma/wp-content/themes/imartnew/images/inwi_money_btn.png"}} style={{resizeMode:"contain",width:"100%",height:"100%"}} /></View></TouchableOpacity>
            
             
         </View>
         
         
      </View>  
      
    
    </View>
    </ScrollView>
  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default Wallet;