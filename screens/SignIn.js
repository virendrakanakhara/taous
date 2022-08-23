import React,{ useEffect,useState } from "react";
import { View, 
  Button, 
  Text,
  TextInput, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator 
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
import { signinSuccess} from '../redux/actions';  
import { showMessage, hideMessage } from "react-native-flash-message";
import {useTranslation} from 'react-i18next';
import { t } from "i18next";
const SignIn = (props) => {
  const {t, i18n} = useTranslation();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();

  
  const setUser = user => dispatch(signinSuccess(user));
  const handleUserLogin = user => {
    setUser(user);
  };

  const handleSignIn = () =>{
    if(email.length ==0)
    {
      //alert("Please enter Email/Username or Mobile number !!");
      showMessage({
        message: t('common_invalid_lbl'),
        description:t('common_emailmobileorusername_lbl'),
        type: "error",
        backgroundColor: "red",
        
      });
    }
    else if(password.length == 0)
    {
      //alert("Please enter Password !!")
      showMessage({
        message:t('common_invalid_lbl'),
        description: t('common_enterpassword_lbl'),
        type: "error",
        backgroundColor:"red"
      });
    }
    else
    {
      setLoading(true);
      //login request
      fetch(APICONFIG.API_URL+"/auth/sign-in", {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: email,
              password: password,
            })
          }).then((response) => response.json())
          .then((json) => {
           
            if(json.data != null)
            {
              
              handleUserLogin(json.data);
              showMessage({
                message:t('common_success_lbl'),
                description: t('common_loggedinsuccessmsg_lbl'),
                type: "success",
                backgroundColor:Colors.lightGreen1,
                color:"white"
              });
              props.navigation.goBack(null);
              props.navigation.navigate("User",{screen:"MyAccount"})
              
            }
            else
            {
              handleUserLogin({});
              //alert("Invalid credentials please try again !!");
              showMessage({
                message:t('common_invalid_lbl'),
                description: t('common_invalidcredentials_lbl'),
                type: "error",
                backgroundColor:"red"
              });
            }
            setLoading(false)
          })
          .catch((error) => {
            alert(error);
            handleUserLogin({});
            showMessage({
              message:t('common_invalid_lbl'),
                description: t('common_invalidcredentials_lbl'),
                type: "error",
                backgroundColor:"red"
            });
            setLoading(false)
          });


    }
  }
  

  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      
    <Text style={{color:"black",fontSize:14,marginTop:15,fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('signin_mobileusernameemail_lbl')}*</Text>
    <TextInput style={{color:"black",fontSize:16,marginTop:10,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,borderRadius:5,fontFamily:FONT.RobotoMedium}} value={email}  onChangeText={newText => setEmail(newText)}  />
    <Text style={{color:"black",fontSize:14,marginTop:5,fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('signin_password_lbl')}*</Text>
    <TextInput secureTextEntry={true} style={{marginTop:10,color:"black",fontSize:16,marginVertical:10,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,borderRadius:5,fontFamily:FONT.RobotoMedium}} value={password}  onChangeText={newText => setPassword(newText)} />
    {!loading && <TouchableOpacity style={{marginTop:10}} onPress={()=> handleSignIn()}><View style={{height:35,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center",borderRadius:5}}><Text style={{color:"white",fontWeight:"bold",fontSize:16,fontFamily:FONT.RobotoMedium}}>{t('signin_login_lbl')}</Text></View></TouchableOpacity>}
    {loading && <View style={{height:35,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center",borderRadius:5,marginTop:10}}><ActivityIndicator size="small" color="white" /></View>}
    <TouchableOpacity style={{marginTop:20}} onPress={()=>{props.navigation.navigate("ResetPassword")}}><Text style={{color:Colors.greenBtnColor,fontSize:14,fontFamily:FONT.RobotoMedium,textAlign:"left"}}>{t('signin_lostpass_lbl')}</Text></TouchableOpacity>
    <TouchableOpacity style={{marginTop:10}} onPress={()=>{props.navigation.navigate("Register")}}><Text style={{color:Colors.greenBtnColor,fontSize:14,fontFamily:FONT.RobotoMedium,textAlign:"left"}}>{t('signin_newcustomer_lbl')}</Text></TouchableOpacity>
    </View>
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

export default SignIn;