import React,{ useEffect, useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  ActivityIndicator,
  TextInput,
  Alert 
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
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import RecentProductItem from "../components/RecentProductItem";
import { useIsFocused } from "@react-navigation/native";
import RenderHtml from 'react-native-render-html';
import { getUserWishlists} from '../redux/actions';  
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';

import CardView from 'react-native-cardview'
import {chekProductExistsInWishlist,getWishlistWithProduct} from '../commonfunctions';
import { t } from "i18next";
const MyItems = (props) => {
  
  const isFocused = useIsFocused();
  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();
  const [categoryid,setcategoryid] = useState(1);
  const [catdata,setCatdata] = useState([]);
  const {user} = useSelector(state => state.userReducer);
  const {lang} = useSelector(state=>state.langReducer);
  const{wishlist} = useSelector(state=>state.wishlistReducer);

  const [isAddLoading,setAddLoading] = useState(false);
  const [isAddWishlistLoading,setAddWishlistLoading] = useState(false);
  const [moveToWishlist,setMoveToWishlist] = useState();
  const [movewishlistitemid,setMoveWishlistItemId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlistname, setWishlistName] = useState("");
  const fetchWishlists = () => dispatch(getUserWishlists());

  useEffect(() => {
    if(Object.keys(user).length == 0)
    {
      
      props.navigation.navigate("Home",{screen:"SignIn"});

    }
    setCatdata(user.topdepartments);
    if(user.topdepartments.length>0)
    setcategoryid(user.topdepartments[0].term_id);
    else
    setcategoryid(0);
    
},[isFocused]);
  const DATA = [
    {
      title: "Grocery",
      id:1
    },
    {
      title: "Household",
      id:2
    },
    {
      title: "Baby",
      id:3
    },
    {
      title: "Health & Beauty",
      id:4
    },
    {
      title: "Kitchen",
      id:5
    },
    {
      title: "Seasonal",
      id:6
    },
    {
      title: "Hardware",
      id:7
    },
    {
      title: "School & Office",
      id:8
    },
    {
      title: "Electonics",
      id:9
    },
    {
      title: "Organic",
      id:10
    },
    {
      title: "Clothing",
      id:11
    }

  ];
  
  const renderCategoryItem = ({item})=>(
    <TouchableOpacity onPress={()=>{setcategoryid(item.term_id);}}><View style={{height:"100%",width:120,justifyContent:"center",alignItems:"center",borderBottomWidth:item.term_id==categoryid?2:0.5,borderBottomColor:item.term_id==categoryid?Colors.lightGreen1:Colors.commonbg}}><RenderHtml
    contentWidth={"100%"}
    source={{html:item.name}}
  />{/* <Text style={{fontFamily:FONT.RobotoSemiBold,textAlign:"center"}}>{item.name}</Text> */}</View></TouchableOpacity>
    
  );  
  const renderRecentItem = ({item})=>(
    <RecentProductItem item={item}
       height={250}
       width={178}
       backgroundColor={"white"}
       marginEnd={5}
       
       props={props}
       addToWishlist={addToWishlist}
       
    />
    
  );  

  const renderItemComp = ({ item }) => (
    <View style={{marginVertical:6}}>
    <View style={{height:50,width:"100%",justifyContent:"center",alignItems:"flex-start",marginStart:20}}><RenderHtml style={{color:Colors.black,fontSize:16,fontFamily:FONT.RobotoSemiBold}} source={{html:item.name+" ("+item.items.length+")"}} /></View>
     <View style={{flex:1,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
        <FlatList
           horizontal
           
           data={item.items}
           renderItem={renderRecentItem}
           showsHorizontalScrollIndicator={false}
         />
      </View>  
  </View>
  );

  const addToWishlist = (item) =>{
    
    

    if(chekProductExistsInWishlist(wishlist,item.id))
    {
      
         let wishlistitem = getWishlistWithProduct(wishlist,item.id);
         //alert("Product exists in "+ wishlistitem[0].name) 
         DeleteWishlistItemFinal(wishlistitem[0].ID,item.id);
    }
    else
    {
      //alert("Product not exists in wishlist")
      setMoveWishlistItemId(item.id);
      setModalVisible(true);
    }

  }

  const DeleteWishlistItemFinal = async (wishlistid,productid) => {
   
    //alert(wishlistid+" "+productid)
      
                  try {
                    const response = await fetch(APICONFIG.REST_WC_URL+"/remove_from_wishlist",
                                                  {
                                                    method:"POST",
                                                    body:JSON.stringify({
                                                       user_id:user.ID,
                                                       wishlist_id:wishlistid,
                                                       product_id:productid,
                                                       lang:lang 
                                                    }),
                                                    headers : {
                                                      Accept: 'application/json',
                                                      'Content-Type': 'application/json',
                                                      Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                                    }
                                              });
                    
                    const json = await response.json();
                    if(json.errors)
                    {
                      alert("error :"+json.errors.rest_forbidden)
                    }
                    else
                    {
                      alert(t('common_itemremovedfromwishlist_lbl'))
                      fetchWishlists();
                      
                    }
                   
                  } catch (error) {
                    console.error(error);
                    alert(error)
                  } finally {
                    
                    
                  }
        
      
      
    }

    const ProcessAddToList = async () => {

      if(moveToWishlist == undefined)
      {
        Alert.alert("Please select wishlist !!")
      }
      else
      {
      setAddLoading(true);
   
          try {
            const response1 = await fetch(APICONFIG.REST_WC_URL+"/add_to_wishlist",
                                          {
                                            method:"POST",
                                            body:JSON.stringify({
                                               user_id:user.ID,
                                               wishlist_id:moveToWishlist.ID,
                                               product_id:movewishlistitemid,
                                               lang:lang 
                                            }),
                                            headers : {
                                              Accept: 'application/json',
                                              'Content-Type': 'application/json',
                                              Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                            }
                                      });
            
            const json1 = await response1.json();
            if(json1.errors)
            {
              alert("error :"+json1.errors.rest_forbidden)
            }
            else
            {
              alert(t('common_itemaddedtowishlist_lbl'))
            }
           
          } catch (error) {
            console.error(error);
            alert(error)
          } finally {
            setModalVisible(false);
            fetchWishlists();
            setAddLoading(false);
          }
        }
       
     
    }   

      ///add wishlist
const AddWishlist = () => {
  
  if(wishlistname == "")
  {
    Alert.alert("Please enter wishlist name !!")
  }
  else
  {
     AddWishlistFinal()
  }

}
const AddWishlistFinal = async () => {

  setAddWishlistLoading(true);
              try {
                const response = await fetch(APICONFIG.REST_WC_URL+"/create_wishlist",
                                              {
                                                method:"POST",
                                                body:JSON.stringify({
                                                   user_id:user.ID,
                                                   product_ids:movewishlistitemid,
                                                   wishlist_name:wishlistname,
                                                   lang:lang 
                                                }),
                                                headers : {
                                                  Accept: 'application/json',
                                                  'Content-Type': 'application/json',
                                                  Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                                }
                                          });
                
                const json = await response.json();
                if(json.errors)
                {
                  alert("error :"+json.errors.rest_forbidden)
                }
                else
                {
                  alert("Wishlist created and Item added successfully !!")
                  setModalVisible(false);
                  fetchWishlists();
                }
               
              } catch (error) {
                console.error(error);
                alert(error)
              } finally {
                setAddWishlistLoading(false);
                
              }
    
  

}


    const ItemMove = ({ item }) => {

      if(item != moveToWishlist)
      {
      return (<CardView
            cardElevation={3}
            cardMaxElevation={3}
            cornerRadius={15}>
      <TouchableOpacity onPress={()=>{setMoveToWishlist(item);}}><View  style={[styles.item,{backgroundColor:item.active?"#F2F8FD":"white",flexDirection:"row"}]}>
        <View style={{flex:3}}>
        <View style={{flexDirection:"row",marginTop:15,marginStart:15}}>
          {item.active && <View style={{flex:1.5,justifyContent:"center",alignItems:"flex-start"}}><FontAwesomeIcon name="heart" size={14} color={Colors.drawerHeaderBackground} /></View>}
          <View style={{flex:item.active?20:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={styles.address_name}>{item.name}</Text></View>
        </View>
        <Text style={styles.name}>{t('common_touchtoadditemtowishlist_lbl')}</Text>
        </View>
        
      </View>
      </TouchableOpacity>
      </CardView>)
      }
      else
      {
       return (<CardView
          cardElevation={3}
          cardMaxElevation={3}
          cornerRadius={15}>
    <TouchableOpacity onPress={()=>{setMoveToWishlist(item);}}><View  style={[styles.item,{backgroundColor:Colors.drawerHeaderBackground,flexDirection:"row"}]}>
      <View style={{flex:3}}>
      <View style={{flexDirection:"row",marginTop:15,marginStart:15}}>
        {item.active && <View style={{flex:1.5,justifyContent:"center",alignItems:"flex-start"}}><FontAwesomeIcon name="heart" size={14} color={Colors.drawerHeaderBackground} /></View>}
        <View style={{flex:item.active?20:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={styles.address_name}>{item.name}</Text></View>
      </View>
      <Text style={styles.name1}>{t('common_itemwillbeaddedtowishlist_lbl')}</Text>
      </View>
      
    </View>
    </TouchableOpacity>
    </CardView>)
  
      }
    };
  
    const renderItemMove = ({ item }) => (
      <ItemMove item={item} />
    );


  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    {user.topitems && user.topitems.length>0 && <View style={{height:50}}>
    <FlatList
             horizontal
             
             data={catdata}
             renderItem={renderCategoryItem}
             showsHorizontalScrollIndicator={false}
           />  
    </View>} 

    {user.topitems && user.topitems.length>0 && <ScrollView style={{ flex: 1 } } >
    <View style={{marginHorizontal:20,marginTop:20,flexDirection:"row"}} >
      <View style={{flex:1}}><Text style={{textAlign:"left"}} >{user.topitems?user.topitems.length:0} {t('myitems_removeitems_lbl')}</Text></View>
      <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}><AntIcon
              color="black"
              name='delete'
              size={20}
            /><Text style={{color:"black",fontSize:14,marginStart:5,fontFamily:FONT.RobotoRegular,textDecorationLine:"underline"}}>{t('myitems_removeitems_lbl')}</Text></View>
    </View>

    <FlatList
        data={catdata}
        renderItem={renderItemComp}
        keyExtractor={item => item.id}
        ref={(ref) => {
          listViewRef = ref;
        }}
      />
    
    {/* <View style={{marginVertical:6}}>
      <View style={{height:50,width:"100%",justifyContent:"center",alignItems:"flex-start",marginStart:20}}><Text style={{color:Colors.black,fontSize:16,fontFamily:FONT.RobotoSemiBold}}>Grocery (10)</Text></View>
       <View style={{flex:1,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
          <FlatList
             horizontal
             
             data={[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8}]}
             renderItem={renderRecentItem}
             showsHorizontalScrollIndicator={false}
           />
        </View>  
    </View> */}
    </ScrollView>}
    {user.topitems.length==0 && 
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <FontAwesomeIcon 
          size={50}
          color={Colors.greenBtnColor}
          name="shopping-basket"
       />
       <Text style={{fontSize:20,color:Colors.lightGreen1,fontFamily:FONT.RobotoRegular,marginTop:10}}>{t('myitems_yettoplaceorder_lbl')}</Text>
       <TouchableOpacity onPress={()=>props.navigation.navigate("Home")} style={{backgroundColor:Colors.drawerHeaderBackground,borderRadius:10,padding:5,paddingHorizontal:15,marginTop:10}}><Text style={{fontSize:18,color:"white",fontFamily:FONT.RobotoRegular}}>{t('myitems_continueshopping_lbl')}</Text></TouchableOpacity>
       

    </View>
    }

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{backgroundColor:"black",opacity:0.3,width:"100%",height:"100%",position:"absolute",left:0,top:0}}></View>
        <View style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
          <View style={{backgroundColor:Colors.commonbg,height:700,width:"90%",borderRadius:10}} >
           
          <View style={{height:230}}>
                  <View style={{height:70,justifyContent:"center",alignItems:"center",flexDirection:"row",width:"100%"}}><EntypoIcon name="list" size={25} color={Colors.greenBtnColor} /><Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:Colors.greenBtnColor,marginStart:5}} numberOfLines={3}>{t('common_createandadditemtowishlist_lbl')}</Text></View>
                  
                  <View style={{height:110,justifyContent:"center",alignItems:"center"}}>
                  
                  <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:18,color:Colors.greenBtnColor,height:30,textAlignVertical:"center"}}>{t('common_listname_lbl')} :</Text><TextInput placeholder={t('common_wishlistname_lbl')} onChangeText={(newtext)=>{setWishlistName(newtext)}} value={wishlistname} style={{paddingStart:3,fontFamily:FONT.RobotoRegular,fontSize:18,color:Colors.greenBtnColor,borderRadius:5,borderWidth:1,borderColor:Colors.greenBtnColor,width:140,marginStart:5,height:30}} /></View>
                
                </View>
                <View style={{position:"absolute",height:50,width:"100%",bottom:0,left:0,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
             
            {!isAddWishlistLoading && <TouchableOpacity onPress={()=>{AddWishlist()}}><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:120,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_createandadd_lbl')}</Text></View></TouchableOpacity>}
            {isAddWishlistLoading && <View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><ActivityIndicator size={"small"} color="white" /></View>}

              
            </View>
                </View> 

                <View style={{height:470}}>
                  <View style={{height:70,justifyContent:"center",alignItems:"center",flexDirection:"row",width:"100%"}}><EntypoIcon name="list" size={25} color={Colors.greenBtnColor} /><Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:Colors.greenBtnColor,marginStart:5}} numberOfLines={3}>{t('common_selectwishlistandadditem_lbl')}</Text></View>
                  
                  <View style={{height:350}}>
                  <FlatList
             
             
             data={wishlist}
             renderItem={renderItemMove}
             showsHorizontalScrollIndicator={false}
           />
                  
                
                </View>
                <View style={{position:"absolute",height:50,width:"100%",bottom:0,left:0,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
             
            {!isAddLoading && <TouchableOpacity onPress={()=>{ProcessAddToList()}}><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_add_lbl')}</Text></View></TouchableOpacity>}
            {isAddLoading && <View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><ActivityIndicator size={"small"} color="white" /></View>}

              
            </View>
                </View> 
                
             
              
                <TouchableOpacity style={{position:"absolute",top:0,right:0}} onPress={()=>{setModalVisible(false);}}><View style={{height:30,width:30,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><EntypoIcon name="circle-with-cross" color={Colors.greenBtnColor} size={30} /></View></TouchableOpacity>
          
          </View>
          
        </View>
      </Modal>

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
    
    
    
    marginVertical: 8,
    marginHorizontal: 0,
    borderWidth:1,
    borderColor:Colors.commonbg,
    borderRadius:10,
    height:100,
    
    
  },
  
  name: {
    fontSize: 14,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    marginStart:15,
    marginTop:5,
    textAlign:"left"
    
  },
  name1: {
    fontSize: 14,
    color:"black",
    fontFamily:FONT.RobotoMedium,
    marginStart:15,
    marginTop:5,
    textAlign:"left"
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
 
 
  
});

export default MyItems;