import React,{useState,useEffect,useCallback} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  TouchableOpacity,
  Switch,
  StatusBar,
  TextInput,
  ActivityIndicator,
  FlatList
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {Colors} from '../style/colors';
import {RobotoRegular} from '../style/fonts'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import { Badge } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FONT} from "../style/fonts";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {getFormattedDatetime} from '../commonfunctions';
import DropdownComponent from './DropdownComponent';
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import FastImage from 'react-native-fast-image'
import { debounce } from "lodash";


const Header = (props)=> {
const {t, i18n} = useTranslation();  
const { lang } = useSelector(state => state.langReducer);  
const [isEnabled, setIsEnabled] = useState(false);
const [delivery_locations,set_delivery_locations] = useState([]);
const [pickup_locations,set_pickup_locations] = useState([]);
const [deliveryOrPickupId,setDeliveryOrPickupId] = useState(-1);

const [searchText,setSearchText] = useState("");
const [showSuggestionList,setShowSuggestionList] = useState(false);
const [dataproducts,setDataProducts] = useState([]);
const [datacategory,setDataCategory] = useState([]);
const [isProductLoading,setProductLoading] = useState(false);
const [isCategoryLoading,setCategoryLoading] = useState(false);

const toggleSwitch = () => setIsEnabled(isEnabled => !isEnabled);

const { cart  } = useSelector(state => state.cartReducer);
const { user } = useSelector(state=> state.userReducer);


if (i18n.language != lang) {
    
    
  i18n.changeLanguage(lang);
  
  
}

useEffect(() => {
    
    if(Object.keys(user).length > 0)
    {
       if(user.addresses.profile_addresses!=undefined)
       {
       let delivery_array =  user.addresses.profile_addresses.map((item)=>{ return {short_label:item.address_name,label:item.address_name+" ("+item.address_1+","+item.address_2+","+item.city+","+item.state+","+item.country+","+item.postcode+")",value:item.id}});
       set_delivery_locations(delivery_array);
       }
       else
       {
        set_delivery_locations([]);  
       }

       if(user.addresses.pickup_locations!=undefined)
       {
       let pickup_array =  user.addresses.pickup_locations.map((item)=>{ return {short_label:item.title,label:item.title+" ("+item.addr+")",value:item.id}});
       set_pickup_locations(pickup_array); 
       }
       else
       {
       set_pickup_locations([]); 
       }
       if(user.addresses.additional_fields!=undefined)
       {
       setDeliveryOrPickupId(user.addresses.additional_fields!=false?user.addresses.additional_fields.cf_user_preferred_dp_address:-1);
       }
       else
       {
        setDeliveryOrPickupId(-1);   
       }
        
    }
    else
    {
      set_delivery_locations([]);
      set_pickup_locations([]);
      setDeliveryOrPickupId(-1);
    }
  
  
}, [user]);

useEffect(() => {
  if (searchText.length > 0) {
    setShowSuggestionList(true);
    //getProducts()
    //getCategories()
    //handleChangeWithLib()
    
  } else {
    setShowSuggestionList(false);
  }
}, [searchText]);



const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 300);
  };
};




const handleChange = (value) => {
  
  getProducts(value);
  getCategories(value);
};


const optimizedFn = useCallback(debounce(handleChange), []);


const getProducts = async(value) => {
  
  setProductLoading(true);
      try {
      const response = await fetch(APICONFIG.REST_WC_URL+"/products?search="+value+"&per_page=5",
                                  {
                                    method:"GET",
                                    
                                    headers : {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                      Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                    }
                              });
     
     const json = await response.json();
     
     
    setDataProducts(json);
     
     
   } catch (error) {
     console.error(error);
     alert(error)
     
   } finally {
    setProductLoading(false);
    
    
   }
}

const getCategories = async(value) => {
  setCategoryLoading(true)
      try {
      const response = await fetch(APICONFIG.REST_WC_URL+"/products/categories?search="+value+"&per_page=5",
                                  {
                                    method:"GET",
                                    
                                    headers : {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                      Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                    }
                              });
     
     const json = await response.json();
     
     
    setDataCategory(json);
     
     
   } catch (error) {
     console.error(error);
     alert(error)
     
   } finally {
    setCategoryLoading(false);
    
    
   }
}

