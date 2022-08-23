import React,{ useEffect, useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator
   
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { getBooks,getUserAddresses } from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "../style/colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';

import {FONT} from '../style/fonts'
import { t } from "i18next";

const Notifications = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const fetchUserAddresses = () => dispatch(getUserAddresses());

  const [emailMode,setEmailMode] = useState(1); //1==normal,2==edit mode
  const [smsMode,setSmsMode] = useState(1); //1==normal,2==edit mode

  const [isEmailAlert, setEmailAlert] = useState(user.addresses.additional_fields.cf_u_p_rec_notifications_email!=undefined?user.addresses.additional_fields.cf_u_p_rec_notifications_email:false);

  const [isOrderNoticeAlert, setOrderNoticeAlert] = useState(user.addresses.additional_fields.cf_p_order_notice_sms);
  const [isOrderAlert, setOrderAlert] = useState(user.addresses.additional_fields.cf_p_order_alerts_sms);
  const [isPerkAlert, setPerkAlert] = useState(user.addresses.additional_fields.cf_p_perks_sms);
  const [mobileNummber,setMobileNumber] = useState(user.addresses.additional_fields.cf_u_p_rec_notifications_mobilenum);

  const [isUpdateEmailPrefLoading,setUpdateEmailPrefLoading] = useState(false);
  const [isUpdateMobilePrefLoading,setUpdateMobilePrefLoading] = useState(false);


  
  
  useEffect(() => {
    fetchUserAddresses();
  },[]);

  

  const updateEmailPref = async () => {
    
    setUpdateEmailPrefLoading(true);
      try {
      const response = await fetch(APICONFIG.REST_WC_URL+"/update_user_notificaitons_email_pref",
                                  {
                                    method:"POST",
                                    body:JSON.stringify({
                                      user_id:user.ID,
                                      rec_notifications_email:isEmailAlert==true?"Y":"N",
                                      
                                      
                                    }),
                                    headers : {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                      Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                    }
                              });
     
     const json = await response.json();
  
     
     if(json.success && json.success == "1")
     {
     alert(json.message);  
     
     }
     else
     {
       alert(json.errors.rest_forbidden)
     }
     
     
   } catch (error) {
     console.error(error);
     alert(error)
     
   } finally {
    setUpdateEmailPrefLoading(false);
    fetchUserAddresses();
    setEmailMode(1);
   }
   
  }

  const updateMobilePref = async () => {
    if(mobileNummber=="" && (isOrderNoticeAlert == true || isOrderAlert == true || isPerkAlert == true))
    {
      alert("Please provide mobile number to get sms alerts !!")
    }
    else
    {
    setUpdateMobilePrefLoading(true);
      try {
      const response = await fetch(APICONFIG.REST_WC_URL+"/update_user_notificaitons_sms_pref",
                                  {
                                    method:"POST",
                                    body:JSON.stringify({
                                      user_id:user.ID,
                                      rec_notifications_mobilenum:mobileNummber,
                                      order_notice_sms:isOrderNoticeAlert==true?"Y":"N",
                                      order_alerts_sms:isOrderAlert==true?"Y":"N",
                                      perks_sms:isPerkAlert==true?"Y":"N",
                                      
                                      
                                    }),
                                    headers : {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                      Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                    }
                              });
     
     const json = await response.json();
  
     
     if(json.success && json.success == "1")
     {
     alert(json.message);  
     
     }
     else
     {
       alert(json.errors.rest_forbidden)
     }
     
     
   } catch (error) {
     console.error(error);
     alert(error)
     
   } finally {
    setUpdateMobilePrefLoading(false);
    fetchUserAddresses();
    setSmsMode(1);
   }
  }
  }


  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <ScrollView>
    <View style={{ flex: 1,margin:20 }}>
      <View style={{width:"100%",height:500}}>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_emailpref_lbl')}</Text></View>
         {emailMode == 1 && <View style={{height:60,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
             <View style={{margin:10,flexDirection:"row"}}><EntypoIcon
                        color={user.addresses.additional_fields.cf_u_p_rec_notifications_email && user.addresses.additional_fields.cf_u_p_rec_notifications_email ===true?Colors.greenBtnColor:"red"}
                        name={user.addresses.additional_fields.cf_u_p_rec_notifications_email && user.addresses.additional_fields.cf_u_p_rec_notifications_email===true?'check':'cross'}
                        size={20}
                        /><Text style={{fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_emailpref_subtitle_lbl')}</Text></View>
             <TouchableOpacity onPress={()=>{setEmailMode(2)}} style={{position:"absolute",right:15,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_edit_lbl')}</Text></View></TouchableOpacity>
         </View>}
         {emailMode == 2 && <View style={{height:160,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
             <View style={{margin:10,flexDirection:"row"}}>
               
             <CheckBox
          value={isEmailAlert}
          onValueChange={setEmailAlert}
          boxType="square"
          onTintColor={Colors.greenBtnColor}
          onCheckColor={Colors.greenBtnColor}
          style={{height:20,width:20,marginTop:5}}
          
          
        /><Text style={{fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,width:"58%",textAlign:"left"}}>{t('notifications_sendmeoffers_lbl')}</Text></View>
             <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_unsubscribetext_lbl')}</Text></View>           

             <TouchableOpacity onPress={()=>{setEmailMode(1)}} style={{position:"absolute",right:15,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_cancel_lbl')}</Text></View></TouchableOpacity>
            {!isUpdateEmailPrefLoading && <TouchableOpacity onPress={()=>{updateEmailPref()}} style={{position:"absolute",right:75,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_update_lbl')}</Text></View></TouchableOpacity>}
            {isUpdateEmailPrefLoading && <View style={{position:"absolute",right:75,top:10,borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>}
         </View>}
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_smspref_lbl')}</Text></View>
         {smsMode == 1 && <View style={{height:210,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
         <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_mobilenumber_lbl')} : </Text></View>
         <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,marginStart:10,textAlign:"left"}}>{user.addresses.additional_fields.cf_u_p_rec_notifications_mobilenum}</Text></View>
         <View style={{margin:10,flexDirection:"row"}}><EntypoIcon
                        color={user.addresses.additional_fields.cf_p_order_notice_sms===true?Colors.greenBtnColor:"red"}
                        name={user.addresses.additional_fields.cf_p_order_notice_sms===true?'check':'cross'}
                        size={20}
                        /><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_ordernotices_lbl')} </Text></View>
         <View style={{margin:10,flexDirection:"row"}}><EntypoIcon
                        color={user.addresses.additional_fields.cf_p_order_alerts_sms===true?Colors.greenBtnColor:"red"}
                        name={user.addresses.additional_fields.cf_p_order_alerts_sms===true?'check':'cross'}
                        size={20}
                        /><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_orderalerts_lbl')} </Text></View>
         <View style={{margin:10,flexDirection:"row"}}><EntypoIcon
                        color={user.addresses.additional_fields.cf_p_perks_sms===true?Colors.greenBtnColor:"red"}
                        name={user.addresses.additional_fields.cf_p_perks_sms===true?'check':'cross'}
                        size={20}
                        /><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_orderperks_lbl')} </Text></View>                                                
         <TouchableOpacity onPress={()=>{setSmsMode(2)}} style={{position:"absolute",right:15,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_edit_lbl')}</Text></View></TouchableOpacity>
         </View>}
         {smsMode == 2 && <View style={{height:420,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
         <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,textAlign:"left"}}>{t('notifications_mobilenumber_lbl')} : </Text></View>
         <View style={{margin:10,flexDirection:"row"}}><TextInput style={{width:"60%",fontFamily:FONT.RobotoRegular,fontSize:16,paddingHorizontal:10,paddingVertical:5,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor}} onChangeText={newText => setMobileNumber(newText)} value={mobileNummber} /></View>
         <View style={{margin:10,flexDirection:"row"}}><CheckBox
          value={isOrderNoticeAlert}
          onValueChange={setOrderNoticeAlert}
          boxType="square"
          onTintColor={Colors.greenBtnColor}
          onCheckColor={Colors.greenBtnColor}
          style={{height:20,width:20}}
          
          
        /><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_ordernotices_lbl')} </Text></View>
        <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginStart:10,textAlign:"left"}}>{t('notifications_ordernotices_subtitle_lbl')}</Text></View>
         <View style={{margin:10,flexDirection:"row"}}><CheckBox
          value={isOrderAlert}
          onValueChange={setOrderAlert}
          boxType="square"
          onTintColor={Colors.greenBtnColor}
          onCheckColor={Colors.greenBtnColor}
          style={{height:20,width:20}}
          
          
        /><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_orderalerts_lbl')} </Text></View>
         <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginStart:10,textAlign:"left"}}>{t('notifications_orderalerts_subtitle_lbl')}</Text></View>               
         <View style={{margin:10,flexDirection:"row"}}><CheckBox
          value={isPerkAlert}
          onValueChange={setPerkAlert}
          boxType="square"
          onTintColor={Colors.greenBtnColor}
          onCheckColor={Colors.greenBtnColor}
          style={{height:20,width:20}}
          
          
        /><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,marginStart:10,textAlign:"left"}}>{t('notifications_orderperks_lbl')} </Text></View> 
         <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginStart:10,textAlign:"left"}}>{t('notifications_orderperks_subtitle_lbl')}</Text></View>                                                                             
         <TouchableOpacity onPress={()=>{setSmsMode(1)}} style={{position:"absolute",right:15,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_cancel_lbl')}</Text></View></TouchableOpacity>
         {!isUpdateMobilePrefLoading && <TouchableOpacity onPress={()=>{updateMobilePref()}} style={{position:"absolute",right:75,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_update_lbl')}</Text></View></TouchableOpacity>}
         {isUpdateMobilePrefLoading && <View style={{position:"absolute",right:75,top:10,borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>}
         </View>}
         
         
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

export default Notifications;