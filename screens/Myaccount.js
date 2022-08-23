import React,{ useEffect, useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView 
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
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import {makeid} from '../commonfunctions';
import Oval from "../components/Oval";

import { useIsFocused } from "@react-navigation/native";
import { t } from "i18next";
const Myaccount = (props) => {
  const isFocused = useIsFocused();
  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);
  const {lang} = useSelector(state=>state.langReducer)
  
  

  useEffect(() => {
        if(Object.keys(user).length == 0)
        {
          
          props.navigation.navigate("Home",{screen:"SignIn"});

        }
        
  },[isFocused]);

  const DATA = [
    {
      id: 'orderhistory',
      name:"Order History",
      iconname:"list-ordered",
      type:"octicon",
      screenname:"OrderHistory",
    },
    {
      id: 'wallet',
      name:"Wallet",
      iconname:"wallet",
      type:"entypo",
      screenname:"Wallet"
    },
    {
      id: 'accountdetails',
      name:"Account Details",
      iconname:"user",
      type:"feather",
      screenname:"AccountDetails"
      

    },
    {
      id: 'notifications',
      name:"Notifications",
      iconname:"bell",
      type:"feather",
      screenname:"Notifications"
    },
    {
      id: 'addresses',
      name:"Addresses",
      iconname:"address",
      type:"entypo",
      screenname:"LocalPickup"
    },
   
    {
      id: 'timeslots',
      name:"Time Slots",
      iconname:"time-slot",
      type:"entypo",
      screenname:"TimeSlots"
    },
   
    {
      id: 'wishlist',
      name:"Wishlist",
      iconname:"heart",
      type:"entypo",
      screenname:"WishList"
    },
    {
      id: 'awesaplus',
      name:"Delivery Pass",
      iconname:"truck",
      type:"feather",
      screenname:"AwesaPlus"
    },
    {
      id: 'setareminder',
      name:"Set A Reminder",
      iconname:"alarm",
      type:"ionicon",
      screenname:"SetAReminder"
    },
    {
      id: 'storecredit',
      name:"Store Credit",
      iconname:"credit-card",
      type:"feather",
      screenname:"StoreCredit"
    },
    {
      id: 'giftcards',
      name:"Gift Cards",
      iconname:"gift",
      type:"feather",
      screenname:"GiftCards"
    },
    
  ];
  const Item = ({ item }) => (
    <View style={item.id=="orderhistory" || item.id=="wallet"?styles.item2:styles.item}>
      <TouchableOpacity  style={{justifyContent:"center",
    alignItems:"center"}}>
      
      <OctIcon
      color={Colors.greenBtnColor}
      name={item.iconname}
      size={50}
    />
        
      <Text style={styles.address_name2}>Purchase History</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item item={item} />
  );
  
  return (
    <SafeAreaView style={{ flex: 1}}>
      
    <LinearGradient  colors={[Colors.greenBtnColor,Colors.greenBtnColor,Colors.greenBtnColor]} style={{flex:1}}>
   
    <View style={{ flex: 1 }}>
    <ScrollView>
    {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.id}
      /> */}
      <View style={{position:"absolute",height:600,top:290,left:0,width:"100%",backgroundColor:"white"}}></View>
      <TouchableOpacity onPress={()=>props.navigation.navigate("OrderHistory")}><View style={styles.item2}>
     
    
      <View style={{flexDirection:"row",flex:1}}><View style={{flex:1,alignItems:"center",justifyContent:"center"}}><OctIcon
      color={"black"}
      name="list-ordered"
      size={30}
    /></View>
    
          
      <View style={{flex:3,justifyContent:"center"}}><Text style={styles.address_name2}>{t('myaccount_purchasehistory_lbl')}</Text></View>
      <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><EntypoIcon
      color={"black"}
      name={lang=='ar'?"chevron-left":"chevron-right"}
      size={20}
    /></View>
      </View>
      <View style={{height:50,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,margin:5,fontSize:14,color:"black",textAlign:"left"}}>{t('myaccount_purchasehistory_note_lbl')}</Text></View>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>props.navigation.navigate("Wallet")}>
    <View style={styles.item2}>
     
    
     <View style={{flexDirection:"row",flex:1}}><View style={{flex:1,alignItems:"center",justifyContent:"center"}}><EntypoIcon
     color={"black"}
     name="wallet"
     size={30}
   /></View>
         
     <View style={{flex:3,justifyContent:"center"}}><Text style={styles.address_name2}>{t('myaccount_wallet_lbl')}</Text></View>
     <View style={{flex:1,alignItems:"center",justifyContent:"center"}}><EntypoIcon
     color={"black"}
     name={lang=='ar'?"chevron-left":"chevron-right"}
     size={20}
   /></View>
     </View>
     <View style={{height:50,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,margin:5,fontSize:14,color:"black",textAlign:"left"}}>{t('myaccount_wallet_note_lbl')}</Text></View>
   </View>
   </TouchableOpacity>

      <View style={{flexDirection:"row",marginHorizontal:25}}>
      <View style={styles.item}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("AccountDetails")} style={{justifyContent:"center",
    alignItems:"center"}}>
    
      <FeatherIcon
      color={"black"}
      name="user"
      size={50}
    />
          
      <Text style={styles.address_name}>{t('myaccount_accountdetails_lbl')}</Text>
      </TouchableOpacity>
    </View><View style={styles.item}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("Notifications")} style={{justifyContent:"center",
    alignItems:"center"}}>
    
      <FeatherIcon
      color={"black"}
      name="bell"
      size={50}
    />
          
      <Text style={styles.address_name}>{t('myaccount_notifications_lbl')}</Text>
      </TouchableOpacity>
    </View>
      </View>

      <View style={{flexDirection:"row",marginHorizontal:25}}>
      <View style={styles.item}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("LocalPickup")}  style={{justifyContent:"center",
    alignItems:"center"}}>
    
      <EntypoIcon
      color={"black"}
      name="address"
      size={50}
    />
          
      <Text style={styles.address_name}>{t('myaccount_addresses_lbl')}</Text>
      </TouchableOpacity>
    </View><View style={styles.item}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("TimeSlots")} style={{justifyContent:"center",
    alignItems:"center"}}>
    
      <EntypoIcon
      color={"black"}
      name="time-slot"
      size={50}
    />
          
      <Text style={styles.address_name}>{t('myaccount_timeslots_lbl')}</Text>
      </TouchableOpacity>
    </View>
      </View>

      <View style={{flexDirection:"row",marginHorizontal:25}}>
      <View style={styles.item}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("WishList")}  style={{justifyContent:"center",
    alignItems:"center"}}>
    
      <EntypoIcon
      color={"black"}
      name="heart"
      size={50}
    />
          
      <Text style={styles.address_name}>{t('myaccount_wishlist_lbl')}</Text>
      </TouchableOpacity>
    </View><View style={styles.item}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("AwesaPlus")} style={{justifyContent:"center",
    alignItems:"center"}}>
    
    <Image 
                            style={{aspectRatio:166/100,height:50}}
                            source={require('../assets/images/awesa_plus_truck.png')}
                            resizeMode="contain"
                            
                            />
          
      <Text style={styles.address_name}>{t('myaccount_deliverypass_lbl')}</Text>
      </TouchableOpacity>
    </View>
      </View>


      <View style={{flexDirection:"row",marginHorizontal:25}}>
      <View style={styles.item}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("SetAReminder")} style={{justifyContent:"center",
    alignItems:"center"}}>
    
      <IonIcon
      color={"black"}
      name="alarm"
      size={50}
    />
          
      <Text style={styles.address_name}>{t('myaccount_setareminder_lbl')}</Text>
      </TouchableOpacity>
    </View><View style={styles.item}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("StoreCredit")}  style={{justifyContent:"center",
    alignItems:"center"}}>
    
      <FeatherIcon
      color={"black"}
      name="credit-card"
      size={50}
    />
          
      <Text style={styles.address_name}>{t('myaccount_storecredit_lbl')}</Text>
      </TouchableOpacity>
    </View>
      </View>

      <View style={{flexDirection:"row"}}>
      <View style={styles.item2}>
      <TouchableOpacity onPress={()=>props.navigation.navigate("GiftCards")} style={{justifyContent:"center",
    alignItems:"center"}}>
    
      <FeatherIcon
      color={"black"}
      name="gift"
      size={50}
    />
          
      <Text style={styles.address_name}>{t('myaccount_giftcards_lbl')}</Text>
      </TouchableOpacity>
    </View>
   
      </View>

      <View style={{backgroundColor:"white",marginTop:20}}>
        <View style={{justifyContent:"center",alignItems:"center",marginTop:10}}>
          <Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"gray"}}>{t('common_lovetohear_lbl')}</Text>
          <TouchableOpacity><View style={{width:140,height:30,marginTop:10,justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:Colors.greenBtnColor,backgroundColor:"white",borderRadius:12}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:"black"}}>{t('common_givefeedback_lbl')}</Text></View></TouchableOpacity>
          
       </View>
       <TouchableOpacity onPress={()=>props.navigation.navigate("About")}><Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"gray",marginStart:25,marginTop:70,textAlign:"left"}}>{t('myaccount_aboutus_lbl')}</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>props.navigation.navigate("Help")}><Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"gray",marginStart:25,marginTop:20,textAlign:"left"}}>{t('myaccount_helpfaq_lbl')}</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>props.navigation.navigate("DeliveryInfo")}><Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"gray",marginStart:25,marginTop:20,textAlign:"left"}}>{t('myaccount_deliveryinfo_lbl')}</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>props.navigation.navigate("DeliveryTerms")}><Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"gray",marginStart:25,marginTop:20,textAlign:"left"}}>{t('myaccount_deliverypasstc_lbl')}</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>props.navigation.navigate("Terms")}><Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"gray",marginStart:25,marginTop:20,textAlign:"left"}}>{t('myaccount_termnconditions_lbl')}</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>props.navigation.navigate("PrivacyPolicy")}><Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"gray",marginStart:25,marginTop:20,textAlign:"left"}}>{t('myaccount_privacypolicy_lbl')}</Text></TouchableOpacity>
       <TouchableOpacity onPress={()=>props.navigation.navigate("ContactUs")}><Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"gray",marginStart:25,marginTop:20,marginBottom:50,textAlign:"left"}}>{t('myaccount_contactus_lbl')}</Text></TouchableOpacity>
      </View>
      
    </ScrollView>  
    </View>
   
    </LinearGradient>
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
    flex:1/2,
    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius:10,
    borderColor:Colors.greenBtnColor,
    height:100,
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center"

  },
  item2: {
    flex:1,
    backgroundColor: "white",
    
    marginVertical: 8,
    marginHorizontal: 30,
    borderRadius:10,
    borderColor:Colors.greenBtnColor,
    height:100,
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center"

  },
  address_name: {
    fontSize: 14,
    color:"black",
    fontFamily:FONT.RobotoSemiBold,
    marginTop:5
  
  },
  address_name2: {
    fontSize: 20,
    color:"black",
    fontFamily:FONT.RobotoSemiBold,
    textAlign:"left"
    
    
  
  },
});

export default Myaccount;