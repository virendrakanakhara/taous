import React,{ useEffect,useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
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
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import { t } from "i18next";



const GiftCards = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {user} =  useSelector(state=>state.userReducer);
  const dispatch = useDispatch();
  const [section,setSection] = useState(1);
  const [carddata,setCardData]=useState();
  const [isLoading,setLoading] = useState(false);
  
  useEffect(() => {
    fetchCards();
    
  },[]);


  const ItemRender = ({ item }) => (
    <View style={{
      height: 50,
      
      backgroundColor: Colors.commonbg,
     
      flexDirection:"row",
      flex:1
    }}>

      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 14, color: 'black',fontFamily:FONT.RobotoRegular }}>{item.code}</Text></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 14, color: 'black',fontFamily:FONT.RobotoRegular }}>{item.balance}</Text></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 14, color: 'black',fontFamily:FONT.RobotoRegular }}>{item.order_id >0?"Code is used !!":"The code has not been used yet"}</Text></View>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 14, color: 'black',fontFamily:FONT.RobotoRegular }}>{item.status} </Text></View>
      

    </View>
  );

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: Colors.commonbg,
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

        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'white',fontFamily:FONT.RobotoBold }}> {t('giftcards_code_lbl')} </Text></View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'white',fontFamily:FONT.RobotoBold }}> {t('giftcards_balance_lbl')} </Text></View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'white',fontFamily:FONT.RobotoBold }}> {t('giftcards_usage_lbl')} </Text></View>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize: 16, color: 'white',fontFamily:FONT.RobotoBold }}> {t('giftcards_status_lbl')} </Text></View>
        

      </View>
    );
  }



  const fetchCards = async () => {
   
  
    
    
  
    setLoading(true);
     try {
     const response = await fetch(APICONFIG.REST_WC_URL+"/user_giftcards?user_id="+user.ID+"&user_email="+user.user_email,
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
      setCardData(json);
    }
    
    
  } catch (error) {
    console.error(error);
    alert(error)
    
  } finally {
   setLoading(false);
  }
  
  
 }
  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1 }}>
    <><View style={{flexDirection:"row",height:35}}>
            <TouchableOpacity style={{flex:1}} onPress={()=> setSection(1)} ><View style={{flex:1,alignItems:"center",justifyContent:"center",height:35,backgroundColor:Colors.greenBtnColor,borderBottomWidth:section==1?5:0,borderBottomColor:Colors.drawerHeaderBackground}}><Text style={{color:"white",fontSize:14,fontFamily:section==1?FONT.RobotoBold:FONT.RobotoRegular}}>{t('giftcards_purchasedcards_lbl')}</Text></View></TouchableOpacity>
            <TouchableOpacity style={{flex:1}} onPress={()=> setSection(2)}><View style={{flex:1,height:35,alignItems:"center",justifyContent:"center",backgroundColor:Colors.greenBtnColor,borderBottomWidth:section==2?5:0,borderBottomColor:Colors.drawerHeaderBackground}}><Text style={{color:"white",fontSize:14,fontFamily:section==2?FONT.RobotoBold:FONT.RobotoRegular}}>{t('giftcards_receivedcards_lbl')}</Text></View></TouchableOpacity>
            
                                          
            </View></>

    
    <TouchableOpacity onPress={()=>props.navigation.navigate('PurchaseGiftCard')} style={{height:60,position:"absolute",bottom:0,left:0,width:"95%",marginStart:10}} ><View style={{height:40,justifyContent:"center",alignItems:"center",backgroundColor:Colors.greenBtnColor,height:40,marginVertical:10,marginHorizontal:3,borderRadius:10}}>
    <Text style={{color:"white",fontFamily:FONT.RobotoBold}}>{t('giftcards_purchasegiftcard_lbl')}</Text>
    </View>
    </TouchableOpacity>
    
        {section==1 && !isLoading && carddata && carddata.sent_cards && carddata.sent_cards.length > 0 && <View style={{marginTop:5,flex:1,marginBottom:80}}>
      <FlatList
        data={carddata && carddata.sent_cards?carddata.sent_cards:[]}
        renderItem={({ item }) => <ItemRender item={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemDivider}
        ListHeaderComponent={FlatList_Header}
        ListHeaderComponentStyle={{ borderBottomColor: 'white', borderBottomWidth: 2 }}
      />
      </View>
      
      
      }
     {section==1 && !isLoading && carddata && carddata.sent_cards && carddata.sent_cards.length == 0 && <View style={{marginTop:5,flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,color:"black"}}>{t('giftcards_nopurchasedcards_lbl')}</Text></View>}  
     {section==1 && isLoading && <View style={{height:200,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>}
     

     {section==2 && !isLoading && carddata && carddata.recived_cards && carddata.recived_cards.length > 0 && <View style={{marginTop:5,flex:1}}>
      <FlatList
        data={carddata && carddata.recived_cards?carddata.recived_cards:[]}
        renderItem={({ item }) => <ItemRender item={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemDivider}
        ListHeaderComponent={FlatList_Header}
        ListHeaderComponentStyle={{ borderBottomColor: 'white', borderBottomWidth: 2 }}
      />
      </View>
      }
     {section==2 && !isLoading && carddata && carddata.recived_cards && carddata.recived_cards.length == 0 && <View style={{marginTop:5,flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,color:"black"}}>{t('giftcards_noreceivedcards_lbl')}</Text></View>} 
     {section==2 && isLoading && <View style={{height:200,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>}
     


    </View>
  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default GiftCards;