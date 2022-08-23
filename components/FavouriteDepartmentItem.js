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
import {FONT} from '../style/fonts'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import { Badge } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import { addToCart} from '../redux/actions';  
import FastImage from 'react-native-fast-image'
import RenderHtml from 'react-native-render-html';

const FavouriteDepartmentItem = (props)=> {
const {t, i18n} = useTranslation();  
const { lang } = useSelector(state => state.langReducer);  
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(isEnabled => !isEnabled);
const dispatch = useDispatch();
const addToCartFun = product => dispatch(addToCart(product));
const handleAddToCart = product =>{
    addToCartFun(product);
 }
if (i18n.language != lang) {
    
    
  i18n.changeLanguage(lang);
  
  
}

return (
  <SafeAreaView>
      <TouchableOpacity onPress={()=>props.props.navigation.navigate("Search",{screen:"Search",params:{CatId:props.item.term_id,CatName:props.item.name.replace("&amp;","&")}}) }><View style={{height:props.height,width:props.width,backgroundColor:props.backgroundColor,marginEnd:props.marginEnd,borderRadius:props.borderRadius,borderWidth:props.borderWidth,borderColor:props.borderColor,marginTop:props.marginTop,justifyContent:"center",alignItems:"center"}}>
          
          {/* <Image source={{uri:props.item.images}} style={{height:props.height-20,width:props.width-20,resizeMode:"contain",alignSelf:"center"}} /> */}
          <FastImage
            style={{height:props.height-20,width:props.width-20}}
            source={{
                uri: props.item.images,
                
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={{marginTop:5,fontFamily:FONT.RobotoSemiBold}}>{props.item.name.replace("&amp;","&")}</Text>
          
          
          
          
          
      </View>
      </TouchableOpacity>
      
  </SafeAreaView>
            
      )
};
export default FavouriteDepartmentItem; 