import React,{ useEffect,useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  SectionList,
  TextInput,
  Alert 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { getBooks, UPDATE_CART_CHARGES } from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "../style/colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import LinearGradient from 'react-native-linear-gradient';
import { addToCart,clearCart,addQtyToCart,minusQtyToCart,removeFromCart,setCartCharges} from '../redux/actions';  
import FastImage from 'react-native-fast-image';
import { t } from "i18next";

import {FONT} from "../style/fonts"
import { ActivityIndicator } from "react-native-paper";
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
const Cart = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {cart} = useSelector(state=>state.cartReducer);
  const {user} = useSelector(state=>state.userReducer);
  //const {cartCharges} = useSelector(state=>state.cartChargesReducer);
  const dispatch = useDispatch();
  //const [DATAFINAL,SetDATAFINAL] = useState([]);
  const [couponCode,setCouponCode] = useState('');
  const [couponId,setCouponId] = useState(0);
  const [couponDiscount,setCouponDiscount] = useState(0);
  const [isCouponFetchLoading,setCouponFetchLoading] = useState(false);
  const [couponInput,setCouponInput] = useState("");
  const [SubTotal,setSubTotal] = useState(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.variation_item.price)).toFixed(2),0));
  const [Total,SetTotal] = useState(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.variation_item.price)).toFixed(2),50));
 

  
  const addQtyToCartFun = product => dispatch(addQtyToCart(product));
  const handleAddQtyToCart = product =>{
      addQtyToCartFun(product);
   }
  const minusQtyToCartFun = product => dispatch(minusQtyToCart(product));
  const handleMinusQtyToCart = product =>{
      minusQtyToCartFun(product);
  } 

  const removeFromCartFun = product => dispatch(removeFromCart(product));
  const handleRemoveFromCart = product =>{
      //removeFromCartFun(product);
      Alert.alert(
        t('cart_areyousure_lbl'),
        t('cart_sureremoveitem_lbl'),
        [
      
          {
            text: t('common_yes_lbl'),
            onPress: () => {
              removeFromCartFun(product);
              
              
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: t('common_no_lbl'),
          },
        ]
      );
  } 

  const clearCartFun = () => dispatch(clearCart());
  const handleClearCart = () => {
      
      Alert.alert(
        t('cart_areyousure_lbl'),
        t('cart_sureemptycart_lbl'),
        [
      
          {
            text: t('common_yes_lbl'),
            onPress: () => {
              clearCartFun();
              
              //SetDATAFINAL([]);///clear final data array
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: t('common_no_lbl'),
          },
        ]
      );
  }


//const updateCartCharges = newdetails => dispatch(setCartCharges(newdetails))

  useEffect(() => {
     //updateCartCharges({})  
     
     setSubTotal(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.variation_item.price)).toFixed(2),0));
     SetTotal(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.variation_item.price)).toFixed(2),50));
     
  },[cart]);

  
  


  var radio_props = [
    {label: '', value: 0 }
  ];

  const Item = ({ item }) => (
    
    
    <View style={styles.item}>
      <View style={{flexDirection:"row"}}>
          <View style={{flex:1,alignItems:"center",justifyContent:"center",height:"100%"}}>
              {/*  <Image source={require("../assets/images/p11.png")} style={{height:100,width:undefined,aspectRatio:358/443,alignSelf:"center",marginTop:5}} />   */}
               <FastImage
                  style={{height:100,width:100,alignSelf:"center",marginEnd:20}}
                  source={{
                      uri: "https://beta.taous.ma/product_image.php?pid="+item.product.variation_id,
                      
                      priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                /> 
          </View>
          <View style={{flex:3,justifyContent:"center"}}>
               <View style={{flexDirection:"row"}}><Text style={styles.title} numberOfLines={2}>{item.product.full_item.name}</Text><Text style={styles.itemtotal}>{parseFloat(item.qty*item.product.variation_item.price).toFixed(2)} DH</Text></View>
               <Text style={styles.subtitle}>{t('cart_price_lbl')}: {item.product.variation_item.price} DH</Text>
               {item.product.full_item.type=="variable" && item.product.variation_item.attributes.map(itm=>{ return <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoBold}}>{itm.name}</Text><Text style={{fontFamily:FONT.RobotoRegular}}>: {itm.option}</Text></View>})}
               <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10}}>
                    <View style={{height:25,flexDirection:"row",flex:1}}>
                            <TouchableOpacity onPress={()=>handleMinusQtyToCart(item.product)} style={{flex:1}} ><View style={{flex:1,backgroundColor:Colors.greenBtnColor,borderTopStartRadius:15,borderBottomStartRadius:15,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:16,color:"white",fontFamily:FONT.RobotoBold}}>-</Text></View></TouchableOpacity>
                            <View style={{flex:1,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}} ><Text style={{fontSize:16,color:Colors.greenBtnColor,fontFamily:FONT.RobotoBold}}>{item.qty}</Text></View>
                            <TouchableOpacity onPress={()=>handleAddQtyToCart(item.product)} style={{flex:1}} ><View style={{flex:1,backgroundColor:Colors.greenBtnColor,borderTopEndRadius:15,borderBottomEndRadius:15,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:16,color:"white",fontFamily:FONT.RobotoBold}}>+</Text></View></TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={()=>handleRemoveFromCart(item.product)} style={{flex:1}}><View style={{height:25,flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                        <EntypoIcon
                        color="gray"
                        name='circle-with-cross'
                        size={18}
                        /><Text style={{color:"gray",fontSize:16,marginStart:5,fontFamily:FONT.RobotoBold,marginEnd:5}}>{t('cart_remove_lbl')}</Text>
                    </View>
                    </TouchableOpacity>
                    
                </View>
                {/* {item.product.full_item.type=="variable" && <Text style={{marginTop:10}}>{item.product.variation_item.attributes.map(itm=>{ return itm.name+" : "+itm.option+"\n"})}</Text>} */}
                
          </View>
          
      </View>
    </View>
    
  ); 
  //let subtotal = cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.product.full_item.price)).toFixed(2),0);
  //let total = cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.product.full_item.price)).toFixed(2),50);

  const processCheckout = () => {

    if(Object.keys(user).length > 0)
    {
       props.navigation.navigate("CheckoutReviewOrder",{"CouponDiscount":couponDiscount,"CouponId":couponId,"CouponCode":couponCode});
    }
    else
    {

      props.navigation.navigate("User");
    }

  }

  const checkAndApplyCoupon = async() =>{

    if(couponInput.length == 0)
    {
      alert("Please enter coupon code !!")
    }
    else
    {
      setCouponFetchLoading(true);
      try {
      const response = await fetch(APICONFIG.API_URL+"/get_coupon_by_code?cc="+couponInput,
                                  {
                                    method:"GET",
                                    
                                    headers : {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                      Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                    }
                              });
     
     const json = await response.json();
     //alert(JSON.stringify(json))
     
    if(json.errors && json.errors.rest_forbidden)
    {
      alert("Please specify valid coupon code !!")
      setCouponDiscount(0);
      setCouponCode('');
      setCouponId(0);
    }
    else
    {
      let amount =  json.amount;
      let discount_type = json.discount_type;
      if(discount_type=="percent")
      {
        setCouponDiscount(parseFloat(amount*SubTotal/100).toFixed(2));
      }
      else
      {
        setCouponDiscount(parseFloat(amount).toFixed(2));
      }
      setCouponId(json.id);
      setCouponCode(json.code);


    }
     
     
   } catch (error) {
     console.error(error);
     alert(error)
     
   } finally {
    setCouponFetchLoading(false);
   }
    }
  }

  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    {cart.length > 0 && <ScrollView>
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold,textAlign:"left"}}>{t('cart_itemsinyourcart_lbl')} ({cart.length})</Text>
            </View> 
            <View style={{backgroundColor:"white",width:"100%",marginTop:5,justifyContent:"center"}} >
            <FlatList
                data={cart}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item item={item} />}
               
                />
            </View>  
            <View style={{backgroundColor:"white",height:40,width:"100%",marginTop:15,justifyContent:"center",alignItems:"flex-end"}}>
                <TouchableOpacity onPress={()=>handleClearCart()}><View style={{backgroundColor:"white",borderWidth:1,borderRadius:5,borderColor:Colors.greenBtnColor}}><Text style={{padding:10,color:Colors.greenBtnColor,fontFamily:FONT.RobotoBold}}>{t('cart_emptycart_lbl')}</Text></View></TouchableOpacity>
            </View>
            {couponDiscount > 0 && <View style={{backgroundColor:Colors.commonbg,height:50,width:"100%",marginTop:10,justifyContent:"flex-start",alignItems:"center",flexDirection:"row"}}>
                <Text style={{fontSize:14,fontFamily:FONT.RobotoMedium,paddingStart:12}}>Coupon Applied : {couponInput}</Text>
                <TouchableOpacity onPress={()=>setCouponDiscount(0)}><View style={{height:30,justifyContent:"center",alignItems:"center"}}><Text style={{color:"blue",fontSize:14,fontFamily:FONT.RobotoMedium,padding:5}}>( Remove Coupon )</Text></View></TouchableOpacity>
                
            </View>}
            {couponDiscount==0 && <View style={{backgroundColor:Colors.commonbg,height:50,width:"100%",marginTop:10,justifyContent:"flex-start",alignItems:"center",flexDirection:"row"}}>
                <TextInput style={{padding:1,marginStart:10,height:30,width:150,borderWidth:1,borderTopStartRadius:5,borderBottomStartRadius:5,borderColor:"gray",backgroundColor:"white"}} value={couponInput} onChangeText={setCouponInput} placeholder={t('cart_couponcode_lbl')} />
                {!isCouponFetchLoading && <TouchableOpacity onPress={()=>checkAndApplyCoupon()}><View style={{height:30,backgroundColor:Colors.greenBtnColor,width:130,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:14,fontFamily:FONT.RobotoMedium,padding:5}}>{t('cart_applycoupon_lbl')}</Text></View></TouchableOpacity>}
                {isCouponFetchLoading && <View style={{height:30,backgroundColor:Colors.greenBtnColor,width:130,justifyContent:"center",alignItems:"center"}}><ActivityIndicator color="white" size={"small"} /></View>}
            </View> }
            <View style={{backgroundColor:Colors.commonbg,height:50,width:"100%",marginTop:10,justifyContent:"flex-start",alignItems:"center",flexDirection:"row"}}>
                <TextInput style={{padding:1,marginStart:10,height:30,width:150,borderWidth:1,borderTopStartRadius:5,borderBottomStartRadius:5,borderColor:"gray",backgroundColor:"white"}}  placeholder={t('cart_giftcode_lbl')} />
                <View style={{height:30,backgroundColor:Colors.greenBtnColor,width:130,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:14,fontFamily:FONT.RobotoMedium}}>{t('cart_usegiftcode_lbl')}</Text></View>
            </View> 

             <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"black",fontFamily:FONT.RobotoBold}}>{t('cart_ordersummary_lbl')}</Text></View>
                <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{padding:10,color:Colors.greenBtnColor,fontFamily:FONT.RobotoBold}}></Text></View>
            </View> 
            <View style={{backgroundColor:"#ecf3da",height:360,width:"100%"}}>
                    {couponDiscount > 0 && <View style={{height:40,width:"100%",marginTop:15,justifyContent:"center",alignItems:"center",flexDirection:"row",borderBottomColor:Colors.commonbg,borderBottomWidth:1}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"red",fontSize:18,fontFamily:FONT.RobotoMedium}}>Coupon Discount</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{padding:10,color:"red",fontSize:18,fontFamily:FONT.RobotoMedium}}>- {couponDiscount} DH</Text></View>
                    </View>} 
                    <View style={{height:40,width:"100%",marginTop:15,justifyContent:"center",alignItems:"center",flexDirection:"row",borderBottomColor:Colors.commonbg,borderBottomWidth:1}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"black",fontSize:18,fontFamily:FONT.RobotoMedium}}>{t('cart_subtotal_lbl')}</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{padding:10,color:"black",fontSize:18,fontFamily:FONT.RobotoMedium}}>{SubTotal} DH</Text></View>
                    </View> 
                    <View style={{width:"100%",marginTop:15,justifyContent:"center",alignItems:"center",flexDirection:"row",borderBottomColor:Colors.commonbg,borderBottomWidth:1}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"black",fontSize:16,fontFamily:FONT.RobotoMedium}}>{t('cart_shipping_lbl')}</Text></View>
                        <View style={{flex:1,justifyContent:"flex-end",alignItems:"center",flexDirection:"row"}}>
                        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={(value) => {}}
          
         
        />
                             <Text style={{padding:10,color:"black",fontSize:18,fontFamily:FONT.RobotoMedium}}>{t('cart_shippingnote_lbl')}</Text></View>
                    </View> 
                    {/* <View style={{height:40,width:"100%",marginTop:15,justifyContent:"center",alignItems:"flex-end"}}>
                        <TouchableOpacity><View style={{borderWidth:1,borderRadius:5,borderColor:Colors.greenBtnColor,flexDirection:"row",justifyContent:"center",alignItems:"center",padding:5}}>
                        <FontAwesomeIcon
                name="truck"
                size={20}
                color={Colors.greenBtnColor}
             />
                            <Text style={{marginStart:5,color:Colors.greenBtnColor,fontFamily:FONT.RobotoBold}}>Calculate Shipping</Text></View></TouchableOpacity>
                    </View> */}

                    <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:10,color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{t('cart_total_lbl')}</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{paddingEnd:10,color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{parseFloat(Total-couponDiscount).toFixed(2)} DH</Text></View>
                    </View>
                    <TouchableOpacity onPress={()=>{processCheckout()}} style={{flex:1,height:40}}><View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",borderRadius:10,backgroundColor:Colors.drawerHeaderBackground}}>
                       <Text style={{color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{t('cart_checkout_lbl')}</Text></View>
                        
                    
                    </TouchableOpacity>
            </View>         

    </View>
    </ScrollView>}
    {cart.length==0 &&
         <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <AntIcon
                        color={Colors.lightGreen1}
                        name='shoppingcart'
                        size={100}
                        />
           <Text style={{fontSize:20,marginTop:10,fontFamily:FONT.RobotoBold,color:Colors.lightGreen1,textAlign:"center"}}>{t('cart_yourshoppingcartisempty_lbl')}</Text>
           <Text style={{fontSize:16,marginTop:4,fontFamily:FONT.RobotoSemiBold,color:Colors.lightGreen1,textAlign:"center"}}>{t('cart_tryaddingsomeitemtocart_lbl')}</Text>
            <TouchableOpacity onPress={()=>props.navigation.goBack(null)} style={{marginTop:20}}><View style={{width:160,height:40,borderRadius:10,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:14,fontFamily:FONT.RobotoSemiBold,color:"white"}}>{t('cart_continueshopping_lbl')}</Text></View></TouchableOpacity> 
         </View>

    }
    {/*cart.length > 0 && <LinearGradient colors={[Colors.greenBtnColor, Colors.greenBtnColor, Colors.greenBtnColor]}  style={{height:70,width:"100%",position:"absolute",bottom:0,left:0,flexDirection:"row"}}>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:22,fontFamily:FONT.RobotoSemiBold}}>Total</Text><Text style={{color:"white",fontSize:20  ,fontFamily:FONT.RobotoRegular}}>1200 D.H</Text></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><TouchableOpacity onPress={()=>props.navigation.goBack(null)}><View style={{width:160,height:40,borderRadius:10,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:14,fontFamily:FONT.RobotoSemiBold,color:"white"}}>Next</Text></View></TouchableOpacity></View>
  </LinearGradient>*/}
  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: "white",
    
    marginVertical: 2,
    
    borderTopWidth:1,
    
    borderTopColor:Colors.commonbg,
    height:150
    
  },
  header: {
    fontSize: 20,
    color:"gray",
    
    paddingStart:5,
    height:30,
    fontFamily:FONT.RobotoBold
    
  },
  title: {
    flex:3,  
    fontSize: 14,
    color:"black",
    fontFamily:FONT.RobotoMedium,
    marginEnd:15,
    textAlign:"left"
  },
  itemtotal:{
      flex:1,
      fontSize:14,
      color:Colors.greenBtnColor,
      fontFamily:FONT.RobotoBold,
      textAlign:"right",
      marginEnd:5
  },
  subtitle: {
    fontSize: 14,
    color:"black",
    fontFamily:FONT.RobotoBold,
    textAlign:"left"
  },
  prize: {
    fontSize: 14,
    color:Colors.greenBtnColor,
    
    fontFamily:FONT.RobotoBold    
  }
  
});

export default Cart;