import React,{ useEffect,useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Modal, 
  Alert
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import { Colors } from "../style/colors";
import { getUserWishlists} from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RNRestart from 'react-native-restart'; 
import SplashScreen from 'react-native-splash-screen'
import AntIcon from 'react-native-vector-icons/AntDesign';
import RecentProductItem from "../components/RecentProductItem";

import EntypoIcon from 'react-native-vector-icons/Entypo';

import CardView from 'react-native-cardview'
import ProductItem from "../components/ProductItem";
import SearchProductItem from "../components/SearchProductItem";
import { FONT } from "../style/fonts";
import FavouriteDepartmentItem from "../components/FavouriteDepartmentItem";
import DepartmentItem from "../components/DepartmentItem";
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import { useFocusEffect } from '@react-navigation/native';
import {chekProductExistsInWishlist,getWishlistWithProduct} from '../commonfunctions';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const Search = (props) => {
  const dispatch = useDispatch(); 
  const {t, i18n} = useTranslation();
  const [catid,setCatId] = useState(props.route.params!=undefined && props.route.params.CatId!=null?props.route.params.CatId:0);
  const [catname,setCatName] = useState(props.route.params!=undefined && props.route.params.CatName!=null?props.route.params.CatName:"All");
  
  
  const {lang} = useSelector(state=>state.langReducer);
  const [loading,setLoading] = useState(false);
  const [catdata,setCatData] = useState([]);
  const [productdata,setProductData] = useState([]);

  const [isAddLoading,setAddLoading] = useState(false);
  const [isFilterLoading,setFilterLoading] = useState(false);
  const [isAddWishlistLoading,setAddWishlistLoading] = useState(false);
  const [moveToWishlist,setMoveToWishlist] = useState();
  const [movewishlistitemid,setMoveWishlistItemId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlistname, setWishlistName] = useState("");
  const [wishlistitem,setWishlistItem] = useState({});
  const [filters,setFilters] = useState([]);
  const [modalFilterVisible,setModalFilterVisible] = useState(false);
  const [pType,setPtype] = useState(-1);
  const [minprize,setMinPrize] = useState("");
  const [maxprize,setMaxPrize] = useState("");

  const {wishlist} = useSelector(state=>state.wishlistReducer);
  const {user} = useSelector(state=>state.userReducer);

  const windowWidth = Dimensions.get('window').width;
  
  if (i18n.language != lang) {
    
    
    i18n.changeLanguage(lang);
    
    
  }


  useEffect(() => {
    fetchCategories();
  },[props.route.params]);

  useFocusEffect(
    React.useCallback(() => {
      
          
          
          
          fetchCategories();
          fetchWishlists();
          
          
        }, [props.route.params])
  );


  const fetchCategories = async () => {
  

    
    let catid =  props.route.params!=undefined && props.route.params.CatId!=null?props.route.params.CatId:0;
    

    setLoading(true);
     try {
     const response = await fetch(APICONFIG.REST_WC_URL+"/products/categories?hide_empty=true&parent="+catid+"&orderby=name&order=asc",
                                 {
                                   method:"GET",
                                   
                                   headers : {
                                     Accept: 'application/json',
                                     'Content-Type': 'application/json',
                                     Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                   }
                             });
    
    const json = await response.json();
    setCatData(json);
    if(json.length == 0)
    {
      fetchProducts();
    }
    else
    {
      setLoading(false);
      setProductData([]);
    }
    
    
  } catch (error) {
    console.error(error);
    alert(error)
    
  } finally {
   
   
   
  }
  
  
 }

 const fetchProducts = async () => {
  

  
  

  setLoading(true);
   try {
   const response = await fetch(APICONFIG.REST_WC_URL+"/products/?per_page=100&category="+catid,
                               {
                                 method:"GET",
                                 
                                 headers : {
                                   Accept: 'application/json',
                                   'Content-Type': 'application/json',
                                   Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                 }
                           });
  
  const json = await response.json();
  setProductData(json);
  
  
} catch (error) {
  console.error(error);
  alert(error)
  
} finally {
 setLoading(false);
 
 
}


}

 
  
 
  
  
   const renderFavouriteDepartmentItem =  ({item})=>(
    <DepartmentItem item={item}
       height={(windowWidth/2)-30}
       width={(windowWidth/3)-20}
       marginEnd={14}
       props={props}
       marginTop={10}
       borderRadius={15}
       borderWidth={1}
       borderColor={Colors.lightGreen1}
       
       
    />
    
  ); 
  
  
  const renderRecentItem = ({item})=>(
    <SearchProductItem item={item}
       height={250}
       width={178}
       backgroundColor={"white"}
       marginEnd={5}
       addToWishlist={addToWishlist}
       props={props}
       
       
    />
    
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

  const fetchWishlists = () => dispatch(getUserWishlists());


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



  const ApplyFilters = async () => {

    
    if((minprize=="" || maxprize == "") && pType=="-1")
    {
      alert("Please add atlest one filter,either prize range or product type")
    }
    else
    {
      if(minprize!="" && maxprize == "")
      {
        alert("Please enter max prize to apply prize range filter !!")

      }
      else if(minprize=="" && maxprize !="")
      {
        alert("Please enter min prize to apply prize range filter !!")
      }
      else
      {
        if(minprize!="" && pType!="-1")
        {
          setFilters([{"MinPrize":minprize},{"MaxPrize":maxprize},{"ProductType":pType}]);
        }
        else if(minprize!="" && pType=="-1")
        {
          setFilters([{"MinPrize":minprize},{"MaxPrize":maxprize}]);
        }
        else if(minprize=="" && pType!="-1")
        {
          setFilters([{"ProductType":pType}])
        }
        setFilterLoading(true);
        setLoading(true);
        let queryString = "";
        if(minprize!="")
        queryString=queryString+"&min_price="+minprize;

        if(maxprize!="")
        queryString=queryString+"&max_price="+maxprize;

        if(pType=="2")
        queryString=queryString+"&on_sale=1";

        if(pType=="0")
        queryString=queryString+"&orderby=date&order=desc";

        if(pType=="1")
        queryString=queryString+"&orderby=rating&order=desc";




                    try {
                    const response = await fetch(APICONFIG.REST_WC_URL+"/products/?per_page=100&category="+catid+queryString,
                                                {
                                                  method:"GET",
                                                  
                                                  headers : {
                                                    Accept: 'application/json',
                                                    'Content-Type': 'application/json',
                                                    Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                                  }
                                            });
                    
                    const json = await response.json();
                    setProductData(json);
                    
                    
                  } catch (error) {
                    console.error(error);
                    alert(error)
                    
                  } finally {
                  setLoading(false);
                  setFilterLoading(false);
                  //

                  
                  }

      }
        
    }

  }

  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{flexDirection:"row"}}>
    <View style={{height:50,flex:1,justifyContent:"center",alignItems:"flex-start",marginStart:20}}><Text style={{color:Colors.black,fontSize:16,fontFamily:FONT.RobotoSemiBold}}>{catdata.length > 0?t('search_browsedepartments_lbl'):productdata.length > 0 ? t('search_showingall_lbl')+' '+productdata.length+" "+t('search_results_lbl'):productdata.length == 0 && filters.length > 0?"0 Products found":""}</Text></View>  
    {catdata.length==0 && productdata.length > 0 && <TouchableOpacity onPress={()=>setModalFilterVisible(true)}><View style={{height:50,flex:1,justifyContent:"flex-end",alignItems:"center",marginEnd:20,flexDirection:"row"}}><FeatherIcon name="filter" size={20} color={Colors.greenBtnColor} /><View style={{height:14,width:14,borderRadius:7,backgroundColor:Colors.drawerHeaderBackground,position:"absolute",right:-9,top:7,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoBold,fontSize:10,color:"white"}}>{filters.length}</Text></View></View></TouchableOpacity>}
    {catdata.length==0 && productdata.length == 0 && filters.length > 0 && <TouchableOpacity onPress={()=>setModalFilterVisible(true)}><View style={{height:50,flex:1,justifyContent:"flex-end",alignItems:"center",marginEnd:20,flexDirection:"row"}}><FeatherIcon name="filter" size={20} color={Colors.greenBtnColor} /><View style={{height:14,width:14,borderRadius:7,backgroundColor:Colors.drawerHeaderBackground,position:"absolute",right:-9,top:7,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoBold,fontSize:10,color:"white"}}>{filters.length}</Text></View></View></TouchableOpacity>}
    </View>
    {!loading && catdata.length > 0 && <View style={{ flex: 1, paddingHorizontal: 10 }}>
    
    
      <FlatList
                
                  
                  data={catdata}
                  renderItem={renderFavouriteDepartmentItem}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                />
    
           

    
    </View>}
    {!loading && catdata.length == 0 && productdata.length > 0 &&<View style={{ flex: 1, paddingHorizontal: 10}}>
    
    
    <FlatList
                
                  
                  data={productdata}
                  renderItem={renderRecentItem}
                  showsHorizontalScrollIndicator={false}
                  numColumns={2}
                  columnWrapperStyle={{justifyContent:'space-between', }}
                />
  
         

  
  </View>}
  {!loading && catdata.length == 0 && productdata.length == 0 && <View style={{ flex: 1, paddingHorizontal: 10,justifyContent:"center",alignItems:"center"}}>
    
    
    <Text style={{fontSize:16,color:"black",fontFamily:FONT.RobotoRegular}}>{t('search_noproductsfound_lbl')}</Text>
  
         

  
  </View>}
    {loading && <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalFilterVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalFilterVisible(!modalFilterVisible);
        }}
      >
        <View style={{backgroundColor:"black",opacity:0.3,width:"100%",height:"100%",position:"absolute",left:0,top:0}}></View>
        <View style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
          <View style={{backgroundColor:Colors.commonbg,height:250,width:"90%",borderRadius:10}} >
           
          <View style={{height:250}}>
                  <View style={{height:70,justifyContent:"center",alignItems:"center",flexDirection:"row",width:"100%"}}><FeatherIcon name="filter" size={25} color={Colors.greenBtnColor} /><Text style={{fontFamily:FONT.RobotoBold,fontSize:18,color:Colors.greenBtnColor,marginStart:5}} numberOfLines={3}>Filters</Text></View>
                  
                  <View style={{height:130}}>
                  
                  <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",height:30,marginHorizontal:10}}><Text style={{fontFamily:FONT.RobotoRegular,fontSize:14,color:"black",height:30,textAlignVertical:"center",flex:1,marginHorizontal:5}}>Min Prize :</Text><Text style={{flex:1,marginHorizontal:5,fontFamily:FONT.RobotoRegular,fontSize:14,color:"black",height:30,textAlignVertical:"center"}}>Max Prize :</Text></View>
                  <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",height:30,marginHorizontal:10}}><TextInput placeholder="0" onChangeText={(newtext)=>{setMinPrize(newtext)}} value={minprize} style={{paddingStart:3,fontFamily:FONT.RobotoRegular,fontSize:18,color:Colors.greenBtnColor,borderRadius:5,borderWidth:1,borderColor:"gray",height:30,flex:1,marginHorizontal:5}} /><TextInput placeholder="0" onChangeText={(newtext)=>{setMaxPrize(newtext)}} value={maxprize} style={{paddingStart:3,fontFamily:FONT.RobotoRegular,fontSize:18,color:Colors.greenBtnColor,borderRadius:5,borderWidth:1,borderColor:"gray",height:30,flex:1,marginHorizontal:5}} /></View>
                  <View style={{flexDirection:"row",height:30,marginHorizontal:10}}>
                  <View style={{marginTop:20,height:30,flex:1,justifyContent:"flex-start",alignItems:"flex-start",marginStart:5}}>
                      <RadioForm
                        radio_props={[{label:"New Arrival",value:0},{label:"Top Rated",value:1},{label:"Sale",value:2}]}
                        initial={pType}
                        formHorizontal={true}
                        labelHorizontal={true}
                        buttonColor={"gray"}
                        selectedButtonColor={Colors.greenBtnColor}
                        animation={true}
                        onPress={(value) => {setPtype(value)}}
                        buttonSize={10}
                        labelStyle={{fontSize: 14,width:100, color: 'black'}}
                      />

                      </View>
                  </View>
                
                </View>
                <View style={{position:"absolute",height:50,width:"100%",bottom:0,left:0,justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
             
            {!isFilterLoading && <TouchableOpacity onPress={()=>{ApplyFilters();}}><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:120,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>Apply Filter</Text></View></TouchableOpacity>}
            {isFilterLoading && <View style={{backgroundColor:Colors.greenBtnColor,height:30,width:70,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><ActivityIndicator size={"small"} color="white" /></View>}
            <TouchableOpacity onPress={()=>{setFilters([]);setMinPrize("");setMaxPrize("");setPtype(-1);setModalFilterVisible(false);fetchProducts()}}><View style={{backgroundColor:Colors.greenBtnColor,height:30,width:120,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><Text style={{fontSize:14,color:"white",fontFamily:FONT.RobotoRegular}}>Clear Filter</Text></View></TouchableOpacity>

              
            </View>
                </View> 

                
                
             
              
                <TouchableOpacity style={{position:"absolute",top:0,right:0}} onPress={()=>{setModalFilterVisible(false);}}><View style={{height:30,width:30,borderRadius:5,justifyContent:"center",alignItems:"center",margin:5}}><EntypoIcon name="circle-with-cross" color={Colors.greenBtnColor} size={30} /></View></TouchableOpacity>
          
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
  /* item: {
    backgroundColor: Colors.drawerHeaderBackground,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius:10
  }, */
  /*address_name: {
    fontSize: 24,
    color:"white",
    fontWeight:"bold"
  },*/
  /* name: {
    fontSize: 18,
    color:"white"
  }, */
  companyname: {
    fontSize: 18,
    color:"white"
  },
  street_address: {
    fontSize: 18,
    color:"white"
  },
  city: {
    fontSize: 18,
    color:"white"
  },
  state: {
    fontSize: 18,
    color:"white"
  },
  country: {
    fontSize: 18,
    color:"white"
  },
  zip: {
    fontSize: 18,
    color:"white"
  },
  input: {
    height: 40,
    margin: 2,
    
    padding: 2,
    fontFamily:FONT.RobotoMedium
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

export default Search;