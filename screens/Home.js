import React,{ useEffect,useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Modal,
  Pressable,
  TextInput,
  StatusBar,
  Alert 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';

import { getBooks ,addBookmark, removeBookmark,addToCart,createAndAddToWishlist, setFirstTime,getTopItems,getUserAddresses,addMultipleToCart,setWishlist,getUserWishlists} from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart'; 
import SplashScreen from 'react-native-splash-screen'
import { Colors } from "../style/colors";
import { SliderBox } from "react-native-image-slider-box";
import ProductItem from "../components/ProductItem";
import ProductItemHome from "../components/ProductItemHome";
import RecentProductItem from "../components/RecentProductItem";
import EssentialItem from "../components/EssentialItem";
import FavouriteDepartmentItem from "../components/FavouriteDepartmentItem";
import { panGestureHandlerCustomNativeProps } from "react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler";
import { APICONFIG } from "../config/api";
import {FONT} from '../style/fonts';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import CardView from 'react-native-cardview'
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useFocusEffect } from '@react-navigation/native';
import {chekProductExistsInWishlist,getWishlistWithProduct} from '../commonfunctions';


import base64 from 'react-native-base64';


const Home = (props) => {
  const [sliderImageIndex,setSliderImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlistname, setWishlistName] = useState("");
  const [wishlistitem,setWishlistItem] = useState({});


  const addMultipleToCartFun = product => dispatch(addMultipleToCart(product));
  const handleAddMultipleToCart = product =>{
    addMultipleToCartFun(product);
  }
  

  //user previously ordered items
  const [isTopOrderedProductLoading, setTopOrderedProductLoading] = useState(false);
  const [datatopordered, setDataTopOrdered] = useState([]);
  const [datatopdepartment,setDataTopDepartment] = useState([]);


  //Trending Products
  const [isTrendingProductLoading, setTrendingProductLoading] = useState(true);
  const [datatrending, setDataTrending] = useState([]);

  //Popular Products
  const [isPopularProductLoading, setPopularProductLoading] = useState(true);
  const [datapopular, setDataPopular] = useState([]);

  //Product Products
  const [isProduceProductLoading, setProduceProductLoading] = useState(true);
  const [dataproduce, setDataProduce] = useState([]);

  //Meat Products
  const [isMeattProductLoading, setMeatProductLoading] = useState(true);
  const [datameat, setDataMeat] = useState([]);

  //Protien Products
  const [isProtienProductLoading, setProtienProductLoading] = useState(true);
  const [dataprotien, setDataProtien] = useState([]);

  //Health Products
  const [isHealthProductLoading, setHealthProductLoading] = useState(true);
  const [datahealth, setDataHealth] = useState([]);

  //House Products
  const [isHouseProductLoading, setHouseProductLoading] = useState(true);
  const [datahouse, setDataHouse] = useState([]);

  ///sliders
  const [isSliderLoading, setSliderLoading] = useState(true);
  const [datasliderimages, setDataSliderImages] = useState([]);
  const [dataslidertitles, setDataSliderTitles] = useState([]);
  const [dataslidersubtitles, setDataSliderSubtitles] = useState([]);

  const [isAddLoading,setAddLoading] = useState(false);
  const [isAddWishlistLoading,setAddWishlistLoading] = useState(false);
  const [moveToWishlist,setMoveToWishlist] = useState();
  const [movewishlistitemid,setMoveWishlistItemId] = useState();

  
  const windowWidth = Dimensions.get('window').width;
  const {t, i18n} = useTranslation();
  
  
  const {lang} = useSelector(state=>state.langReducer);
  const {gettingStart} = useSelector(state=>state.firsttimeReducer);

  const {wishlist} = useSelector(state=>state.wishlistReducer);

  const {user} = useSelector(state=>state.userReducer);
  
  
  
 
  if (i18n.language != lang) {
    
    
    i18n.changeLanguage(lang);
    
    
  }
  const { books ,bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();


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
      Alert.alert(t('common_selectwishlist_lbl'))
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
    Alert.alert(t('common_enterwishlistname_lbl'))
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
                  alert(t('common_wishlistcreateditemadded_lbl'))
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
  const fetchTopItems = () => dispatch(getTopItems());
  const fetchUserAddresses = () => dispatch(getUserAddresses());
  const addToBookmarkList = book => dispatch(addBookmark(book));
  const removeFromBookmarkList = book => dispatch(removeBookmark(book));
  const addToCartFun = product => dispatch(addToCart(product));

  const createAndAddToWishlistFun = payload => dispatch(createAndAddToWishlist(payload));

  const handleAddBookmark = book => {
    addToBookmarkList(book);
  };
  
  const handleRemoveBookmark = book => {
    removeFromBookmarkList(book);
  };

  const handleAddToCart = product =>{
     addToCartFun(product);
  }

  const changeWishlist = wishlistdata => dispatch(setWishlist(wishlistdata));
  
  const handleWishlistChange = wishlistdata => {
    changeWishlist(wishlistdata);
  };

  const ifExists = book => {
    if (bookmarks.filter(item => item.id === book.id).length > 0) {
      return true;
    }
  
    return false;
  };

  useFocusEffect(
    React.useCallback(() => {
      
          
          
          fetchTopItems();
          fetchUserAddresses();
          fetchWishlists();
          
          ///show
           // hide
           const parent = props.navigation.dangerouslyGetParent();
           parent.setOptions({
               tabBarStyle: {display:'flex'},
           });

           // reveal after changing screen
           return () =>
               parent.setOptions({
                   tabBarStyle: {display:'flex'},
               });



        }, [])
  );

  useEffect(() => {
    
    handleFirstTime();
    //fetchBooks();
    getTrendingProducts();
    getPopularProducts();
    getProduceProducts();
    getMeatProducts();
    getProtienProducts();
    getHealthProducts();
    getHouseProducts();
    getSliderImages();
    
    
    
    //SplashScreen.hide();
  }, []);

  useEffect(()=>{
    
  },[gettingStart])

//record user has loaded app first time

handleFirstTime = () => {
  
  
  dispatch(setFirstTime("0"));
}
//

//fetch trending products//
const getUserTopOrderProducts = async () => {

  
  if(Object.keys(user).length > 0)
  {

              try {
              const response = await fetch(APICONFIG.REST_WC_URL+"/user_top_ordered_items?",
                                            {
                                              method:"POST",
                                              body: JSON.stringify({
                                                lang: lang,
                                                user_id:user.ID
                                              }),
                                              headers : {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                                Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                              }
                                        });
              
              const json = await response.json();
              setDataTopOrdered(json.items);
              setDataTopDepartment(json.departments)
             
            } catch (error) {
              console.error(error);
            } finally {
              setTopOrderedProductLoading(false);
            }
  }
  else
  {
    setDataTopOrdered([]);
    setDataTopDepartment([]);
    setTopOrderedProductLoading(false);
  } 
}  


//fetch trending products//
const getTrendingProducts = async () => {
  try {
   const response = await fetch(APICONFIG.REST_WC_URL+"/home_widget_trend?lang="+lang,
                                {
                                  method:"GET",
                                  
                                  headers : {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                    Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                  }
                            });
   
   const json = await response.json();
   setDataTrending(json);
   
 } catch (error) {
   console.error(error);
 } finally {
  setTrendingProductLoading(false);
 }
}  

//fetch popular products//
const getPopularProducts = async () => {
  try {
   const response = await fetch(APICONFIG.REST_WC_URL+"/home_widget_pp?lang="+lang,
                              {
                                method:"GET",
                               
                                headers : {
                                  Accept: 'application/json',
                                  'Content-Type': 'application/json',
                                  Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                }
                            });
   const json = await response.json();
   setDataPopular(json);
 } catch (error) {
   console.error(error);
 } finally {
  setPopularProductLoading(false);
 }
}  

//fetch produce products//
const getProduceProducts = async () => {
  try {
   let cat_array  = [27,65,362]; 
   const response = await fetch(APICONFIG.REST_WC_URL+"/products?lang="+lang+"&per_page=6&category="+cat_array
   ,
                              {
                                method:"GET",
                                
                                headers : {
                                  Accept: 'application/json',
                                  'Content-Type': 'application/json',
                                  Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                }
                            }
   
   );
   const json = await response.json();
   
   setDataProduce(json);
 } catch (error) {
   console.error(error);
   
 } finally {
  setProduceProductLoading(false);
 }
}  
//fetch meat products//
const getMeatProducts = async () => {
  try {
  let cat_array  = [29, 30, 571,579, 576];  
   const response = await fetch(APICONFIG.REST_WC_URL+"/products?lang="+lang+"&per_page=6&category="+cat_array
   ,
                              {
                                method:"GET",
                                
                                headers : {
                                  Accept: 'application/json',
                                  'Content-Type': 'application/json',
                                  Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                }
                            }
   );
   const json = await response.json();
   setDataMeat(json);
 } catch (error) {
   console.error(error);
 } finally {
  setMeatProductLoading(false);
 }
}  

//fetch protien products//
const getProtienProducts = async () => {
  try {
    const response = await fetch(APICONFIG.REST_WC_URL+"/home_widget_mpls?lang="+lang,
    {
      method:"GET",
     
      headers : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
      }
  });
const json = await response.json();
   setDataProtien(json);
 } catch (error) {
   console.error(error);
 } finally {
  setProtienProductLoading(false);
 }
}  

//fetch health products//
const getHealthProducts = async () => {
  try {
    const response = await fetch(APICONFIG.REST_WC_URL+"/products?lang="+lang+"&per_page=6&category=19",
    {
      method:"GET",
      
      headers : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
      }
  });
const json = await response.json();
   setDataHealth(json);
 } catch (error) {
   console.error(error);
 } finally {
  setHealthProductLoading(false);
 }
} 

