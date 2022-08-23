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
import FastImage from 'react-native-fast-image'

const PurchasedProductItem = (props)=> {
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
      <TouchableOpacity /*onPress={()=>props.props.navigation.navigate("ProductDetail",{ProductId:props.item.product_id})} */ ><View style={{height:props.height,width:props.width,backgroundColor:props.backgroundColor,marginEnd:props.marginEnd,borderRadius:props.borderRadius,borderWidth:props.borderWidth,borderColor:props.borderColor,marginTop:props.marginTop}}>
          
           {/* <Image source={{uri:"https://beta.taous.ma/product_image.php?pid="+props.item.product_id}} defaultSource={require("../assets/images/spinnergif.gif")} style={{height:props.height,width:props.width,resizeMode:"contain",alignSelf:"center",marginTop:5}} />  */}
          
           <FastImage
            style={{height:props.height,width:props.width,alignSelf:"center",marginTop:5}}
            source={{
                uri: props.item.variation_id==0?"https://beta.taous.ma/product_image.php?pid="+props.item.product_id:"https://beta.taous.ma/product_image.php?pid="+props.item.variation_id,
                
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          {props.item.quantity > 1 && <View style={{height:20,width:20,borderRadius:10,borderWidth:1,borderColor:"black",position:"absolute",right:0,top:0,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:10}}>{props.item.quantity}</Text></View>}
          
          
          
          
          
      </View>
      </TouchableOpacity>  
  </SafeAreaView>
            
      )
};
export default PurchasedProductItem; 