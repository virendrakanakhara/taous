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
import { signinSuccess} from '../redux/actions';  
import { APICONFIG } from "../config/api";
import { showMessage, hideMessage } from "react-native-flash-message";
import { t } from "i18next";

const Register = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();

  const [mobile,setMobile] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  

  
  const setUser = user => dispatch(signinSuccess(user));
  const handleUserLogin = user => {
    setUser(user);
  };


  const handleSignup = () =>{
    if(mobile.length ==0)
    {
      //alert("Please enter Email/Username or Mobile number !!");
      showMessage({
        message: "Invalid",
        description:"Please enter Mobile number !!",
        type: "error",
        backgroundColor: "red",
        
      });
    }
    else if(email.length ==0)
    {
      //alert("Please enter Email/Username or Mobile number !!");
      showMessage({
        message: "Invalid",
        description:"Please enter Email address !!",
        type: "error",
        backgroundColor: "red",
        
      });
    }
    else if(password.length == 0)
    {
      //alert("Please enter Password !!")
      showMessage({
        message:"Invalid",
        description: "Please enter Password !!",
        type: "error",
        backgroundColor:"red"
      });
    }
    else
    {
      setLoading(true);
      //login request
      fetch(APICONFIG.API_URL+"/auth/sign-up", {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password,
              mobile:mobile,
              username:email.substring(0, email.lastIndexOf("@"))
            })
          }).then((response) => response.json())
          .then((json) => {
           
            if(json.data != null)
            {
              
              handleUserLogin(json.data);
              showMessage({
                message:"Success",
                description: "You are signed up successfully !!",
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
                message:"Invalid",
                description: json.message,
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
              message:"Invalid",
                description: "Invalid credentials please try again !!",
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
      
    <Text style={{color:"black",fontSize:14,marginTop:15,fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('signup_mobilenumber_lbl')} *</Text>
    <TextInput style={{color:"black",fontSize:16,marginTop:10,marginVertical:10,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,borderRadius:5,fontFamily:FONT.RobotoMedium}} value={mobile}  onChangeText={newText => setMobile(newText)}  />
    <Text style={{color:"black",fontSize:14,marginTop:5,fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('signup_email_lbl')}*</Text>
    <TextInput style={{marginTop:10,color:"black",fontSize:16,marginVertical:10,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,borderRadius:5,fontFamily:FONT.RobotoMedium}} value={email}  onChangeText={newText => setEmail(newText)}  />
    
    <Text style={{color:"black",fontSize:14,marginTop:5,fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('signup_password_lbl')}*</Text>
    <TextInput secureTextEntry={true} style={{marginTop:10,color:"black",fontSize:16,marginVertical:10,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,borderRadius:5,fontFamily:FONT.RobotoMedium}} value={password}  onChangeText={newText => setPassword(newText)} />
    <Text style={{color:"black",fontSize:14,marginTop:10,fontFamily:FONT.RobotoMedium,textAlign:"left"}}>{t('signup_notetext_lbl')}</Text> 
    {!loading && <TouchableOpacity style={{marginTop:20}} onPress={()=> handleSignup()}><View style={{height:35,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center",borderRadius:5}}><Text style={{color:"white",fontSize:16,fontFamily:FONT.RobotoBold}}>{t('signup_register_lbl')}</Text></View></TouchableOpacity>}
    {loading && <View style={{height:35,marginTop:20,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center",borderRadius:5}}><ActivityIndicator size="small" color="white" /></View>}
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

export default Register;