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
import {FONT} from '../style/fonts';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import { t } from "i18next";


const AwesaPlus = (props) => {
  const {user} =  useSelector(state=>state.userReducer);
  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();
  const [subData,setSubData]=useState();
  const [isLoading,setLoading] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
    
  },[]);
  
  const fetchSubscriptions = async () => {
   
  
    
    
  
    setLoading(true);
     try {
     const response = await fetch(APICONFIG.REST_WC_URL+"/user_subscriptions?user_id="+user.ID,
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
      setSubData(json);
    }
    
    
  } catch (error) {
    console.error(error);
    alert(error)
    
  } finally {
   setLoading(false);
  }
  
  
 }

 const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.name}>Subscription ID : #{item.subscription_id}</Text>
    <Text style={styles.name}>Start Date : {item.start_date}</Text>
    <Text style={styles.name}>End Date : {item.end_date}</Text>
    <Text style={styles.name}>Next Due Date : {item.next_payment_due_date}</Text>
    <Text style={styles.name}>Product Name : {item.subscription.product_name}</Text>
    <Text style={{fontSize: 18,
    color:item.subscription_status=='active'?Colors.greenBtnColor:"red",
    fontFamily:FONT.RobotoMedium,
    paddingStart:5
    ,textAlign:"left"}}>Status : {item.subscription_status}</Text>
    
  </View>
);


 const renderItem = ({ item }) => (
  <Item item={item} />
);
  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1, marginTop:10 }}>
    
    
       
    
    
    
    
    <View style={{marginHorizontal:10,flexDirection:"row"}}>
       
       <TouchableOpacity onPress={()=>props.navigation.navigate('BuyAwesaPlus')} style={{flex:1}}><View style={{width:"100%",height:45,borderRadius:3,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:16,fontFamily:FONT.RobotoMedium}}>Start Free Delivery</Text></View></TouchableOpacity>
    </View>
    <View style={{marginHorizontal:10,marginBottom:70}}>
      <View style={{height:30,backgroundColor:Colors.commonbg,marginTop:10,justifyContent:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:16,paddingStart:5}}>Subscription History</Text></View>
      {!isLoading && <FlatList
        data={subData && subData.subscription_history}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />}
      {isLoading && <View style={{marginTop:10}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor}></ActivityIndicator></View>}
    </View>
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
  item: {
    backgroundColor: "white",
    
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius:10,
    borderColor:Colors.commonbg,
    borderWidth:2,
    paddingBottom:10
  },
  name: {
    fontSize: 18,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    paddingStart:5
    ,textAlign:"left"
  },
});

export default AwesaPlus;