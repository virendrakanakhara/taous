import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Colors} from '../style/colors';
import {FONT} from '../style/fonts'
const DrawerHeader = (props)=> {

return (<View>
            <View style={{width:"100%",height:110,backgroundColor:Colors.drawerHeaderBackground}}>
                    <View style={{flexDirection:"row",flex:1}}>
                                <View style={{flex:1.5,alignItems:"flex-end",justifyContent:"center"}}>
                                            <View style={{backgroundColor:"white",height:70,width:70,borderRadius:35,alignItems:"center",justifyContent:"center"}}>
                                        <FeatherIcon
                                            color='black'
                                            
                                            name='user'
                                            size={55}
                                            />
                                            </View>
                                    
                                            
                                </View>
                                <View style={{flex:3.5,alignItems:"flex-start",justifyContent:"center"}}><Text style={{color:"white",fontSize:20,marginStart:5,fontFamily:FONT.RobotoMedium}}>Welcome Guest</Text></View>
                    </View>
            </View> 
            <View style={{width:"100%",height:65,backgroundColor:"black",alignItems:"center"}}>
                <TouchableOpacity onPress={()=>{props.navigation.navigate("User",{screen:"SignIn"})}} style={{width:"60%",borderRadius:10,marginVertical:15,backgroundColor:Colors.greenBtnColor}}>
                    <View style={{width:"100%",height:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center"}}><AntIcon
                                            color='white'
                                            
                                            name='login'
                                            size={15}
                                            /><Text style={{color:"white",fontSize:15,marginStart:5,fontFamily:FONT.RobotoMedium}}>Login / Register</Text></View>
                </TouchableOpacity>
            </View>
      </View>)
};
export default DrawerHeader; 