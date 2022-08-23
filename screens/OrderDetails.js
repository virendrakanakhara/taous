import React,{ useEffect,useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { getBooks } from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "../style/colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {FONT} from '../style/fonts'
import CardView from 'react-native-cardview'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import PurchasedProductItem from "../components/PurchasedProductItem";
import OrderProgressLine from "../components/OrderProgressLine";
import AntIcon from "react-native-vector-icons/AntDesign";
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import { ActivityIndicator } from "react-native-paper";
import {getFormattedDatetime,matchAndFindValueFromArray,replaceKeyName} from '../commonfunctions';
import Collapsible from 'react-native-collapsible';
import FastImage from 'react-native-fast-image'
import { ScrollView } from "react-native-gesture-handler";
import { t } from "i18next";

const OrderDetails = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {user} = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();

  //user orders
  const [isOrderLoading, setOrderLoading] = useState(true);
  const [dataorder, setDataOrder] = useState([]);
  const [dataorderfilter,setDataOrderFilter] = useState([]);
  const [search, setSearch] = useState('');
  const [OrderId,setOrderId] = useState(props.route.params!=undefined && props.route.params.OrderId!=null?props.route.params.OrderId:0);
  const [isCollapsed,setCollapsed] = useState(true); 
  const [isOrderSummary,setCollapsedOrderSummary] = useState(false);
  const [isBilling,setCollapsedBilling] = useState(true); 
  const [isShipping,setCollapsedShipping] = useState(true); 
  const [isPickup,setCollapsedPickup] = useState(true);
  const [isShippingMethod,setCollapsedShippingMethod] = useState(true); 
  const [isDatetime,setCollapsedDatetime] = useState(true); 
  const [isPaymentMethod,setCollapsedPaymentMethod] = useState(true); 
  const [isOrdernote,setCollapsedOrdernote] = useState(true); 


  useEffect(() => {
    
    if(OrderId > 0 )
    {
    getOrderDetail();
    }
   
  }, [props]);

  //fetch user orders//
const getOrderDetail = async () => {

  setOrderLoading(true)
  

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
              setDataOrder(json);
              
              
            } catch (error) {
              console.error(error);
            } finally {
              setOrderLoading(false);
            }
  
}  

  
  const renderPurchasedItem = ({item})=>(
    <PurchasedProductItem item={item}
       height={60}
       width={45}
       backgroundColor={"white"}
       marginEnd={5}
       
       props={props}
       
    />
    
  );  
  
  const Item = ({ item }) => (
    
    
    <View style={styles.item1}>
      <View style={{flexDirection:"row"}}>
          <View style={{flex:1,alignItems:"center",justifyContent:"center",height:"100%"}}>
              {/*  <Image source={require("../assets/images/p11.png")} style={{height:100,width:undefined,aspectRatio:358/443,alignSelf:"center",marginTop:5}} />   */}
               <FastImage
                  style={{height:75,width:75,alignSelf:"center"}}
                  source={{
                      uri: item.variation_id==0?"https://beta.taous.ma/product_image.php?pid="+item.product_id:"https://beta.taous.ma/product_image.php?pid="+item.variation_id,
                      
                      priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                /> 
          </View>
          <View style={{flex:3,justifyContent:"center"}}>
               <View style={{flexDirection:"row"}}><Text style={styles.title} numberOfLines={2}>{item.name}</Text>{/* <Text style={styles.itemtotal}>{parseFloat(item.quantity*item.price).toFixed(2)} DH</Text> */}</View>
               <Text style={styles.subtitle}>{t('common_price_lbl')}: {item.price} DH</Text>
                {item.meta_data.length > 0 && item.meta_data.map(itm=>{ return <View style={{flexDirection:"row",height:25}}><Text style={{fontFamily:FONT.RobotoBold}}>{replaceKeyName(itm.display_key)} : </Text><Text style={{fontFamily:FONT.RobotoRegular}}> {itm.display_value}</Text></View>})} 
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
    
    {isOrderLoading?<View style={{marginHorizontal:20,marginBottom:60,marginTop:10}}>
    <ActivityIndicator size={"small"} color={Colors.greenBtnColor} />
      </View>:<ScrollView><View style={{marginHorizontal:20,marginBottom:60,marginTop:10}}>
      <CardView
    cardElevation={3}
    cardMaxElevation={3}
    cornerRadius={15}>
<View  style={[styles.item,{backgroundColor:"white"}]}>


  <View style={{height:55,backgroundColor:Colors.address_bar,flexDirection:"row"}}>
    <View style={{flex:5,justifyContent:"flex-start",alignItems:"center",flexDirection:"row"}}><Text style={styles.address_name}>{getFormattedDatetime(dataorder.date_created,'MMM D YYYY')}</Text><Text style={styles.address_name2}>|  Order# {dataorder.id}  |  Total  {dataorder.total}  DH</Text></View>
    <View style={{flex:1.5,justifyContent:"center",alignItems:"center"}} >
      {/* <View style={{height:30,width:70,borderWidth:1,borderColor:Colors.greenBtnColor,backgroundColor:Colors.greenBtnColor,borderRadius:15,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"white"}}>View</Text></View> */}
    </View>
  </View>

<Text style={styles.pickup}>{matchAndFindValueFromArray(dataorder.meta_data,"pi_delivery_type")}</Text>
<Text style={styles.processing}>{dataorder.status} on {getFormattedDatetime(dataorder.date_created,'MMM D, YYYY')}</Text>
<View style={{marginStart:10,height:50,width:"95%",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
  <OrderProgressLine height={20} width={0.85} />
</View>
<View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>
<TouchableOpacity onPress={()=>setCollapsed(!isCollapsed)} ><View style={{flexDirection:"row"}}><View style={{flex:1}}><Text style={styles.totalitems}>{dataorder.line_items.reduce((total, currentValue) => total = total + currentValue.quantity,0)} {t('common_items_lbl')}</Text></View><View style={{flex:1,justifyContent:"flex-end",alignItems:"flex-end",marginEnd:10}}><AntIcon name={isCollapsed?"down":"up"} size={20} color={Colors.greenBtnColor} /></View></View></TouchableOpacity>
<Collapsible collapsed={isCollapsed}>
<View style={{backgroundColor:"white",marginTop:5,marginHorizontal:10,justifyContent:"center"}} >
            <FlatList
                data={dataorder.line_items}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item item={item} />}
               
                />
            </View>
            </Collapsible>            
<View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>
<View style={{height:80,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
<FlatList
            horizontal
            
            data={dataorder.line_items}
            renderItem={renderPurchasedItem}
            showsHorizontalScrollIndicator={false}
          />
          </View> 
          <View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>
          <TouchableOpacity onPress={()=>setCollapsedOrderSummary(!isOrderSummary)}>
          <View style={{width:"100%",height:50,flexDirection:"row"}}>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{marginStart:10,justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"gray",textDecorationColor:"gray"}}>{t('orderdetails_ordersummary_lbl')}</Text></View></View>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><View style={{justifyContent:"center",alignItems:"flex-end",marginEnd:10}}><AntIcon name={isOrderSummary?"down":"up"} size={20} color={Colors.greenBtnColor} /></View></View>
          </View>
          </TouchableOpacity>
          <Collapsible collapsed={isOrderSummary}>
          <>
          {matchAndFindValueFromArray(dataorder.meta_data,"pi_delivery_type")=="delivery" && <View style={{height:30,marginVertical:5,marginHorizontal:10,flex:1,flexDirection:"row"}}><View style={{flex:3,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('orderdetails_shippingcharge_lbl')}:</Text></View><View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{dataorder.shipping_total} DH</Text></View></View>}
    <View style={{height:30,marginVertical:5,marginHorizontal:10,flex:1,flexDirection:"row"}}><View style={{flex:3,justifyContent:"center",alignItems:"flex-end"}}><Text style={{color:"red",fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('orderdetails_coupondiscount_lbl')}:</Text></View><View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{color:"red",fontFamily:FONT.RobotoRegular,textAlign:"left"}}> - 0.00 DH</Text></View></View>
    <View style={{height:30,marginVertical:5,marginHorizontal:10,flex:1,flexDirection:"row"}}><View style={{flex:3,justifyContent:"center",alignItems:"flex-end"}}><Text style={{color:"red",fontFamily:FONT.RobotoRegular,textAlign:"left"}}>{t('orderdetails_giftdiscount_lbl')}:</Text></View><View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{color:"red",fontFamily:FONT.RobotoRegular,textAlign:"left"}}>- 0.00 DH</Text></View></View>
    
    <View style={{height:30,marginVertical:5,marginHorizontal:10,flex:1,flexDirection:"row"}}><View style={{flex:3,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoBold,textAlign:"left"}}>{t('common_total_lbl')}:</Text></View><View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{fontFamily:FONT.RobotoBold,textAlign:"left"}}>{dataorder.total} DH</Text></View></View>
    </>
    </Collapsible>
    <View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>        
    <TouchableOpacity onPress={()=>setCollapsedBilling(!isBilling)}>
    <View style={{width:"100%",height:50,flexDirection:"row"}}>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{marginStart:10,justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"gray",textDecorationColor:"gray"}}>{t('common_billingaddress_lbl')}</Text></View></View>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><View style={{justifyContent:"center",alignItems:"flex-end",marginEnd:10}}><AntIcon name={isBilling?"down":"up"} size={20} color={Colors.greenBtnColor} /></View></View>
          </View>
    </TouchableOpacity>
    <Collapsible collapsed={isBilling}>
    <View style={{marginHorizontal:10,marginVertical:10}}>
    <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.billing.first_name+" "+dataorder.billing.last_name}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.billing.address_1}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.billing.address_2}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.billing.city+","+dataorder.billing.state}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.billing.country+"-"+dataorder.billing.postcode}</Text>
       
       
    </View>
    </Collapsible>      
    {matchAndFindValueFromArray(dataorder.meta_data,"pi_delivery_type")=="delivery" &&
    <>
    <View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>        
    <TouchableOpacity onPress={()=>setCollapsedShipping(!isShipping)}>
    <View style={{width:"100%",height:50,flexDirection:"row"}}>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{marginStart:10,justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"gray",textDecorationColor:"gray"}}>{t('common_shippingaddress_lbl')}</Text></View></View>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><View style={{justifyContent:"center",alignItems:"flex-end",marginEnd:10}}><AntIcon name={isShipping?"down":"up"} size={20} color={Colors.greenBtnColor} /></View></View>
          </View>
          </TouchableOpacity> 
          <Collapsible collapsed={isShipping}>           
    <View style={{marginHorizontal:10,marginVertical:10}}>
    <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.shipping.first_name+" "+dataorder.shipping.last_name}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.shipping.address_1}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.shipping.address_2}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.shipping.city+","+dataorder.shipping.state}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.shipping.country+"-"+dataorder.shipping.postcode}</Text>
       
       
    </View>
    </Collapsible>
    </>
    }

