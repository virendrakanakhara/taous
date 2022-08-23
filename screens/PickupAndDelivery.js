import React,{ useEffect, useLayoutEffect } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { getBooks } from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "../style/colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from "react-native-gesture-handler";
import ProductItem from "../components/ProductItem";
import RecentProductItem from "../components/RecentProductItem";
import CategoryItem from "../components/CategoryItem";
import FilterItem from "../components/FilterItem";
import { FONT } from "../style/fonts";


const PickupAndDelivery = (props) => {

  const {categoryname} = props.route.params!=undefined?props.route.params:"All";
 
  
  

  
  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
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
   const CATEGORYDATA = [
    {"id":1,"title":"Arts & Crafts","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2021/06/i109.jpg"}, 
    {"id":2,"title":"Baby","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2022/03/PREYWY_NoColor_1_X.jpg"}, 
    {"id":3,"title":"Clothing","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2022/01/20729624-600x472.jpg"}, 
    {"id":4,"title":"Electronics","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2022/01/images-10.jpg"}, 
    {"id":5,"title":"Grocery","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2021/10/1570013438-150x150.jpg"}, 
    {"id":6,"title":"Hardware","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2021/12/hand-tools-stanley-500x500-1.jpg"}, 
    {"id":7,"title":"Health & Beauty","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2021/12/images-8-4.jpg"}, 
    {"id":8,"title":"Kitchen","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2022/03/41vTZUUH-NL._AC_SX466_.jpg"}, 
    {"id":9,"title":"Organic","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2022/01/telechargement-14.jpg"}, 
    {"id":10,"title":"Pets","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2021/07/pets-150x124.jpg"}, 
    {"id":11,"title":"Platters","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2021/05/cat_pid_27_z.jpg"}, 
    {"id":12,"title":"School & Office","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2022/01/OSC3036-265x265-1.jpg"}, 
    {"id":13,"title":"Special Category","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2021/07/del-pass-600x280.png"}, 
    {"id":14,"title":"Wines & Spirit","imgUrl":"https://awesa.ma/beta/wp-content/uploads/2021/05/win_pid_5002330_z.jpg"}, 
    

   ];
   const FILTERDATA = [
    {"id":1,"title":"Sale","imgUrl":"https://awesa.ma/beta/wp-content/themes/imartnew/images/sale_img.jpg"}, 
    {"id":2,"title":"Top-Rated","imgUrl":"https://awesa.ma/beta/wp-content/themes/imartnew/images/star_img.jpg"}, 
    {"id":3,"title":"New Items","imgUrl":"https://awesa.ma/beta/wp-content/themes/imartnew/images/new_img.jpg"}, 
    

   ];
  

   const renderProductItem = ({item})=>(
    <ProductItem item={item}
       height={350}
       width={178}
       backgroundColor={"white"}
       marginEnd={5}
       borderRadius={10}
       borderWidth={2}
       borderColor={Colors.productitembordercolor}
       props={props}
       
    />
    
  );  

  const renderDepartmentItem = ({item})=>(
    <CategoryItem item={item}
       height={(windowWidth/2)-20}
       width={(windowWidth/2)-20}
       backgroundColor={"white"}
       marginEnd={5}
       borderRadius={10}
       borderWidth={2}
       borderColor={Colors.productitembordercolor}
       marginTop={5}
       props={props}
       
    />
    
  );  
  const renderFilterItem = ({item})=>(
    <FilterItem item={item}
       height={160}
       width={(windowWidth/3)-16}
       backgroundColor={"white"}
       marginEnd={5}
       borderRadius={10}
       borderWidth={2}
       borderColor={Colors.productitembordercolor}
       marginTop={5}
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
      
    />
    
  );  
  
  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <ScrollView>
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
     
    {/* <View><Text>Category : {categoryname==undefined?"All":categoryname}</Text></View>  */} 
    <View style={{marginVertical:6}}>
              <View style={{height:50,width:"100%",justifyContent:"center",alignItems:"flex-start"}}><Text style={{color:"black",fontSize:18,fontFamily:FONT.RobotoRegular}}>Great right now products - {categoryname==undefined?"All":categoryname}</Text></View>
              
              <View style={{flex:1,flexDirection:"row",marginStart:10}}>
<FlatList
            horizontal
            
            data={DATA}
            renderItem={renderRecentItem}
            showsHorizontalScrollIndicator={false}
          />
          </View> 
           </View>
           <View style={{height:1500,marginVertical:6}}>
              <View style={{height:50,width:"100%",justifyContent:"center",alignItems:"flex-start",marginStart:10}}><Text style={{color:"black",fontSize:18,fontFamily:FONT.RobotoRegular}}>Departments - {categoryname==undefined?"All":categoryname}</Text></View>
              
              <View style={{height:354,flex:1,marginHorizontal:5,marginVertical:10,flexDirection:"row"}}>
                
                      <FlatList
                    scrollEnabled={false}
                    data={CATEGORYDATA}
                    renderItem={renderDepartmentItem}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    
                  />
              </View> 
           </View>     
           <View style={{height:300,marginVertical:6}}>
              <View style={{height:50,width:"100%",justifyContent:"center",alignItems:"flex-start",marginStart:10}}><Text style={{color:"black",fontSize:18,fontFamily:FONT.RobotoRegular}}>Shop by</Text></View>
              <View style={{height:300,flex:1,marginHorizontal:5,marginVertical:10,flexDirection:"row"}}>
              <FlatList
                    scrollEnabled={false}
                    data={FILTERDATA}
                    renderItem={renderFilterItem}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    
                  />
                      
              </View> 
           </View>       
    </View>
    
    </ScrollView>
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

export default PickupAndDelivery;