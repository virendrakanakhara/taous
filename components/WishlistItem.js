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
  Alert
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
import RatingDisplay from './RattingDisplay';
import { ActivityIndicator } from 'react-native-paper';
import FastImage from 'react-native-fast-image'

const WishlistItem = (props)=> {
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
const delfun = (wishlistitem) => {
  props.deleteItem(wishlistitem);
}

const movefun = (wishlistitem) => {
  props.moveItem(wishlistitem);
}

return (
  
      <View style={{width:"100%",height:90,marginTop:20,flexDirection:"row"}} >
          <View style={{flex:1,height:"100%",justifyContent:"center",alignItems:"center"}}>
          <FastImage
            style={{height:"90%",width:"90%"}}
            source={{
                uri: "https://beta.taous.ma/product_image.php?pid="+props.item.id,
                
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
            {/* <Image defaultSource={require("../assets/images/spinnergif.gif")} source={{uri:"https://beta.taous.ma/product_image.php?pid="+props.item.id}}  style={{height:"90%",width:"90%",resizeMode:"contain",alignSelf:"center"}} /> */}
          </View>
          <View style={{flex:3,height:"100%"}}>
          <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginHorizontal:3,marginVertical:3}}>
            <Text style={{color:"black", fontFamily:FONT.RobotoBold}}>{props.item.price} DH</Text><Text style={{color:"black",fontFamily:FONT.RobotoLight,textDecorationLine:"line-through",fontSize:14}} > {props.item.regular_price} DH</Text>{/*:<Text style={{color:"black",fontFamily:FONT.RobotoLight}}> 25dh/ea</Text>*/}
          </View>
          <Text style={{color:"black",fontSize:11,marginHorizontal:2,fontFamily:FONT.RobotoRegular,marginVertical:7,width:"80%",textAlign:"left"}} numberOfLines={2}>{props.item.name}</Text>
          <RatingDisplay value={props.item.average_rating} marginvertical={5}  />
          </View>
          <TouchableOpacity onPress={()=>{delfun(props.item)}}><View style={{position:"absolute",right:55,bottom:0,height:30,width:30,justifyContent:"center",alignItems:"center"}}><AntIcon name='delete' size={25} color={Colors.greenBtnColor} /></View></TouchableOpacity>
          <TouchableOpacity onPress={()=>{movefun(props.item)}} ><View style={{position:"absolute",right:15,bottom:0,height:30,width:30,justifyContent:"center",alignItems:"center"}}><FeatherIcon name='move' size={25} color={Colors.greenBtnColor} /></View></TouchableOpacity>
      </View>
      
  
            
      )
};
export default WishlistItem; 