{matchAndFindValueFromArray(dataorder.meta_data,"pi_delivery_type")=="pickup" &&
    <>
    <View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>        
    <TouchableOpacity onPress={()=>setCollapsedPickup(!isPickup)}>
    <View style={{width:"100%",height:50,flexDirection:"row"}}>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{marginStart:10,justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"gray",textDecorationColor:"gray"}}>{t('common_pickupaddress_lbl')}</Text></View></View>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><View style={{justifyContent:"center",alignItems:"flex-end",marginEnd:10}}><AntIcon name={isPickup?"down":"up"} size={20} color={Colors.greenBtnColor} /></View></View>
          </View>
          </TouchableOpacity>  
          <Collapsible collapsed={isPickup}>                     
    <View style={{marginHorizontal:10,marginVertical:10}}>
    <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.shipping.first_name+" "+dataorder.shipping.last_name}</Text>
    <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{matchAndFindValueFromArray(dataorder.meta_data,"pickup_location")}</Text>
    </View>
    </Collapsible>
    </>
    }
    {dataorder && dataorder.shipping_lines && dataorder.shipping_lines.length > 0 && <>
    <View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>        
    <TouchableOpacity onPress={()=>setCollapsedShippingMethod(!isShippingMethod)}>
    <View style={{width:"100%",height:50,flexDirection:"row"}}>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{marginStart:10,justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"gray",textDecorationColor:"gray"}}>{t('common_shippingmethod_lbl')}</Text></View></View>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><View style={{justifyContent:"center",alignItems:"flex-end",marginEnd:10}}><AntIcon name={isShippingMethod?"down":"up"} size={20} color={Colors.greenBtnColor} /></View></View>
          </View>
    </TouchableOpacity>
    <Collapsible collapsed={isShippingMethod}>                                 
    <View style={{marginHorizontal:10,marginVertical:10}}>
    <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{t('orderdetails_method_lbl')} : {dataorder.shipping_lines[0].method_title}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{t('orderdetails_shippingcharge_lbl')} : {dataorder.shipping_lines[0].total} DH</Text>
    </View>
    </Collapsible>
    </>}
    <View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>  
    <TouchableOpacity onPress={()=>setCollapsedDatetime(!isDatetime)}> 
    <View style={{width:"100%",height:50,flexDirection:"row"}}>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{marginStart:10,justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"gray",textDecorationColor:"gray"}}>{t('common_datetimefor_lbl')} {matchAndFindValueFromArray(dataorder.meta_data,"pi_delivery_type")}</Text></View></View>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><View style={{justifyContent:"center",alignItems:"flex-end",marginEnd:10}}><AntIcon name={isDatetime?"down":"up"} size={20} color={Colors.greenBtnColor} /></View></View>
          </View>
          </TouchableOpacity> 
          <Collapsible collapsed={isDatetime}>                                                 
    <View style={{marginHorizontal:10,marginVertical:10}}>
    <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{t('orderdetails_date_lbl')} : {matchAndFindValueFromArray(dataorder.meta_data,"pi_delivery_date")}</Text>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{t('orderdetails_time_lbl')} : {matchAndFindValueFromArray(dataorder.meta_data,"pi_delivery_time")}</Text>
       
    </View>
    </Collapsible>
    <View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>        
    <TouchableOpacity onPress={()=>setCollapsedPaymentMethod(!isPaymentMethod)}> 
    <View style={{width:"100%",height:50,flexDirection:"row"}}>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{marginStart:10,justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"gray",textDecorationColor:"gray"}}>{t('common_paymentmethod_lbl')}</Text></View></View>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><View style={{justifyContent:"center",alignItems:"flex-end",marginEnd:10}}><AntIcon name={isPaymentMethod?"down":"up"} size={20} color={Colors.greenBtnColor} /></View></View>
          </View>
    </TouchableOpacity> 
    <Collapsible collapsed={isPaymentMethod}>       
    <View style={{marginHorizontal:10,marginVertical:10}}>
       <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{t('orderdetails_method_lbl')} : {dataorder.payment_method_title}</Text>
       
       
    </View>
    </Collapsible>

    <View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>        
    <TouchableOpacity onPress={()=>setCollapsedOrdernote(!isOrdernote)}> 
    <View style={{width:"100%",height:50,flexDirection:"row"}}>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{marginStart:10,justifyContent:"center",alignItems:"flex-start"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"gray",textDecorationColor:"gray"}}>{t('common_ordernote_lbl')}</Text></View></View>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><View style={{justifyContent:"center",alignItems:"flex-end",marginEnd:10}}><AntIcon name={isOrdernote?"down":"up"} size={20} color={Colors.greenBtnColor} /></View></View>
          </View>
    </TouchableOpacity> 
    <Collapsible collapsed={isOrdernote}>        
    <View style={{marginHorizontal:10,marginVertical:10}}>
    <Text style={{fontFamily:FONT.RobotoRegular,paddingStart:5,textAlign:"left"}}>{dataorder.customer_note==""?"-NA-":dataorder.customer_note}</Text>
       
       
    </View>
    </Collapsible>

