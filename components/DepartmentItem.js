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

const DepartmentItem = (props)=> {
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
      <TouchableOpacity onPress={()=>props.props.navigation.push("Search",{CatId:props.item.id,CatName:props.item.name})} ><View style={{height:props.height,width:props.width,backgroundColor:props.backgroundColor,marginEnd:props.marginEnd,borderRadius:props.borderRadius,borderWidth:props.borderWidth,borderColor:props.borderColor,marginTop:props.marginTop,justifyContent:"center",alignItems:"center"}}>
          
      <View style={{justifyContent:"flex-start",width:"100%"}}><Text style={{marginStart:10,marginTop:5,fontFamily:FONT.RobotoSemiBold,textAlign:"left"}} numberOfLines={2}>{props.item.name.replace("&amp;","&")}</Text></View>
      <View style={{flex:3,width:"100%",justifyContent:"center"}}>
       {props.item.image!=null && 
       
       <FastImage
            style={{height:2*props.height/3,width:2*props.width/3,alignSelf:"center"}}
            source={{
                uri: props.item.image.src,
                
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
       
       }
       {props.item.image==null && 
       <FastImage
       style={{height:2*props.height/3,width:2*props.width/3,alignSelf:"center"}}
       source={
        require('../assets/images/no_image_icon.png')
           
           
       }
       resizeMode={FastImage.resizeMode.contain}
     />}
       
      </View>
          
          
          
          
          
          
      </View>
      </TouchableOpacity>
      
  </SafeAreaView>
            
      )
};
export default DepartmentItem; 