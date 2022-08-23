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
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const OrderProgressLine = (props)=> {
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
    
    <View style={{height:props.height,width:windowWidth*props.width,justifyContent:"center",alignItems:"center"}}>
    <View style={{height:2,backgroundColor:Colors.greenBtnColor,width:"100%"}}></View>
    <View style={{position:"absolute",height:8,width:"100%",top:6,left:0,flexDirection:"row"}}>
      <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{height:10,width:10,borderRadius:5,backgroundColor:Colors.greenBtnColor}}></View></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{height:10,width:10,borderRadius:5,backgroundColor:Colors.greenBtnColor}}></View></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{height:10,width:10,borderRadius:5,backgroundColor:Colors.greenBtnColor}}></View></View>
      <View style={{flex:0.1,justifyContent:"center",alignItems:"flex-end"}}><View style={{height:10,width:10,borderRadius:5,backgroundColor:Colors.greenBtnColor}}></View></View>
      
    </View>
    <View style={{position:"absolute",height:20,width:"100%",top:18,left:0,flexDirection:"row"}}>
      <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontFamily:FONT.RobotoRegular,color:"gray",fontSize:14}}>{t('orderprogress_placed_lbl')}</Text></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontFamily:FONT.RobotoRegular,color:"gray",fontSize:14}}>{t('orderprogress_preparing_lbl')}</Text></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,color:"gray",fontSize:14,marginStart:18}}>{t('orderprogress_ontheway_lbl')}</Text></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoBold,color:"gray",fontSize:14}}>{t('orderprogress_delivered_lbl')}</Text></View>
      
    </View>
  </View>
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
export default OrderProgressLine; 