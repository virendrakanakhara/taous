import React,{ useEffect,useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  Modal,
  TextInput,
  SectionList 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { getBooks } from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "../style/colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {FONT} from "../style/fonts";
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import DropdownCardType from "../components/DropdownCardType";
import DropdownThemeType from "../components/DropdownThemeType";
import DropdownAmount from "../components/DropdownAmount";
import FastImage from 'react-native-fast-image'
import Collapsible from 'react-native-collapsible';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {matchAndFindItemFromArray,getFormattedDatetime} from '../commonfunctions';
import { t } from "i18next";




const PurchaseGiftCard = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {user} =  useSelector(state=>state.userReducer);
  const {lang} = useSelector(state=>state.langReducer);
  const dispatch = useDispatch();
  const [modalVisible,setModalVisible] = useState(false);
  const [dataAvailableGiftcard,setDataAvailableGiftCard] = useState();
  const [isLoading,setLoading] = useState(true);
  const [cardTypeValue,setCardTypeValue] = useState();
  const [themeTypeValue,setThemeTypeValue] = useState();
  const [designId,setDesignId] = useState();
  const [amountValue,setAmountValue] = useState();
  const [recipentName,setRecipentName] = useState("");
  const [recipentEmail,setRecipentEmail] = useState("");
  const [senderName,setSenderName] = useState("");
  const [senderMessage,setSenderMessage] = useState("");
  const [recipentList,setRecipentList] = useState([]);
  const [shippingCharge,setShippingCharge] = useState(0);
  const [isCollapsed,setCollapsed] = useState(true);
  const [BillingAddressId,setBillingAddressId] = useState(0);
  const [BillingAddressItem,setBillingAddressItem] = useState(0);
  const [locations,setLocations] = useState([]);
  const [deliveryType,setDeliveryType] = useState("");
  const [dataTimeSlots,setDataTimeSlots] = useState({"delivery_times":[],"pickup_times":[]});
  const [deliveryOrPickupDate,setDeliveryOrPickupDate] = useState('');
  const [deliveryOrPickupDateItem,setDeliveryOrPickupDateItem] = useState();
  const [deliveryOrPickupTime,setDeliveryOrPickupTime] = useState('');
  const [dateLoading,setDateLoading] = useState(false);
  const [deliveryOrPickupId,setDeliveryOrPickupId] = useState(-1);
  const [isAnyPhysicalCard,setPhysicalCard] = useState(false);
  const [storebalance,setStoreBalance] = useState(0);
  const [paymentMethod,setPaymentMethod] = useState(-1);
  const [total,setTotal] = useState(0);
  const [readyToSubmit,setReady] = useState(false);
  const [purchaseLoading,setPurchaseLoading] = useState(false);
  
  
  useEffect(() => {
    fetchBalance();
    getGiftCardToPurchase();
    setBillingAddressId(user.addresses.profile_addresses.length>0?user.addresses.profile_addresses[0].id:undefined);
    setBillingAddressItem(user.addresses.profile_addresses.length>0?user.addresses.profile_addresses[0]:undefined);
    setLocations([{title:"Delivery",data:[{list:user.addresses.profile_addresses}]},{title:"Pickup",data:[{list:user.addresses.pickup_locations}]}])
    setDeliveryOrPickupId(user.addresses.additional_fields!=undefined?user.addresses.additional_fields.cf_user_preferred_dp_address:-1);
    getTimeSlots();
     setDeliveryType(checkDeliveryOrPickup(user.addresses.additional_fields.cf_user_preferred_dp_address)?'Delivery':'Pickup')
  },[]);

  useEffect(() => {
    
    let result = recipentList.filter(item=>item.is_physical==1)
    if(result.length >0)
    {
    setShippingCharge(50);
    setPhysicalCard(true);
    setTotal(recipentList.reduce((previousScore, currentScore, index)=>parseInt(previousScore)+parseInt(currentScore.price), 50));
    }
    else
    {
    setShippingCharge(0);
    setPhysicalCard(false);
    setTotal(recipentList.reduce((previousScore, currentScore, index)=>parseInt(previousScore)+parseInt(currentScore.price), 0));
    }
    
  },[recipentList]);


  useEffect(()=>{

    if(deliveryType=="Pickup" && isAnyPhysicalCard)
    {
    setShippingCharge(0);
    setTotal(recipentList.reduce((previousScore, currentScore, index)=>parseInt(previousScore)+parseInt(currentScore.price), 0));
    }
    else if(deliveryType=="Delivery" && isAnyPhysicalCard)
    {
    setShippingCharge(50);
    setTotal(recipentList.reduce((previousScore, currentScore, index)=>parseInt(previousScore)+parseInt(currentScore.price), 50));
    }
    else if(!isAnyPhysicalCard)
    {
    setShippingCharge(0);
    setTotal(recipentList.reduce((previousScore, currentScore, index)=>parseInt(previousScore)+parseInt(currentScore.price), 0));
    }
    else
    {
    setShippingCharge(0);
    setTotal(recipentList.reduce((previousScore, currentScore, index)=>parseInt(previousScore)+parseInt(currentScore.price), 0));
    }

  },[deliveryType]);

  const fetchBalance = async () => {
   
  
    
    
  
    //setBalanceLoading(true);
     try {
     const response = await fetch(APICONFIG.REST_WC_URL+"/wallet/balance?email="+user.user_email,
                                 {
                                   method:"GET",
                                   
                                   headers : {
                                     Accept: 'application/json',
                                     'Content-Type': 'application/json',
                                     Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                   }
                             });
    
    const json = await response.json();
           
   if(json.errors && json.errors.rest_forbidden)
    {
     alert(json.errors.rest_forbidden)
    
    }
    else
    {
      setStoreBalance(json.balance);
    }
    
    
  } catch (error) {
    console.error(error);
    alert(error)
    
  } finally {
    //setBalanceLoading(false);
  }
  
  
 }

  const checkDeliveryOrPickup = (value) =>
  {
    
    return user.addresses.profile_addresses.some(item=>item.id==value);
  }

  const getGiftCardToPurchase = async () => {
   
  
    
    
  
    setLoading(true);
     try {
     const response = await fetch(APICONFIG.REST_WC_URL+"/get_giftcard_to_purchase?lang="+lang,
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
     alert(json.errors.rest_forbidden)
    
    }
    else
    {
      setDataAvailableGiftCard(json);
    }
    
    
  } catch (error) {
    console.error(error);
    alert(error)
    
  } finally {
   setLoading(false);
  }
  
  
 }

const changeCardTypeValue = (item)=>{
  setCardTypeValue(item);
  setThemeTypeValue();
  setDesignId();
  setAmountValue();

}

const changeThemeTypeValue = (item)=>{
  setThemeTypeValue(item);  
  setDesignId(item.image_id);
  setAmountValue();
  

}

const changeAmountValue = (item)=>{
  setAmountValue(item)

}

const resetRecipent = () =>{
  setCardTypeValue();
  setThemeTypeValue();
  setDesignId();
  setAmountValue();
  setRecipentName();
  setRecipentEmail();
  setSenderName();
  setSenderMessage();
  setModalVisible(false);
}  

const addRecipent = () => {
  if(!cardTypeValue)
  {
    alert("Select card type !!")
  }
  else if(!themeTypeValue)
  {
    alert("Select theme type !!")
  }
  else if(!amountValue)
  {
    alert("Select gift card price !!")
  }
  else if(!recipentName)
  {
    alert("Please enter recipient name !!")
  }
  else if(!recipentEmail)
  {
    alert("Please enter recipient email !!")
  }
  else if(!senderName)
  {
    alert("Please enter your name !!")
  }
  else if(!senderMessage)
  {
    alert("Please enter message !!")
  }
  else
  {
    let newRecipent = {product_id:themeTypeValue.id,themeName:themeTypeValue.name,price:amountValue,is_digital:cardTypeValue.title=="Physical"?"":1,recipients:recipentEmail,sender_name:senderName,recipient_name:recipentName,message:senderMessage,design_type:"template",has_custom_design:1,design:designId,is_physical:cardTypeValue.title=="Physical"?1:"",postdated:""}
    let newRecipentList = [...recipentList,newRecipent];
    setRecipentList(newRecipentList);

  setCardTypeValue();
  setThemeTypeValue();
  setDesignId();
  setAmountValue();
  setRecipentName();
  setRecipentEmail();
  setSenderName();
  setSenderMessage();

    setModalVisible(false);
  }

}
const deleteRecipent = (item) => {

  let newRecipentList = recipentList.filter(itm=> itm!=item);
  setRecipentList(newRecipentList);

  


}  

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

const Item = ({ item }) => (
  <FlatList
      data={item.list}
      numColumns={2}
      renderItem={renderListItem}
      
    />
);
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
        <View><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,margin:10}}>{item.text}</Text></View>
        
      

      </View>
      </TouchableOpacity>
    )
  }
  else
  {
  return (
    <TouchableOpacity onPress={()=>setDeliveryOrPickupTime(item.id)} style={styles.itemTime}><View >
     <View><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,margin:10}}>{item.text}</Text></View>
       
      

      
      
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
const placeOrder = async () => {
  if(recipentList.length > 0)
  {
    if(isAnyPhysicalCard)
    {
        if(deliveryOrPickupId == -1)
        {
          alert("Please select Delivery or Pickup location !!")
        }
        else if(deliveryOrPickupDate == '')
        {
          alert("Please select preffered delivery or pickup date !!")
        }
        else if(deliveryOrPickupTime == '')
        {
          alert("Please select preffered delivery or pickup time !!")
        }
        else if(paymentMethod == -1)
        {
          alert("Please select payment method !!")
        }
        else if(paymentMethod == 1 && storebalance < total)
        {
          alert("You do not have enough balance to place order !!")
        }
        else
        {
          setPurchaseLoading(true);
              let order_data = {
                               payment_method:paymentMethod==0?"COD":"wallet",
                               payment_method_title:paymentMethod==0?"Cash on delivery":"Store Credit Payment", 
                               set_paid:true,
                               customer_id:user.ID,
                               products:recipentList
                               }


                      try {
                        const response = await fetch(APICONFIG.REST_WC_URL+"/purchase_giftcard",
                                                    {
                                                      method:"POST",
                                                      body:JSON.stringify(order_data),
                                                      headers : {
                                                        Accept: 'application/json',
                                                        'Content-Type': 'application/json',
                                                        Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                                      }
                                                });
                      
                      const json = await response.json();
                      console.log("purchase card response :"+JSON.stringify(json))
                              
                      if(json.errors && json.errors.rest_forbidden)
                      {
                        alert("something went wrong !!")
                      
                      }
                      else
                      {
                        //alert("Gift card purchased successfully !!")
                        setRecipentList([]);
                        setPaymentMethod(-1);
                        //props.navigation.goBack(null)

                        let order_id = json.order_id;
                        let meta_data = [];

                          let display_date = getFormattedDatetime(deliveryOrPickupDate,"MMM DD,YYYY")
                  

                          meta_data.push({"key":"pi_delivery_date","value":display_date});
                          meta_data.push({"key":"pi_system_delivery_date","value":deliveryOrPickupDate});
                          meta_data.push({"key":"pi_delivery_time","value":deliveryOrPickupTime});
                          meta_data.push({"key":"pi_delivery_type","value":deliveryType.toLowerCase()});
                          if(deliveryType=='Pickup')
                          {
                          let pickup_location_item = matchAndFindItemFromArray(user.addresses.pickup_locations,deliveryOrPickupId);  
                          meta_data.push({"key":"pickup_location_id","value":deliveryOrPickupId});
                          meta_data.push({"key":"pickup_location","value":pickup_location_item.addr});

                          } 
                          let shipping_item;
                          let shipping_lines = [];  
                          if(deliveryType=="Delivery")
                          {
                              shipping_item = matchAndFindItemFromArray(user.addresses.profile_addresses,deliveryOrPickupId);
                              shipping_lines.push({
                                method_id: "flat_rate",
                                method_title: "Flat Rate",
                                total: "50.00"
                              })
                          }
                          
                                              //update order meta data
                                  try {
                                    const response = await fetch(APICONFIG.REST_WC_URL+"/orders/"+order_id,
                                                          {
                                                            method:"PUT",
                                                            body:JSON.stringify({meta_data:meta_data,customer_id:user.ID,shipping:shipping_item,shipping_lines:shipping_lines}),
                                                            headers : {
                                                              Accept: 'application/json',
                                                              'Content-Type': 'application/json',
                                                              Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                                            }
                                                      });
                              
                                  const json = await response.json();
                                  if(json.id && json.id > 0)
                                  {
                                      alert("Gift card purchased successfully !!")
                        
                                      props.navigation.goBack(null)
                                  }
                                  else
                                  {
                                    alert(json.errors.rest_forbidden)
                                  }

                                  }
                                  catch (error) {
                                    console.error(error);
                                    alert(error)
                                  }
                                  finally {
                                    
                                  }


                      }
                      
                      
                    } catch (error) {
                      console.error(error);
                      alert(error)
                      
                    } finally {
                      setPurchaseLoading(false)
                    }
        }
    }
    else
    {
        if(paymentMethod == -1)
        {
          alert("Please select payment method !!")
        }
        else
        {
          if(paymentMethod == 0 || (paymentMethod==1 && storebalance > total))
          {
           
            setPurchaseLoading(true);
              let order_data = {
                               payment_method:paymentMethod==0?"COD":"wallet",
                               payment_method_title:paymentMethod==0?"Cash on delivery":"Store Credit Payment", 
                               set_paid:true,
                               customer_id:user.ID,
                               products:recipentList
                               }


                      try {
                        const response = await fetch(APICONFIG.REST_WC_URL+"/purchase_giftcard",
                                                    {
                                                      method:"POST",
                                                      body:JSON.stringify(order_data),
                                                      headers : {
                                                        Accept: 'application/json',
                                                        'Content-Type': 'application/json',
                                                        Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                                      }
                                                });
                      
                      const json = await response.json();
                      console.log("purchase card response :"+JSON.stringify(json))
                              
                      if(json.errors && json.errors.rest_forbidden)
                      {
                        alert("something went wrong !!")
                      
                      }
                      else
                      {
                        alert("Gift card purchased successfully !!")
                        setRecipentList([]);
                        setPaymentMethod(-1);
                        props.navigation.goBack(null)
                      }
                      
                      
                    } catch (error) {
                      console.error(error);
                      alert(error)
                      
                    } finally {
                      setPurchaseLoading(false)
                    }
          }
          else
          {
            
              
              alert("You do not have enough balance to place order !!")
            
            
          }

          

        }
    }

  }
  else
  {
    alert("Please add recipents !!")
  }
}
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <ScrollView style={{flex:1}}>
    {dataAvailableGiftcard !=undefined && !isLoading && <View style={{ flex: 1 }}>
    <View style={{marginHorizontal:10,marginTop:10,backgroundColor:Colors.commonbg,height:40,padding:5,flexDirection:"row"}}><View style={{flex:1,justifyContent:"center"}}><Text style={{fontSize:16,fontFamily:FONT.RobotoRegular,textAlign:"left"}}>Gift Card Recipents</Text></View><View style={{flex:1,alignItems:"flex-end"}}><TouchableOpacity onPress={()=>setModalVisible(true)} style={{height:30,width:"70%",}}><View style={{borderWidth:1,borderRadius:5,borderColor:Colors.greenBtnColor,height:30,width:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:16,fontFamily:FONT.RobotoRegular,color:Colors.greenBtnColor}}>+ Add Recipents</Text></View></TouchableOpacity></View></View>
         {recipentList.map(item=><View style={{backgroundColor:"#EDF5EE",height:120,flex:1,marginHorizontal:10,marginTop:2,}}>
            <View style={{flexDirection:"row"}}>
               <View style={{flex:1,margin:5}}><Text style={{fontFamily:FONT.RobotoBold,margin:2}}>{item.recipient_name}</Text><Text style={{fontFamily:FONT.RobotoRegular,margin:2}}>{item.recipients}</Text></View>
               <View style={{flex:1,margin:5}}><Text style={{fontFamily:FONT.RobotoBold,margin:2}}>Theme</Text><Text style={{fontFamily:FONT.RobotoRegular,margin:2}}>{item.themeName}</Text></View>
            </View>
            <View style={{flexDirection:"row"}}>
               <View style={{flex:1,margin:5}}><Text style={{fontFamily:FONT.RobotoBold,margin:2}}>Price</Text><Text style={{fontFamily:FONT.RobotoRegular,margin:2}}>{item.price} DH </Text></View>
               <View style={{flex:1,margin:5,justifyContent:"center",alignItems:"flex-end"}}><TouchableOpacity onPress={()=>deleteRecipent(item)}><AntIcon name="delete" size={25} color={Colors.greenBtnColor} /></TouchableOpacity></View>
            </View>
         </View>)}
         {recipentList.length > 0 &&
         <>
         <View style={{height:40,backgroundColor:Colors.commonbg,marginHorizontal:10,marginTop:2,justifyContent:"center",padding:5}}><Text style={{fontSize:16,fontFamily:FONT.RobotoRegular}}>Order Summary</Text></View>
         <View style={{backgroundColor:"#EDF5EE",height:40,flex:1,marginHorizontal:10,marginTop:2,flexDirection:"row"}}>
               <View style={{flex:1,margin:5}}><Text style={{fontFamily:FONT.RobotoBold,margin:2}}>Shipping Charge :</Text></View>
               <View style={{flex:1,margin:5,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoBold,margin:2}}>{shippingCharge} DH</Text></View>
           
         </View>
         <View style={{backgroundColor:"#EDF5EE",height:40,flex:1,marginHorizontal:10,marginTop:2,flexDirection:"row"}}>
               <View style={{flex:1,margin:5}}><Text style={{fontFamily:FONT.RobotoBold,margin:2}}>Total :</Text></View>
               <View style={{flex:1,margin:5,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoBold,margin:2}}>{recipentList.reduce((previousScore, currentScore, index)=>parseInt(previousScore)+parseInt(currentScore.price), shippingCharge)} DH</Text></View>
           
         </View>
         <View style={{marginHorizontal:10}}>
         <TouchableOpacity  onPress={()=>setCollapsed(!isCollapsed)}><View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:2,flexDirection:"row",justifyContent:"center"}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:10,fontFamily:FONT.RobotoBold}}>Select Billing Address:</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end",marginEnd:5}}><AntIcon name={isCollapsed?lang=="ar"?"left":"right":"down"} size={20} color="black" /></View>
                        
            </View> 
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                    <View style={{backgroundColor:"white",width:"100%",marginTop:5,justifyContent:"center"}}>
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
            </View>
            {isAnyPhysicalCard && <>
            <View style={{marginHorizontal:10}} >
            <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:2,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold,textAlign:"left"}}>Select Delivery Type:</Text>
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
            </View>
            <View style={{marginHorizontal:10}}>
            <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold,textAlign:"left"}}>Select {deliveryType} Date:</Text>
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
              </View>
              <View style={{marginHorizontal:10}}>
              <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold}}>Select {deliveryType} Time:</Text>
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
      <View style={{height:100,width:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{textAlign:"left"}}>Please Select Delivery Date</Text></View>
      }
            </View>
            </View>
            </>}
            <View style={{marginHorizontal:10}} >
            <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:3,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold}}>Select Payment Method</Text>
            </View>
            <View style={{backgroundColor:"white",height:100,width:"100%",marginTop:5,marginStart:15,justifyContent:"center"}}>
