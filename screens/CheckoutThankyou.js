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
  Alert,
  ActivityIndicator
   
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
import FastImage from 'react-native-fast-image'
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import CheckBox from '@react-native-community/checkbox';

import {matchAndFindItemFromArray,getFormattedDatetime,matchAndFindValueFromArray} from '../commonfunctions';
import { NavigationActions, StackActions } from 'react-navigation';



import {FONT} from "../style/fonts"
import { t } from "i18next";

const CheckoutThankyou = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {cart} = useSelector(state=>state.cartReducer);
  const {user} = useSelector(state=>state.userReducer);
  const [OrderId,setOrderId] = useState(props.route.params!=undefined && props.route.params.OrderId!=undefined?props.route.params.OrderId:'');
  const [OrderData,setOrderData] = useState();
  const [orderLoading,setOrderLoading] = useState(false);
  
  const dispatch = useDispatch();
  
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });

  const resetAndGoToHome = ()=>{
    props.navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }]
 })
    //props.navigation.dispatch(resetAction); 
  }

  const clearCartFun = () => dispatch(clearCart());
  useEffect(() => {
    clearCartFun()
    getOrderDetail()
  },[]);  
  
  const getOrderDetail = async () =>{
    setOrderLoading(true);
    try {
      const response = await fetch(APICONFIG.REST_WC_URL+"/orders/"+OrderId,
                                  {
                                    method:"GET",
                                    
                                    headers : {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                      Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                    }
                              });
     
     const json = await response.json();
            
   
       setOrderData(json);
   console.log("orderdata :"+JSON.stringify(json))
     
     
   } catch (error) {
     console.error(error);
     alert(error)
     
   } finally {
     setOrderLoading(false);
   }
   
   
  }
  


  const Item = ({ item }) => (
    
    
    <View style={styles.item}>
      <View style={{flexDirection:"row"}}>
          <View style={{flex:1,alignItems:"center",justifyContent:"center",height:"100%"}}>
              {/*  <Image source={require("../assets/images/p11.png")} style={{height:100,width:undefined,aspectRatio:358/443,alignSelf:"center",marginTop:5}} />   */}
               <FastImage
                  style={{height:100,width:100,alignSelf:"center",marginEnd:20}}
                  source={{
                      uri: item.variation_id==0?"https://beta.taous.ma/product_image.php?pid="+item.product_id:"https://beta.taous.ma/product_image.php?pid="+item.variation_id,
                      
                      priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                /> 
          </View>
          <View style={{flex:3,justifyContent:"center"}}>
               <View style={{flexDirection:"row"}}><Text style={styles.title} numberOfLines={2}>{item.name}</Text><Text style={styles.itemtotal}>{parseFloat(item.quantity*item.price).toFixed(2)} DH</Text></View>
               <Text style={styles.subtitle}>{t('thankyou_price_lbl')}: {item.price} DH</Text>
               {item.meta_data.length > 0 && item.meta_data.map(itm=>{ return <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoBold}}>{itm.display_key}</Text><Text style={{fontFamily:FONT.RobotoRegular}}>: {itm.display_value}</Text></View>})}
               <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10}}>
                    <View style={{height:25,flexDirection:"row",flex:1}}>
                            
                            <View style={{flex:1,justifyContent:"flex-start",alignItems:"flex-start"}} ><Text style={{fontSize:16,color:Colors.greenBtnColor,fontFamily:FONT.RobotoBold}}>x {item.quantity}</Text></View>
                            
                    </View>
                    <View style={{height:25,flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                        
                    </View>
                    
                    
                </View>
          </View>
          
      </View>
    </View>
    
  ); 

 
 


  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <ScrollView style={{marginBottom:80}}>
    <View>
    <View style={{  justifyContent:"center",alignItems:"center",height:100 }}>

            <EntypoIcon name="thumbs-up" color={Colors.drawerHeaderBackground} size={34} />
            <Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:18,marginTop:5,color:Colors.drawerHeaderBackground}}>{t('thankyou_thankyou_lbl')}</Text>
            <Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:Colors.drawerHeaderBackground}}>{t('thankyou_yourorder_lbl')} #{OrderId} {t('thankyou_hasbeenplaced_lbl')}</Text>
 
    </View>
    <View style={{height:1,marginVertical:10,backgroundColor:Colors.commonbg}}></View>
    {orderLoading && <View style={{height:100,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>}
    {!orderLoading && OrderData && <View>
    <View style={{height:35,flex:1,marginHorizontal:10,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:5}}>{t('thankyou_ordersummary_lbl')}</Text></View>  
    <View style={{backgroundColor:"white",flex:1,marginTop:5,marginHorizontal:10,justifyContent:"center"}} >
            <FlatList
                data={OrderData!=undefined && OrderData.line_items!=undefined?OrderData.line_items:[]}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item item={item} />}
               
                />
            </View>
            <View style={{height:1,marginVertical:10,backgroundColor:Colors.commonbg}}></View>
    {matchAndFindValueFromArray(OrderData.meta_data,"pi_delivery_type")=="delivery" && <View style={{height:30,marginVertical:5,marginHorizontal:10,flex:1,flexDirection:"row"}}><View style={{flex:3,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('thankyou_shippingcharge_lbl')}:</Text></View><View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{OrderData.shipping_total} DH</Text></View></View>}
    <View style={{height:30,marginVertical:5,marginHorizontal:10,flex:1,flexDirection:"row"}}><View style={{flex:3,justifyContent:"center",alignItems:"flex-end"}}><Text style={{color:"red",fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('thankyou_coupondiscount_lbl')}:</Text></View><View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{color:"red",fontFamily:FONT.RobotoRegular,textAlign:"left"}}> - 0.00 DH</Text></View></View>
    <View style={{height:30,marginVertical:5,marginHorizontal:10,flex:1,flexDirection:"row"}}><View style={{flex:3,justifyContent:"center",alignItems:"flex-end"}}><Text style={{color:"red",fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('thankyou_giftcarddiscount_lbl')}:</Text></View><View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{color:"red",fontFamily:FONT.RobotoRegular,textAlign:"left"}}>- 0.00 DH</Text></View></View>
    
    <View style={{height:30,marginVertical:5,marginHorizontal:10,flex:1,flexDirection:"row"}}><View style={{flex:3,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoBold,textAlign:"left"}}>{t('thankyou_total_lbl')}:</Text></View><View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoBold,textAlign:"left"}}>{OrderData.total} DH</Text></View></View>
    <View style={{height:1,marginVertical:10,backgroundColor:Colors.commonbg}}></View>
    <View style={{height:35,flex:1,marginHorizontal:10,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:5}}>{t('thankyou_billingaddress_lbl')}</Text></View>          
    <View style={{marginHorizontal:10,marginVertical:10}}>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.billing.first_name+" "+OrderData.billing.last_name}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.billing.address_1}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.billing.address_2}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.billing.city+","+OrderData.billing.state}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.billing.country+"-"+OrderData.billing.postcode}</Text>
    </View>
    {matchAndFindValueFromArray(OrderData.meta_data,"pi_delivery_type")=="delivery" &&
    <>
    <View style={{height:1,marginVertical:10,backgroundColor:Colors.commonbg}}></View>
    <View style={{height:35,flex:1,marginHorizontal:10,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:5}}>{t('thankyou_shippingaddress_lbl')}</Text></View>          
    <View style={{marginHorizontal:10,marginVertical:10}}>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.shipping.first_name+" "+OrderData.shipping.last_name}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.shipping.address_1}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.shipping.address_2}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.shipping.city+","+OrderData.shipping.state}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.shipping.country+"-"+OrderData.shipping.postcode}</Text>
    </View></>}
    {matchAndFindValueFromArray(OrderData.meta_data,"pi_delivery_type")=="pickup" &&
    <>
    <View style={{height:1,marginVertical:10,backgroundColor:Colors.commonbg}}></View>
    <View style={{height:35,flex:1,marginHorizontal:10,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:5}}>{t('thankyou_pickupaddress_lbl')}</Text></View>          
    <View style={{marginHorizontal:10,marginVertical:10}}>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{matchAndFindValueFromArray(OrderData.meta_data,"pickup_location")}</Text>
        </View></>}
    <View style={{height:1,marginVertical:10,backgroundColor:Colors.commonbg}}></View>  
    <View style={{height:35,flex:1,marginHorizontal:10,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:5}}>{t('thankyou_shippingmethod_lbl')}</Text></View>          
    <View style={{marginHorizontal:10,marginVertical:10}}>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{t('thankyou_method_lbl')} : {OrderData.shipping_lines[0].method_title}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{t('thankyou_shippingcharge_lbl')} : {OrderData.shipping_lines[0].total} DH</Text>
       
    </View> 
    <View style={{height:1,marginVertical:10,backgroundColor:Colors.commonbg}}></View>  
    <View style={{height:35,flex:1,marginHorizontal:10,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:5}}>{t('thankyou_paymentmethod_lbl')}</Text></View>          
    <View style={{marginHorizontal:10,marginVertical:10}}>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{t('thankyou_method_lbl')} : {OrderData.payment_method_title}</Text>
       
       
    </View>

    <View style={{height:1,marginVertical:10,backgroundColor:Colors.commonbg}}></View>  
    <View style={{height:35,flex:1,marginHorizontal:10,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:5}}>{t('thankyou_datetimefor_lbl')} {matchAndFindValueFromArray(OrderData.meta_data,"pi_delivery_type")}</Text></View>          
    <View style={{marginHorizontal:10,marginVertical:10}}>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{t('thankyou_date_lbl')} : {matchAndFindValueFromArray(OrderData.meta_data,"pi_delivery_date")}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{t('thankyou_time_lbl')} : {matchAndFindValueFromArray(OrderData.meta_data,"pi_delivery_time")}</Text>
       
    </View>   

    <View style={{height:1,marginVertical:10,backgroundColor:Colors.commonbg}}></View>  
   <View style={{height:35,flex:1,marginHorizontal:10,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:5}}>{t('thankyou_ordernote_lbl')}</Text></View>          
    <View style={{marginHorizontal:10,marginVertical:10}}>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{OrderData.customer_note==""?"-NA-":OrderData.customer_note}</Text>
       
       
    </View>  

    </View>}
    </View>
    </ScrollView>
    <TouchableOpacity onPress={()=>resetAndGoToHome()} style={{position:"absolute",bottom:20,left:0,backgroundColor:"white",width:"100%",height:35}}><View style={{flex:1,marginHorizontal:10,backgroundColor:"white",borderWidth:1,borderColor:Colors.greenBtnColor,borderRadius:5,height:35,justifyContent:"center",alignItems:"center"}}><Text style={{color:Colors.greenBtnColor,fontFamily:FONT.RobotoBold}}>{t('thankyou_done_lbl')}</Text></View></TouchableOpacity>
   
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
  itemSelected: {
    backgroundColor: "#ecf3da",
    
    marginVertical: 2,
    
    borderWidth:0,
    borderRadius:10,
    borderColor:Colors.drawerHeaderBackground,
    height:230,
    width:"48%",
    marginStart:5
    
  },
  itemDate: {
    backgroundColor: Colors.commonbg,
    
    marginVertical: 2,
    
    borderWidth:0,
    borderRadius:10,
    borderColor:Colors.commonbg,
    height:80,
    width:"32%",
    marginStart:5
    
  },
  itemDateSelected: {
    backgroundColor: "#ecf3da",
    
    marginVertical: 2,
    
    borderWidth:0,
    borderRadius:10,
    borderColor:Colors.drawerHeaderBackground,
    height:80,
    width:"32%",
    marginStart:5
    
  },
  itemTime: {
    backgroundColor: Colors.commonbg,
    
    marginVertical: 2,
    
    borderWidth:0,
    borderRadius:10,
    borderColor:Colors.commonbg,
    height:40,
    width:"19%",
    marginStart:5
    
  },
  itemTimeSelected: {
    backgroundColor: "#ecf3da",
    
    marginVertical: 2,
    
    borderWidth:0,
    borderRadius:10,
    borderColor:Colors.drawerHeaderBackground,
    height:40,
    width:"19%",
    marginStart:5
    
  },
  header: {
    fontSize: 16,
    color:Colors.greenBtnColor,
    
    
    
    
    fontFamily:FONT.RobotoBold,
    
    
  },
  title: {
    flex:3,  
    fontSize: 14,
    color:"black",
    fontFamily:FONT.RobotoMedium,
    marginEnd:15,textAlign:"left"
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
    fontFamily:FONT.RobotoBold,textAlign:"left"
  },
  prize: {
    fontSize: 14,
    color:Colors.greenBtnColor,
    
    fontFamily:FONT.RobotoBold    
  }
  
});

export default CheckoutThankyou;