const renderProductItem = ({ item }) => (
  <TouchableOpacity>
  <View style={{height:100,width:"100%",flexDirection:"row"}}>
    <View style={{flex:1}}>

    {item && item.images[0] && item.images[0].src!=undefined && <FastImage
            style={{height:80,width:80,margin:10,alignSelf:"center"}}
            source={{
                uri: item.images[0].src,
                
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />}
      
 
    </View>
    <View style={{flex:3,justifyContent:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,marginStart:10,fontSize:16,marginEnd:10,textAlign:"left"}} numberOfLines={3}>{item.name}</Text></View>
  </View>
  </TouchableOpacity>
);

const renderCategoryItem = ({ item }) => (
  <TouchableOpacity onPress={()=>props.navigation.navigate("Search",{screen:"Search",params:{CatId:item.id,CatName:item.name.replace("&amp;","&")}})}>
  <View style={{height:35,width:"100%"}}>
   
    <View style={{flex:1,justifyContent:"center"}}><Text style={{fontFamily:FONT.RobotoRegular,marginStart:10,fontSize:16,textAlign:"left"}} numberOfLines={3}>{item.name.replace("&amp;","&")}</Text></View>
  </View>
  </TouchableOpacity>
);


return (
  <SafeAreaView>
    
    <View style={{backgroundColor:Colors.greenBtnColor}}>
   
            <View style={{width:"100%",flexDirection:"row",height:50}}>
                    <View style={{flex:1,height:"100%",justifyContent:"center",alignItems:"flex-start",marginStart:5}}>
                        {!props.showBackBtn && Object.keys(user).length == 0 &&  <TouchableOpacity onPress={()=>{props.navigation.navigate("User",{screen:"SignIn"})}}>
                        <View style={{marginStart:10}} ><Text style={{color:"white",fontSize:15,fontFamily:FONT.RobotoMedium}}>{t('header_signin_lbl')}</Text><Text style={{color:"white",fontSize:9,fontFamily:FONT.RobotoMedium}}>{t('header_logintoaccess_lbl')}</Text></View>
                        </TouchableOpacity> }  
                        {!props.showBackBtn && Object.keys(user).length > 0 && <View style={{marginStart:10}} ><Text style={{color:"white",fontSize:15,fontFamily:FONT.RobotoMedium}} numberOfLines={1}>{t('header_hi_lbl')}, {user.display_name}</Text><Text style={{color:"white",fontSize:9,fontFamily:FONT.RobotoMedium}}>{t('header_membersince_lbl')} {getFormattedDatetime(user.user_registered,'YYYY')}</Text></View>}     
                        {props.showBackBtn && <TouchableOpacity onPress={()=>{props.navigation.setParams({CatId: null,CatName:null});props.navigation.goBack(null)}} style={{position:"absolute",left:0,top:10}}><View style={{flexDirection:"row",height:30,width:80,marginStart:10,justifyContent:"flex-start",alignItems:"center"}}>
                    <AntIcon
                                color={"white"}
                                name={lang=='ar'?'right':'left'}
                                size={25}
                                />
                      </View></TouchableOpacity>}
                        </View>  
                      {!props.showTitle && (<View style={{flex:1,height:"100%",justifyContent:"center",alignItems:"center"}}>
                        <Image 
                            style={{aspectRatio:222/55,height:40}}
                            source={require('../assets/images/header_logo.png')}
                            resizeMode="contain"
                            
                            /> 
                      </View>)}
                      {props.showTitle && (<View style={{flex:1,height:"100%",justifyContent:"center"}}>
                        <Text style={{color:"white",fontSize:props.title.length < 10?20:16,fontFamily:FONT.RobotoBold,textAlign:"center",marginStart:0}} numberOfLines={props.title.length < 10?1:2}>{props.title}</Text>
                      </View>)}

                      <View style={{flex:1,flexDirection:"row",height:"100%",justifyContent:"center",marginEnd:10}}>
                         <View style={{flex:1,justifyContent:"center"}}>
                             <View style={{width:"100%",height:26,justifyContent:"center",alignItems:"flex-end"}}>
                             <TouchableOpacity style={{height:26,width:26,justifyContent:"center"}} onPress={()=>{props.navigation.navigate('ChangeLang')}}>
                             {lang=='en' &&<Image 
                            style={{width:26,height:26,alignSelf:"center"}}
                            source={require('../assets/images/en.png')}
                            resizeMode="contain"
                            
                            />}
                             {lang=='ar' &&<Image 
                            style={{width:26,height:26,alignSelf:"center"}}
                            source={require('../assets/images/ar.png')}
                            resizeMode="contain"
                            
                            />}
                             {lang=='fr' &&<Image 
                            style={{width:26,height:26,alignSelf:"center"}}
                            source={require('../assets/images/fr.png')}
                            resizeMode="contain"
                            
                            />}
                             </TouchableOpacity>
                             </View>
                         </View>
                         {/* <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}>
                            
                              <AntIcon
                                      color={Colors.drawerHeaderBackground}
                                      name='hearto'
                                      size={26}
                                      />
                                      
                         </View> */}
                         <TouchableOpacity onPress={()=>{props.navigation.navigate("Cart")}} style={{flex:1}}><View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                         <AntIcon
                                color={"white"}
                                name='shoppingcart'
                                size={25}
                                />
                           <Badge
              value={cart.length}             
              status="warning"
              badgeStyle={{backgroundColor:Colors.drawerHeaderBackground,borderColor:"black"}}
              textStyle={{color:"black"}}
              containerStyle={{position:"absolute",  top: 4, right: 0 }}
            />
                         </View>
                         
                         </TouchableOpacity>
                      </View>   
            </View>
            <View style={{height:10,marginHorizontal:10}}><Text style={{color:"white",fontSize:12,fontFamily:FONT.RobotoMedium,marginRight:6,textAlign:"right",marginTop:-10,marginEnd:10}}>dh 0.00</Text></View> 
            <><View style={{flexDirection:"row",alignItems:"center",height:35,marginTop:10,marginHorizontal:10,borderRadius:20,backgroundColor:"white"}}>
    <View style={{height:"100%",borderTopLeftRadius:20,borderBottomLeftRadius:20,width:50,justifyContent:"center",alignItems:"center"}}>
    <AntIcon
              color="black"
              name='search1'
              size={20}
            /> 
    </View>
    <View style={{height:"100%",flex:0.9,justifyContent:"center",alignItems:"flex-start"}}>
    <TextInput
        style={styles.input}
        onChangeText={newText => {setSearchText(newText);optimizedFn(newText)}}
        value={searchText}
        //onChange={(e) => optimizedFn(e.target.value)}
        
        placeholder={t('header_searchproduct_lbl')}
        
      />
    </View>
    </View>
    
    </>
            <><View style={{flexDirection:"row",height:35}}>
            <View style={{flex:1,justifyContent:"center",height:35,backgroundColor:Colors.greenBtnColor}}><Switch
              trackColor={{ false: Colors.commonbg, true: "#A5D6A7" }}
              thumbColor={!isEnabled ? "gray" : Colors.greenBtnColor}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }],marginStart:0 }}
              value={isEnabled}
              
            /></View> 
            <View style={{flex:4,height:35,alignItems:"flex-start",justifyContent:"center",backgroundColor:Colors.greenBtnColor}}><Text style={{color:"white",fontSize:14,fontFamily:FONT.RobotoRegular}}>{t('header_expressdelivery_lbl')}</Text>
            
            </View>
            <View style={{flex:4,height:35,alignItems:"flex-end",justifyContent:"center",marginEnd:15}}>
            <Image 
                            style={{aspectRatio:3502/2754,height:40}}
                            source={require('../assets/images/express_bike.png')}
                            resizeMode="contain"
                            
                            />
            </View>
                                          
            </View></>
            {Object.keys(user).length > 0 && <>
             <View style={{height:35,backgroundColor:Colors.commonbg}}>
               <View style={{flex:1,marginHorizontal:10,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
               
                   {/* <TouchableOpacity style={{flex:1}}><View style={{flex:1,height:30,flexDirection:"row",alignItems:"center"}}><FeatherIcon
                                color="gray"
                                name='home'
                                size={18}
                                /><Text style={{color:"gray",fontSize:14,marginStart:3,textDecorationLine:"underline"}}> Scottsdale SuperCenter</Text></View>
                 </TouchableOpacity> */} 
                <View style={{flex:1,height:30,flexDirection:"row",alignItems:"center"}}><FeatherIcon
                                color="gray"
                                name='home'
                                size={18}
                                /><DropdownComponent data={delivery_locations} value={deliveryOrPickupId} selectText={t("header_selectdelivery_lbl")} /></View>
                 
                 
                 
                 

                 <View style={{flex:0.1,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{color:"gray",fontSize:22}}> | </Text></View>
                 {/* <TouchableOpacity style={{flex:1}}>
                 <View style={{flex:1,height:30,flexDirection:"row",alignItems:"center"}}><EvilIcon
                                color="gray"
                                name='location'
                                size={18}
                                /><Text style={{color:"gray",fontSize:14,marginStart:3,textDecorationLine:"underline"}}> Scottsdale SuperCenter</Text></View>
                 </TouchableOpacity>  */}  
                 <View style={{flex:1,height:30,flexDirection:"row",alignItems:"center"}}><EvilIcon
                                color="gray"
                                name='location'
                                size={18}
                                /><DropdownComponent data={pickup_locations} value={deliveryOrPickupId} selectText={t('header_selectpickup_lbl')} /></View>            

               </View>
             </View>
            </>}
            {Object.keys(user).length == 0 && <>
             <View style={{height:35,backgroundColor:Colors.commonbg}}>
               <View style={{flex:1,marginHorizontal:10,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                 <TouchableOpacity onPress={()=>props.navigation.navigate('AwesaPlus')} style={{flex:1}}><View style={{flex:1,height:30,flexDirection:"row",alignItems:"center"}}><FontAwesomeIcon
                                color="gray"
                                name='truck'
                                size={18}
                                /><Text style={{color:"gray",fontSize:11,marginStart:3,textDecorationLine:"underline"}}> {t('header_deliverypass_lbl')}</Text></View>
                 </TouchableOpacity>               
                 <View style={{flex:0.1,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{color:"gray",fontSize:22}}> | </Text></View>
                 <TouchableOpacity onPress={()=>props.navigation.navigate('DeliveryInfo')} style={{flex:1}}>
                 <View style={{flex:1,height:30,flexDirection:"row",alignItems:"center"}}><AntDesignIcon
                                color="gray"
                                name='infocirlce'
                                size={18}
                                /><Text style={{color:"gray",fontSize:11,marginStart:3,textDecorationLine:"underline"}}> {t('header_deliverypass_about_lbl')}</Text></View>
                 </TouchableOpacity>
                 <View style={{flex:0.1,height:30,justifyContent:"center",alignItems:"center"}}><Text style={{color:"gray",fontSize:22}}> | </Text></View>               
                 <TouchableOpacity onPress={()=>props.navigation.navigate('DeliveryTerms')} style={{flex:1}}>
                 <View style={{flex:1,height:30,flexDirection:"row",alignItems:"center"}}><AntDesignIcon
                                color="gray"
                                name='infocirlce'
                                size={18}
                                /><Text style={{color:"gray",fontSize:11,marginStart:3,textDecorationLine:"underline"}}> {t('header_deliverypass_tc_lbl')}</Text></View>
                 </TouchableOpacity>
               </View>
             </View>
            </>}
            {showSuggestionList && <View style={{flex:1,marginHorizontal:20,width:"90%",backgroundColor:"white",borderBottomColor:"gray",borderLeftColor:"gray",borderTopColor:"white",borderRightColor:"gray",borderWidth:1,position:"absolute",left:0,top:"60%"}}>
              <View style={{height:530,width:"100%"}}>
                <View style={{height:35,borderBottomColor:Colors.commonbg,borderBottomWidth:1}}><Text style={{fontFamily:FONT.RobotoSemiBold,padding:5,textAlign:"left"}}>{t('header_categories_lbl')}</Text></View>
                {isCategoryLoading && <View style={{height:200,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>}
                {!isCategoryLoading && datacategory.length > 0 && <View style={{height:200}}>
                <FlatList
                      data={datacategory}
                      renderItem={renderCategoryItem}
                      
                    />
                  </View>}
                  {!isCategoryLoading && datacategory.length == 0 && <View style={{height:200,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontFamily:FONT.RobotoRegular,size:14}}>No Matching Category Found</Text>
                  </View>}  
                <View style={{height:35,borderBottomColor:Colors.commonbg,borderBottomWidth:1}}><Text style={{fontFamily:FONT.RobotoSemiBold,padding:5,textAlign:"left"}}>{t('header_products_lbl')}</Text></View>
                {isProductLoading && <View style={{height:250,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>}
                {!isProductLoading &&  dataproducts.length > 0 && <View style={{height:250}}>
                <FlatList
                      data={dataproducts}
                      renderItem={renderProductItem}
                      
                    />
                  </View>}
                  {!isProductLoading && dataproducts.length == 0 && <View style={{height:250,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontFamily:FONT.RobotoRegular,size:14}}>No Matching Product Found</Text>
                  </View>}  
              </View>
            </View>}
            </View>
            </SafeAreaView>
            
      )
};
const styles = StyleSheet.create({
input: {
  height: 40,
  margin: 2,
  
  padding: 2,
  fontFamily:FONT.RobotoMedium
},
});
export default Header; 