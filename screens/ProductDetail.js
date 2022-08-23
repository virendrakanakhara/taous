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
  useWindowDimensions,
  ActivityIndicator,
  Modal 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import { Colors } from "../style/colors";
import { getBooks ,addBookmark, removeBookmark,getUserWishlists,addToCart, addToCartWithQty} from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart'; 
import SplashScreen from 'react-native-splash-screen'
import AntIcon from 'react-native-vector-icons/AntDesign';
import {chekProductExistsInWishlist,getWishlistWithProduct,matchAndFindValueFromArray,matchAndFindItemWithKeyNameFromArray} from '../commonfunctions';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import ProductItem from "../components/ProductItem";
import { APICONFIG } from "../config/api";
import { ImageGallery } from '@georstat/react-native-image-gallery';
import { ScrollView } from "react-native-gesture-handler";
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import CheckBox from '@react-native-community/checkbox';
import { FONT } from "../style/fonts";
import FastImage from 'react-native-fast-image'
import RatingDisplay from '../components/RattingDisplay'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import RenderHtml from 'react-native-render-html';
import RecentProductItem from "../components/RecentProductItem";
import CardView from 'react-native-cardview';
import DropdownAttributeComponent from "../components/DropdownAttributeComponent";



import base64 from 'react-native-base64';


