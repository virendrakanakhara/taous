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
  TextInput
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

const HeaderCart = (props)=> {
const {t, i18n} = useTranslation();  
const { lang } = useSelector(state => state.langReducer);  
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(isEnabled => !isEnabled);

const { cart  } = useSelector(state => state.cartReducer);

if (i18n.language != lang) {
    
    
  i18n.changeLanguage(lang);
  
  
}

return (
  <SafeAreaView>
    
    <LinearGradient colors={[Colors.greenBtnColor, Colors.greenBtnColor, Colors.greenBtnColor]} style={{backgroundColor:Colors.greenBtnColor,height:190}}>
   
           
                    
                    <View style={{height:100,justifyContent:"center",alignItems:"center"}}>
                        <Image 
                            style={{aspectRatio:222/55,height:40}}
                            source={require('../assets/images/header_logo.png')}
                            resizeMode="contain"
                            
                            /> 
                      </View>
                    <View style={{height:30,justifyContent:"center",alignItems:"center"}} ><Text style={{color:"white",fontSize:22,fontFamily:FONT.RobotoBold}}>{t('cart_myshoppingcart_lbl')}</Text></View>                           
                    <View style={{height:30,justifyContent:"center",alignItems:"center"}} ><Text style={{color:"white",fontSize:15,fontFamily:FONT.RobotoMedium}}>{t('cart_enjoyshopping_lbl')}</Text></View>
                    {props.showBackBtn && <TouchableOpacity onPress={()=>props.navigation.goBack(null)} style={{position:"absolute",left:0,top:10}}><View style={{flexDirection:"row",height:30,width:80,justifyContent:"center",alignItems:"center"}}>
                    <AntIcon
                                color={"white"}
                                name={lang=='ar'?'right':'left'}
                                size={25}
                                /><Text style={{marginStart:3,fontSize:20,color:"white",fontFamily:FONT.RobotoBold}}>{t('cart_back_lbl')}</Text>
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
export default HeaderCart; 