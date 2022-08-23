import React,{ useState }  from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Colors} from '../style/colors';
import {FONT} from '../style/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import DrawerHeader from '../components/DrawerHeader';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcon from 'react-native-vector-icons/EvilIcons';




const CustomSidebarMenu = (props) => {

  const [showSub,setShowSub] = useState(false);
  const [showSub2,setShowSub2] = useState(false);
  
  const Seperator = () => <View style={styles.separator} />;
  return (
    
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <DrawerHeader {...props} />  
      <DrawerContentScrollView {...props} backgroundColor="black">
        <DrawerItemList {...props}   /> 
        {/* <DrawerItem {...props}
          label="Shop By Category"
          onPress={() => Linking.openURL('https://aboutreact.com/')}
          
          icon={() =>(<MaterialIcon
            color='white'
            name='category'
            size={20}
          />)
            
          }

         
            
        
        />
        <Seperator /> */}
        <View style={{height:40,width:"100%"}}>
          <TouchableOpacity onPress={()=>setShowSub(!showSub)}><View style={{flex:1,height:40,flexDirection:"row",marginStart:20,marginEnd:10}}>
               <View style={{flex:1,height:40,justifyContent:"center",alignItems:"flex-start"}}><MaterialIcon
            color='white'
            name='category'
            size={20}
          /></View>
               <View style={{flex:3,height:40,backgroundColor:"black",justifyContent:"center"}}><Text style={{color:"white",fontSize:14,textAlign:"left",fontFamily:FONT.RobotoMedium}}>Shop By Category</Text></View>
               <View style={{flex:1,height:40,backgroundColor:Colors.drawerHeaderBackground,justifyContent:"center",alignItems:"center"}}><FeatherIcon
            color='white'
            name={showSub ? 'minus':'plus'}
            size={20}
          /></View>
          </View>
          </TouchableOpacity>
        </View>
        <Seperator /> 

        {showSub && (<DrawerItem {...props}
          
          label="Grocery"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Grocery"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />)} 
        {showSub && (<DrawerItem {...props}
          
          label="House Hold"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"House Hold"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />)}
        {showSub && (<DrawerItem {...props}
          
          label="Baby"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Baby"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />)} 
        {showSub && (<DrawerItem {...props}
          
          label="Health & Beauty"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Health & Beauty"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />)} 
        {showSub && (<DrawerItem {...props}
          
          label="Kitchen"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Kitchen"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />)} 
        {showSub && (<DrawerItem {...props}
          
          label="Seasonal"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Seasonal"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />)} 
        {showSub && (<DrawerItem {...props}
          
          label="Hardware"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Hardware"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />)} 
        {showSub && (<DrawerItem {...props}
          
          label="School & Office"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"School & Office"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />) }
        {showSub && (<DrawerItem {...props}
          
          label="Electronics"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Electronics"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />) }
        {showSub && (<DrawerItem {...props}
          
          label="Organic"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Organic"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />) }
        {showSub && (<DrawerItem {...props}
          
          label="Clothing"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Clothing"})}
          style={{marginStart:70}}
          
        />)}
        {showSub && (<Seperator />) }


        {/* <DrawerItem {...props}
          
          label="Shop More"
          onPress={() => setShowSub2(!showSub2)}
          icon={() =>(<MaterialIcon
            color='white'
            name='category'
            size={20}
          />)
            
          }
          
          
        /> */}
        <View style={{height:40,width:"100%"}}>
          <TouchableOpacity onPress={()=>setShowSub2(!showSub2)}><View style={{flex:1,height:40,flexDirection:"row",marginStart:20,marginEnd:10}}>
               <View style={{flex:1,height:40,justifyContent:"center",alignItems:"flex-start"}}><MaterialIcon
            color='white'
            name='category'
            size={20}
          /></View>
               <View style={{flex:3,height:40,backgroundColor:"black",justifyContent:"center"}}><Text style={{color:"white",fontSize:14,textAlign:"left",fontFamily:FONT.RobotoMedium}}>Shop More</Text></View>
               <View style={{flex:1,height:40,backgroundColor:Colors.drawerHeaderBackground,justifyContent:"center",alignItems:"center",}}><FeatherIcon
            color='white'
            name={showSub2 ? 'minus':'plus'}
            size={20}
          /></View>
          </View>
          </TouchableOpacity>
        </View>
        <Seperator /> 

        {showSub2 && (<DrawerItem {...props}
          
          label="Coupons"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Coupons"})}
          style={{marginStart:70}}
          
        />)}
        {showSub2 && (<Seperator />)} 
        {showSub2 && (<DrawerItem {...props}
          
          label="Gift Cards"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Gift Cards"})}
          style={{marginStart:70}}
          
        />)}
        {showSub2 && (<Seperator />)}
        {showSub2 && (<DrawerItem {...props}
          
          label="Sale"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Sale"})}
          style={{marginStart:70}}
          
        />)}
        {showSub2 && (<Seperator />)} 
        {showSub2 && (<DrawerItem {...props}
          
          label="New"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"New"})}
          style={{marginStart:70}}
          
        />)}
        {showSub2 && (<Seperator />)} 
        {showSub2 && (<DrawerItem {...props}
          
          label="Top Rated"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Top Rated"})}
          style={{marginStart:70}}
          
        />)}
        {showSub2 && (<Seperator />)} 
        {showSub2 && (<DrawerItem {...props}
          
          label="Spring"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Spring"})}
          style={{marginStart:70}}
          
        />)}
        {showSub2 && (<Seperator />)} 
        {showSub2 && (<DrawerItem {...props}
          
          label="Fresh Deals"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Fresh Deals"})}
          style={{marginStart:70}}
          
        />)}
        {showSub2 && (<Seperator />)} 
        {showSub2 && (<DrawerItem {...props}
          
          label="Organic"
          onPress={() => props.navigation.navigate("ProductList",{categoryname:"Organic"})}
          style={{marginStart:70}}
          
        />)}
        {showSub2 && (<Seperator />) }


        <DrawerItem {...props}
          
          label="About Us"
          
          
          onPress={() => props.navigation.navigate("About")}
          icon={() =>(<FeatherIcon
            color='white'
            name='info'
            size={20}
          />)
            
          }
          
        />
        <Seperator />
        <DrawerItem {...props}
          
          label="Help / Faq"
          onPress={() => props.navigation.navigate("Help")}
          icon={() =>(<FontAwesomeIcon5
            color='white'
            name='hands-helping'
            size={17}
          />)
            
          }
          
        />
        <Seperator />
        <DrawerItem {...props}
          
          label="Delivery Information"
          onPress={() => props.navigation.navigate("DeliveryInfo")}

          icon={() =>(<FontAwesomeIcon5
            color='white'
            name='suitcase-rolling'
            size={24}
          />)
            
          }
          
        />
        <Seperator />
        <DrawerItem {...props}
          
          label="Delivery Pass - Terms"
          onPress={() => props.navigation.navigate("DeliveryTerms")}
          icon={() =>(<FontAwesomeIcon
            color='white'
            name='ticket'
            size={19}
          />)
          }
        />
        <Seperator />
        <DrawerItem {...props}
          
          label="Terms & Conditions"
          onPress={() => props.navigation.navigate("Terms")}
          icon={() =>(<MaterialIcon
            color='white'
            name='rule'
            size={19}
          />)
          }
        />
        <Seperator />
        <DrawerItem {...props}
          
          label="Privacy Policy"
          onPress={() => props.navigation.navigate("PrivacyPolicy")}
          icon={() =>(<MaterialIcon
            color='white'
            name='privacy-tip'
            size={20}
          />)
          }
        />
         <Seperator />
        <DrawerItem {...props}
          
          label="Contact Us"
          onPress={() => props.navigation.navigate("ContactUs")}
          icon={() =>(<EvilIcon
            color='white'
            name='comment'
            size={20}
          />)
          }
        />
        
        
      </DrawerContentScrollView>
      <View style={{backgroundColor:"black",width:"100%",height:100}}>
        <View style={{flex:1,width:"100%",flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"}}>
          <View style={{height:30,flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <MaterialIcon
            color='white'
            name='call'
            size={14}
          />
          <TouchableOpacity onPress={()=>{Linking.openURL(`tel:10000001122`)}}><Text style={{color:"white",fontSize:10,marginStart:2,fontFamily:FONT.RobotoMedium}}>+1 000 000 1122</Text></TouchableOpacity>
          </View>
          <View style={{height:30,flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <FeatherIcon
            color='white'
            name='mail'
            size={14}
          />
          <TouchableOpacity onPress={() => Linking.openURL('mailto:info@awesa.com') }><Text style={{color:"white",fontSize:10,marginStart:4,fontFamily:FONT.RobotoMedium}}>info@awesa.com</Text></TouchableOpacity>
          </View>
        </View>
        <View style={{flex:1,flexDirection:"row",width:"100%",justifyContent:"space-evenly",alignItems:"center"}}>
        <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com') }><FontAwesomeIcon
            color='white'
            name='facebook-square'
            size={30}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com') }><FontAwesomeIcon
            color='white'
            name='instagram'
            size={30}
          />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://youtube.com') }><FontAwesomeIcon
            color='white'
            name='youtube-square'
            size={30}
          /></TouchableOpacity> 
        </View>
      </View>
      {/* <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey'
        }}>
        www.aboutreact.com
      </Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 0,
    borderBottomColor: "#E2E4E8",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginStart:18,
    marginEnd:10
  }
});

export default CustomSidebarMenu;