//fetch house products//
const getHouseProducts = async () => {
  try {
    const response = await fetch(APICONFIG.REST_WC_URL+"/products?lang="+lang+"&per_page=6&category=17",
    {
      method:"GET",
      
      headers : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
      }
  });
const json = await response.json();
   setDataHouse(json);
  
 } catch (error) {
   console.error(error);
 } finally {
  setHouseProductLoading(false);
 }
} 
//fetch slider images and content

const getSliderImages = async() => {
  let datasliderimage  = [];
  let dataslidertitle = [];
  let dataslidersubtitle = [];
  //alert(base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET))
  try {
    
    const response = await fetch(APICONFIG.REST_WC_URL+"/home_image_slider?lang="+lang,{
      method:"GET",
      
      headers : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
      }
    });
    const json = await response.json();
    //alert(JSON.stringify(json))
    json.map((item)=>{
      datasliderimage = ([...datasliderimage,item.image.url]);
      dataslidertitle = ([...dataslidertitle,item.image_data.post_title]);
      dataslidersubtitle = ([...dataslidersubtitle,item.image_data.post_content]);
    })
    setDataSliderImages(datasliderimage);
    setDataSliderTitles(dataslidertitle);
    setDataSliderSubtitles(dataslidersubtitle);
    
    //setDataHouse(json);
  } catch (error) {
    alert("error:"+JSON.stringify(error));
  } finally {
   setSliderLoading(false)
  }
}

