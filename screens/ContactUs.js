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
import { WebView } from 'react-native-webview';

import { APICONFIG } from "../config/api";
const ContactUs = (props) => {

  const [isDataLoading,setDataLoading] = useState(true);  
  const [dataContent,setDataContent] = useState("");
  useEffect(() => {
  
    getCmsData();
  
  }, []);
  
  //fetch popular products//
  const getCmsData = async () => {
    try {
     const response = await fetch(APICONFIG.API_URL+"/pages/136",
                                {
                                  method:"GET",
                                 
                                  headers : {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    
                                  }
                              });
     const json = await response.json();
     
     setDataContent(json.content.rendered);
  
   } catch (error) {
     console.error(error);
   } finally {
    setDataLoading(false);
   }
  }  
  
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {isDataLoading?
      <View style={{ flex: 1,justifyContent:"center",alignItems:"center"}}>
       <ActivityIndicator size={"small"} color={Colors.greenBtnColor} />
      </View> :
       <View style={{ flex: 1}}>
       <WebView
          originWhitelist={['*']}
          source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>'+dataContent+'</body>'}}
        />
      </View>}
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

export default ContactUs;