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
import { showMessage, hideMessage } from "react-native-flash-message";
import { t } from "i18next";

const ResetPassword = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();
  const [email,setEmail] = useState('');
  const [loading,setLoading] = useState(false);

  
  const handleResetpassword = () => {

    if(email.length ==0)
    {
      //alert("Please enter Email/Username or Mobile number !!");
      showMessage({
        message: "Invalid",
        description:"Please enter Email address !!",
        type: "error",
        backgroundColor: "red",
        
      });
    }
    else
    {
      setLoading(true);
      //login request
      fetch(APICONFIG.API_URL+"/auth/forgot-password", {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              
            })
          }).then((response) => response.json())
          .then((json) => {
           
            if(json.message != null)
            {
              
              
              showMessage({
                message:"Success",
                description:json.message,
                type: "success",
                backgroundColor:Colors.lightGreen1,
                color:"white"
              });
              
              
            }
            else
            {
              
              showMessage({
                message:"Invalid",
                description: "Some error occured,Please try again after some time !!",
                type: "error",
                backgroundColor:"red"
              });
            }
            setLoading(false)
            setEmail('')
          })
          .catch((error) => {
            alert(error);
            setLoading(false)
          });


    }

  }
  

  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
    <Text style={{color:"black",fontSize:14,marginTop:18,fontFamily:FONT.RobotoMedium,textAlign:"left"}}>{t('resetpassword_notetext_lbl')}</Text> 
    <Text style={{color:"black",fontSize:14,marginTop:15,fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('resetpassword_mobileusernameemail_lbl')}*</Text>
    <TextInput style={{color:"black",fontSize:16,marginTop:10,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,borderRadius:5,fontFamily:FONT.RobotoMedium}} value={email}  onChangeText={newText => setEmail(newText)} />
    
    
    {!loading && <TouchableOpacity style={{marginTop:10}} onPress={()=> handleResetpassword()}><View style={{height:35,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center",borderRadius:5}}><Text style={{color:"white",fontSize:16,fontFamily:FONT.RobotoBold}}>{t('resetpassword_resetpassword_lbl')}</Text></View></TouchableOpacity>}
    {loading && <View style={{height:35,marginTop:10,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center",borderRadius:5}}><ActivityIndicator size="small" color="white" /></View>}

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

export default ResetPassword;