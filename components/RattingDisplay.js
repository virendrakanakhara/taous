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
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors} from '../style/colors';
import {FONT} from '../style/fonts'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import { Badge } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import { addToCart} from '../redux/actions';  
import { Item } from 'react-native-paper/lib/typescript/components/List/List';

const RatingDisplay = (props)=> {
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
  
          <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginHorizontal:3,marginVertical:props.marginvertical?props.marginvertical:10}}>
          <EntypoIcon
              color='black'
              name={props.value>=1?'star':'star-outlined'}
              size={15}
            /> 
         <EntypoIcon
              color='black'
              name={props.value>=2?'star':'star-outlined'}
              size={15}
            />   
            <EntypoIcon
              color='black'
              name={props.value>=3?'star':'star-outlined'}
              size={15}
            /> 
           <EntypoIcon
              color='black'
              name={props.value>=4?'star':'star-outlined'}
              size={15}
            /> 
            <EntypoIcon
              color='black'
              name={props.value>=5?'star':'star-outlined'}
              size={15}
            />  
                      
          </View>
         
            
      )
};
export default RatingDisplay; 