</View>

</CardView>
      </View></ScrollView>}
    
  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  item: {
    
    
    
    marginVertical: 8,
    marginHorizontal: 0,
    borderWidth:1,
    borderColor:Colors.commonbg,
    borderRadius:10,
    
    
    
  },
  item1: {
    
    
    
    marginVertical: 8,
    marginHorizontal: 0,
    borderWidth:1,
    borderColor:Colors.commonbg,
    borderRadius:10,
    height:450
    
    
    
  },
  address_name: {
    
    color:"black",
    marginStart:10,
    
    
    
    
    fontFamily:FONT.RobotoBold,
    fontSize:12
  },
  address_name2: {
    
    color:"gray",
    marginStart:10,
    
    
    
    
    fontFamily:FONT.RobotoRegular,
    fontSize:12
  },
  pickup: {
    fontSize: 12,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    marginStart:15,
    marginTop:5,
    textAlign:"left",
  
    
  },
  processing: {
    fontSize: 16,
    color:"black",
    fontFamily:FONT.RobotoSemiBold,
    marginStart:15,
    marginTop:5,
    textTransform:'capitalize',
    textAlign:"left"
    
  },
  totalitems: {
    fontSize: 12,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    marginStart:15,
    marginTop:15,
    textAlign:"left"
    
  },
  name: {
    fontSize: 14,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    marginStart:15,
    marginTop:5,
    
  },
  title:{
    textAlign:"left"
  },
  subtitle: {
    fontSize: 14,
    color:"black",
    fontFamily:FONT.RobotoBold,
    textAlign:"left"
  },
  itemtotal:{
    textAlign:"right",
    backgroundColor:"red"
  }
  
});

export default OrderDetails;