const ProductDetail = (props) => {
   
  const {t, i18n} = useTranslation();
  const [ProductId,setProductId] = useState(props.route.params!=undefined && props.route.params.ProductId!=null?props.route.params.ProductId:0);
  
  const [ProductDetailItem,setProductDetailItem] = useState({});
  const [RelatedProducts,setRelatedProducts] = useState([]);
  const [images,setImages] = useState([]);
  const [Loading,setLoading] = useState(false);
  const [discountValue,setDiscountValue] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const {lang} = useSelector(state=>state.langReducer);
  const {wishlist} = useSelector(state=>state.wishlistReducer);
  const {user} = useSelector(state=>state.userReducer);
  const [isAddLoading,setAddLoading] = useState(false);
  const [isAddWishlistLoading,setAddWishlistLoading] = useState(false);
  const [moveToWishlist,setMoveToWishlist] = useState();
  const [movewishlistitemid,setMoveWishlistItemId] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlistname, setWishlistName] = useState("");
  const [isRelatedLoading,setRelatedLoading] = useState(false);
  const [userRating,setUserRating] = useState(0);
  const [tabCount,setTabCount] = useState(2);
  const [attributeData,setAttributeData] = useState([]);
  const [ProductVariationList,setProductVariationList] = useState([]);
  const [isProductVariationLoading,setProductVariationLoading] = useState(false);
  const [allAttributeValueSelected,setAllAttributeValueSelected] = useState(false);
  
  if (i18n.language != lang) {
    
    
    i18n.changeLanguage(lang);
    
    
  }
  const dispatch = useDispatch();
  const addToCartFun = payload => dispatch(addToCartWithQty(payload));
  const handleAddToCart = product =>{
  
  let productitem = {"id":product.id,"full_item":product,"variation_id":product.id,"variation_item":product};
  let payload = {"product":productitem,"qty":qty}
  addToCartFun(payload);
 }

 const handleAddToCartWithVariation = (product,productvariation) =>{
  let productitem = {"id":product.id,"full_item":product,"variation_id":productvariation.id,"variation_item":productvariation};
  let payload = {"product":productitem,"qty":qty}
  addToCartFun(payload);
 }
  
  const DATA = [
    {"id":1}, 
    {"id":2}, 
    {"id":3}, 
    {"id":4}, 
    {"id":5}, 
    {"id":6}, 
    {"id":7}, 
    {"id":8}, 
    

   ];

   useEffect(() => {
    
   
    
    getProductDetail()
    getTabCount()
   
   
  }, [ProductId]);

  useEffect(()=>{

    if(ProductDetailItem.type!=undefined && ProductDetailItem.type=="variable")
    {
      let attOptionData = [];
      let attValueData = [];
      let mainIndex = -1;
      ProductDetailItem.attributes.map(attItem=>
          {
          mainIndex++;  
          let indexvalue = -1;
          let result = attItem.options.map(item=>{
            indexvalue++;
            return {"label":item.toString(),"value":item.toString()}
          })
          attOptionData.push(result);
          attValueData.push({"attribute_index":mainIndex,"attribute_name":attItem.name,"attribute_value":""})
          
        })
     setAttributeData(attOptionData);
     setAttributeValue(attValueData);
     getProductVariationlist();
    }

  },[ProductDetailItem])


  const getProductVariationlist = async () => {

    setProductVariationLoading(true)
    try {
      const response = await fetch(APICONFIG.REST_WC_URL+"/products/"+ProductId+"/variations/?per_page=100",
                                    {
                                      method:"GET",
                                      
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
       
       setProductVariationList(json);

        
      }
     
    } catch (error) {
      console.error(error);
      alert(error)
    } finally {
      setProductVariationLoading(false)
      
    }

  }

  


  const getProductDetail = async () => {
   
    setLoading(true)
  
    
    try {
      const response = await fetch(APICONFIG.REST_WC_URL+"/products/"+ProductId,
                                    {
                                      method:"GET",
                                      
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
       setProductDetailItem(json);
       getRelatedProductData(json.related_ids);
       
       let imageData = [];
       imageData = json.images.map((img)=>
          ({"id":img.id,"url":img.src})
        )
       setImages(imageData);
       

        
      }
     
    } catch (error) {
      console.error(error);
      alert(error)
    } finally {
      setLoading(false)
      
    }



}
const getRelatedProductData = async (related_ids) =>
{
  let relatedIds = "";
  related_ids.map(id=>{
      relatedIds = relatedIds+","+id;
  });
 
  setRelatedLoading(true)
  
    
    try {
      const response = await fetch(APICONFIG.REST_WC_URL+"/products?include="+relatedIds,
                                    {
                                      method:"GET",
                                      
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
       setRelatedProducts(json)
       
       
       
       

        
      }
     
    } catch (error) {
      console.error(error);
      alert(error)
    } finally {
      setRelatedLoading(false)
      
    }



}
  
   /*const images = [
    {
      id: 1,
      url: 'https://i.imgur.com/XP2BE7q.jpg',
      // any other extra info you want
    },
    {
        id: 2,
        url: 'https://i.imgur.com/5nltiUd.jpg',
        // any other extra info you want
      },
      {
        id: 3,
        url: 'https://i.imgur.com/6vOahbP.jpg',
        // any other extra info you want
      },
      {
        id: 4,
        url: 'https://i.imgur.com/kj5VXtG.jpg',
        // any other extra info you want
      },     
    
  ]*/
  
  const renderProductItem = ({item})=>(
    <ProductItem item={item}
       height={350}
       width={178}
       backgroundColor={"white"}
       marginEnd={5}
       borderRadius={10}
       borderWidth={2}
       borderColor={Colors.productitembordercolor}
       marginTop={20}
       props={props}
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
  
  const fetchWishlists = () => dispatch(getUserWishlists());
  const [isOpen, setIsOpen] = useState(false);
  const openGallery = () => setIsOpen(true);
  const closeGallery = () => setIsOpen(false);
  const [qty,setQty]=useState(1);
  const [prize,setPrize] = useState(2.99);
  const [reviewname,setReviewName] = useState('');
  const [reviewemail,setReviewEmail] = useState('');
  const [reviewtext,setReviewText] = useState('');
  const [submitReviewLoading,setSubmitReviewLoading] = useState(false);
  const [attributevalue,setAttributeValue] = useState([]);
  const [variationProductDetail,setVariationProductDetail] = useState({});
  

  const minusQty = ()=>{ if(qty>1){setQty(qty-1)}};
  const addQty = ()=>{ setQty(qty+1)};

  const submitRating = async () =>
  {
    if(reviewtext.length == 0)
    {
      alert("Please enter review text !!")
    }
    else if(userRating == 0)
    {
      alert("Please select rating value !!")
    }
    else if(reviewname.length == 0)
    {
      alert("Please enter reviewer name !!")
    }
    else if(reviewemail.length == 0)
    {
      alert("Please enter reviewer email !!")
    }
    else
    {
      setSubmitReviewLoading(true);
        try {
        const response = await fetch(APICONFIG.REST_WC_URL+"/products/reviews",
                                    {
                                      method:"POST",
                                      body:JSON.stringify({
                                        product_id:ProductDetailItem.id,
                                        review:reviewtext,
                                        reviewer:reviewname,
                                        reviewer_email:reviewemail,
                                        rating:userRating,
                                        
                                        
                                      }),
                                      headers : {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                      }
                                });
       
       const json = await response.json();
       //alert(JSON.stringify(json))
       
       if(json.errors && json.errors.rest_forbidden)
       {
        alert(json.errors.rest_forbidden)
       
       }
       else
       {
         alert("Your review submitted successfully !!")
         setUserRating(0);
         setReviewName('');
         setReviewEmail('');
         setReviewText('');
       }
       
       
     } catch (error) {
       console.error(error);
       alert(error)
       
     } finally {
      setSubmitReviewLoading(false);
      
      
     }
    }

  }



  
  
  

  
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  
  const getTabCount = ()=>{
    let TabCount = 2;
    
    if(ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"nutrition_details")!=undefined &&  matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"nutrition_details")!="")
    TabCount++;
    
    
    if(ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"additional_information")!=undefined &&  matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"additional_information")!="")
    TabCount++;
    
    
    if(ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"explanatory_information")!=undefined &&  matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"explanatory_information")!="")
    TabCount++;
    
    
    if(ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"ingredients")!=undefined &&  matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"ingredients")!="")
    TabCount++;
    

    if(ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"allergens")!=undefined &&  matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"allergens")!="")
    TabCount++;


    //alert(tabCount)
    setTabCount(TabCount);

  } 

  useEffect(() => {
    
   
    
    
    let allAttributeSelected = true;
    attributevalue.map(item=>{
       if(item.attribute_value=="")
       { allAttributeSelected = false;
         setAllAttributeValueSelected(false); 
      }
    })
    if(allAttributeSelected){
      setAllAttributeValueSelected(true); 
      let result = [];
      result = ProductVariationList.filter(item=>
          {
                switch(attributevalue.length)
                {
                  case 1:
                    
                  return item.attributes[0].name == attributevalue[0].attribute_name && item.attributes[0].option == attributevalue[0].attribute_value ;
                  break;
                  case 2:
                  
                  
                  return item.attributes[0].name == attributevalue[0].attribute_name && item.attributes[0].option == attributevalue[0].attribute_value && item.attributes[1].name == attributevalue[1].attribute_name && item.attributes[1].option == attributevalue[1].attribute_value;  
                  break;
                  default:
                  return null;  

                }  
          }
        )
      if(result.length > 0)
      {
        setVariationProductDetail(result[0]);
        
        setImages([{"id":result[0].image.id,"url":result[0].image.src}]);

      }  
    }
   
   
  }, [attributevalue]);


  const changeAttributeValue = (value) => {
    

    let newAttributeValues = attributevalue.map(el => (
      el.attribute_index===value.attribute_index? {...el, attribute_value: value.attribute_value}: el
    ))

    setAttributeValue(newAttributeValues);

   

  }
  
  let attOptionIndexValue=-1;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <ScrollView>
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
    
    
   {!Loading ? <View>
            {/* <Button onPress={openGallery} title="Open Gallery" /> */}
            <TouchableOpacity onPress={openGallery}><View style={{borderWidth:1,borderColor:Colors.greenBtnColor,borderRadius:10,marginTop:10}}>
            <FastImage
            style={{height:250,width:undefined,aspectRatio:358/443,alignSelf:"center",marginTop:5}}
            source={{
                
                uri: ProductDetailItem.type=="simple"?"https://beta.taous.ma/product_image.php?pid="+ProductDetailItem.id:allAttributeValueSelected && variationProductDetail.image!=null?variationProductDetail.image.src:"https://beta.taous.ma/product_image.php?pid="+ProductDetailItem.id,
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />  
            {/* <Image source={require("../assets/images/p11.png")} style={{height:250,width:undefined,aspectRatio:358/443,alignSelf:"center",marginTop:5}} /> */}
            <View style={{position:"absolute",backgroundColor:Colors.commonbg,height:30,width:200,justifyContent:"center",alignItems:"center",top:110,start:(windowWidth/2)-110,borderRadius:10}}><Text style={{color:Colors.greenBtnColor,fontSize:14,fontFamily:FONT.RobotoMedium}}>Click here to View Gallery</Text></View>
            <TouchableOpacity  onPress={()=>{addToWishlist(ProductDetailItem)}} style={{height:40,width:55,borderTopEndRadius:10,position:"absolute",top:0,end:0}}><View style={{height:40,width:55,justifyContent:"center",alignItems:"center"}}><FontAwesomeIcon
              color="black"
              name={chekProductExistsInWishlist(wishlist,ProductDetailItem.id)?'heart':'heart-o'}
              size={20}
            /></View></TouchableOpacity>
            </View>
            </TouchableOpacity>
            
            <ImageGallery close={closeGallery} isOpen={isOpen} images={images} />
            <View style={{backgroundColor:Colors.commonbg,width:"100%",marginTop:15}}>
                <Text style={{color:"black",fontSize:16,padding:10,fontFamily:FONT.RobotoSemiBold,textAlign:"left"}}>{ProductDetailItem.name}</Text>
                <View style={{flexDirection:"row"}}>
                <View style={{justifyContent:"flex-start",flex:1,alignItems:"flex-start",flexDirection:"row",marginStart:5,marginVertical:3}}>
                  
                <RatingDisplay value={ProductDetailItem.average_rating}  />

          </View>
          <View style={{flex:1,flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end",marginEnd:5}}>
          <AntIcon
              color={Colors.greenBtnColor}
              name='check'
              size={20}
            />  
            <Text style={{fontSize:14,color:"black",marginStart:3,fontFamily:FONT.RobotoMedium}}>In Stock</Text>
          </View>
          </View>
          <View style={{flexDirection:"row",marginVertical:10}}><View style={{flex:1}}><Text style={{color:"black",fontSize:14,padding:10,fontFamily:FONT.RobotoMedium,textAlign:"left"}}>SKU: {ProductDetailItem.sku}</Text></View><View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}>{ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindValueFromArray(ProductDetailItem.meta_data,"express_delivery_available") > 0  && <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row",marginEnd:5,marginVertical:3,backgroundColor:"#2B5E8C",height:30,width:150,borderRadius:15}}><Text style={{color:"white",fontStyle:"italic",fontFamily:FONT.RobotoMedium}}>Express Delivery</Text></View>}</View></View>
          
          
          {ProductDetailItem!={} && ProductDetailItem.type=='simple' && <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginStart:10,marginVertical:10}}>
            <Text style={{color:"#EE2500",textDecorationLine: 'line-through', textDecorationStyle: 'solid',fontSize:16,fontFamily:FONT.RobotoBold}}>{ProductDetailItem.regular_price} DH</Text><Text style={{color:"black",fontSize:16,fontFamily:FONT.RobotoBold}}> {ProductDetailItem.price} DH</Text>
          </View>}
          {!allAttributeValueSelected && ProductDetailItem!={} && ProductDetailItem.type=='variable' && <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginStart:10,marginVertical:10}}>
          <RenderHtml
    contentWidth={"100%"}
    source={{html:"Price Range :"+ProductDetailItem.price_html}}
  />
          </View>}
          {allAttributeValueSelected && ProductDetailItem!={} && ProductDetailItem.type=='variable' && variationProductDetail.price!="" && <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginStart:10,marginVertical:10}}>
            <Text style={{color:"#EE2500",textDecorationLine: 'line-through', textDecorationStyle: 'solid',fontSize:16,fontFamily:FONT.RobotoBold,textAlign:"left"}}>{variationProductDetail.regular_price} DH</Text><Text style={{color:"black",fontSize:16,fontFamily:FONT.RobotoBold,textAlign:"left",marginStart:3}}> {variationProductDetail.price} DH</Text>
          </View>}
          {allAttributeValueSelected && ProductDetailItem!={} && ProductDetailItem.type=='variable' && variationProductDetail.price=="" && <View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginStart:5,marginVertical:10}}>
            <Text style={{color:"red",fontSize:16,fontFamily:FONT.RobotoBold}}> Product with the selected attribute is not available</Text>
          </View>}
          
          {ProductDetailItem!={} && ProductDetailItem.type=='variable' && ProductDetailItem.attributes.length > 0? 
          
          ProductDetailItem.attributes.map(attItem=> {attOptionIndexValue++;  return (<View style={{justifyContent:"center",alignItems:"center",marginStart:10,marginVertical:10,flexDirection:"row"}}>
          <View style={{flex:1}}><Text style={{fontFamily:FONT.RobotoSemiBold,textAlign:"left"}}>{attItem.name}:</Text></View>
          <View style={{flex:1}}><DropdownAttributeComponent changeAttributeValue={changeAttributeValue} data={attributeData[attOptionIndexValue]} value={attributevalue[attOptionIndexValue]} selectText={"Please select"} /></View> 

          </View>)}):null}
          

          {ProductDetailItem.type=="simple" && ProductDetailItem.price!="" && <View style={{marginHorizontal:10,marginTop:10,backgroundColor:"white",marginBottom:10}}>
                <View style={{marginHorizontal:10,height:35,marginTop:20,flexDirection:"row"}}>
                    <TouchableOpacity style={{flex:1}} onPress={minusQty}><View style={{flex:1,backgroundColor:Colors.greenBtnColor,borderTopStartRadius:15,borderBottomStartRadius:15,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:20,color:"white",fontFamily:FONT.RobotoBold}}>-</Text></View></TouchableOpacity>
                    <View style={{flex:1,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}} ><Text style={{fontSize:20,color:Colors.greenBtnColor,fontFamily:FONT.RobotoBold}}>{qty}</Text></View>
                    <TouchableOpacity style={{flex:1}} onPress={addQty}><View style={{flex:1,backgroundColor:Colors.greenBtnColor,borderTopEndRadius:15,borderBottomEndRadius:15,justifyContent:"center",alignItems:"center",fontFamily:FONT.RobotoBold}}><Text style={{fontSize:20,color:"white",fontWeight:"bold"}}>+</Text></View></TouchableOpacity>
                </View>
                <View style={{marginStart:10,marginTop:15,height:30,justifyContent:"center",alignItems:"flex-start"}}><Text style={{color:"black",fontSize:20,fontFamily:FONT.RobotoBold}}>Total: {(ProductDetailItem.price*qty).toFixed(2)} DH</Text></View>
                <TouchableOpacity onPress={()=>{handleAddToCart(ProductDetailItem)}}><View style={{marginHorizontal:10,height:35,borderRadius:5,justifyContent:"center",alignItems:"center",backgroundColor:Colors.drawerHeaderBackground,flexDirection:"row",marginVertical:10}}>
            
                    <AntIcon
                    color="white"
                    name='shoppingcart'
                    size={24}
                    /><Text style={{color:"white",fontWeight:"bold",fontSize:14,marginStart:5}}>ADD TO CART</Text>
                    
                </View>
                </TouchableOpacity>
               
          </View>}
          {ProductDetailItem.type=="variable" && allAttributeValueSelected && variationProductDetail.price!="" && <View style={{marginHorizontal:10,marginTop:10,backgroundColor:"white",marginBottom:10}}>
              <View style={{marginHorizontal:10,height:35,marginTop:20,flexDirection:"row"}}>
              <TouchableOpacity style={{flex:1}} onPress={minusQty}><View style={{flex:1,backgroundColor:Colors.greenBtnColor,borderTopStartRadius:15,borderBottomStartRadius:15,justifyContent:"center",alignItems:"center"}}><Text style={{fontSize:20,color:"white",fontFamily:FONT.RobotoBold}}>-</Text></View></TouchableOpacity>
              <View style={{flex:1,backgroundColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}} ><Text style={{fontSize:20,color:Colors.greenBtnColor,fontFamily:FONT.RobotoBold}}>{qty}</Text></View>
              <TouchableOpacity style={{flex:1}} onPress={addQty}><View style={{flex:1,backgroundColor:Colors.greenBtnColor,borderTopEndRadius:15,borderBottomEndRadius:15,justifyContent:"center",alignItems:"center",fontFamily:FONT.RobotoBold}}><Text style={{fontSize:20,color:"white",fontWeight:"bold"}}>+</Text></View></TouchableOpacity>
          </View>
          <View style={{marginStart:10,marginTop:15,height:30,justifyContent:"center",alignItems:"flex-start"}}><Text style={{color:"black",fontSize:20,fontFamily:FONT.RobotoBold}}>Total: {(variationProductDetail.price*qty).toFixed(2)} DH</Text></View>
          <TouchableOpacity onPress={()=>{handleAddToCartWithVariation(ProductDetailItem,variationProductDetail)}}><View style={{marginHorizontal:10,height:35,borderRadius:5,justifyContent:"center",alignItems:"center",backgroundColor:Colors.drawerHeaderBackground,flexDirection:"row",marginVertical:10}}>
      
              <AntIcon
              color="white"
              name='shoppingcart'
              size={24}
              /><Text style={{color:"white",fontWeight:"bold",fontSize:14,marginStart:5}}>ADD TO CART</Text>
              
          </View>
          </TouchableOpacity>
         
    </View>
          }
            
            </View>
            <View style={{backgroundColor:Colors.commonbg,height:430,width:"100%",marginTop:15,marginBottom:15}}>
               <View style={{flexDirection:"row",height:45,backgroundColor:Colors.commonbg}}><TouchableOpacity onPress={()=>setIndex(0)} style={{flex:1}} ><View style={{flex:1,borderBottomWidth:2,borderBottomColor:index==0?Colors.greenBtnColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}}><Text style={styles.tabText(tabCount)} >Description</Text></View></TouchableOpacity>{ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"nutrition_details")!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"nutrition_details")!=""  && <TouchableOpacity onPress={()=>setIndex(2)} style={{flex:1}} ><View style={{flex:1,borderBottomWidth:2,borderBottomColor:index==2?Colors.greenBtnColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}}><Text style={styles.tabText(tabCount)}>Nutrition</Text></View></TouchableOpacity>}{ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"ingredients")!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"ingredients")!="" && <TouchableOpacity onPress={()=>setIndex(3)} style={{flex:1}} ><View style={{flex:1,borderBottomWidth:2,borderBottomColor:index==3?Colors.greenBtnColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}}><Text style={styles.tabText(tabCount)}>Ingredients</Text></View></TouchableOpacity>}{ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"additional_information")!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"additional_information")!="" && <TouchableOpacity onPress={()=>setIndex(4)} style={{flex:1}} ><View style={{flex:1,borderBottomWidth:2,borderBottomColor:index==4?Colors.greenBtnColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}}><Text style={styles.tabText(tabCount)}>Additional Information</Text></View></TouchableOpacity>}{ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"explanatory_information")!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"explanatory_information")!="" && <TouchableOpacity onPress={()=>setIndex(5)} style={{flex:1}} ><View style={{flex:1,borderBottomWidth:2,borderBottomColor:index==5?Colors.greenBtnColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}}><Text style={styles.tabText(tabCount)}>Explanatory Information</Text></View></TouchableOpacity>}{ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"allergens")!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"allergens")!="" && <TouchableOpacity onPress={()=>setIndex(6)} style={{flex:1}} ><View style={{flex:1,borderBottomWidth:2,borderBottomColor:index==6?Colors.greenBtnColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}}><Text style={styles.tabText(tabCount)}>Allergens</Text></View></TouchableOpacity>}<TouchableOpacity onPress={()=>setIndex(1)} style={{flex:1}} ><View style={{flex:1,borderBottomWidth:2,borderBottomColor:index==1?Colors.greenBtnColor:Colors.commonbg,justifyContent:"center",alignItems:"center"}}><Text style={styles.tabText(tabCount)}>Review</Text></View></TouchableOpacity></View>      
               {index==0 && <View style={{ flex: 1, backgroundColor: 'white',borderWidth:1,borderColor:Colors.commonbg }} >
     
     {ProductDetailItem!={} && ProductDetailItem.description!=undefined && ProductDetailItem.description.length!=undefined &&  ProductDetailItem.description.length > 0 && <ScrollView style={{padding:10}}><RenderHtml
    contentWidth={"100%"}
    source={{html:ProductDetailItem.description}}
  /></ScrollView>} 
   {ProductDetailItem!={} && ProductDetailItem.description!=undefined && ProductDetailItem.description.length!=undefined && ProductDetailItem.description.length == 0 && <Text style={{margin:10}}>{ProductDetailItem.name}</Text>} 
    </View>}

               {index==1 && <View style={{ flex: 1, backgroundColor: 'white',borderWidth:1,borderColor:Colors.commonbg }} >
       <View style={{margin:10,backgroundColor:Colors.commonbg,flex:1}}>
         <Text style={{color:"black",textAlign:"left",fontSize:14,padding:10,fontFamily:FONT.RobotoSemiBold}}>Write a review {ProductDetailItem.id}</Text>
         <View style={{backgroundColor:"white",width:"100%",height:5}}></View>
         <View style={{flexDirection:"row",width:"100%",height:100}}>
             <View style={{flex:1,height:"100%"}}><Text style={{margin:15,fontSize:12,fontFamily:FONT.RobotoMedium}}>Your Reivew*:</Text></View>
             <View style={{flex:2.5,height:"100%"}}><TextInput value={reviewtext} style={styles.textinputstyle} multiline={true} onChangeText={setReviewText}  /></View>
         </View>
         <View style={{flexDirection:"row",width:"100%",height:35,marginTop:10}}>
             <View style={{flex:1,height:"100%"}}><Text style={{marginStart:15,marginTop:5,fontSize:12,fontFamily:FONT.RobotoMedium}}>Your Rating*:</Text></View>
             <View style={{flex:2.5,height:"100%"}}><View style={{justifyContent:"flex-start",alignItems:"flex-start",flexDirection:"row",marginHorizontal:3,marginVertical:3}}>
          <TouchableOpacity onPress={()=>setUserRating(1)}><EntypoIcon
              color={userRating>=1?"#FBD67F":'black'} //#FBD67F
              name='star-outlined'
              size={25}
            />  
          </TouchableOpacity>  
          <TouchableOpacity onPress={()=>setUserRating(2)}><EntypoIcon
              color={userRating>=2?"#FBD67F":'black'} //#FBD67F
              name='star-outlined'
              size={25}
            />  
          </TouchableOpacity>  
          <TouchableOpacity onPress={()=>setUserRating(3)}><EntypoIcon
              color={userRating>=3?"#FBD67F":'black'} //#FBD67F
              name='star-outlined'
              size={25}
            />  
          </TouchableOpacity>  
          <TouchableOpacity onPress={()=>setUserRating(4)}><EntypoIcon
              color={userRating>=4?"#FBD67F":'black'} //#FBD67F
              name='star-outlined'
              size={25}
            />  
          </TouchableOpacity>    
          <TouchableOpacity onPress={()=>setUserRating(5)}><EntypoIcon
              color={userRating==5?"#FBD67F":'black'} //#FBD67F
              name='star-outlined'
              size={25}
            />  
          </TouchableOpacity>            
          </View></View>
         </View>
         <View style={{flexDirection:"row",width:"100%",height:35,marginTop:10}}>
             <View style={{flex:1,height:"100%"}}><Text style={{marginStart:15,marginTop:5,fontSize:12,fontFamily:FONT.RobotoMedium}}>Name*:</Text></View>
             <View style={{flex:2.5,height:"100%"}}><TextInput value={reviewname} style={styles.textinputstyle} onChangeText={setReviewName}  /></View>
         </View>
         <View style={{flexDirection:"row",width:"100%",height:35,marginTop:10}}>
             <View style={{flex:1,height:"100%"}}><Text style={{marginStart:15,marginTop:5,fontSize:12,fontFamily:FONT.RobotoMedium}}>Email*:</Text></View>
             <View style={{flex:2.5,height:"100%"}}><TextInput value={reviewemail} style={styles.textinputstyle} onChangeText={setReviewEmail}  /></View>
         </View>
         {/* <View style={{flexDirection:"row",width:"100%",height:50,marginTop:10}}>
             <View style={{flex:0.7,height:"100%",justifyContent:"center",alignItems:"center"}}><CheckBox
    disabled={false}
    tintColor={Colors.greenBtnColor}
    onTintColor={Colors.drawerHeaderBackground}
    onCheckColor={Colors.drawerHeaderBackground}
    
  /></View>
             <View style={{flex:3.3,height:"100%"}}><Text numberOfLines={2} style={{fontSize:16,borderRadius:5,height:"100%",flex:1,fontFamily:FONT.RobotoMedium,backgroundColor:"red"}}>Save my name, email, and website in this browser for the next time I comment.
</Text></View>

         </View> */}
         <View style={{flexDirection:"row",width:"100%",height:40,marginTop:10}}>
            
             {!submitReviewLoading && <TouchableOpacity onPress={()=>submitRating()} style={{flex:1,height:"100%",margin:10}}><View style={{flex:1,height:"100%"}}><View style={{margin:0,borderRadius:5,backgroundColor:Colors.drawerHeaderBackground,height:"100%",flex:1,justifyContent:"center",alignItems:"center"}}><Text style={{color:"white",fontSize:18,fontFamily:FONT.RobotoMedium}}>Submit</Text></View></View></TouchableOpacity>}
             {submitReviewLoading && <View style={{flex:1,height:"100%",margin:10}}><View style={{margin:0,borderRadius:5,backgroundColor:Colors.drawerHeaderBackground,height:"100%",flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={"white"}  /></View></View>}
         </View>
       </View>
    </View>}   
    {index==2 && <View style={{ flex: 1, backgroundColor: 'white',borderWidth:1,borderColor:Colors.commonbg }} >
     
     {ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"nutrition_details")!=undefined &&  matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"nutrition_details")!="" && <ScrollView style={{padding:10}}><RenderHtml
    contentWidth={"100%"}
    source={{html:matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"nutrition_details")}}
  /></ScrollView>} 
   
    </View>}
    {index==3 && <View style={{ flex: 1, backgroundColor: 'white',borderWidth:1,borderColor:Colors.commonbg }} >
     
     {ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"ingredients")!=undefined &&  matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"ingredients")!="" && <ScrollView style={{padding:10}}><RenderHtml
    contentWidth={"100%"}
    source={{html:matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"ingredients")}}
  /></ScrollView>} 
   
    </View>}
    {index==4 && <View style={{ flex: 1, backgroundColor: 'white',borderWidth:1,borderColor:Colors.commonbg }} >
     
     {ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"additional_information")!=undefined &&  matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"additional_information")!="" && <ScrollView style={{padding:10}}><RenderHtml
    contentWidth={"100%"}
    source={{html:matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"additional_information")}}
  /></ScrollView>} 
  
   
    </View>}
    {index==5 && <View style={{ flex: 1, backgroundColor: 'white',borderWidth:1,borderColor:Colors.commonbg }} >
     
     {ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"explanatory_information")!=undefined &&  matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"explanatory_information")!="" && <ScrollView style={{padding:10}}><RenderHtml
    contentWidth={"100%"}
    source={{html:matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"explanatory_information")}}
  /></ScrollView>} 
  
   
    </View>}
    {index==6 && <View style={{ flex: 1, backgroundColor: 'white',borderWidth:1,borderColor:Colors.commonbg }} >
     
     {ProductDetailItem!={} && ProductDetailItem.meta_data!=undefined && matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"allergens")!=undefined &&  matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"allergens")!="" && <ScrollView style={{padding:10}}><RenderHtml
    contentWidth={"100%"}
    source={{html:matchAndFindItemWithKeyNameFromArray(ProductDetailItem.meta_data,"allergens")}}
  /></ScrollView>} 
  
   
    </View>}

                       
            </View>
            {!isRelatedLoading && <View style={{height:450,marginVertical:6}}>
              <View style={{height:50,width:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{color:"gray",fontSize:18,fontFamily:FONT.RobotoSemiBold}}>LIKE THAT? YOU'LL LOVE THIS</Text></View>
              <View style={{height:2,width:"100%",justifyContent:"center",alignItems:"center"}}><View style={{height:1,width:35,backgroundColor:"gray"}}></View></View>
              <View style={{height:300,flex:1,marginHorizontal:5,marginVertical:10,flexDirection:"row"}}>
                
                    <FlatList
                    horizontal
                    data={RelatedProducts}
                    renderItem={renderRecentItem}
                    showsHorizontalScrollIndicator={false}
                  />
              </View> 
           </View>}
           {isRelatedLoading && <View style={{height:450,marginVertical:6}}>
              <View style={{height:50,width:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{color:"gray",fontSize:18,fontFamily:FONT.RobotoSemiBold}}>LIKE THAT? YOU'LL LOVE THIS</Text></View>
              <View style={{height:2,width:"100%",justifyContent:"center",alignItems:"center"}}><View style={{height:1,width:35,backgroundColor:"gray"}}></View></View>
              <View style={{height:300,flex:1,marginHorizontal:5,marginVertical:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                  <ActivityIndicator size={"small"} color={Colors.greenBtnColor} />    
                    
              </View> 
           </View>}

           {/* <View style={{height:450,marginVertical:6}}>
              <View style={{height:50,width:"100%",justifyContent:"center",alignItems:"center"}}><Text style={{color:"gray",fontSize:16,fontFamily:FONT.RobotoSemiBold}}>CUSTOMERS WHO VIEWED THIS ITEM ALSO VIEWED</Text></View>
              <View style={{height:2,width:"100%",justifyContent:"center",alignItems:"center"}}><View style={{height:1,width:35,backgroundColor:"gray"}}></View></View>
              <View style={{height:300,flex:1,marginHorizontal:5,marginVertical:10,flexDirection:"row"}}>
                
                    <FlatList
                    horizontal
                    data={DATA}
                    renderItem={renderRecentItem}
                    showsHorizontalScrollIndicator={false}
                  />
              </View> 
           </View> */}

            
        </View>:<View style={{flex:1,height:700,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size={"small"} color={Colors.greenBtnColor} /></View>}
      
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
    backgroundColor: Colors.drawerHeaderBackground,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius:10
  },

  name: {
    fontSize: 18,
    color:"white",
    
  },
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
  },
  tabbar: {
    backgroundColor: Colors.commonbg,
  },
  indicator: {
    backgroundColor: Colors.greenBtnColor,
  },
///
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
  textinputstyle :{
    margin:5,borderRadius:5,borderColor:"black",borderWidth:1,height:"100%",flex:1,fontFamily:FONT.RobotoMedium
},
tabText:(tabCount)=>({
  fontSize:tabCount == 2?16:tabCount == 3 ? 14  : (tabCount > 3 && tabCount < 6) ? 12:tabCount>=6?10:10,
  
  fontFamily:FONT.RobotoRegular,
  textAlign:"center",
  textAlignVertical:"center"
})
});

export default ProductDetail;