///fetch wishlist
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
              
              handleWishlistChange(json);///for reducer
              
              
            } catch (error) {
              console.error(error);
              alert(error)
            } finally {
              
            }
  }
  else
  {
    
    handleWishlistChange([]);///for reducer
  } 
}  


//add all to cart
const AddAllToCart = () => {
  user.topitems.map((item)=>{
    //alert("product id :"+item.id)
    if(item.type=="simple" && item.price!="" && item.price!=0)
    {
    let prodcutitem = {"id":item.id,"full_item":item,"variation_id":item.id,"variation_item":item};  
    handleAddMultipleToCart(prodcutitem);
    }
  });
  Alert.alert(t('common_allitemaddedtocart_lbl'));
  
}


const DATA = [
    
     {"id":1,"name":t("home_addinoneclick_lbl"),"data":Object.keys(user).length>0?user.topitems:[]}, 
    /*  {"id":2,"name":"Pickup & Delivery","data":[{id:11,category:"Grocery",name:"Product 11"},{id:12,category:"House Hold",name:"Product 12"},{id:13,category:"Baby",name:"Product 13"},{id:14,category:"Health & Beauty",name:"Product 14"},{id:15,category:"Kitchen",name:"Product 15"},{id:16,category:"Seasonal",name:"Product 16"},{id:17,category:"Hardware",name:"Product 17"},{id:18,category:"School & Office",name:"Product 18"},{id:19,category:"Electronics",name:"Product 19"},{id:20,category:"Organic",name:"Product 20"}]}, 
     {"id":4,"name":"Save big","data":[{id:31,category:"Grocery",name:"Product 31"},{id:32,category:"House Hold",name:"Product 32"},{id:33,category:"Baby",name:"Product 33"},{id:34,category:"Health & Beauty",name:"Product 34"},{id:35,category:"Kitchen",name:"Product 35"},{id:36,category:"Seasonal",name:"Product 36"},{id:37,category:"Hardware",name:"Product 37"},{id:38,category:"School & Office",name:"Product 38"},{id:39,category:"Electronics",name:"Product 39"},{id:40,category:"Organic",name:"Product 40"}]}, 
     {"id":6,"name":"Free Delivery","data":[{id:51,category:"Grocery",name:"Product 51"},{id:52,category:"House Hold",name:"Product 52"},{id:53,category:"Baby",name:"Product 53"},{id:54,category:"Health & Beauty",name:"Product 54"},{id:55,category:"Kitchen",name:"Product 55"},{id:56,category:"Seasonal",name:"Product 56"},{id:57,category:"Hardware",name:"Product 57"},{id:58,category:"School & Office",name:"Product 58"},{id:59,category:"Electronics",name:"Product 59"},{id:60,category:"Organic",name:"Product 60"}]}, 
     */ {"id":7,"name":t('home_yourfavoritedepartments_lbl'),"data":Object.keys(user).length>0?user.topdepartments:[]}, 
     {"id":3,"name":t('home_trending_lbl'),"data":datatrending}, 
     
     {"id":5,"name":t('home_popular_lbl'),"data":datapopular}, 
     {"id":8,"name":t('home_produce_lbl'),"data":dataproduce}, 
     {"id":9,"name":t('home_meatnseefood_lbl'),"data":datameat}, 
     {"id":10,"name":t('home_mpls_lbl'),"data":dataprotien}, 
     {"id":11,"name":t('home_healthnbeauty_lbl'),"data":datahealth}, 
     {"id":12,"name":t('home_household_lbl'),"data":datahouse}, 
     
     
     

    ];

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


