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
  ActivityIndicator,
  Modal,
  Alert,
  Pressable 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { getBooks } from '../redux/actions';  
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from "../style/colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {FONT} from '../style/fonts';
import AntIcon from 'react-native-vector-icons/AntDesign';

import RecentProductItem from "../components/RecentProductItem";
import WishlistItem from "../components/WishlistItem";
import CardView from 'react-native-cardview'
import { useIsFocused } from "@react-navigation/native";
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import FastImage from 'react-native-fast-image'
import {useTranslation} from 'react-i18next';

import { addMultipleToCart,setWishlist} from '../redux/actions'; 
import { t } from "i18next";

const MyLists = (props) => {
  const {t, i18n} = useTranslation(); 
  const isFocused = useIsFocused();
  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();
  const [categoryid,setcategoryid] = useState(1);

  
  const changeWishlist = wishlistdata => dispatch(setWishlist(wishlistdata));
  
  const handleWishlistChange = wishlistdata => {
    changeWishlist(wishlistdata);
  };

  const addMultipleToCartFun = product => dispatch(addMultipleToCart(product));
  const handleAddMultipleToCart = product =>{
    addMultipleToCartFun(product);
 }

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleRename,setModalVisibleRename] = useState(false);
  const [modalVisibleMove,setModalVisibleMove] = useState(false);

  const [selectedWishlist,setSelectedWishlist] = useState({});
  //Popular Products
  const [isWishlistLoading, setWishlistLoading] = useState(true);
  const [datawishlist, setDataWishlist] = useState([]);

  const [isDeleteLoading,setDeleteLoading] = useState(false);
  const [isAddLoading,setAddLoading] = useState(false);
  const [isRenameLoading,setRenameLoading] = useState(false);
  const [isDeleteProductLoading,setDeleteProductLoading] = useState(false);
  const [isMoveLoading,setMoveLoading] = useState(false);

  //
  const [wishlistname,setWishlistName] = useState();
  const [wishlistid,setWishlistId] = useState(0);

  //
  const [movewishlistitemid,setMoveWishlistItemId] = useState();
  const [movewishlistitemname,setMoveWishlistName] = useState();
  const [moveToWishlist,setMoveToWishlist] = useState();
  


  const {user} = useSelector(state => state.userReducer);
  const {lang} = useSelector(state => state.langReducer);
  useEffect(() => {
    if(Object.keys(user).length == 0)
    {
      
      props.navigation.navigate("Home",{screen:"SignIn"});

    }
    getWishlist();
    
},[isFocused]);


//fetch trending products//
const getWishlist = async () => {

  
  if(Object.keys(user).length > 0)
  {

              try {
              const response = await fetch(APICONFIG.REST_WC_URL+"/user_wishlists?user_id="+user.ID+"&lang="+lang+"&include_products=1&include_product_details=1",
                                            {
                                              method:"GET",
                                              
                                              headers : {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                                Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                              }
                                        });
              
              const json = await response.json();
              setDataWishlist(json);
              handleWishlistChange(json);///for reducer
              
             
            } catch (error) {
              console.error(error);
              alert(error)
            } finally {
              setWishlistLoading(false);
            }
  }
  else
  {
    setDataWishlist([]);
    
    setWishlistLoading(false);
  } 
}  

