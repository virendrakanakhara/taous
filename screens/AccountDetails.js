import React,{ useEffect,useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TextInput 
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
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import {updateUserAcountDetails} from '../redux/actions';  
import { t } from "i18next";


const AccountDetails = (props) => {

  const [isUserDataLoading, setUserDataLoading] = useState(true);
  const [isUserDataUpdateLoading,setUserDataUpdateLoading] = useState(false);
  const [isUserUpdatePasswordLoading,setUserUpdatePasswordLoading] = useState(false);

  const [datauser, setDataUser] = useState([]);
  const [firstname,setFirstName] = useState();
  const [lastname,setLastName] = useState();
  const [displayname,setDisplayName] = useState();
  const [email,setEmail] = useState();
  const [mode,setMode] = useState(1); // 1==normal mode,2==edit mode

  const [current_password,setCurrentPassword] = useState('');
  const [new_password,setNewPassword] = useState('');
  const [confirm_password,setConfirmPassword] = useState('');

  const [modePasswordSection,setModePasswordSection] = useState(1); //1==normal,2==edit mode
  const {bookmarks } = useSelector(state => state.booksReducer);
  const {user} = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();


 
  useEffect(() => {
    getUserData();
  },[]);  

//fetch user data//
const getUserData = async () => {
  try {
   const response = await fetch(APICONFIG.REST_WC_URL+"/user_profile_details",
                                {
                                  method:"POST",
                                  body:JSON.stringify({
                                    user_id:user.ID    
                                  }),
                                  headers : {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                  }
                            });
   
   const json = await response.json();
   setDataUser(json);
   setFirstName(json.customer.first_name);
   setLastName(json.customer.last_name);
   setDisplayName(json.customer.display_name);
   setEmail(json.customer.email);
   
 } catch (error) {
   console.error(error);
   setDataUser({});
   setFirstName("");
   setLastName("");
   setDisplayName("");
   setEmail("");
 } finally {
  setUserDataLoading(false);
 }
} 

const updateUserData = async () => {
  if(firstname == "")
  {
    alert(t('accountdetails_enterfirstname_lbl'))
  }
  else if(lastname == "")
  {
    alert(t('accountdetails_enterlastname_lbl'))

  }
  else if(displayname == "")
  {
    alert(t('accountdetails_enterdisplayname_lbl'))
  }
  else if(email == "")
  {
    alert(t('accountdetails_enteremail_lbl'))
  }
  else
  {
    setUserDataUpdateLoading(true);
    try {
    const response = await fetch(APICONFIG.REST_WC_URL+"/update_user_profile_details",
                                {
                                  method:"POST",
                                  body:JSON.stringify({
                                    user_id:user.ID,
                                    first_name:firstname,
                                    last_name:lastname,
                                    display_name:displayname,
                                    email:email    
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
   dispatch(updateUserAcountDetails({"first_name":firstname,"last_name":lastname,"display_name":displayname,"user_email":email}));
   }
   else
   {
     alert(json.errors.rest_forbidden)
   }
   getUserData();
   
 } catch (error) {
   console.error(error);
   alert(error)
   
 } finally {
  setUserDataUpdateLoading(false);
 }
  }
}


const updateUserPassword = async () => {
  if(current_password == "")
  {
    alert(t('accountdetails_entercurrentpassword_lbl'))
  }
  else if(new_password == "")
  {
    alert(t('accountdetails_enternewpassword_lbl'))

  }
  else if(confirm_password == "")
  {
    alert(t('accountdetails_enterconfirmpassword_lbl'))
  }
  else if(new_password != confirm_password)
  {
    alert(t('accountdetails_bothpasswordmatch_lbl'))
  }
  else
  {
    setUserUpdatePasswordLoading(true);
    try {
    const response = await fetch(APICONFIG.REST_WC_URL+"/update_user_password",
                                {
                                  method:"POST",
                                  body:JSON.stringify({
                                    user_id:user.ID,
                                    current_password:current_password,
                                    new_password:new_password,
                                    
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
  setUserUpdatePasswordLoading(false);
 }
  }
}

  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <ScrollView>
    {!isUserDataLoading && <View style={{ flex: 1,margin:20 }}>
      <View style={{width:"100%",height:500}}>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('accountdetails_personalinfo_lbl')}</Text></View>
         {mode==1 ? <View style={{height:200,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
             <View style={{margin:10,flexDirection:"row",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,textAlign:"left"}}>{t('accountdetails_firstname_lbl')} :</Text><Text style={{fontFamily:FONT.RobotoBold,fontSize:16,textAlign:"left",marginStart:5}}>{datauser.customer.first_name}</Text></View>
             <View style={{margin:10,flexDirection:"row",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,textAlign:"left"}}>{t('accountdetails_lastname_lbl')} :</Text><Text style={{fontFamily:FONT.RobotoBold,fontSize:16,textAlign:"left",marginStart:5}}>{datauser.customer.last_name}</Text></View>
             <View style={{margin:10,flexDirection:"row",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,textAlign:"left"}}>{t('accountdetails_displayname_lbl')} :</Text><Text style={{fontFamily:FONT.RobotoBold,fontSize:16,textAlign:"left",marginStart:5}}>{datauser.customer.display_name}</Text></View>
             <View style={{margin:10,flexDirection:"row",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,textAlign:"left"}}>{t('accountdetails_emailaddress_lbl')} :</Text><Text style={{fontFamily:FONT.RobotoBold,fontSize:16,textAlign:"left",marginStart:5}}>{datauser.customer.email}</Text></View>
             <TouchableOpacity onPress={()=>{setMode(2);}} style={{position:"absolute",right:15,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_edit_lbl')}</Text></View></TouchableOpacity>
         </View>:<View style={{height:200,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
             <View style={{margin:10,flexDirection:"row",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16}}>{t('accountdetails_firstname_lbl')} :</Text><TextInput style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,width:"40%",height:30,marginStart:5,paddingStart:3}} onChangeText={newText => setFirstName(newText)} value={firstname}/></View>
             <View style={{margin:10,flexDirection:"row",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16}}>{t('accountdetails_lastname_lbl')} :</Text><TextInput style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,width:"75%",height:30,marginStart:5,paddingStart:3}} onChangeText={newText => setLastName(newText)} value={lastname} /></View>
             <View style={{margin:10,flexDirection:"row",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16}}>{t('accountdetails_displayname_lbl')} :</Text><TextInput style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,width:"70%",height:30,marginStart:5,paddingStart:3}} onChangeText={newText => setDisplayName(newText)} value={displayname} /></View>
             <View style={{margin:10,flexDirection:"row",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16}}>{t('accountdetails_emailaddress_lbl')} :</Text><TextInput style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,width:"70%",height:30,marginStart:5,paddingStart:3}} onChangeText={newText => setEmail(newText)} value={email} /></View>
             {!isUserDataUpdateLoading && <TouchableOpacity onPress={()=>{updateUserData()}} style={{position:"absolute",right:75,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_update_lbl')}</Text></View></TouchableOpacity>}
             {isUserDataUpdateLoading && <View style={{position:"absolute",right:75,top:10,borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>}

             <TouchableOpacity onPress={()=>{setMode(1)}} style={{position:"absolute",right:15,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_cancel_lbl')}</Text></View></TouchableOpacity>
         </View>
         }
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('accountdetails_passchange_lbl')}</Text></View>
         {modePasswordSection==1 ? <View style={{height:130,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
         <View style={{margin:10,flexDirection:"row"}}><Text>{'\u2022'}</Text><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,marginStart:10,textAlign:"left"}}>{t('accountdetails_passcasesensitive_lbl')}</Text></View>
         <View style={{margin:10,flexDirection:"row"}}><Text>{'\u2022'}</Text><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,marginStart:10,textAlign:"left"}}>{t('accountdetails_passminchar_lbl')}</Text></View>
         <TouchableOpacity onPress={()=>{setModePasswordSection(2)}} style={{position:"absolute",right:15,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_edit_lbl')}</Text></View></TouchableOpacity>
         </View>:<View style={{height:280,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
         <View style={{margin:10,flexDirection:"row"}}><Text>{t('accountdetails_currentpassword_lbl')}</Text></View>
         <View style={{margin:10,flexDirection:"row"}}><TextInput secureTextEntry={true} onChangeText={newText => setCurrentPassword(newText)} value={current_password} style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,width:"40%",height:30,paddingStart:3}} /></View>
         <View style={{margin:10,flexDirection:"row"}}><Text>{t('accountdetails_newpassword_lbl')}</Text></View>
         <View style={{margin:10,flexDirection:"row"}}><TextInput secureTextEntry={true} onChangeText={newText => setNewPassword(newText)} value={new_password} style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,width:"40%",height:30,paddingStart:3}} /></View>
         <View style={{margin:10,flexDirection:"row"}}><Text>{t('accountdetails_confirmpassword_lbl')}</Text></View>
         <View style={{margin:10,flexDirection:"row"}}><TextInput secureTextEntry={true} onChangeText={newText => setConfirmPassword(newText)} value={confirm_password} style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,width:"40%",height:30,paddingStart:3}} /></View>
         <TouchableOpacity onPress={()=>{setModePasswordSection(1)}} style={{position:"absolute",right:15,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_cancel_lbl')}</Text></View></TouchableOpacity>
         {!isUserUpdatePasswordLoading && <TouchableOpacity onPress={()=>{updateUserPassword()}} style={{position:"absolute",right:75,top:10,}}><View style={{borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.greenBtnColor,fontSize:12,color:Colors.greenBtnColor}}>{t('common_update_lbl')}</Text></View></TouchableOpacity>}
         {isUserUpdatePasswordLoading && <View style={{position:"absolute",right:75,top:10,borderRadius:3,borderColor:Colors.greenBtnColor,borderWidth:1,width:55,height:30,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>}

         </View>
         }
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('accountdetails_socialmedia_lbl')}</Text></View>
         <View style={{height:110,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
         <TouchableOpacity><View style={{margin:10,borderRadius:3,flexDirection:"row",backgroundColor:"#00A9FF",height:35,width:"55%",justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontFamily:FONT.RobotoSemiBold,fontSize:14}}>{t('accountdetails_linkaccountwith_lbl')} </Text><Text style={{color:"white",fontFamily:FONT.RobotoBold,fontSize:14}}>{t('accountdetails_facebook_lbl')}</Text></View></TouchableOpacity>
         <TouchableOpacity><View style={{margin:10,borderRadius:3,flexDirection:"row",backgroundColor:"white",height:35,width:"55%",justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:"gray"}}><Text style={{color:"gray",fontFamily:FONT.RobotoSemiBold,fontSize:14}}>{t('accountdetails_linkaccountwith_lbl')} </Text><Text style={{color:"gray",fontFamily:FONT.RobotoBold,fontSize:14}}>{t('accountdetails_google_lbl')}</Text></View></TouchableOpacity>
         </View>
      </View>  
    
    </View>}
    {isUserDataLoading && <View style={{ flex: 1,margin:20,justifyContent:"center",alignItems:"center" }}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>
    }
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

export default AccountDetails;