const renderProductItem = ({item})=>(
  <ProductItemHome item={item}
     height={350}
     width={178}
     backgroundColor={"white"}
     marginEnd={5}
     borderRadius={10}
     borderWidth={2}
     borderColor={Colors.productitembordercolor}
     props={props}
     addToWishlist={addToWishlist}
  />
  
);   
const renderEssentialItem =  ({item})=>(
  <EssentialItem item={item}
     height={(windowWidth/4)-10}
     width={(windowWidth/4)-10}
     marginEnd={5}
     props={props}
     marginTop={5}
     
  />
  
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

const renderFavouriteDepartmentItem =  ({item})=>(
  <FavouriteDepartmentItem item={item}
     height={(windowWidth/3)-10}
     width={(windowWidth/3)-10}
     marginEnd={5}
     props={props}
     marginTop={10}
     
  />
  
); 


const imageLoaderComponent =  () =>{

  return (<View style={{height:"100%",width:"100%",justifyContent:"flex-start",alignItems:"center"}} ><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>)
}

const renderItemComp = ({ item }) => (

    <View style={{marginTop:(item.id!=1 && item.id!=7)?6:Object.keys(user).length > 0?6:0,marginBottom:(item.id!=1 && item.id!=7)?15:Object.keys(user).length > 0?15:0,borderBottomWidth:(item.id <=7)?(item.id==3 || item.id==5 || item.id==2 || item.id==4 )?0:2:0,borderBottomColor:(item.id!=1 && item.id!=7)?Colors.commonbg:Object.keys(user).length > 0?Colors.commonbg:"white"}}>
      {((item.id==7 && Object.keys(user).length > 0) || (item.id==1 && Object.keys(user).length > 0) ||  item.id==3 || item.id==5 || item.id==8 || item.id==9 || item.id==10 || item.id==11 || item.id==12) && <View style={{height:30,width:"100%",justifyContent:"center",alignItems:"flex-start",marginStart:20}}><Text style={{color:Colors.black,fontSize:16,fontFamily:FONT.RobotoSemiBold}}>{item.name}</Text></View>}
      
      
        
{item.id == 1 && Object.keys(user).length > 0 &&
  <View style={{marginVertical:5,marginHorizontal:5,justifyContent:"center",alignItems:"center"}}>
  {isTopOrderedProductLoading?<View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:
  
  item.data && item.data.length > 0 ? <FlatList
           
            
            data={item.data}
            renderItem={renderEssentialItem}
            showsHorizontalScrollIndicator={false}
            numColumns={4}
          />:<View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoMedium,color:Colors.greenBtnColor,fontSize:14}}>{t('home_nodatafound_lbl')}</Text></View>}
          </View> 
          }
{item.id == 1 && Object.keys(user).length > 0 && item.data && item.data.length > 0 && <View style={{height:40,width:"100%",justifyContent:"flex-start",alignItems:"flex-start",marginTop:15,marginStart:20,marginBottom:15}}><TouchableOpacity onPress={()=>{AddAllToCart()}}><View style={{backgroundColor:Colors.greenBtnColor,borderRadius:15,padding:5}}><Text style={{color:"white",paddingVertical:3,paddingHorizontal:10,fontSize:14,fontFamily:FONT.RobotoSemiBold}}>{t('home_quickadd_lbl')}</Text></View></TouchableOpacity></View>}
{item.id == 2 &&
  <View style={{marginTop:0,marginBottom:0,marginHorizontal:20,borderWidth:1,borderRadius:5,borderColor:Colors.commonbg,justifyContent:"center",alignItems:"center",height:150,backgroundColor:"white",flexDirection:"row"}}>
          
          <View style={{flex:2.5,height:"100%",backgroundColor:"white"}}>
          <Image source={require('../assets/images/intro_image_1.jpg')} style={{height:"100%",width:"100%",resizeMode:"contain",alignSelf:"center"}} />   
          </View>
          <View style={{flex:1.5,height:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14}}>Grocery & Many More</Text>
          <TouchableOpacity style={{position:"absolute",bottom:7,right:0,width:"100%",alignItems:"center"}} onPress={()=>props.navigation.navigate("PickupAndDelivery")}><View style={{backgroundColor:"white",borderWidth:1,borderColor:"black",borderRadius:15,padding:2,marginTop:10}}><Text style={{color:"black",paddingVertical:3,paddingHorizontal:10,fontSize:14,color:"black",fontFamily:FONT.RobotoSemiBold}}>Start your order</Text></View></TouchableOpacity>
          </View>
          </View> 
          }
{item.id == 3 &&
 <View style={{flex:1,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
{isTrendingProductLoading ?<View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:<FlatList
            horizontal
            
            data={item.data}
            renderItem={renderRecentItem}
            showsHorizontalScrollIndicator={false}
          />}
          </View> 
          
          }         


{item.id == 4 &&
  <View style={{marginTop:0,marginBottom:0,marginHorizontal:20,borderWidth:1,borderRadius:5,borderColor:Colors.commonbg,justifyContent:"center",alignItems:"center",height:150,backgroundColor:"white",flexDirection:"row"}}>
          
          <View style={{flex:2.5,height:"100%",backgroundColor:"white"}}>
          <Image source={require('../assets/images/intro_image_2.jpg')} style={{height:"100%",width:"100%",resizeMode:"contain",alignSelf:"center"}} />   
          </View>
          <View style={{flex:1.5,height:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"black"}}>Use gift cards</Text>
          <TouchableOpacity style={{position:"absolute",bottom:7,right:0,width:"100%",alignItems:"center"}} onPress={()=>props.navigation.navigate("User",{screen:"GiftCards"})}><View style={{backgroundColor:"white",borderWidth:1,borderColor:"black",borderRadius:15,padding:2,marginTop:10}}><Text style={{color:"black",paddingVertical:3,paddingHorizontal:10,fontSize:14,color:"black",fontFamily:FONT.RobotoSemiBold}}>Learn more</Text></View></TouchableOpacity>
          </View>
          </View> 
          }              

{item.id == 5 &&
 <View style={{flex:1,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
 {isPopularProductLoading ? <View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:<FlatList
             horizontal
             
             data={item.data}
             renderItem={renderRecentItem}
             showsHorizontalScrollIndicator={false}
           />}
           </View>  
          
          }         

{item.id == 6 &&
  <View style={{marginTop:0,marginBottom:20,marginHorizontal:20,borderWidth:1,borderRadius:5,borderColor:Colors.commonbg,justifyContent:"center",alignItems:"center",height:150,backgroundColor:"white",flexDirection:"row"}}>
          
          
          
          <View style={{flex:2.5,height:"100%",backgroundColor:"white"}}>
          <Image source={require('../assets/images/intro_image_3.jpg')} style={{height:"100%",width:"100%",resizeMode:"contain",alignSelf:"center"}} />   
          </View>
          <View style={{flex:1.5,height:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"black"}}>60 days free delivery</Text>
          <TouchableOpacity style={{position:"absolute",bottom:7,right:0,width:"100%",alignItems:"center"}}  onPress={()=>props.navigation.navigate("User",{screen:"AwesaPlus"})}><View style={{backgroundColor:"white",borderWidth:1,borderColor:"black",borderRadius:15,padding:2,marginTop:10}}><Text style={{color:"black",paddingVertical:3,paddingHorizontal:10,fontSize:14,fontFamily:FONT.RobotoSemiBold}}>Learn more</Text></View></TouchableOpacity>
          </View>
          </View> 
          }
      
  {item.id == 7 && Object.keys(user).length > 0 &&
  <View style={{marginTop:5,marginBottom:20,marginHorizontal:5,justifyContent:"center",alignItems:"center"}}>
      {isTopOrderedProductLoading?<View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:
          
         item.data && item.data.length > 0 ?<FlatList
                
                  
                  data={item.data}
                  renderItem={renderFavouriteDepartmentItem}
                  showsHorizontalScrollIndicator={false}
                  numColumns={3}
                />:<View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoMedium,color:Colors.greenBtnColor,fontSize:14}}>{t('home_nodatafound_lbl')}</Text></View>}
                
          </View> 
          }   
{item.id == 8 &&
 <View style={{flex:1,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
{isProduceProductLoading? <View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:<FlatList
            horizontal
            
            data={item.data}
            renderItem={renderRecentItem}
            showsHorizontalScrollIndicator={false}
          />}
          </View> 
          
          } 
   {item.id == 9 &&
 <View style={{flex:1,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
{isProduceProductLoading? <View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:<FlatList
            horizontal
            
            data={item.data}
            renderItem={renderRecentItem}
            showsHorizontalScrollIndicator={false}
          />}
          </View> 
          
          }  
    {item.id == 10 &&
 <View style={{flex:1,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
{isProtienProductLoading? <View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:<FlatList
            horizontal
            
            data={item.data}
            renderItem={renderRecentItem}
            showsHorizontalScrollIndicator={false}
          />}
          </View> 
          
          }   
    {item.id == 11 &&
 <View style={{flex:1,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
{isHealthProductLoading? <View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:<FlatList
            horizontal
            
            data={item.data}
            renderItem={renderRecentItem}
            showsHorizontalScrollIndicator={false}
          />}
          </View> 
          
          }  
     {item.id == 12 &&
 <View style={{flex:1,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
{isHouseProductLoading? <View style={{height:250,width:"100%",justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>:<FlatList
            horizontal
            
            data={item.data}
            renderItem={renderRecentItem}
            showsHorizontalScrollIndicator={false}
          />}
          </View> 
          
          }                      
    </View>
);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:"white"}}>

    <ScrollView style={{ flex: 1  }}>
    {Object.keys(user).length > 0 && <View style={{width:"100%",height:120,backgroundColor:"white",borderBottomWidth:1,borderBottomColor:Colors.commonbg}}>
       <View style={{height:30,marginHorizontal:10,marginTop:15,flexDirection:"row",alignItems:"center"}}><View style={{flex:3}}><Text style={{color:"black",fontFamily:FONT.RobotoBold,fontSize:18,textAlign:"left"}}>{t('home_reserveorpickup_lbl')}</Text></View><TouchableOpacity onPress={()=>props.navigation.navigate("User",{screen:"TimeSlots"})} style={{flex:1}}><View style={{flex:1,borderWidth:1,borderRadius:15,borderColor:"black",height:30,justifyContent:"center"}}><Text style={{fontSize:14,textAlign:"center",textAlignVertical:"center"}}>{t('home_seetimes_lbl')}</Text></View></TouchableOpacity></View>
       <View style={{height:60,marginHorizontal:10,marginTop:10,flexDirection:"row",alignItems:"center",marginBottom:5}}><View style={{flex:3}}><Text style={{color:"black",fontFamily:FONT.RobotoMedium,fontSize:14,textAlign:"left"}} numberOfLines={2}>{user.addresses.preferred_address!=undefined ? user.addresses.preferred_address.display!=""?user.addresses.preferred_address.display:t('home_pleasechoosepreffereddeliveryorpickuplocation_lbl'):t('home_pleasechoosepreffereddeliveryorpickuplocation_lbl')}</Text></View></View>
    </View>}
    <View style={{height:200,alignItems:"center",justifyContent:"center",marginTop:10,marginHorizontal:10,borderTopStartRadius:10,borderTopEndRadius:10}}>
    {isSliderLoading?<ActivityIndicator size="small" color={Colors.greenBtnColor} /> : <SliderBox images={datasliderimages} currentImageEmitter={index => setSliderImageIndex(index)} paginationBoxStyle={{
    position: "absolute",
    bottom: -170,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  }} ImageComponentStyle={{borderTopStartRadius:10,borderTopEndRadius:10}}  autoplay={true} circleLoop={true} parentWidth={windowWidth-20} dotColor={Colors.greenBtnColor} inactiveDotColor="black" 
  LoaderComponent={imageLoaderComponent}
  
  />
  
  
  }
    </View>
    {isSliderLoading?<View style={{marginTop:10,height:150,marginHorizontal:20}}>
      <Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"black",marginVertical:10}}></Text>
      <Text style={{fontFamily:FONT.RobotoLight,fontSize:13,color:"black",marginVertical:10,width:"50%"}} numberOfLines={2}></Text>
       <View style={{marginVertical:10}}>

       <View style={{borderWidth:0,borderColor:Colors.greenBtnColor,backgroundColor:"white",height:30,width:100,justifyContent:"center",alignItems:"center",borderRadius:10}}><Text style={{fontFamily:FONT.RobotoBold,color:Colors.greenBtnColor}}></Text></View></View>
    </View> : <View style={{marginTop:10,height:150,marginHorizontal:20}}>
      <Text style={{fontFamily:FONT.RobotoBold,fontSize:14,color:"black",marginVertical:10,textAlign:"left"}}>{dataslidertitles[sliderImageIndex]}</Text>
      <Text style={{fontFamily:FONT.RobotoLight,fontSize:13,color:"black",marginVertical:10,width:"50%",textAlign:"left"}} numberOfLines={2}>{dataslidersubtitles[sliderImageIndex]}</Text>
       <TouchableOpacity style={{marginVertical:10}}>

       <View style={{borderWidth:1,borderColor:Colors.greenBtnColor,backgroundColor:"white",height:30,width:100,justifyContent:"center",alignItems:"center",borderRadius:10}}><Text style={{fontFamily:FONT.RobotoBold,color:Colors.greenBtnColor}}>{t('home_learnmore_lbl')}</Text></View></TouchableOpacity>
    </View>}
    <View style={{width:"100%",marginVertical:15,borderWidth:1,borderColor:Colors.commonbg}}></View>
     
      
      <FlatList
        data={DATA}
        renderItem={renderItemComp}
        keyExtractor={item => item.id}
      />
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
   
  },
  modalView: {
    
    backgroundColor: "white",
    width:"70%",
    height:"50%",
    padding:20,
    borderRadius:15,
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
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.greenBtnColor,
  },
  textStyle: {
    color: "white",
    
    textAlign: "center",
    fontFamily:FONT.RobotoMedium
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily:FONT.RobotoBold
  },
  TextInputStyle:{
    fontFamily:FONT.RobotoMedium,
    borderColor:Colors.drawerHeaderBackground,
    height:35,
    marginVertical:15,
    width:"100%",
    borderWidth:1
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

export default Home;