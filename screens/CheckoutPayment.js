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
import {matchAndFindItemFromArray,getFormattedDatetime} from '../commonfunctions';



import {FONT} from "../style/fonts"
import { t } from "i18next";

const CheckoutPayment = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {cart} = useSelector(state=>state.cartReducer);
  const {user} = useSelector(state=>state.userReducer);
  
  const dispatch = useDispatch();
  
  const [SubTotal,setSubTotal] = useState(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.variation_item.price)).toFixed(2),0));
  const [Total,SetTotal] = useState(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.variation_item.price)).toFixed(2),50));
  const [OrderNote,setOrderNote] = useState('');
  const [paymentMethod,setPaymentMethod] = useState(-1);
  const [isTermAccept,setIsTermAccept] = useState(false);
  const [isCreateorderLoading,setCreateorderLoading] = useState(false);

  //requested variables
  const [CouponDiscount,setCouponDiscount] = useState(props.route.params!=undefined && props.route.params.CouponDiscount!=null?props.route.params.CouponDiscount:0); 
  const [couponId,setCouponId] = useState(props.route.params!=undefined && props.route.params.CouponId!=null?props.route.params.CouponId:0);
  const [couponCode,setCouponCode] = useState(props.route.params!=undefined && props.route.params.CouponCode!=null?props.route.params.CouponCode:''); 
  const [Delivery_Type,setDeliveryType] = useState(props.route.params!=undefined && props.route.params.Delivery_Type!=null?props.route.params.Delivery_Type:'');
  const [Preffered_Address_Id,setPrefferedAddressId] = useState(props.route.params!=undefined && props.route.params.Preffered_Address_Id!=null?props.route.params.Preffered_Address_Id:'');
  const [Preffered_Address_Date,setPrefferedAddressDate] = useState(props.route.params!=undefined && props.route.params.Preffered_Address_Date!=null?props.route.params.Preffered_Address_Date:'');
  const [Preffered_Address_Time,setPrefferedAddressTime] = useState(props.route.params!=undefined && props.route.params.Preffered_Address_Time!=null?props.route.params.Preffered_Address_Time:'');
  const [Billing_Address_Id,setBillingAddressId] = useState(props.route.params!=undefined && props.route.params.Billing_Address_Id!=null?props.route.params.Billing_Address_Id:'');

  const [storebalance,setStoreBalance] = useState(0);
  const [cartData,setCartData] = useState(cart);
  
  

  


  useEffect(() => {
     fetchBalance();
     setSubTotal(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.variation_item.price)).toFixed(2),0));
     if(Delivery_Type=="Delivery")
     {
     SetTotal(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.variation_item.price)).toFixed(2),50));
     }
     else
     {
        SetTotal(cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.qty*curValue.product.variation_item.price)).toFixed(2),0));    
     }
     
  },[props]);
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
               <Text style={styles.subtitle}>Prize: {item.product.variation_item.price} DH</Text>
               {item.product.full_item.type=="variable" && item.product.variation_item.attributes.map(itm=>{ return <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoBold}}>{itm.name}</Text><Text style={{fontFamily:FONT.RobotoRegular}}>: {itm.option}</Text></View>})}
               <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:10}}>
                    <View style={{height:25,flexDirection:"row",flex:1}}>
                            
                            <View style={{flex:1,justifyContent:"flex-start",alignItems:"flex-start"}} ><Text style={{fontSize:16,color:Colors.greenBtnColor,fontFamily:FONT.RobotoBold}}>x {item.qty}</Text></View>
                            
                    </View>
                    <View style={{height:25,flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>
                        
                    </View>
                    
                    
                </View>
          </View>
          
      </View>
    </View>
    
  ); 
  
const placeOrder = async ()=>{
    
    if(paymentMethod==-1)
    {
        alert(t('placeorder_pleaseselectpaymentmethod_lbl'))
    }
    else if(paymentMethod==1 && ((Math.round(parseFloat(Total)*100)/100) >  (Math.round(parseFloat(storebalance)*100)/100)))
    {
      alert(t('placeorder_youdonothaveenoughcredit_lbl'))
    }
    else if(!isTermAccept)
    {
        alert(t('placeorder_pleaseaccepttermsnconditions_lbl'))
    }
    else
    {

     
      

        //alert("ready to place order")
        

        let paymentmethod_string="";
        let paymentmethod_title="";
        let payment_status;
        if(paymentMethod==0)
        {
          paymentmethod_string = "cod";
          paymentmethod_title = "Cash on delivery";
          payment_status = true;
        }
        else
        {
          paymentmethod_string = "wallet";
          paymentmethod_title = "Store Credit Payment";
          payment_status = true;
        }

        let shipping_item;
        let shipping_lines = [];
        if(Delivery_Type=="Delivery")
        {
            shipping_item = matchAndFindItemFromArray(user.addresses.profile_addresses,Preffered_Address_Id);
            shipping_lines.push({
              method_id: "flat_rate",
              method_title: "Flat Rate",
              total: "50.00"
            })
        }
        else
        {
                shipping_item = {
                  "first_name": "",
                  "last_name": "",
                  "company": "",
                  "address_1": "",
                  "address_2": "",
                  "city": "",
                  "state": "",
                  "postcode": "",
                  "country": "",
                  "phone": ""
              }  
              shipping_lines.push({
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: "0.00"
              })
        }
       let line_items = [];
       cart.map((item)=>{
          if(item.product.id !=item.product.variation_id)
          line_items.push({"product_id":item.product.id,"variation_id":item.product.variation_id,"quantity":item.qty})
          else
          line_items.push({"product_id":item.product.id,"quantity":item.qty})
       });   

 ///if coupondiscount is greater than 0 then apply and update it on order
  let couponlines = [];
 if(CouponDiscount > 0)
 {
   couponlines.push({'code':couponCode,'discount':CouponDiscount,'meta_data':[{'key':"coupon_data",'value':[{'id':couponId,'code':couponCode,'amount':CouponDiscount}]}]});
 }
       


        let order_data = {
          payment_method: paymentmethod_string,
          payment_method_title: paymentmethod_title,
          set_paid:payment_status,
          billing:Billing_Address_Id,
          shipping:shipping_item,
          line_items:line_items,
          shipping_lines:shipping_lines,
          coupon_lines:couponlines 
        } 

        //creating order
       //alert(JSON.stringify(order_data))
  

  
  

          setCreateorderLoading(true);
           try {
           const response = await fetch(APICONFIG.REST_WC_URL+"/orders",
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
          
         if(json.id && json.id > 0)
          {
             
              //update meta data
              let UpdateOrderId = json.id;
              let meta_data = [];

              let display_date = getFormattedDatetime(Preffered_Address_Date,"MMM DD,YYYY")
      

              meta_data.push({"key":"pi_delivery_date","value":display_date});
              meta_data.push({"key":"pi_system_delivery_date","value":Preffered_Address_Date});
              meta_data.push({"key":"pi_delivery_time","value":Preffered_Address_Time});
              meta_data.push({"key":"pi_delivery_type","value":Delivery_Type.toLowerCase()});
              if(Delivery_Type=='Pickup')
              {
              let pickup_location_item = matchAndFindItemFromArray(user.addresses.pickup_locations,Preffered_Address_Id);  
              meta_data.push({"key":"pickup_location_id","value":Preffered_Address_Id});
              meta_data.push({"key":"pickup_location","value":pickup_location_item.addr});

              }

             
              

              //update order meta data
              try {
                const response = await fetch(APICONFIG.REST_WC_URL+"/orders/"+UpdateOrderId,
                                       {
                                         method:"PUT",
                                         body:JSON.stringify({meta_data:meta_data,customer_id:user.ID,customer_note:OrderNote!=undefined?OrderNote:''}),
                                         headers : {
                                           Accept: 'application/json',
                                           'Content-Type': 'application/json',
                                           Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                         }
                                   });
          
               const json = await response.json();
               if(json.id && json.id > 0)
               {
                 
                 if(OrderNote!=undefined && OrderNote!="")
                 {
                              try {
                                const response = await fetch(APICONFIG.REST_WC_URL+"/orders/"+UpdateOrderId+"/notes",{
                                  method:"POST",
                                  body:JSON.stringify({note:OrderNote}),
                                  headers : {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                  }
                            });
                            const json = await response.json();
                            if(json.id && json.id > 0)
                            {
                              props.navigation.navigate("CheckoutThankyou",{OrderId:UpdateOrderId})
                            }

                   }
                   catch(error){
                    alert(json.errors.rest_forbidden)
                   }
                   finally{
                    setCreateorderLoading(false)
                   }
                 }
                 else
                 {
                  props.navigation.navigate("CheckoutThankyou",{OrderId:UpdateOrderId})
                 }
                 //
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
                if(OrderNote!=undefined && OrderNote!="")
                 {
                 }
                 else
                 {
                setCreateorderLoading(false)
                 }
              }
          
          }
          else
          {
            alert(json.errors.rest_forbidden)
          }
          
          
        } catch (error) {
          console.error(error);
          alert(error)
          
        } finally {
        
         
        }
        
        
      
        ///

        
    }
}


  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    {cartData.length > 0 && <ScrollView>
    <View style={{ flex: 1, paddingHorizontal: 10 }}>

    <View style={{backgroundColor:"#ecf3da",width:"100%",marginTop:15}}>
                   
                    {CouponDiscount > 0 && 
                    
                    <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                         <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"red",fontFamily:FONT.RobotoBold}}>Coupon Discount</Text></View>
                         <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{padding:10,color:"red",fontFamily:FONT.RobotoBold}}>- {CouponDiscount} DH</Text></View>
                   </View>
                    }
                     <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>{t('placeorder_subtotal_lbl')}</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>{SubTotal} DH</Text></View>
                    </View>
                    <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>{t('placeorder_shippingcharge_lbl')}</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>{Delivery_Type=="Delivery"?50:0} DH</Text></View>
                    </View> 

                   <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                       <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:10,color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{t('placeorder_total_lbl')}</Text></View>
                       <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{paddingEnd:10,color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{parseFloat(Total-CouponDiscount).toFixed(2)} DH</Text></View>
                   </View> 
                   {!isCreateorderLoading && <TouchableOpacity onPress={()=>placeOrder()} style={{flex:1,height:40}}><View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",borderRadius:10,backgroundColor:Colors.drawerHeaderBackground}}>
                      <Text style={{color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{t('placeorder_placeorder_lbl')}</Text></View>
                       
                   
                   </TouchableOpacity>}
                   {isCreateorderLoading && <View style={{flex:1,height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",borderRadius:10,backgroundColor:Colors.drawerHeaderBackground}}>
                      <ActivityIndicator size={"small"} color={"black"} />
                      </View>
                       
                   
                   }
           </View>  
            
            
           <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold,textAlign:"left"}}>{t('placeorder_items_lbl')} ({cartData.length})</Text>
            </View> 
            <View style={{backgroundColor:"white",width:"100%",marginTop:5,justifyContent:"center"}} >
            <FlatList
                data={cartData}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item item={item} />}
               
                />
            </View>       
            <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold,textAlign:"left"}}>{t('placeorder_ordernotes_lbl')}</Text>
            </View>
            <View style={{backgroundColor:"white",height:100,width:"100%",marginTop:5,justifyContent:"center"}}>
               <TextInput value={OrderNote} onChangeText={setOrderNote} style={{borderRadius:5,borderWidth:2,borderColor:Colors.commonbg,height:80,width:"100%",padding:5}} multiline={true}   />
            </View>
            <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold,textAlign:"left"}}>{t('placeorder_selectpaymentmethod_lbl')}</Text>
            </View>
            <View style={{backgroundColor:"white",height:100,width:"100%",marginTop:5,marginStart:15,justifyContent:"center"}}>
<RadioForm
  radio_props={[{label:t('placeorder_cod_lbl'),value:0},{label:t('placeorder_storecredit_lbl')+' ('+storebalance+" DH)",value:1}]}
  initial={paymentMethod}
  formHorizontal={false}
  labelHorizontal={true}
  buttonColor={Colors.commonbg}
  selectedButtonColor={Colors.greenBtnColor}
  animation={true}
  onPress={(value) => setPaymentMethod(value)}
/>

</View>  
<View style={{backgroundColor:Colors.commonbg,height:2,width:"100%",marginTop:5,justifyContent:"center"}}>
                
                </View>  
<View style={{backgroundColor:"white",height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
<View style={{marginStart:10,flexDirection:"row"}}>
               
               <CheckBox
            value={isTermAccept}
            onValueChange={setIsTermAccept}
            boxType="square"
            onTintColor={Colors.greenBtnColor}
            onCheckColor={Colors.greenBtnColor}
            style={{height:20,width:20,marginTop:5}}
            
            
          /><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,marginStart:10,marginTop:5,width:"88%",textAlign:"left"}}>{t('placeorder_term_lbl')}</Text></View>
            </View> 
            <View style={{backgroundColor:"white",height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                
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

export default CheckoutPayment;