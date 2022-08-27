import React,{ useEffect, useState } from "react";
import { View, 
  Button, 
  Text,
  TextInput, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { Colors } from "../style/colors";
import {FONT} from "../style/fonts";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { getBooks ,addBookmark, removeBookmark,addToCart,createAndAddToWishlist, setFirstTime,getTopItems,getUserAddresses,addMultipleToCart,setWishlist,getUserWishlists} from '../redux/actions';  
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { t } from "i18next";
import { useFocusEffect } from '@react-navigation/native';

import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';

const Localpickup = () => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {user} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [mode,setMode] = useState(1); //1==normal,2==add new addresss mode,3==edit address mode

  const [addressid,setAddressId] = useState(0);
  const [addressname,setAddressName] = useState();
  const [firstname,setFirstName] = useState();
  const [lastname,setLastName] = useState();
  const [companyname,setCompanyName] = useState();
  const [address1,setAddress1] = useState();
  const [address2,setAddress2] = useState();
  const [city,setCity] = useState();
  const [statename,setStateName] = useState();
  const [zipcode,setZipcode] = useState();
  const [phone,setPhone] = useState();
  const [email,setEmail] = useState();
  const [loading,setLoading] = useState(false);


  const fetchUserAddresses = () => dispatch(getUserAddresses());
  useFocusEffect(
    React.useCallback(() => {
        
          fetchUserAddresses();
  
        }, [])
  );

  const resetState = () => {
     setAddressId(0);
     setAddressName();
     setFirstName();
     setLastName();
     setCompanyName();
     setAddress1();
     setAddress2();
     setCity();
     setStateName();
     setZipcode();
     setPhone();
     setEmail();

  }

  const setEditItem = (item) =>{
     setAddressId(item.id);
     setAddressName(item.address_name);
     setFirstName(item.first_name);
     setLastName(item.last_name);
     setCompanyName(item.company);
     setAddress1(item.address_1);
     setAddress2(item.address_2);
     setCity(item.city);
     setStateName(item.state);
     setZipcode(item.postcode);
     setPhone(item.phone);
     setEmail(item.email);
     setMode(2);
  }

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      address_name:"Home",
      first_name:"John",
      last_name:"Mathew",
      company:"",
      address_1:"Shop 110-119",
      address_2:"Centre Commercial Marjane Bouskoura",
      city:"Casablanca",
      state:"",
      country:"Morocco",
      postcode:"20000"

    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      address_name:"Office",
      first_name:"John",
      last_name:"Mathew",
      company:"Mathew Llc",
      address_1:"Shop 110-119",
      address_2:"Centre Commercial Marjane Bouskoura",
      city:"Casablanca",
      state:"",
      country:"Morocco",
      postcode:"10028"
    },
    
  ];
  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.address_name}>{item.address_name}</Text>
      <Text style={styles.name}>{item.first_name+" "+item.last_name}</Text>
      <Text style={styles.name}>{item.company}</Text>
      <Text style={styles.name}>{item.address_1}</Text>
      <Text style={styles.name}>{item.address_2}</Text>
      <Text style={styles.name}>{item.city}</Text>
      <Text style={styles.name}>{item.state}</Text>
      <Text style={styles.name}>{item.country}</Text>
      <Text style={styles.name}>{item.postcode}</Text>
      <View style={{position:"absolute",top:5,end:10,width:30,height:50,flexDirection:"row",justifyContent:"space-between",paddingTop:8}}>
      <TouchableOpacity onPress={()=>setEditItem(item)}><EntypoIcon
              color={Colors.greenBtnColor}
              name='edit'
              size={20}
            /></TouchableOpacity>
     {/*  <TouchableOpacity><AntIcon
              color={Colors.greenBtnColor}
              name='delete'
              size={20}
            /></TouchableOpacity>  */} 
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  const addAddress = async () => {
   
    if(addressname == undefined || addressname.length == 0)
    {
      alert(t('localpickup_pleaseenteraddressname_lbl'))
    }
    else if(firstname == undefined || firstname.length == 0)
    {
      alert(t('localpickup_pleaseenterfirstname_lbl'))
    }
    else if(lastname == undefined || lastname.length == 0)
    {
      alert(t('localpickup_pleaseenterlastname_lbl'))
    }
    else if(address1 == undefined || address1.length == 0)
    {
      alert(t('localpickup_pleaseenteraddress_lbl'))
    }
    else if(city == undefined || city.length == 0)
    {
      alert(t('localpickup_pleaseentercity_lbl'))
    }
    else if(statename == undefined || statename.length == 0)
   {
     alert(t('localpickup_pleaseenterstate_lbl'))
   }
    else if(zipcode == undefined || zipcode.length == 0)
    {
      alert(t('localpickup_pleaseenterzipcode_lbl'))
    }
    else if(phone == undefined || phone.length == 0)
    {
      alert(t('localpickup_pleaseenterphone_lbl'))
    }
    else if(email == undefined || email.length == 0)
    {
      alert(t('localpickup_pleaseenteremail_lbl'))
    }
    else
    {
      
      
          setLoading(true)
          try {
          const response = await fetch(APICONFIG.REST_WC_URL+"/api_customer_add_address?",
                                      {
                                        method:"POST",
                                        body: JSON.stringify({
                                          
                                          user_id:user.ID,
                                          address_name:addressname,
                                          first_name:firstname,
                                          last_name:lastname,
                                          company:companyname,
                                          country:"MA",
                                          address_1:address1,
                                          address_2:address2,
                                          city:city,
                                          state:statename,
                                          postcode:zipcode,
                                          phone:phone,
                                          email:email
                                        }),
                                        headers : {
                                          Accept: 'application/json',
                                          'Content-Type': 'application/json',
                                          Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                        }
                                  });
          
          const json = await response.json();
            
        if(json.success && json.message)
          {
          alert("Address saved successfully !!")
          resetState();
          fetchUserAddresses();
          }
          else
          {
            alert("Something went wrong,Please try again later !!")
          }
          
          
        } catch (error) {
          console.error(error);
          alert(error)
          
        } finally {
          
          setMode(1);
          setLoading(false);
        }   
    }
  
    
    
  
     
  
  
 }

 const updateAddress = async () => {
   
  if(addressname == undefined || addressname.length == 0)
  {
    alert(t('localpickup_pleaseenteraddressname_lbl'))
  }
  else if(firstname == undefined || firstname.length == 0)
  {
    alert(t('localpickup_pleaseenterfirstname_lbl'))
  }
  else if(lastname == undefined || lastname.length == 0)
  {
    alert(t('localpickup_pleaseenterlastname_lbl'))
  }
  else if(address1 == undefined || address1.length == 0)
  {
    alert(t('localpickup_pleaseenteraddress_lbl'))
  }
  else if(city == undefined || city.length == 0)
  {
    alert(t('localpickup_pleaseentercity_lbl'))
  }
  else if(statename == undefined || statename.length == 0)
 {
   alert(t('localpickup_pleaseenterstate_lbl'))
 }
  else if(zipcode == undefined || zipcode.length == 0)
  {
    alert(t('localpickup_pleaseenterzipcode_lbl'))
  }
  else if(phone == undefined || phone.length == 0)
  {
    alert(t('localpickup_pleaseenterphone_lbl'))
  }
  else if(email == undefined || email.length == 0)
  {
    alert(t('localpickup_pleaseenteremail_lbl'))
  }
  else
  {
    
    
        setLoading(true)
        try {
        const response = await fetch(APICONFIG.REST_WC_URL+"/api_customer_save_address?",
                                    {
                                      method:"POST",
                                      body: JSON.stringify({
                                        address_id:addressid,
                                        user_id:user.ID,
                                        address_name:addressname,
                                        first_name:firstname,
                                        last_name:lastname,
                                        company:companyname,
                                        country:"MA",
                                        address_1:address1,
                                        address_2:address2,
                                        city:city,
                                        state:statename,
                                        postcode:zipcode,
                                        phone:phone,
                                        email:email
                                      }),
                                      headers : {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                      }
                                });
        
        const json = await response.json();
          
      if(json.success && json.message)
        {
        alert("Address saved successfully !!")
        resetState();
        fetchUserAddresses();
        }
        else
        {
          alert("Something went wrong,Please try again later !!")
        }
        
        
      } catch (error) {
        console.error(error);
        alert(error)
        
      } finally {
        
        setMode(1);
        setLoading(false);
      }   
  }

  
  

   


}
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
    {mode == 1 && <TouchableOpacity onPress={()=>{resetState();setMode(2)}}><View style={{justifyContent:"center",alignItems:"center",backgroundColor:Colors.greenBtnColor,height:40,marginVertical:10,marginHorizontal:3,borderRadius:10}}>
    <Text style={{color:"white",fontFamily:FONT.RobotoBold}}>{t('localpickup_addnewaddress_lbl')}</Text>
    </View>
    </TouchableOpacity> }
    {mode==1?user.addresses.profile_addresses.length > 0 ? <FlatList
        data={user.addresses.profile_addresses}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />:<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:18,color:Colors.drawerHeaderBackground}}>{t('localpickup_youdonothaveaddress_lbl')}</Text></View>:
      <ScrollView style={{flex:1}}><View style={{flex:1,marginVertical:20,borderWidth:2,borderRadius:10,borderColor:Colors.commonbg}}>
        <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,paddingStart:10,paddingVertical:10}}>{t('localpickup_addressname_lbl')}</Text><Text style={{fontSize:20,color:"red",paddingTop:5}}>*</Text></View>
        <TextInput onChangeText={newText => setAddressName(newText)} value={addressname}  style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} />
        <View style={{flexDirection:"row"}}><View style={{flexDirection:"row",flex:1}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,paddingStart:10,paddingVertical:10}}>{t('localpickup_firstname_lbl')}</Text><Text style={{fontSize:20,color:"red",paddingTop:5}}>*</Text></View><View style={{flexDirection:"row",flex:1}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,paddingStart:10,paddingVertical:10}}>{t('localpickup_lastname_lbl')}</Text><Text style={{fontSize:20,color:"red",paddingTop:5}}>*</Text></View></View>
        <View style={{flexDirection:"row"}}><TextInput onChangeText={newText => setFirstName(newText)} value={firstname}  style={{flex:1,fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} /><TextInput onChangeText={newText => setLastName(newText)} value={lastname}  style={{flex:1,fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} /></View>
        <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,paddingStart:10,paddingVertical:10}}>{t('localpickup_companyname_lbl')}</Text></View>
        <TextInput onChangeText={newText => setCompanyName(newText)} value={companyname}  style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} />
        <Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,width:"100%",padding:10,textAlign:"left"}}>{t('localpickup_countryregion_lbl')} : Morocco</Text>
        <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,paddingStart:10,paddingVertical:10}}>{t('localpickup_streetaddress_lbl')}</Text><Text style={{fontSize:20,color:"red",paddingTop:5}}>*</Text></View>
        <TextInput onChangeText={newText => setAddress1(newText)} value={address1}  style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} />
        <TextInput onChangeText={newText => setAddress2(newText)} value={address2}  style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} />
        <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,paddingStart:10,paddingVertical:10}}>{t('localpickup_towncity_lbl')}</Text><Text style={{fontSize:20,color:"red",paddingTop:5}}>*</Text></View>
        <TextInput onChangeText={newText => setCity(newText)} value={city}  style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} />
        <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,paddingStart:10,paddingVertical:10}}>{t('localpickup_statecounty_lbl')}</Text><Text style={{fontSize:20,color:"red",paddingTop:5}}>*</Text></View>
        <TextInput onChangeText={newText => setStateName(newText)} value={statename}  style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} />
        <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,paddingStart:10,paddingVertical:10}}>{t('localpickup_postalcodezip_lbl')}</Text><Text style={{fontSize:20,color:"red",paddingTop:5}}>*</Text></View>
        <TextInput onChangeText={newText => setZipcode(newText)} value={zipcode} style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} />
        <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,paddingStart:10,paddingVertical:10}}>{t('localpickup_phone_lbl')}</Text><Text style={{fontSize:20,color:"red",paddingTop:5}}>*</Text></View>
        <TextInput onChangeText={newText => setPhone(newText)} value={phone}  style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} />
        <View style={{flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"black",fontSize:16,paddingStart:10,paddingVertical:10}}>{t('localpickup_emailaddress_lbl')}</Text><Text style={{fontSize:20,color:"red",paddingTop:5}}>*</Text></View>
        <TextInput onChangeText={newText => setEmail(newText)} value={email}  style={{fontFamily:FONT.RobotoRegular,fontSize:16,borderRadius:3,borderWidth:1,borderColor:Colors.greenBtnColor,height:30,paddingStart:3,margin:10}} />
        {!loading &&  <View style={{flexDirection:"row"}}><TouchableOpacity onPress={()=>{addressid>0?updateAddress():addAddress()}} style={{flex:1}}><View style={{flex:1,height:35,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center",margin:10,borderRadius:5}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"white",fontSize:16}}>{addressid>0?t('localpickup_updateaddress_lbl'):t('localpickup_addaddress_lbl')}</Text></View></TouchableOpacity><TouchableOpacity onPress={()=>{setMode(1)}} style={{flex:1}}><View style={{flex:1,height:35,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center",margin:10,borderRadius:5}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"white",fontSize:16}}>{t('common_cancel_lbl')}</Text></View></TouchableOpacity></View>}
        {loading && <View style={{flexDirection:"row"}}><View style={{flex:1,height:35,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center",margin:10,borderRadius:5}}><ActivityIndicator size={"small"} color={"white"} /></View><TouchableOpacity onPress={()=>{setMode(1)}} style={{flex:1}}><View style={{flex:1,height:35,backgroundColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center",margin:10,borderRadius:5}}><Text style={{fontFamily:FONT.RobotoSemiBold,color:"white",fontSize:16}}>{t('common_cancel_lbl')}</Text></View></TouchableOpacity></View>}
      </View>
      </ScrollView>
      }
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
  address_name: {
    fontSize: 24,
    color:"black",
    height:50,
    margin:2,
    borderTopLeftRadius:10,
    paddingStart:5,
    paddingTop:5,
    backgroundColor:Colors.address_bar,
    fontFamily:FONT.RobotoRegular
    ,textAlign:"left"
  },
  name: {
    fontSize: 18,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    paddingStart:5
    ,textAlign:"left"
  },
  
});

export default Localpickup;