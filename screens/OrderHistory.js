import React,{ useEffect,useState } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { getBooks } from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "../style/colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {FONT} from '../style/fonts'
import CardView from 'react-native-cardview'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import PurchasedProductItem from "../components/PurchasedProductItem";
import OrderProgressLine from "../components/OrderProgressLine";
import AntIcon from "react-native-vector-icons/AntDesign";
import { APICONFIG } from "../config/api";
import base64 from 'react-native-base64';
import { ActivityIndicator } from "react-native-paper";
import {getFormattedDatetime,matchAndFindValueFromArray} from '../commonfunctions';
import { t } from "i18next";

const OrderHistory = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const {user} = useSelector(state=>state.userReducer);
  const dispatch = useDispatch();

  //user orders
  const [isOrderLoading, setOrderLoading] = useState(true);
  const [dataorder, setDataOrder] = useState([]);
  const [dataorderfilter,setDataOrderFilter] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    
   
    getOrders();
   
  }, []);

  //fetch user orders//
const getOrders = async () => {

  
  

              try {
              const response = await fetch(APICONFIG.REST_WC_URL+"/orders?customer="+user.ID+"&per_page=100&order=desc&orderby=date",
                                            {
                                              method:"GET",
                                             
                                              headers : {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                                Authorization: "Basic " + base64.encode(APICONFIG.CONSUMER_KEY + ":" + APICONFIG.CONSUMER_SECRET),
                                              }
                                        });
              
              const json = await response.json();
              console.log("order data :"+JSON.stringify(json))
              setDataOrder(json);
              setDataOrderFilter(json);
              
            } catch (error) {
              console.error(error);
            } finally {
              setOrderLoading(false);
            }
  
}  

  const DATA = [
    {
      id: '112456',
      title: 'April 12 2022',
      date:"July 28,2021",
      status:"Proccessing",
      total : 2000,
      totalItems:15,
      deliveryFrom:"Dilevery from store",
      data:[{id:1,category:"Grocery",name:"Product 1",imgUrl:"https://beta.taous.ma/product_image.php?pid=157",qty:1},{id:2,category:"House Hold",name:"Product 2",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/06/sea_pid_3604184_z-300x300.jpg",qty:2},{id:3,category:"Baby",name:"Product 3",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2022/03/776571G-300x300.jpg",qty:1},{id:4,category:"Health & Beauty",name:"Product 4",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/de-300x214.png",qty:3},{id:5,category:"Kitchen",name:"Product 5",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/11/telechargement-5.jpg",qty:2},{id:6,category:"Seasonal",name:"Product 6",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2022/03/910433G.jpg",qty:2},{id:7,category:"Hardware",name:"Product 7",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/Untitled-300x182.png",qty:3},{id:8,category:"School & Office",name:"Product 8",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/06/i64-300x292.jpg",qty:1}],
      refund:true,
      refund_date:"Mon, Apr 25."
    },
    {
      id: '155442',
      title: 'April 6 2022',
      date:"June 01,2021",
      status:"Completed",
      total:1870,
      totalItems:7,
      deliveryFrom:"Pickup",
      data:[{id:1,category:"Grocery",name:"Product 1",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/sc.png",qty:5},{id:2,category:"House Hold",name:"Product 2",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/06/sea_pid_3604184_z-300x300.jpg",qty:2}],
      refund:false,
      refund_date:"Mon, Apr 25."
    },
    {
      id: '545032',
      title: 'April 1 2022',
      date:"May 20,2021",
      status:"Canceled",
      total:"1355",
      totalItems:8,
      deliveryFrom:"Dilevery from store",
      data:[{id:1,category:"Grocery",name:"Product 1",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/sc.png",qty:1},{id:2,category:"House Hold",name:"Product 2",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/06/sea_pid_3604184_z-300x300.jpg",qty:1},{id:3,category:"Baby",name:"Product 3",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2022/03/776571G-300x300.jpg",qty:1},{id:4,category:"Health & Beauty",name:"Product 4",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/de-300x214.png",qty:1},{id:5,category:"Kitchen",name:"Product 5",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/11/telechargement-5.jpg",qty:1},{id:6,category:"Seasonal",name:"Product 6",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2022/03/910433G.jpg",qty:1},{id:7,category:"Hardware",name:"Product 7",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/Untitled-300x182.png",qty:1},{id:8,category:"School & Office",name:"Product 8",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/06/i64-300x292.jpg",qty:1}],
      refund:false,
      refund_date:"Mon, Apr 25."
    },
    {
      id: '586774',
      title: 'March 25 2022',
      date:"July 28,2021",
      status:"Proccessing",
      total : 2000,
      totalItems:5,
      deliveryFrom:"Pickup",
      data:[{id:1,category:"Grocery",name:"Product 1",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/sc.png",qty:1},{id:2,category:"House Hold",name:"Product 2",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/06/sea_pid_3604184_z-300x300.jpg",qty:1},{id:3,category:"Baby",name:"Product 3",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2022/03/776571G-300x300.jpg",qty:2}],
    },
    {
      id: '686997',
      title: 'March 15 2022',
      date:"June 01,2021",
      status:"Completed",
      total:1870,
      totalItems:7,
      deliveryFrom:"Dilevery from store",
      data:[{id:1,category:"Grocery",name:"Product 1",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/sc.png",qty:1},{id:2,category:"House Hold",name:"Product 2",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/06/sea_pid_3604184_z-300x300.jpg",qty:3},{id:3,category:"Baby",name:"Product 3",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2022/03/776571G-300x300.jpg",qty:1},{id:4,category:"Health & Beauty",name:"Product 4",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/de-300x214.png",qty:1},{id:5,category:"Kitchen",name:"Product 5",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/11/telechargement-5.jpg",qty:1}],
      refund:false,
      refund_date:"Mon, Apr 25."
    },
    {
      id: '326598',
      title: 'Jan 10 2022',
      date:"May 20,2021",
      status:"Canceled",
      total:"1355",
      totalItems:10,
      deliveryFrom:"Pickup",
      data:[{id:1,category:"Grocery",name:"Product 1",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/sc.png",qty:2},{id:2,category:"House Hold",name:"Product 2",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/06/sea_pid_3604184_z-300x300.jpg",qty:1},{id:3,category:"Baby",name:"Product 3",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2022/03/776571G-300x300.jpg",qty:1},{id:4,category:"Health & Beauty",name:"Product 4",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/de-300x214.png",qty:2},{id:5,category:"Kitchen",name:"Product 5",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/11/telechargement-5.jpg",qty:1},{id:6,category:"Seasonal",name:"Product 6",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2022/03/910433G.jpg",qty:1},{id:7,category:"Hardware",name:"Product 7",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/05/Untitled-300x182.png",qty:1},{id:8,category:"School & Office",name:"Product 8",imgUrl:"https://awesa.ma/beta/wp-content/uploads/2021/06/i64-300x292.jpg",qty:1}],
      refund:false,
      refund_date:"Mon, Apr 25."
    },
  ];

  const renderPurchasedItem = ({item})=>(
    <PurchasedProductItem item={item}
       height={60}
       width={45}
       backgroundColor={"white"}
       marginEnd={5}
       
       props={props}
       
    />
    
  );  
  
  const Item = ({ item }) => (
    <CardView
    cardElevation={3}
    cardMaxElevation={3}
    cornerRadius={15}>
<View  style={[styles.item,{backgroundColor:"white"}]}>


  <View style={{height:55,backgroundColor:Colors.address_bar,flexDirection:"row"}}>
    <View style={{flex:5,justifyContent:"flex-start",alignItems:"center",flexDirection:"row"}}><Text style={styles.address_name}>{getFormattedDatetime(item.date_created,'MMM D YYYY')}</Text><Text style={styles.address_name2}>|  Order# {item.id}  |  Total  {item.total}  DH</Text></View>
    <View style={{flex:1.5,justifyContent:"center",alignItems:"center"}} >
      {/* <View style={{height:30,width:70,borderWidth:1,borderColor:Colors.greenBtnColor,backgroundColor:Colors.greenBtnColor,borderRadius:15,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"white"}}>View</Text></View> */}
    </View>
  </View>
{item.refund && <View style={{height:25,marginTop:5,borderColor:"gray",borderWidth:0.5,borderRadius:5,marginHorizontal:10,backgroundColor:Colors.commonbg,flexDirection:"row"}}>
  <View style={{flex:0.01,backgroundColor:"black"}}></View>
  <View style={{flex:1,justifyContent:"flex-start",alignItems:"center",flexDirection:"row",paddingStart:5}}>
  <AntIcon
              color="black"
              name='infocirlceo'
              size={15}
            /> 
    <Text style={{fontSize:12,fontFamily:FONT.RobotoSemiBold,marginStart:5}}>Refund issued on Mon, Apr 25.</Text>
  </View>

</View>
}
<Text style={styles.pickup}>{matchAndFindValueFromArray(item.meta_data,"pi_delivery_type")}</Text>
<Text style={styles.processing}>{item.status} on {getFormattedDatetime(item.date_created,'MMM D, YYYY')}</Text>
{/* <View style={{height:20,width:"95%",flexDirection:"row",position:"absolute",left:10,top:item.refund?150:120,justifyContent:"center",alignItems:"center"}}>
  <OrderProgressLine height={20} width={0.85} />
</View> */}
<Text style={styles.totalitems}>{item.line_items.reduce((total, currentValue) => total = total + currentValue.quantity,0)} {t('common_items_lbl')}</Text>
<View style={{height:80,marginHorizontal:5,marginVertical:5,flexDirection:"row",justifyContent:"center",alignItems:"center",marginStart:20}}>
<FlatList
            horizontal
            
            data={item.line_items}
            renderItem={renderPurchasedItem}
            showsHorizontalScrollIndicator={false}
          />
          </View> 
          <View style={{height:2,width:"100%",backgroundColor:Colors.commonbg,marginTop:10}}></View>
          <View style={{width:"100%",height:50,flexDirection:"row"}}>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-start"}}><View style={{marginStart:20,height:30,width:100,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"gray",textDecorationLine:"underline",textDecorationColor:"gray"}}>{t('purchasehistory_startreturn_lbl')}</Text></View></View>
             <View style={{flex:1,justifyContent:"center",alignItems:"flex-end"}}><TouchableOpacity onPress={()=>props.navigation.navigate("OrderDetails",{OrderId:item.id})}><View style={{marginEnd:20,height:30,width:100,borderWidth:1,borderColor:"black",backgroundColor:"white",borderRadius:15,justifyContent:"center",alignItems:"center"}}><Text style={{fontFamily:FONT.RobotoSemiBold,fontSize:14,color:"black"}}>{t('purchasehistory_viewdetails_lbl')}</Text></View></TouchableOpacity></View>
          </View>

</View>

</CardView>
  );
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = dataorder.filter(
        function (item) {
          const textData = text;
          const itemStatusData = item.status
          const itemOrderidData = item.id.toString();
          const itemOrderMonth = getFormattedDatetime(item.date_created,'MMM').toLowerCase();
          const itemOrderYear = getFormattedDatetime(item.date_created,'YYYY');
          const itemOrderPickup = matchAndFindValueFromArray(item.meta_data,"pi_delivery_type");
          
          return itemStatusData.indexOf(textData) > -1 || itemOrderidData.indexOf(textData) > -1 || itemOrderMonth.indexOf(textData.toLowerCase()) > -1 || itemOrderYear.indexOf(textData) > -1 || itemOrderPickup.indexOf(textData) > -1;
      });
      setDataOrderFilter(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setDataOrderFilter(dataorder);
      setSearch(text);
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{backgroundColor:Colors.greenBtnColor}}><View style={{flexDirection:"row",alignItems:"center",height:35,marginTop:10,marginBottom:10,marginHorizontal:10,borderRadius:20,backgroundColor:"white"}}>
    <View style={{height:"100%",borderTopLeftRadius:20,borderBottomLeftRadius:20,width:50,justifyContent:"center",alignItems:"center"}}>
    <AntIcon
              color="black"
              name='search1'
              size={20}
            /> 
    </View>
    <View style={{height:"100%",flex:0.9,justifyContent:"center",alignItems:"flex-start"}}>
    <TextInput
        style={{width:"100%",height:"100%"}}
        
        
        placeholder={t('purchasehistory_searchtext_lbl')}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        
      />
    </View>
    </View></View>
    {isOrderLoading?<View style={{marginHorizontal:20,marginBottom:60,marginTop:10}}>
    <ActivityIndicator size={"small"} color={Colors.greenBtnColor} />
      </View>: dataorderfilter.length > 0 ? <View style={{marginHorizontal:20,marginBottom:60,marginTop:10}}>
    <FlatList
        data={dataorderfilter}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View> : <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <FontAwesomeIcon 
          size={50}
          color={Colors.greenBtnColor}
          name="shopping-basket"
       />
       <Text style={{fontSize:20,color:Colors.lightGreen1,fontFamily:FONT.RobotoRegular,marginTop:10}}>{t('purchasehistory_yettoplaceorder_lbl')}</Text>
       <TouchableOpacity onPress={()=>props.navigation.navigate("Home")} style={{backgroundColor:Colors.drawerHeaderBackground,borderRadius:10,padding:5,paddingHorizontal:15,marginTop:10}}><Text style={{fontSize:18,color:"white",fontFamily:FONT.RobotoRegular}}>{t('common_continueshopping_lbl')}</Text></TouchableOpacity>
       

    </View>}
    
  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  item: {
    
    
    
    marginVertical: 8,
    marginHorizontal: 0,
    borderWidth:1,
    borderColor:Colors.commonbg,
    borderRadius:10,
    height:290,
    
    
  },
  address_name: {
    
    color:"black",
    marginStart:10,
    
    
    
    
    fontFamily:FONT.RobotoBold,
    fontSize:12
  },
  address_name2: {
    
    color:"gray",
    marginStart:10,
    
    
    
    
    fontFamily:FONT.RobotoRegular,
    fontSize:12
  },
  pickup: {
    fontSize: 12,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    marginStart:15,
    marginTop:5,
    textAlign:"left"
    
  },
  processing: {
    fontSize: 16,
    color:"black",
    fontFamily:FONT.RobotoSemiBold,
    marginStart:15,
    marginTop:5,
    textTransform:'capitalize',
    textAlign:"left"
    
  },
  totalitems: {
    fontSize: 12,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    marginStart:15,
    marginTop:15,
    textAlign:"left"
    
  },
  name: {
    fontSize: 14,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    marginStart:15,
    marginTop:5,
    
  },
  
});

export default OrderHistory;