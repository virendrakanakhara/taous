import React,{ useEffect, useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView 
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
import {DataTable} from  "react-native-paper"
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import { t } from "i18next";
const TimeSlots = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();
  const [isDataLoading,setDataLoading] = useState(false);
  const [data,setData]=useState({"delivery_times":[],"pickup_times":[]});

  useEffect(() => {
    getTimeSlots();
    
  },[]);
  
  const getTimeSlots = async () => {
    
    setDataLoading(true);
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
  
     
    setData(json);
     
     
   } catch (error) {
     console.error(error);
     alert(error)
     
   } finally {
    setDataLoading(false);
   }
   
  }
  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <ScrollView>
    <View style={{ flex: 1,margin:20 }}>
      <View style={{width:"100%",height:1200}}>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('timeslots_standarddelivery_lbl')}</Text></View>
         <View style={{height:60,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
             <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoMedium,fontSize:16,textAlign:"left"}}>{t('timeslots_standarddelivery_subtitle_lbl')}</Text></View>
             
         </View>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('timeslots_expressdelivery_lbl')}</Text></View>
         <View style={{height:60,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
         <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoMedium,fontSize:16,textAlign:"left"}}>{t('timeslots_expressdelivery_subtitle_lbl')}</Text></View>
                                                       
         
         </View>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('timeslots_pickup_lbl')}</Text></View>
         <View style={{height:60,borderWidth:1,borderColor:Colors.commonbg,width:"100%"}} >
         <View style={{margin:10,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoMedium,fontSize:16,textAlign:"left"}}>{t('timeslots_pickup_subtitle_lbl')}</Text></View>
                                                       
         
         </View>
         <View style={{height:100,width:"100%"}} >
         <TouchableOpacity><View style={{marginTop:15,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoBold,fontSize:16,color:Colors.greenBtnColor}}>{t('timeslots_learnmoreaboutdelivery_lbl')}</Text></View></TouchableOpacity>
         <TouchableOpacity><View style={{marginTop:15,flexDirection:"row"}}><Text style={{fontFamily:FONT.RobotoBold,fontSize:16,color:Colors.greenBtnColor}}>{t('timeslots_learnmoreaboutdeliverypass_lbl')}</Text></View></TouchableOpacity>
         </View>
         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('timeslots_availabledeliverytimeslots_lbl')}</Text></View>
         {!isDataLoading && <ScrollView horizontal style={{height:350}}>
             <View style={{width:720,height:350}}>
             <View style={{backgroundColor:"#ecf3da",height:50,width:720,flexDirection:"row"}}>
                {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>{item.dt}</Text><Text style={{color:"black"}}>{item.weekday}</Text></View>)})}
                {/* <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Monday</Text></View>
                <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Tuesday</Text></View>
                <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Wednesday</Text></View>
                <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Thursday</Text></View>
                <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Friday</Text></View>
                <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Saturday</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[0].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[1].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[2].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[3].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[4].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[5].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[6].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[7].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[8].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.delivery_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[9].text}</Text></View>)})}
               {/*  <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>07:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>07:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>07:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>07:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>07:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>07:00 PM</Text></View> */}
             </View>
             </View>
         
         </ScrollView>}

         <View style={{height:45,backgroundColor:Colors.commonbg,width:"100%",justifyContent:"center"}} ><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:16,marginStart:10,textAlign:"left"}}>{t('timeslots_availabledpickuptimeslots_lbl')}</Text></View>
         {!isDataLoading && <ScrollView horizontal style={{height:350}}>
             <View style={{width:720,height:350}}>
             <View style={{backgroundColor:"#ecf3da",height:50,width:720,flexDirection:"row"}}>
                {data.pickup_times.map((item)=>{ return (<View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>{item.dt}</Text><Text style={{color:"black"}}>{item.weekday}</Text></View>)})}
                {/* <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Monday</Text></View>
                <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Tuesday</Text></View>
                <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Wednesday</Text></View>
                <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Thursday</Text></View>
                <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Friday</Text></View>
                <View style={{width:120,height:50,justifyContent:"center",alignItems:"center",margin:1}}><Text style={{color:"black"}}>2022/04/10</Text><Text style={{color:"black"}}>Saturday</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.pickup_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[0].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>10:00 AM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.pickup_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[1].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>11:00 AM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.pickup_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[2].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>12:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.pickup_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[3].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>01:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.pickup_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[4].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>02:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.pickup_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[5].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>03:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.pickup_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[6].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>04:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.pickup_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[7].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>05:00 PM</Text></View> */}
             </View>
             <View style={{backgroundColor:Colors.commonbg,height:30,width:720,flexDirection:"row"}}>
             {data.pickup_times.map((item)=>{ return (<View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>{item.tm[8].text}</Text></View>)})}
                {/* <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View>
                <View style={{width:120,height:30,justifyContent:"center",alignItems:"center",margin:1,backgroundColor:"white"}}><Text style={{color:"black"}}>06:00 PM</Text></View> */}
             </View>
            
             </View>
         
         </ScrollView>}
         
      </View>  
    
    </View>
    </ScrollView>
  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table:{
        height:200
  },
  headSection:{
      borderBottomWidth:2,
      borderColor:'black',
      paddingBottom:15,
      
  },
  titleHeading:{
      marginTop:50,
      fontWeight:'bold',
      
  },
  tableHeading:{
      fontWeight:'bold',
      color:'black',
  },
  header:{
      
      backgroundColor:"#ecf3da"
  },
  
});

export default TimeSlots;