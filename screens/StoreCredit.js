import React,{ useEffect, useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  ActivityIndicator
   
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { getBooks } from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "../style/colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {FONT} from "../style/fonts";
import { ScrollView } from "react-native-gesture-handler";
import {getFormattedDatetime} from "../commonfunctions";
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import { t } from "i18next";


const StoreCredit = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {user} =  useSelector(state=>state.userReducer);
  const dispatch = useDispatch();
  const [isLoading,setLoading] = useState(false);
  const [datatransaction,setDataTransaction] = useState([]);
  const [storebalance,setStoreBalance] = useState(0);
  const [isBalanceLoading,setBalanceLoading] = useState(false);
  const [amount,setAmount]=useState();
  const [isAddBalanceLoading,setAddBalanceLoading] = useState(false);


  useEffect(() => {
    fetchTransactions();
    fetchBalance();
  },[]);


  const fetchTransactions = async () => {
   
  
    
    
  
       setLoading(true);
        try {
        const response = await fetch(APICONFIG.REST_WC_URL+"/wallet?email="+user.user_email,
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
         setDataTransaction(json);
       }
       
       
     } catch (error) {
       console.error(error);
       alert(error)
       
     } finally {
      setLoading(false);
     }
     
     
    }

    const fetchBalance = async () => {
   
  
    
    
  
      setBalanceLoading(true);
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
      setBalanceLoading(false);
    }
    
    
   }

  
   const addStoreBalance = async () => {

    if(amount==undefined || amount=="" || amount==0)
    {
      alert("Please enter amount !!")
    }
    else
    {
    setAddBalanceLoading(true);
        try {
        const response = await fetch(APICONFIG.REST_WC_URL+"/store_credit_with_order",
                                    {
                                      method:"POST",
                                      body:JSON.stringify({
                                        payment_method:"cod",
                                        customer_id:user.ID,
                                        payment_method_title:"Cash on delivery",
                                        set_paid:true,
                                        amount:amount,
                                        
                                        
                                      }),
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
         alert("Store balance added successfully with order id:"+json.order_id)
       }
       
       
     } catch (error) {
       console.error(error);
       alert(error)
       
     } finally {
      setAddBalanceLoading(false);
      fetchBalance();
      fetchTransactions();
      
     }
     
    }
    }



  const ItemRender = ({ item }) => (
    <View style={{
      height: 50,
      
      backgroundColor: Colors.commonbg,
     
      flexDirection:"row",
      flex:1
    }}>

      <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'black' }}> {item.transaction_id}</Text></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'black' }}> {item.type=='credit'?parseFloat(item.amount).toFixed(2):"-"}</Text></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'black' }}> {item.type=='debit'?parseFloat(item.amount).toFixed(2):"-"}</Text></View>
      <View style={{flex:1.5,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'black' }}> {getFormattedDatetime(item.date,"D MMM,YY")} </Text></View>
      <View style={{flex:2.5,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'black' }}> {item.details}</Text></View>

    </View>
  );

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  const FlatList_Header = () => {
    return (
      <View style={{
        height: 35,
        
        backgroundColor: Colors.greenBtnColor,
       
        flexDirection:"row",
        flex:1
      }}>

        <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'white' }}> {t('storecredit_id_lbl')} </Text></View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'white' }}> {t('storecredit_credit_lbl')} </Text></View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'white' }}> {t('storecredit_debit_lbl')} </Text></View>
        <View style={{flex:1.5,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'white' }}> {t('storecredit_date_lbl')} </Text></View>
        <View style={{flex:2.5,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'white' }}> {t('storecredit_details_lbl')} </Text></View>

      </View>
    );
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1, paddingHorizontal: 16}}>
    <View style={{flexDirection:"row",height:100,marginTop:10}}>
    <View style={{flex:1,borderRadius:10,backgroundColor:Colors.greenBtnColor,height:100,justifyContent:"center",alignItems:"center"}}>
      {!isBalanceLoading && <Text style={{color:"white",fontFamily:FONT.RobotoBold,fontSize:18}}>{t('storecredit_balance_lbl')} : {storebalance} DH</Text>}
      {isBalanceLoading && <Text style={{color:"white",fontFamily:FONT.RobotoBold,fontSize:18}}>{t('storecredit_balance_lbl')} : {t('storecredit_loading_lbl')}</Text>}
      <View style={{height:30,width:250,marginTop:10,flexDirection:"row"}}>
        <TextInput placeholder={t('storecredit_enteramount_lbl')} onChangeText={newText => setAmount(newText)} value={amount} style={{backgroundColor:"white",borderRadius:5,height:30,width:180,paddingStart:5}} />{isAddBalanceLoading?<View style={{width:50,backgroundColor:Colors.drawerHeaderBackground,borderRadius:5,height:30,marginStart:15,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color="white" /></View>:<TouchableOpacity onPress={()=>{addStoreBalance()}}><View style={{width:50,backgroundColor:Colors.drawerHeaderBackground,borderRadius:5,height:30,marginStart:15,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontFamily:FONT.RobotoBold}}>{t('storecredit_add_lbl')}</Text></View></TouchableOpacity>}
      </View>
      
    </View>
    
    </View>  
    <View style={{marginTop:20,marginHorizontal:0,height:35,backgroundColor:"gray",justifyContent:"center",alignItems:"flex-start",borderTopLeftRadius:5,borderTopRightRadius:5}}><Text style={{paddingStart:5,fontFamily:FONT.RobotoRegular,fontSize:18,color:"white"}}>{t('storecredit_transactions_lbl')}</Text></View>
    <ScrollView style={{flex:1,backgroundColor:Colors.commonbg,marginBottom:10}}>
    {isLoading?<View style={{height:200,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:datatransaction.length >0?<FlatList
        data={datatransaction}
        renderItem={({ item }) => <ItemRender item={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemDivider}
        ListHeaderComponent={FlatList_Header}
        ListHeaderComponentStyle={{ borderBottomColor: 'red', borderBottomWidth: 2 }}
      />:<View style={{height:200,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,color:"black"}}>{t('storecredit_notransactionfound_lbl')}</Text></View>}
    </ScrollView>
    </View>
  </SafeAreaView>
  );
};
const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8
  },

  itemText: {
    fontSize: 24,
    color: 'black'
  },
  
});

export default StoreCredit;