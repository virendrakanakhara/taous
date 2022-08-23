import React,{useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  Switch,
  StatusBar,
  TextInput,
  Alert
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {Colors} from '../style/colors';
import {RobotoRegular} from '../style/fonts'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import { Badge } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FONT} from "../style/fonts";
import LinearGradient from 'react-native-linear-gradient';
import {getFormattedDatetime} from '../commonfunctions';
import { signinSuccess,setWishlist} from '../redux/actions';  
import { showMessage, hideMessage } from "react-native-flash-message";

const HeaderMyAccount = (props)=> {
const {t, i18n} = useTranslation();  
const { lang } = useSelector(state => state.langReducer);  
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(isEnabled => !isEnabled);

const { cart  } = useSelector(state => state.cartReducer);
const { user } = useSelector(state=> state.userReducer);

if (i18n.language != lang) {
    
    
  i18n.changeLanguage(lang);
  
  
}
const dispatch = useDispatch();

  
const setUser = user => dispatch(signinSuccess(user));
const changeWishlist = wishlistdata => dispatch(setWishlist(wishlistdata));
const handleUserLogin = user => {
  setUser(user);
  
  
};
const postLogoutFun = () => {
  handleUserLogin({});
  changeWishlist([]);
  showMessage({
    message:t('common_success_lbl'),
    description: t('common_logoutmessage_lbl'),
    type: "success",
    backgroundColor:Colors.lightGreen1,
    color:"white"
  });
  props.navigation.navigate("Home")
}
const handleSignOut = () =>{
   
  Alert.alert(
    t('common_confirm_lbl'),
    t('common_confirmlogout_lbl'),
    [
      {
        text: t('common_no_lbl'),
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: t('common_yes_lbl'), onPress: () => postLogoutFun() }
    ]
  )
    
            //handleUserLogin({});
            //postLogoutFun();
            
          


  
}

return (
  <SafeAreaView>
    
    <LinearGradient colors={[Colors.greenBtnColor, Colors.greenBtnColor, Colors.greenBtnColor]} style={{backgroundColor:Colors.greenBtnColor,height:200}}>
   
           
                    
                    <View style={{height:100,justifyContent:"center",alignItems:"center"}}>
                        <Image 
                            style={{aspectRatio:222/55,height:50}}
                            source={require('../assets/images/header_logo.png')}
                            resizeMode="contain"
                            
                            /> 
                      </View>
                      {Object.keys(user).length > 0 && <View style={{height:30,justifyContent:"center",alignItems:"center"}} ><Text style={{color:"white",fontSize:22,fontFamily:FONT.RobotoBold}}>{t('header_hi_lbl')}, {user.display_name}</Text></View> }                          
                      {Object.keys(user).length > 0 && <View style={{height:30,justifyContent:"center",alignItems:"center"}} ><Text style={{color:"white",fontSize:15,fontFamily:FONT.RobotoMedium}}>{t('header_thankyoumembersince_lbl')} {getFormattedDatetime(user.user_registered,'MMM YYYY')}</Text></View>}
                    <TouchableOpacity onPress={()=> handleSignOut()}><View style={{height:30,justifyContent:"center",alignItems:"center",backgroundColor:Colors.lightGreen1,width:"40%",borderRadius:10,alignSelf:"center",marginVertical:5}} ><Text style={{color:"white",fontSize:15,fontFamily:FONT.RobotoMedium}}>{t('header_logout_lbl')}</Text></View></TouchableOpacity>
                    {props.showBackBtn && <TouchableOpacity onPress={()=>props.navigation.goBack(null)} style={{position:"absolute",left:0,top:10}}><View style={{flexDirection:"row",height:30,width:80,justifyContent:"center",alignItems:"center"}}>
                    <AntIcon
                                color={"white"}
                                name={lang=='ar'?'right':'left'}
                                size={25}
                                /><Text style={{marginStart:3,fontSize:20,color:"white",fontFamily:FONT.RobotoRegular}}>Back</Text>
                      </View></TouchableOpacity>}  

                      
            
            
            
           
            </LinearGradient>
            </SafeAreaView>
            
      )
};
const styles = StyleSheet.create({
input: {
  height: 40,
  margin: 2,
  
  padding: 2,
  fontFamily:FONT.RobotoMedium
},
});
export default HeaderMyAccount; 