<RadioForm
  radio_props={[{label:"COD - Cash On Delivery",value:0},{label:"Store Credit ("+storebalance+" DH)",value:1}]}
  initial={paymentMethod}
  formHorizontal={false}
  labelHorizontal={true}
  buttonColor={Colors.commonbg}
  selectedButtonColor={Colors.greenBtnColor}
  animation={true}
  onPress={(value) => setPaymentMethod(value)}
/>

</View> 
{!purchaseLoading && <TouchableOpacity onPress={()=>placeOrder()}><View style={{borderRadius:5,marginTop:15,backgroundColor:Colors.greenBtnColor,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoBold,color:"white"}}>BUY NOW</Text></View></TouchableOpacity>} 
{purchaseLoading && <View style={{borderRadius:5,marginTop:15,backgroundColor:Colors.greenBtnColor,height:30,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color="white" /></View>}
</View>
         </>
         }

         
    </View>}
    {isLoading && <View style={{ flex:1,margin:20 }}>
    <ActivityIndicator size={"small"} color={Colors.greenBtnColor} />
    
    </View>}
    
    </ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{backgroundColor:"black",opacity:0.3,width:"100%",height:"100%",position:"absolute",left:0,top:0}}></View>
        <View style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
          <View style={{backgroundColor:Colors.commonbg,width:"90%",borderRadius:10}} >
           
          <View >
                  <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row",width:"100%",marginVertical:20}}><EntypoIcon name="info" size={15} color={Colors.greenBtnColor} /><Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:Colors.greenBtnColor,marginStart:5}} numberOfLines={3}>Enter Giftcard Info</Text></View>
                  <View style={{width:"100%",height:1,backgroundColor:Colors.greenBtnColor}}><EntypoIcon name="info" size={15} color={Colors.greenBtnColor} /></View>
                  
                  
                  <View style={{marginVertical:5,marginHorizontal:10,justifyContent:"center",alignItems:"center",height:140,flexDirection:"row"}}>
                    <View style={{flex:1,height:140}}>
                          <View style={{marginVertical:2,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:Colors.greenBtnColor,height:30}}>Card Type :</Text></View>
                          <View style={{marginVertical:2,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><DropdownCardType changeCardTypeValue={changeCardTypeValue}  data={dataAvailableGiftcard}  selectText={"Please select"} /></View>
                          <View style={{marginVertical:2,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:Colors.greenBtnColor,height:30}}>Card Theme :</Text></View>
                          <View style={{marginVertical:2,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><DropdownThemeType changeThemeTypeValue={changeThemeTypeValue}  data={cardTypeValue}  selectText={"Please select"} /></View> 
                 
                    </View>
                    <View style={{flex:1,height:140,marginStart:10}}>
                    
                    {themeTypeValue!=undefined && <FastImage
                  style={{height:"100%",width:"100%",alignSelf:"center"}}
                  source={{
                      uri: themeTypeValue.image.url,
                      
                      priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />}
                {themeTypeValue==undefined && <FastImage
                  style={{height:"100%",width:"100%",alignSelf:"center"}}
                  source={{
                      uri: "https://beta.taous.ma/wp-content/themes/imartnew/images/purchase_giftcard_img.png",
                      
                      priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />}

                    </View>
                  </View>
                   
                  <View style={{marginVertical:2,marginHorizontal:10,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:Colors.greenBtnColor,height:30}}>Amount :</Text></View>
                  <View style={{flexDirection:"row",marginVertical:2,marginHorizontal:10}}><View style={{justifyContent:"flex-start",alignItems:"flex-start",height:30,flex:2}}><DropdownAmount changeAmountValue={changeAmountValue} value={amountValue}  data={themeTypeValue}  selectText={"Please select"} /></View><View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text>OR</Text></View><View style={{flex:2}}><TextInput value={amountValue} onChangeText={setAmountValue} style={{borderRadius:5,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,width:"100%",padding:5}}   /></View></View> 
                  <View style={{marginVertical:2,marginHorizontal:10,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:Colors.greenBtnColor,height:30}}>Recipient Name :</Text></View>
                  <View style={{marginVertical:2,marginHorizontal:10,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><TextInput value={recipentName} onChangeText={setRecipentName} style={{borderRadius:5,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,width:"100%",padding:5}}   /></View> 
                  <View style={{marginVertical:2,marginHorizontal:10,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:Colors.greenBtnColor,height:30}}>Recipient Email :</Text></View>
                  <View style={{marginVertical:2,marginHorizontal:10,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><TextInput value={recipentEmail} onChangeText={setRecipentEmail} style={{borderRadius:5,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,width:"100%",padding:5}}   /></View> 
                  <View style={{marginVertical:2,marginHorizontal:10,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:Colors.greenBtnColor,height:30}}>Your Name :</Text></View>
                  <View style={{marginVertical:2,marginHorizontal:10,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><TextInput value={senderName} onChangeText={setSenderName} style={{borderRadius:5,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,width:"100%",padding:5}}   /></View> 
                  <View style={{marginVertical:2,marginHorizontal:10,justifyContent:"flex-start",alignItems:"flex-start",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:Colors.greenBtnColor,height:30}}>Message :</Text></View>
                  <View style={{marginVertical:2,marginHorizontal:10,justifyContent:"flex-start",alignItems:"flex-start",height:80}}><TextInput value={senderMessage} onChangeText={setSenderMessage} style={{borderRadius:5,borderWidth:1,borderColor:Colors.greenBtnColor,height:80,width:"100%",padding:5}} multiline={true}   /></View> 
                  <View style={{flexDirection:"row",marginVertical:10,marginHorizontal:10}}>
                  <TouchableOpacity onPress={()=>addRecipent()} style={{flex:2,height:30}}><View style={{justifyContent:"center",alignItems:"center",height:30,flex:1,borderRadius:5,backgroundColor:Colors.greenBtnColor}}><Text style={{color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_add_lbl')}</Text></View></TouchableOpacity>
                     <View style={{flex:0.125,justifyContent:"center",alignItems:"center"}}></View>
                     <TouchableOpacity onPress={()=>resetRecipent()} style={{flex:2}}><View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:Colors.greenBtnColor,borderRadius:5}}><Text style={{color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_cancel_lbl')}</Text></View></TouchableOpacity>
                  </View> 
                </View> 

               
                
             
              
               
          
          </View>
          
        </View>
      </Modal>
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
  
});

export default PurchaseGiftCard;