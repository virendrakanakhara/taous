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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { Badge } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import { addToCart} from '../redux/actions';  
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import RatingDisplay from './RattingDisplay';
import { ActivityIndicator } from 'react-native-paper';
import FastImage from 'react-native-fast-image'
import {chekProductExistsInWishlist} from '../commonfunctions';
import RenderHtml from 'react-native-render-html';

const SearchProductItem = (props)=> {
const {t, i18n} = useTranslation();  
const { lang } = useSelector(state => state.langReducer);  
const {wishlist} = useSelector(state=>state.wishlistReducer);
const {user} = useSelector(state=>state.userReducer);
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(isEnabled => !isEnabled);
const dispatch = useDispatch();
const addToCartFun = product => dispatch(addToCart(product));
const handleAddToCart = product =>{
  
  let productitem = {"id":product.id,"full_item":product,"variation_id":product.id,"variation_item":product};
  addToCartFun(productitem);
 }
if (i18n.language != lang) {
    
    
  i18n.changeLanguage(lang);
  
  
}
const handleAddTocartClick = product => {
  if(product.type=='simple')
  {
    handleAddToCart(product)
  }
  else
  {
    props.props.navigation.navigate("Home",{screen:"ProductDetail",params:{"ProductId":product.id}});
  }
}
const handleAddToWishlist = (item) => {
  if(Object.keys(user).length > 0)
  {
    props.addToWishlist(item);
  }
  else
  {
    Alert.alert(t('common_attention_lbl'),t('common_mustsigntoadditemwishlist_lbl'))
  }
}


return (
  <SafeAreaView>
      <TouchableOpacity onPress={()=>props.props.navigation.navigate("Home",{screen:"ProductDetail",params:{"ProductId":props.item.id}})} ><View style={{height:props.height,width:props.width,backgroundColor:props.backgroundColor,marginEnd:props.marginEnd,borderRadius:props.borderRadius,borderWidth:props.borderWidth,borderColor:props.borderColor,marginTop:props.marginTop}}>
          
          {/* {props.item!=null && props.item.images!=null && props.item.images[0].src !=null? <Image defaultSource={require("../assets/images/spinnergif.gif")} source={{uri:props.item.images[0].src}}  style={{height:props.height/2,width:props.width/2,resizeMode:"contain",alignSelf:"center",marginTop:5}} />:<Image source={require("../assets/images/p11.png")} style={{height:props.height/2,width:props.width/2,resizeMode:"contain",alignSelf:"center",marginTop:5}} />} */}
          {props.item!=null && props.item.images!=null && props.item.images[0].src !=null && <FastImage
            style={{height:props.height/2,width:props.width/2,marginTop:5,alignSelf:"center"}}
            source={{
                
                uri: "https://beta.taous.ma/product_image.php?pid="+props.item.id,
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />}
          {props.item!=undefined && props.item.type=='simple' && <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginHorizontal:3,marginVertical:3}}>
            <Text style={{color:"black", fontFamily:FONT.RobotoBold}}>{props.item.price} DH</Text><Text style={{color:"black",fontFamily:FONT.RobotoLight,textDecorationLine:"line-through",fontSize:14}} > {props.item.regular_price} DH</Text>{/*:<Text style={{color:"black",fontFamily:FONT.RobotoLight}}> 25dh/ea</Text>*/}
          </View>}
          {props.item!=undefined && props.item.type=='variable' && <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginHorizontal:3,marginVertical:3}}>
          <RenderHtml
    contentWidth={"100%"}
    source={{html:props.item.price_html}}
  />
          </View>}
          <Text style={{color:"black",fontSize:11,marginHorizontal:5,fontFamily:FONT.RobotoRegular,marginVertical:7,height:44,textAlign:"left"}} numberOfLines={3}>{props.item.name}</Text>
          <RatingDisplay value={props.item.average_rating}  />
          <View style={{height:0.5,width:"100%",backgroundColor:Colors.commonbg}}></View>
          <TouchableOpacity onPress={()=>{handleAddTocartClick(props.item);}} style={{position:"absolute",left:0,top:props.height/2-35}} ><View style={{height:30,width:65,borderRadius:10,justifyContent:"center",alignItems:"center",backgroundColor:Colors.greenBtnColor,flexDirection:"row",marginHorizontal:3,marginVertical:3}}>
            
            <AntIcon
              color="white"
              name='plus'
              size={14}
            /><Text style={{color:"white",fontSize:14,marginStart:5,fontFamily:FONT.RobotoBold}}>{t('common_add_lbl')}</Text>
            
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{handleAddToWishlist(props.item)}} style={{position:"absolute",right:0,top:0}} ><View style={{height:30,width:30,justifyContent:"center",alignItems:"center",marginHorizontal:3,marginVertical:3}}>
            
            <FontAwesomeIcon
              color="black"
              name={chekProductExistsInWishlist(wishlist,props.item.id)?'heart':'heart-o'}
              size={20}
            />
           
          </View>
          </TouchableOpacity>
          
          
      </View>
      </TouchableOpacity>  
  </SafeAreaView>
            
      )
};
export default SearchProductItem; 