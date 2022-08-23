import React,{useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  Switch
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors} from '../style/colors';
import {FONT, RobotoRegular} from '../style/fonts'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import { Badge } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';

const CategoryItem = (props)=> {
const {t, i18n} = useTranslation();  
const { lang } = useSelector(state => state.langReducer);  
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(isEnabled => !isEnabled);
if (i18n.language != lang) {
    
    
  i18n.changeLanguage(lang);
  
  
}

return (
  <SafeAreaView>
      <TouchableOpacity onPress={()=>{props.props.navigation.push("PickupAndDelivery",{categoryname:props.item.title})}}><View style={{height:props.height,width:props.width,backgroundColor:props.backgroundColor,marginEnd:props.marginEnd,borderRadius:props.borderRadius,borderWidth:props.borderWidth,borderColor:props.borderColor,marginTop:props.marginTop}}>
          
          <Image source={{uri:props.item.imgUrl}} style={{height:0.8*props.height,width:0.8*props.width,resizeMode:"contain",alignSelf:"center",marginTop:5}} />
          
          
          <Text style={{color:"black",fontSize:12,marginHorizontal:5,textAlign:"center",marginTop:7,fontFamily:FONT.RobotoMedium}}>{props.item.title}</Text>
          
          
          
      </View>
      </TouchableOpacity>  
  </SafeAreaView>
            
      )
};
export default CategoryItem; 