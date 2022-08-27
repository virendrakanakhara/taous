import React,{ useEffect } from "react";
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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const BuyAwesaPlus = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();

  
  

  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1, paddingHorizontal: 16,justifyContent:"center",alignItems:"center" }}>
    <View style={{justifyContent:"center",alignItems:"center",height:120,width:"80%",backgroundColor:Colors.greenBtnColor,marginTop:20}}><Text style={{color:"white",fontSize:32,fontFamily:FONT.RobotoBold,textAlign:"center"}}>Get Free Delivery
for 60 Days</Text></View>  
    <Text style={{color:"gray",marginTop:20,fontSize:30,fontFamily:FONT.RobotoMedium}}>Awesa +</Text>
    <View style={{height:50,width:"80%",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"}}>
          <View style={{height:30,flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <FontAwesome5Icon
            color={Colors.greenBtnColor}
            name='check-circle'
            size={16}
          />
          <Text style={{color:"black",fontSize:10,marginStart:6,fontFamily:FONT.RobotoBold}}>Unlimited Free Deliveries</Text>
          </View>
          <View style={{height:30,flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <FontAwesome5Icon
            color={Colors.greenBtnColor}
            name='check-circle'
            size={16}
          />
          <Text style={{color:"black",fontSize:10,marginStart:6,fontFamily:FONT.RobotoBold}}>Exclusive Special Offers</Text>
          </View>
        </View>
    <Text style={{color:"gray",marginTop:20,fontSize:13,fontFamily:FONT.RobotoMedium}}>Your Awesa+ membership continues until canceled.</Text>    
    <Text style={{color:"gray",marginTop:5,fontSize:13,fontFamily:FONT.RobotoMedium}}>By signing up for Awesa+, you are agreeing to the Terms and</Text>    
    <Text style={{color:"gray",marginTop:5,fontSize:13,fontFamily:FONT.RobotoMedium}}>Conditions set forth here:</Text>    
    <TouchableOpacity onPress={()=>props.navigation.navigate('Terms')}><Text style={{color:Colors.greenBtnColor,marginTop:5,fontSize:13,fontFamily:FONT.RobotoBold}}>Terms and Conditions</Text></TouchableOpacity>    
    <Text style={{color:"gray",marginTop:5,fontSize:13,fontFamily:FONT.RobotoMedium}}>*Starting with 2nd order</Text>   
    <View style={{justifyContent:"center",alignItems:"center",height:120,width:"80%",backgroundColor:Colors.commonbg,marginTop:20}}>
    <View style={{width:"90%"}}><Text style={{color:"black",marginTop:5,fontSize:10,fontFamily:FONT.RobotoBold,textAlign:"right",marginEnd:10}}>One Click, Cancel Any Time.</Text></View>
    <View style={{width:"90%",flexDirection:"row",marginTop:10}}>
       <TouchableOpacity onPress={()=>props.navigation.goBack(null)} style={{flex:2}}><View style={{width:"100%",height:45,borderWidth:1,borderRadius:3,borderColor:Colors.greenBtnColor,justifyContent:"center",alignItems:"center"}}><Text style={{color:Colors.greenBtnColor,fontSize:16,fontFamily:FONT.RobotoMedium}}>No Thanks</Text></View></TouchableOpacity>
       <TouchableOpacity style={{flex:3}}><View style={{width:"100%",height:45,borderRadius:3,backgroundColor:Colors.greenBtnColor,marginStart:5,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:16,fontFamily:FONT.RobotoMedium}}>Start Free Delivery</Text></View></TouchableOpacity>
    </View>
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
  
});

export default BuyAwesaPlus;