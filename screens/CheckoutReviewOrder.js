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
import FastImage from 'react-native-fast-image'

import {FONT} from "../style/fonts"
import { t } from "i18next";
const CheckoutReviewOrder = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {cart} = useSelector(state=>state.cartReducer);
  const {user} = useSelector(state=>state.userReducer);
  //const {cartCharges} = useSelector(state=>state.cartChargesReducer);
  const dispatch = useDispatch();
  //const [DATAFINAL,SetDATAFINAL] = useState([]);
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
        "Are your sure?",
        "Are you sure you want to remove this item fromm your shopping cart?",
        [
      
          {
            text: "Yes",
            onPress: () => {
              removeFromCartFun(product);
              
              
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
  //let subtotal = cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.product.full_item.price)).toFixed(2),0);
  //let total = cart.reduce((prevValue,curValue)=>parseFloat(Number(prevValue)+Number(curValue.product.full_item.price)).toFixed(2),50);
  const processCheckout = () => {

    if(Object.keys(user).length > 0)
    {
       props.navigation.navigate("CheckoutDeliveryMethod");
    }
    else
    {

      props.navigation.navigate("User");
    }

  }


  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    {cart.length > 0 && <ScrollView>
    <View style={{ flex: 1, paddingHorizontal: 10 }}>

    <View style={{backgroundColor:"#ecf3da",height:240,width:"100%",marginTop:15}}>
                   
                    
                    <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>{t('revieworder_subtotal_lbl')}</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>{SubTotal} DH</Text></View>
                    </View>
                    <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>{t('revieworder_shippingcharge_lbl')}</Text></View>
                        <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{padding:10,color:"white",fontFamily:FONT.RobotoBold}}>50 DH</Text></View>
                    </View> 

                   <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row",backgroundColor:Colors.greenBtnColor}}>
                       <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={{paddingStart:10,color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{t('revieworder_total_lbl')}</Text></View>
                       <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><Text style={{paddingEnd:10,color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{Total} DH</Text></View>
                   </View>
                   <View style={{height:40,marginHorizontal:5,marginVertical:10,height:40,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                       <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><TouchableOpacity onPress={()=>{props.navigation.goBack(null)}} style={{width:"99%",height:40}}><View style={{height:40,width:"100%",justifyContent:"center",alignItems:"center",height:40,borderRadius:10,backgroundColor:Colors.drawerHeaderBackground}}>
                      <Text style={{color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{t('reiveworder_back_lbl')}</Text></View>
                       
                   
                   </TouchableOpacity></View>
                       <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><TouchableOpacity onPress={()=>{processCheckout()}} style={{width:"99%",height:40}}><View style={{height:40,width:"100%",justifyContent:"center",alignItems:"center",height:40,borderRadius:10,backgroundColor:Colors.drawerHeaderBackground}}>
                      <Text style={{color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>{t('revieworder_next_lbl')}</Text></View>
                       
                   
                   </TouchableOpacity></View>
                   </View>
                   
           </View>  
            <View style={{backgroundColor:Colors.commonbg,height:40,width:"100%",marginTop:15,justifyContent:"center"}}>
                <Text style={{paddingStart:10,fontFamily:FONT.RobotoBold}}>{t('revieworder_items_lbl')} ({cart.length})</Text>
            </View> 
            <View style={{backgroundColor:"white",width:"100%",marginTop:5,justifyContent:"center"}} >
            <FlatList
                data={cart}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item item={item} />}
               
                />
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

export default CheckoutReviewOrder;