//delete wishlist
const DeleteWishlist = () => {
  Alert.alert(
    "Confirm",
      "Are you sure,you want to delete this list?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
              DeleteWishlistFinal()
        } }
      ]
  )

}
const DeleteWishlistFinal = async () => {

  setDeleteLoading(true);
              try {
                const response = await fetch(APICONFIG.REST_WC_URL+"/delete_wishlist",
                                              {
                                                method:"POST",
                                                body:JSON.stringify({
                                                   user_id:user.ID,
                                                   wishlist_id:selectedWishlist.ID,
                                                   wishlist_name:selectedWishlist.name,
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
                  alert("Wishlist deleted successfully !!")
                  setModalVisible(false);
                  getWishlist();
                }
               
              } catch (error) {
                console.error(error);
                alert(error)
              } finally {
                setDeleteLoading(false);
                
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

  setAddLoading(true);
              try {
                const response = await fetch(APICONFIG.REST_WC_URL+"/create_wishlist",
                                              {
                                                method:"POST",
                                                body:JSON.stringify({
                                                   user_id:user.ID,
                                                   product_ids:"",
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
                  alert("Wishlist added successfully !!")
                  setModalVisibleAdd(false);
                  getWishlist();
                }
               
              } catch (error) {
                console.error(error);
                alert(error)
              } finally {
                setAddLoading(false);
                
              }
    
  

}

///edit wishlist
const EditWishlist = () => {
  
  if(wishlistname == "")
  {
    Alert.alert("Please enter wishlist name !!")
  }
  else
  {
     EditWishlistFinal()
  }

}
const EditWishlistFinal = async () => {

  setRenameLoading(true);
              try {
                const response = await fetch(APICONFIG.REST_WC_URL+"/rename_wishlist",
                                              {
                                                method:"POST",
                                                body:JSON.stringify({
                                                   user_id:user.ID,
                                                   wishlist_id:wishlistid,
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
                  alert("Wishlist renamed successfully !!")
                  setModalVisibleRename(false);
                  getWishlist();
                }
               
              } catch (error) {
                console.error(error);
                alert(error)
              } finally {
                setRenameLoading(false);
                
              }
    
  

}

//move wishlist item
const moveItem = (wishlistitem) => {

  setMoveWishlistName(wishlistitem.name);
  setMoveWishlistItemId(wishlistitem.id);
  setModalVisible(false);
  setMoveToWishlist(null);
  setModalVisibleMove(true);
}

const ProcessMoveToList = async () => {

  if(moveToWishlist == undefined)
  {
    Alert.alert("Please select wishlist !!")
  }
  else
  {
  setMoveLoading(true);
//alert("movetowishlist :"+moveToWishlist.ID)
  try {
    const response = await fetch(APICONFIG.REST_WC_URL+"/remove_from_wishlist",
                                  {
                                    method:"POST",
                                    body:JSON.stringify({
                                       user_id:user.ID,
                                       wishlist_id:selectedWishlist.ID,
                                       product_id:movewishlistitemid,
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
          alert("Item moved successfully !!")
        }
       
      } catch (error) {
        console.error(error);
        alert(error)
      } finally {
        setModalVisibleMove(false);
        getWishlist();
        
      }
    }
   
  } catch (error) {
    console.error(error);
    alert(error)
  } finally {
    setMoveLoading(false)
    
  }


  }
  



}

///delete wishlist item
const deleteItem = (wishlistitem) => {
  Alert.alert(
    "Confirm",
      "Are you sure,you want to delete this product from the list ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
              DeleteWishlistItemFinal(wishlistitem)
        } }
      ]
  )
}
const DeleteWishlistItemFinal = async (wishlistitem) => {
  //alert("wishlist id:"+selectedWishlist.ID+" product id:"+wishlistitem.id);

  setDeleteProductLoading(true);
              try {
                const response = await fetch(APICONFIG.REST_WC_URL+"/remove_from_wishlist",
                                              {
                                                method:"POST",
                                                body:JSON.stringify({
                                                   user_id:user.ID,
                                                   wishlist_id:selectedWishlist.ID,
                                                   product_id:wishlistitem.id,
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
                  alert("Product deleted successfully !!")
                  setModalVisible(false);
                  getWishlist();
                }
               
              } catch (error) {
                console.error(error);
                alert(error)
              } finally {
                setDeleteProductLoading(false);
                
              }
    
  
  
}

//add all to cart
const AddAllToCart = () => {
  selectedWishlist.product_details.map((item)=>{
    if(item.type=="simple")
    {
    let prodcutitem = {"id":item.id,"full_item":item,"variation_id":item.id,"variation_item":item};  
    handleAddMultipleToCart(prodcutitem);
    }
    
  });
  Alert.alert(t('common_allitemaddedtocart_lbl'));
  setModalVisible(false);
}

const DATA = [{id:1,name:"Jad Taous",subtitle:"Favourites - 1 item",active:true},{id:2,name:"Youssef Taous",subtitle:"1 item",active:false},{id:3,name:"Your List",subtitle:"No items added yet!",active:false}];
  
  const Item = ({ item }) => (
    <CardView
          cardElevation={3}
          cardMaxElevation={3}
          cornerRadius={15}>
    <TouchableOpacity onPress={()=>{setSelectedWishlist(item);setModalVisible(true)}}><View  style={[styles.item,{backgroundColor:item.active?"#F2F8FD":"white",flexDirection:"row"}]}>
      <View style={{flex:3}}>
      <View style={{flexDirection:"row",marginTop:15,marginStart:15}}>
        {item.active && <View style={{flex:1.5,justifyContent:"center",alignItems:"flex-start"}}><FontAwesomeIcon name="heart" size={14} color={Colors.drawerHeaderBackground} /></View>}
        <View style={{flex:item.active?20:1,justifyContent:"center",alignItems:"flex-start"}}><Text style={styles.address_name}>{item.name}</Text></View>
      </View>
      <Text style={styles.name}>{item.product_details?item.product_details.length:0} {t('mylists_items_lbl')}</Text>
      </View>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <FastImage
            style={{height:"70%",width:"70%"}}
            source={{
                uri: item.product_details.length > 0?"https://beta.taous.ma/product_image.php?pid="+item.product_details[0].id:null,
                
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />  
      {/* <Image source={{uri:item.product_details.length > 0?"https://beta.taous.ma/product_image.php?pid="+item.product_details[0].id:null}} defaultSource={require("../assets/images/spinnergif.gif")} style={{height:"70%",width:"70%",resizeMode:"contain",alignSelf:"center"}} />    */}
      </View>
    </View>
    </TouchableOpacity>
    </CardView>
  );
  
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

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
      <Text style={styles.name}>Touch here to move item to this list</Text>
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
    <Text style={styles.name1}>Item will be moved to this list</Text>
    </View>
    
  </View>
  </TouchableOpacity>
  </CardView>)

    }
  };

  const renderItemMove = ({ item }) => (
    <ItemMove item={item} />
  );

  const renderWishlistItem = ({item}) => (
    //return (<View style={{width:"100%",height:100,backgroundColor:"red",marginTop:5}} ></View>)
    <WishlistItem item={item}
     
     props={props}
     marginTop={5}
     deleteItem={deleteItem}
     moveItem={moveItem}
     
  />
  )
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{height:100,borderBottomWidth:1,borderColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}}>
    <TouchableOpacity onPress={()=>{setWishlistName('');setWishlistId(0);setModalVisibleAdd(true)}} style={{height:35,width:"90%"}}><View style={{justifyContent:"center",alignItems:"center",backgroundColor:Colors.greenBtnColor,height:35,width:"100%",borderRadius:20}}>
    <Text style={{color:"white",fontFamily:FONT.RobotoBold}}>{t('mylists_createanewlist_lbl')}</Text>

    </View>
    </TouchableOpacity>
    </View>  
    <ScrollView style={{ flex: 1 ,marginTop:20}}>
    
    
   {isWishlistLoading? <View style={{marginVertical:6,marginHorizontal:20,justifyContent:"center",alignItems:"center",flex:1}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:datawishlist.length > 0 ? <View style={{marginVertical:6,marginHorizontal:20}}>
      
       
          <FlatList
             
             
             data={datawishlist}
             renderItem={renderItem}
             showsHorizontalScrollIndicator={false}
           />
        
    </View>:<View style={{height:300,marginVertical:6,marginHorizontal:20,justifyContent:"center",alignItems:"center"}}>
      
       
      <Text style={{fontSize:14,color:Colors.drawerHeaderBackground,fontFamily:FONT.RobotoBold}}>Yet to create wishlist !!</Text>
    
</View>}

   
    <View style={{backgroundColor:"white",marginTop:20,borderTopWidth:1,borderColor:Colors.commonbg}}>
        <View style={{justifyContent:"center",alignItems:"center",marginTop:20}}>
          <Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"gray"}}>{t('common_lovetohear_lbl')}</Text>
          <TouchableOpacity><View style={{width:140,height:30,marginTop:10,justifyContent:"center",alignItems:"center",borderWidth:1,borderColor:"gray",backgroundColor:"white",borderRadius:12}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:"black"}}>{t('common_givefeedback_lbl')}</Text></View></TouchableOpacity>
          
       </View>
         </View>
    
    
  
   

 

    
    </ScrollView>

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
          <View style={{backgroundColor:Colors.commonbg,height:650,width:"90%",borderRadius:10}} >
            <ScrollView style={{flex:1}}>
                <View>
                  <View style={{height:50,justifyContent:"center",alignItems:"center",flexDirection:"row"}}><EntypoIcon name="list" size={25} color={Colors.greenBtnColor} /><Text style={{fontFamily:FONT.RobotoBold,fontSize:20,color:Colors.greenBtnColor,marginStart:5}}>{selectedWishlist.name} ({selectedWishlist && selectedWishlist.product_details?selectedWishlist.product_details.length:0})</Text></View>
                  {selectedWishlist && selectedWishlist.product_details && selectedWishlist.product_details.length > 0?<FlatList
             
             
             data={selectedWishlist && selectedWishlist.product_details?selectedWishlist.product_details:[]}
             renderItem={renderWishlistItem}
             extraData={selectedWishlist.product_details}
             
           />:<View style={{justifyContent:"center",alignItems:"center",height:500}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:18,color:Colors.greenBtnColor}}>No Products in list !!</Text></View>}
                
                </View>
            </ScrollView>
            <View style={{position:"absolute",height:50,width:"100%",bottom:0,left:0,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
              <TouchableOpacity onPress={()=>{setWishlistName(selectedWishlist.name);setWishlistId(selectedWishlist.ID);setModalVisible(false);setModalVisibleRename(true)}}><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_edit_lbl')}</Text></View></TouchableOpacity>
              {!isDeleteLoading && <TouchableOpacity onPress={()=>{DeleteWishlist()}} ><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_delete_lbl')}</Text></View></TouchableOpacity>}
              {isDeleteLoading && <View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><ActivityIndicator size={"small"} color="white" /></View>}
              <TouchableOpacity onPress={()=>AddAllToCart()} ><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:120,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_addalltocart_lbl')}</Text></View></TouchableOpacity>
              <TouchableOpacity onPress={()=>{setModalVisible(false);setSelectedWishlist({});}}><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_close_lbl')}</Text></View></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleAdd}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleAdd(!modalVisibleAdd);
        }}
      >
        <View style={{backgroundColor:"black",opacity:0.3,width:"100%",height:"100%",position:"absolute",left:0,top:0}}></View>
        <View style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
          <View style={{backgroundColor:Colors.commonbg,height:350,width:"90%",borderRadius:10}} >
           
                <View>
                  <View style={{height:50,justifyContent:"center",alignItems:"center",flexDirection:"row"}}><EntypoIcon name="list" size={25} color={Colors.greenBtnColor} /><Text style={{fontFamily:FONT.RobotoBold,fontSize:20,color:Colors.greenBtnColor,marginStart:5}}>Add New Wishlist</Text></View>
                  <View style={{height:230,width:"100%",justifyContent:"center",alignItems:"center"}}>
                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:18,color:Colors.greenBtnColor,height:30,textAlignVertical:"center"}}>{t('common_listname_lbl')} :</Text><TextInput placeholder={t('common_wishlistname_lbl')} onChangeText={(newtext)=>{setWishlistName(newtext)}} value={wishlistname} style={{paddingStart:3,fontFamily:FONT.RobotoRegular,fontSize:18,color:Colors.greenBtnColor,borderRadius:5,borderWidth:1,borderColor:Colors.greenBtnColor,width:140,marginStart:5,height:30}} /></View>
                  </View>  
                
                </View>
            
            <View style={{position:"absolute",height:50,width:"100%",bottom:0,left:0,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
              
              {!isAddLoading && <TouchableOpacity onPress={()=>{AddWishlist()}} ><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_add_lbl')}</Text></View></TouchableOpacity>}
              {isAddLoading && <View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><ActivityIndicator size={"small"} color="white" /></View>}
              
              <TouchableOpacity onPress={()=>{setModalVisibleAdd(false);}}><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_cancel_lbl')}</Text></View></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleRename}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleRename(!modalVisibleRename);
        }}
      >
        <View style={{backgroundColor:"black",opacity:0.3,width:"100%",height:"100%",position:"absolute",left:0,top:0}}></View>
        <View style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
          <View style={{backgroundColor:Colors.commonbg,height:350,width:"90%",borderRadius:10}} >
           
                <View>
                  <View style={{height:50,justifyContent:"center",alignItems:"center",flexDirection:"row"}}><EntypoIcon name="list" size={25} color={Colors.greenBtnColor} /><Text style={{fontFamily:FONT.RobotoBold,fontSize:20,color:Colors.greenBtnColor,marginStart:5}}>Edit Wishlist - {wishlistname}</Text></View>
                  <View style={{height:230,width:"100%",justifyContent:"center",alignItems:"center"}}>
                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",height:30}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:18,color:Colors.greenBtnColor,height:30,textAlignVertical:"center"}}>{t('common_listname_lbl')} :</Text><TextInput placeholder={t('common_wishlistname_lbl')} onChangeText={(newtext)=>{setWishlistName(newtext)}} value={wishlistname} style={{fontFamily:FONT.RobotoRegular,fontSize:18,color:"red",borderRadius:5,borderWidth:1,borderColor:Colors.greenBtnColor,width:140,marginStart:5,height:30}} /></View>
                  </View>  
                
                </View>
            
            <View style={{position:"absolute",height:50,width:"100%",bottom:0,left:0,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
              
              {!isRenameLoading && <TouchableOpacity onPress={()=>{EditWishlist()}} ><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_add_lbl')}</Text></View></TouchableOpacity>}
              {isRenameLoading && <View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><ActivityIndicator size={"small"} color="white" /></View>}
              
              <TouchableOpacity onPress={()=>{setModalVisibleRename(false);}}><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_cancel_lbl')}</Text></View></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleMove}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleMove(!modalVisibleMove);
        }}
      >
        <View style={{backgroundColor:"black",opacity:0.3,width:"100%",height:"100%",position:"absolute",left:0,top:0}}></View>
        <View style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
          <View style={{backgroundColor:Colors.commonbg,height:600,width:"90%",borderRadius:10}} >
           
                <View>
                  <View style={{height:70,justifyContent:"center",alignItems:"center",flexDirection:"row",width:"80%"}}><EntypoIcon name="list" size={25} color={Colors.greenBtnColor} /><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:Colors.greenBtnColor,marginStart:5}} numberOfLines={3}>Move Item - {movewishlistitemname}</Text></View>
                  
                  <View style={{height:450}}>
                  <FlatList
             
             
             data={datawishlist}
             renderItem={renderItemMove}
             showsHorizontalScrollIndicator={false}
           />
                  
                
                </View>
                </View> 
                
            <View style={{position:"absolute",height:50,width:"100%",bottom:0,left:0,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
              
              
            {!isMoveLoading && <TouchableOpacity onPress={()=>{ProcessMoveToList()}}><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>Move</Text></View></TouchableOpacity>}
            {isMoveLoading && <View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><ActivityIndicator size={"small"} color="white" /></View>}

              <TouchableOpacity onPress={()=>{setModalVisibleMove(false);}}><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_cancel_lbl')}</Text></View></TouchableOpacity>
            </View>
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
  address_name: {
    
    color:"black",
    
    
    
    
    
    fontFamily:FONT.RobotoBold,
    fontSize:16
  },
  name: {
    fontSize: 14,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    marginStart:15,
    marginTop:5,
    
  },
  name1: {
    fontSize: 14,
    color:"black",
    fontFamily:FONT.RobotoMedium,
    marginStart:15,
    marginTop:5,
    
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

export default MyLists;