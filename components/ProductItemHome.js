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

const ProductItemHome = (props)=> {
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
      <TouchableOpacity onPress={()=>{props.props.navigation.push("ProductDetail")}}><View style={{height:props.height,width:props.width,backgroundColor:props.backgroundColor,marginEnd:props.marginEnd,borderRadius:props.borderRadius,borderWidth:props.borderWidth,borderColor:props.borderColor,marginTop:props.marginTop}}>
          
          <Image source={require("../assets/images/p11.png")} style={{height:props.height/2,width:props.width/2,resizeMode:"contain",alignSelf:"center",marginTop:5}} />
          <View style={{height:20,width:45,position:"absolute",top:0,start:0,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:12,fontFamily:FONT.RobotoSemiBold}}>-22 %</Text></View>
          <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginHorizontal:3,marginVertical:3}}>
          <AntIcon
              color='#FBD67F'
              name='star'
              size={15}
            />  
            <AntIcon
              color='#FBD67F'
              name='star'
              size={15}
            />  
            <AntIcon
              color='#FBD67F'
              name='star'
              size={15}
            />  
            <AntIcon
              color='#FBD67F'
              name='star'
              size={15}
            />  
            <AntIcon
              color='#FBD67F'
              name='star'
              size={15}
            />           
          </View>
          <Text style={{color:"black",fontWeight:"bold",fontSize:11,marginHorizontal:5,fontFamily:FONT.RobotoBold,marginVertical:7}}>Fire-Boltt Blast 1400 Over -Ear Bluetooth Wireless Headphones</Text>
          <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginHorizontal:3,marginVertical:3}}>
            <Text style={{color:"#EE2500",textDecorationLine: 'line-through', textDecorationStyle: 'solid',fontFamily:FONT.RobotoBold}}>4,999 DH</Text><Text style={{color:"black",fontFamily:FONT.RobotoBold}}> 2,999 DH</Text>
          </View>
          <TouchableOpacity onPress={()=>handleAddToCart(props.item)}><View style={{height:25,borderRadius:5,justifyContent:"center",alignItems:"center",backgroundColor:Colors.drawerHeaderBackground,flexDirection:"row",marginHorizontal:3,marginVertical:3}}>
            
            <AntIcon
              color="white"
              name='shoppingcart'
              size={20}
            /><Text style={{color:"white",fontSize:10,marginStart:5,fontFamily:FONT.RobotoBold}}>ADD TO CART</Text>
            
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>props.addToWishlist(props.item)}><View style={{height:25,borderRadius:5,justifyContent:"center",alignItems:"center",backgroundColor:Colors.greenBtnColor,flexDirection:"row",marginHorizontal:3,marginVertical:3}}>
            
            <AntIcon
              color="white"
              name='hearto'
              size={20}
            /><Text style={{color:"white",fontSize:10,marginStart:5,fontFamily:FONT.RobotoBold}}>ADD TO WISHLIST</Text>
            
          </View>
          </TouchableOpacity>
      </View>
      </TouchableOpacity>  
  </SafeAreaView>
            
      )
};
export default ProductItemHome; 