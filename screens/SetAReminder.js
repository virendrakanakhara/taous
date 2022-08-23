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
import DropdownWeekdayComponent from "../components/DropdownWeekdayComponent";

import {FONT} from '../style/fonts'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { t } from "i18next";

const SetAReminder = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const fetchUserAddresses = () => dispatch(getUserAddresses());

  const [emailMode,setEmailMode] = useState(1); //1==normal,2==edit mode
  const [smsMode,setSmsMode] = useState(1); //1==normal,2==edit mode

  const [isEmailReminder, setEmailReminder] = useState(user.addresses.additional_fields.cf_u_r_send_email_reminder);
  const [weekdayvalue, setWeekdayValue] = useState(user.addresses.additional_fields.cf_u_r_reminder_weekday);
  const [freq,setFreq] = useState(user.addresses.additional_fields.cf_u_r_reminder_fequency=='W'?0:user.addresses.additional_fields.cf_u_r_reminder_fequency=='B'?1:'');
  const [isAlternateEmail, setIsAlternateEmail] = useState(user.addresses.additional_fields.cf_u_r_send_to_other);
  const [alternateEmail, setAlternateEmail] = useState(user.addresses.additional_fields.cf_u_r_alternate_email);

  const [isUpdateReminderLoading,setUpdateReminderLoading] = useState(false);
  
  useEffect(() => {
    fetchUserAddresses();
  },[]);

  const weekdays_data = [{"label":"Sunday","value":0},{"label":"Monday","value":1},{"label":"Tuesday","value":2},{"label":"Wednesday","value":3},{"label":"Thursday","value":4},{"label":"Friday","value":5},{"label":"Saturday","value":6}];


  const updateEmailReminderPref = async () => {
  

  
  

     setUpdateReminderLoading(true);
      try {
      const response = await fetch(APICONFIG.REST_WC_URL+"/user_set_reminder",
                                  {
                                    method:"POST",
                                    body:JSON.stringify({
                                      send_email_reminder:"Y",
                                      customer_id:user.ID,
                                      reminder_weekday:weekdayvalue==undefined?'':weekdayvalue,
                                      reminder_fequency:freq==1?'B':freq==0?'W':'',
                                      send_to_other:isAlternateEmail?"Y":"N",
                                      alternate_email:alternateEmail==undefined?'':alternateEmail
                                      
                                    }),
                                    headers : {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                      Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                    }
                              });
     
     const json = await response.json();
     //alert(JSON.stringify(json))
     
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
    setUpdateReminderLoading(false);
    fetchUserAddresses();
    
   }
   
   
  }

  const changeWeekdayValue = (value) => {
   setWeekdayValue(value);
  }
 
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <ScrollView>
    <View style={{ flex: 1,margin:20 }}>
      <View style={{width:"100%",height:770}}>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('setareminder_reminders_lbl')}</Text></View>
         <View style={{height:720,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
             <View style={{margin:10}}><Text style={{fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}} numberOfLines={3}>{t('setareminder_reminders_subtitle1_lbl')}</Text></View>
             <View style={{margin:10}}><Text style={{fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}} numberOfLines={3}>{t('setareminder_reminders_subtitle2_lbl')}</Text></View>
             <View style={{margin:10,flexDirection:"row"}}>
               
             <CheckBox
          value={isEmailReminder}
          onValueChange={setEmailReminder}
          boxType="square"
          onTintColor={Colors.greenBtnColor}
          onCheckColor={Colors.greenBtnColor}
          style={{height:20,width:20,marginTop:5}}
          
          
        /><Text style={{fontFamily:FONT.RobotoBold,fontSize:20,marginStart:10,width:"88%",textAlign:"left"}}>{t('setareminder_sendmeemailreminder_lbl')}</Text></View>
             <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoMedium,fontSize:18,marginStart:0}}>{t('setareminder_reminderweekday_lbl')}</Text></View>           

             <View style={{margin:10,}}><DropdownWeekdayComponent changeWeekdayValue={changeWeekdayValue} data={weekdays_data} value={weekdayvalue} selectText={"Select Weekday"} /></View>
             <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoMedium,fontSize:18,marginStart:0}}>{t('setareminder_sendreminder_lbl')}</Text></View>           

<View style={{margin:10,}}>
<RadioForm
  radio_props={[{label:t('setareminder_everyweek_lbl'),value:0},{label:t('setareminder_everyotherweek_lbl'),value:1}]}
  initial={freq}
  formHorizontal={false}
  labelHorizontal={true}
  buttonColor={Colors.greenBtnColor}
  selectedButtonColor={Colors.greenBtnColor}
  animation={true}
  onPress={(value) => {setFreq(value)}}
/>

</View>
<View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:18,marginStart:0}}>{t('setareminder_reminderwillbesentto_lbl')}</Text></View>           
<View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:18,marginStart:0}}>{user.user_email}</Text></View>           
<View style={{margin:10,flexDirection:"row",alignItems:"center"}}>
               
             <CheckBox
          value={isAlternateEmail}
          onValueChange={setIsAlternateEmail}
          boxType="square"
          onTintColor={Colors.greenBtnColor}
          onCheckColor={Colors.greenBtnColor}
          style={{height:15,width:15}}
          
          
        /><Text style={{fontFamily:FONT.RobotoRegular,fontSize:20,paddingStart:5,marginStart:10,width:"88%",textAlign:"left"}}>{t('setareminder_sendtootheremail_lbl')}</Text></View>            
         <View style={{margin:10,flexDirection:"row"}}><TextInput style={{width:"100%",fontFamily:FONT.RobotoRegular,fontSize:16,paddingHorizontal:10,paddingVertical:5,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor}} onChangeText={newText => setAlternateEmail(newText)} value={alternateEmail} /></View>           

        {!isUpdateReminderLoading && <TouchableOpacity onPress={()=>{updateEmailReminderPref()}}><View style={{margin:10,flexDirection:"row",backgroundColor:Colors.greenBtnColor,height:30,borderRadius:5,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:18,marginStart:0,color:"white"}}>{t('setareminder_save_lbl')}</Text></View></TouchableOpacity>}           
        {isUpdateReminderLoading && <View style={{margin:10,flexDirection:"row",backgroundColor:Colors.greenBtnColor,height:30,borderRadius:5,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={"white"} /></View>} 
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

export default SetAReminder;