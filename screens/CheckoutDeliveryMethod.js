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
  ActivityIndicator,
   
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

import {FONT} from "../style/fonts"
import Collapsible from 'react-native-collapsible';
import { t } from "i18next";

const CheckoutDeliveryMethod = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {cart} = useSelector(state=>state.cartReducer);
  const {user} = useSelector(state=>state.userReducer);
  const {lang} = useSelector(state=>state.langReducer);
  //const {cartCharges} = useSelector(state=>state.cartChargesReducer);
  const dispatch = useDispatch();
  //const [DATAFINAL,SetDATAFINAL] = useState([]);
  const [SubTotal,setSubTotal] = useState(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.full_item.price)).toFixed(2),0));
  const [Total,SetTotal] = useState(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.full_item.price)).toFixed(2),50));
  const [CouponDiscount,setCouponDiscount] = useState(props.route.params!=undefined && props.route.params.CouponDiscount!=null?props.route.params.CouponDiscount:0); 
  const [couponId,setCouponId] = useState(props.route.params!=undefined && props.route.params.CouponId!=null?props.route.params.CouponId:0);
  const [couponCode,setCouponCode] = useState(props.route.params!=undefined && props.route.params.CouponCode!=null?props.route.params.CouponCode:''); 
  const [locations,setLocations] = useState([]);
  const [deliveryOrPickupId,setDeliveryOrPickupId] = useState(-1);
  
  const [deliveryType,setDeliveryType] = useState("");
  const [dataTimeSlots,setDataTimeSlots] = useState({"delivery_times":[],"pickup_times":[]});
  const [deliveryOrPickupDate,setDeliveryOrPickupDate] = useState('');
  const [deliveryOrPickupDateItem,setDeliveryOrPickupDateItem] = useState();
  const [deliveryOrPickupTime,setDeliveryOrPickupTime] = useState('');
  const [dateLoading,setDateLoading] = useState(false);
  const [isCollapsed,setCollapsed] = useState(true);
  const [BillingAddressId,setBillingAddressId] = useState(0);
  const [BillingAddressItem,setBillingAddressItem] = useState(0);

  

  
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
        "Are your sure?",
        "Are you sure you want to remove this item fromm your shopping cart?",
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

  const checkDeliveryOrPickup = (value) =>
  {
    
    return user.addresses.profile_addresses.some(item=>item.id==value);
  }
  const clearCartFun = () => dispatch(clearCart());
  const handleClearCart = () => {
      
      Alert.alert(
        "Are your sure?",
        "Are you sure you want to clear your shopping cart?",
        [
      
          {
            text: "Yes",
            onPress: () => {
              clearCartFun();
              
              //SetDATAFINAL([]);///clear final data array
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
  }


//const updateCartCharges = newdetails => dispatch(setCartCharges(newdetails))

  useEffect(() => {
     setSubTotal(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.full_item.price)).toFixed(2),0));
     SetTotal(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.full_item.price)).toFixed(2),50));
     setLocations([{title:t('deliverymethod_delivery_lbl'),data:[{list:user.addresses.profile_addresses}]},{title:t('deliverymethod_pickup_lbl'),data:[{list:user.addresses.pickup_locations}]}])
     setDeliveryOrPickupId(user.addresses.additional_fields!=undefined?user.addresses.additional_fields.cf_user_preferred_dp_address:-1);
     setBillingAddressId(user.addresses.profile_addresses.length>0?user.addresses.profile_addresses[0].id:undefined);
     setBillingAddressItem(user.addresses.profile_addresses.length>0?user.addresses.profile_addresses[0]:undefined);
     getTimeSlots();
     setDeliveryType(checkDeliveryOrPickup(user.addresses.additional_fields.cf_user_preferred_dp_address)?'Delivery':'Pickup')
  },[cart]);

  
  


  

  
  //let subtotal = cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.product.full_item.price)).toFixed(2),0);
  //let total = cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.product.full_item.price)).toFixed(2),50);
  const setDeliveryTypeFun = (item) => {

    if(item.addr==undefined)
    {
      setDeliveryType('Delivery')
      
    }
    else
    {
      setDeliveryType('Pickup')
    }
    setDeliveryOrPickupDate('');
      setDeliveryOrPickupDateItem();
      setDeliveryOrPickupTime('');

  }
  const Item = ({ item }) => (
    <FlatList
        data={item.list}
        numColumns={2}
        renderItem={renderListItem}
        
      />
  );

  const renderBillingListItem = ({ item }) => {
    if(item.id==BillingAddressId)
    {
      return (
        <TouchableOpacity onPress={()=>{setBillingAddressId(item.id);setBillingAddressItem(item)}} style={styles.itemSelected}><View >
          <View><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:16,margin:10,textAlign:"left"}}>{item.title}</Text></View>
          {item.first_name!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.first_name+" "+item.last_name}</Text></View>}
        {item.company!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.company}</Text></View>}
        {item.address_1!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.address_1}</Text></View>}
        {item.address_2!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.address_2}</Text></View>}
        {item.city!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.city+","+item.state+" - "+item.postcode}</Text></View>}
        
        {item.country!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.country}</Text></View>}
        

        </View>
        </TouchableOpacity>
      )
    }
    else
    {
    return (
      <TouchableOpacity onPress={()=>{setBillingAddressId(item.id);setBillingAddressItem(item)}} style={styles.item}><View >
        <View><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:16,margin:10,textAlign:"left"}}>{item.title}</Text></View>
          {item.first_name!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.first_name+" "+item.last_name}</Text></View>}
        {item.company!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.company}</Text></View>}
        {item.address_1!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.address_1}</Text></View>}
        {item.address_2!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.address_2}</Text></View>}
        {item.city!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.city+","+item.state+" - "+item.postcode}</Text></View>}
        
        {item.country!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.country}</Text></View>}
        

        
        
      </View>
      </TouchableOpacity>
    )
    }
  }


  const renderListItem = ({ item }) => {
    if(item.id==deliveryOrPickupId)
    {
      return (
        <TouchableOpacity onPress={()=>{setDeliveryOrPickupId(item.id);setDeliveryTypeFun(item)}} style={styles.itemSelected}><View >
          <View><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:16,margin:10,textAlign:"left"}}>{item.title}</Text></View>
          {item.first_name!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.first_name+" "+item.last_name}</Text></View>}
        {item.company!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.company}</Text></View>}
        {item.address_1!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.address_1}</Text></View>}
        {item.address_2!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.address_2}</Text></View>}
        {item.city!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.city+","+item.state+" - "+item.postcode}</Text></View>}
        
        {item.country!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.country}</Text></View>}
        {item.addr!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.addr}</Text></View>}

        </View>
        </TouchableOpacity>
      )
    }
    else
    {
    return (
      <TouchableOpacity onPress={()=>{setDeliveryOrPickupId(item.id);setDeliveryTypeFun(item)}} style={styles.item}><View >
        <View><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:16,margin:10,textAlign:"left"}}>{item.title}</Text></View>
          {item.first_name!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.first_name+" "+item.last_name}</Text></View>}
        {item.company!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.company}</Text></View>}
        {item.address_1!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.address_1}</Text></View>}
        {item.address_2!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.address_2}</Text></View>}
        {item.city!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.city+","+item.state+" - "+item.postcode}</Text></View>}
        
        {item.country!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.country}</Text></View>}
        {item.addr!=undefined && <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.addr}</Text></View>}

        
        
      </View>
      </TouchableOpacity>
    )
    }
  }

  const renderDateListItem = ({ item }) => {
    if(item.dt==deliveryOrPickupDate)
    {
      return (
        <TouchableOpacity onPress={()=>{setDeliveryOrPickupDate(item.dt);setDeliveryOrPickupDateItem(item)}} style={styles.itemDateSelected}><View >
          <View><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:16,margin:10,textAlign:"left"}}>{item.dt}</Text></View>
          <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.weekday}</Text></View>
        

        </View>
        </TouchableOpacity>
      )
    }
    else
    {
    return (
      <TouchableOpacity onPress={()=>{setDeliveryOrPickupDate(item.dt);setDeliveryOrPickupDateItem(item)}} style={styles.itemDate}><View >
       <View><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:16,margin:10,textAlign:"left"}}>{item.dt}</Text></View>
          <View><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginHorizontal:10,marginVertical:2,textAlign:"left"}}>{item.weekday}</Text></View>
        

        
        
      </View>
      </TouchableOpacity>
    )
    }
  }


  const renderTimeListItem = ({ item }) => {
    if(item.id==deliveryOrPickupTime)
    {
      return (
        <TouchableOpacity onPress={()=>setDeliveryOrPickupTime(item.id)} style={styles.itemTimeSelected}><View >
          <View><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,margin:10,textAlign:"left"}}>{item.text}</Text></View>
          
        

        </View>
        </TouchableOpacity>
      )
    }
    else
    {
    return (
      <TouchableOpacity onPress={()=>setDeliveryOrPickupTime(item.id)} style={styles.itemTime}><View >
       <View><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,margin:10,textAlign:"left"}}>{item.text}</Text></View>
         
        

        
        
      </View>
      </TouchableOpacity>
    )
    }
  }

  const getTimeSlots = async () => {
    
    setDateLoading(true);
      try {
      const response = await fetch(APICONFIG.REST_WC_URL+"/user_profile_timings",
                                  {
                                    method:"POST",
                                    
                                    headers : {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                      Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                    }
                              });
     
     const json = await response.json();
  
     
     
    setDataTimeSlots(json);
     
     
   } catch (error) {
     console.error(error);
     alert(error)
     
   } finally {
    setDateLoading(false);
   }
   
  }

  const processCheckout = () =>{
    if(BillingAddressId == undefined || BillingAddressId=='')
    {
        alert(t('deliverymethod_plzselectbillingaddress_lbl'))
    }
    else if(deliveryOrPickupId==undefined || deliveryOrPickupId==-1 || deliveryOrPickupId=='' || deliveryOrPickupId==0)
    {
        alert(t('deliverymethod_plzselectdeliverymethod_lbl'))
    }
    else if(deliveryOrPickupDate==undefined || deliveryOrPickupDate=='')
    {
        alert(t('deliverymethod_plzselectpreffereddate_lbl'))
    }
    else if(deliveryOrPickupTime==undefined || deliveryOrPickupTime=='')
    {
        alert(t('deliverymethod_plzselectprefferedtime_lbl'))
    }
    else 
    {
        props.navigation.navigate('CheckoutPayment',{Preffered_Address_Id:deliveryOrPickupId,Billing_Address_Id:BillingAddressItem,Preffered_Address_Date:deliveryOrPickupDate,Preffered_Address_Time:deliveryOrPickupTime,Delivery_Type:deliveryType,"CouponDiscount":CouponDiscount,"CouponId":couponId,"CouponCode":couponCode})
    }
  }

  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    {cart.length > 0 && <ScrollView>
    <View style={{ flex: 1, paddingHorizontal: 10 }}>

    <View style={{backgroundColor:"#ecf3da",height:60,width:"100%",marginTop:15}}>
                   
                    
                    {/* <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>Sub Total</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>{SubTotal} DH</Text></View>
                    </View>
                    <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>Shipping Charge</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>50 DH</Text></View>
                    </View> 

                   <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                       <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:10,color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>Total</Text></View>
                       <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{paddingEnd:10,color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{Total} DH</Text></View>
                   </View> */}
                   <TouchableOpacity onPress={()=>processCheckout()} style={{flex:1,height:40}}><View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",borderRadius:10,backgroundColor:Colors.drawerHeaderBackground}}>
                      <Text style={{color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{t('deliverymethod_next_lbl')}</Text></View>
                       
                   
                   </TouchableOpacity>
           </View>
           <TouchableOpacity onPress={()=>setCollapsed(!isCollapsed)}><View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,flexDirection:"row",justifyContent:"center"}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:10,fontFamily:FONT.RobotoBold}}>{t('deliverymethod_selectbillingaddress_lbl')}:</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end",marginEnd:5}}><AntIcon name={isCollapsed?lang=="ar"?"left":"right":"down"} size={20} color="black" /></View>
                        
            </View> 
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                    <View style={{backgroundColor:"white",width:"100%",marginTop:15,justifyContent:"center"}}>
                    {user.addresses.profile_addresses.length>0?<FlatList
                        data={user!=undefined && user.addresses!=undefined && user.addresses.profile_addresses!=undefined?user.addresses.profile_addresses:[]}
                        numColumns={2}
                        renderItem={renderBillingListItem}
                        
                    />:
                    <View style={{width:"100%",height:100,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{width:"75%",textAlign:"center",fontSize:14,fontFamily:FONT.RobotoRegular}}>You haven't addeded any address to your profile.</Text>
                        <TouchableOpacity><Text style={{marginTop:10,width:"75%",textAlign:"center",fontSize:14,fontFamily:FONT.RobotoBold,color:Colors.greenBtnColor}}>ADD NEW ADDRESS</Text></TouchableOpacity>
                    </View>
                    }
                    </View> 
            </Collapsible>  
            <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold,textAlign:"left"}}>{t('deliverymethod_selectdeliverytype_lbl')}:</Text>
            </View> 
            <View style={{backgroundColor:"white",width:"100%",marginTop:5,flexDirection: 'row', flexWrap: 'wrap'}} >
            <SectionList
      sections={locations}
      numColumns={2}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item item={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View style={{marginHorizontal:10,height:50,justifyContent:"center",alignItems:"center"}}><Text style={styles.header}>{title}</Text></View>
      )}
    />
            </View>  
            
            <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold,textAlign:"left"}}>{deliveryType=='Delivery'?t('deliverymethod_selectdeliverydatelbl_lbl'):t('deliverymothod_selectpickupdatelbl_lbl')}</Text>
            </View>
            
           {!dateLoading && <View style={{backgroundColor:"white",width:"100%",marginTop:5,flexDirection: 'row', flexWrap: 'wrap'}} >
            {deliveryType=='Delivery' && <FlatList
        data={dataTimeSlots.delivery_times}
        numColumns={3}
        renderItem={renderDateListItem}
        
      />}

{deliveryType=='Pickup' && <FlatList
        data={dataTimeSlots.delivery_times}
        numColumns={3}
        renderItem={renderDateListItem}
        
      />}
            </View>}

            {dateLoading && <View style={{backgroundColor:"white",width:"100%",marginTop:5,height:60,justifyContent:"center",alignItems:"center"}} >
              <ActivityIndicator size={"small"} color={Colors.greenBtnColor} />
              </View>}

            <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold,textAlign:"left"}}>{deliveryType=='Delivery'?t('deliverymothod_selectdeliverytimelbl_lbl'):t('deliverymothod_selectpickuptimelbl_lbl')}</Text>
            </View>
            
            <View style={{backgroundColor:"white",height:100,width:"100%",marginTop:5,flexDirection: 'row', flexWrap: 'wrap'}} >
            {deliveryType=='Delivery' && deliveryOrPickupDateItem!=undefined && <FlatList
        data={deliveryOrPickupDateItem.tm}
        numColumns={5}
        renderItem={renderTimeListItem}
        
      />}

{deliveryType=='Pickup' && deliveryOrPickupDateItem!=undefined && <FlatList
        data={deliveryOrPickupDateItem.tm}
        numColumns={5}
        renderItem={renderTimeListItem}
        
      />}

      {(deliveryOrPickupDate==undefined || deliveryOrPickupDate=='') && 
      <View style={{height:100,width:"100%",justifyContent:"center",alignItems:"center"}}><Text >{t('deliverymethod_selectdeliverydate_lbl')}</Text></View>
      }
            </View> 
            
                     

    </View>
    </ScrollView>}
   
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
    backgroundColor: Colors.commonbg,
    
    marginVertical: 2,
    
    borderWidth:0,
    borderRadius:10,
    borderColor:Colors.commonbg,
    height:230,
    width:"48%",
    marginStart:5
    
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
    marginEnd:15
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
    fontFamily:FONT.RobotoBold
  },
  prize: {
    fontSize: 14,
    color:Colors.greenBtnColor,
    
    fontFamily:FONT.RobotoBold    
  }
  
});

export default CheckoutDeliveryMethod;