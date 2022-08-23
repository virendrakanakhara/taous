import React,{ useEffect } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Dimensions 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import { Colors } from "../style/colors";
import { getBooks ,addBookmark, removeBookmark} from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart'; 
import SplashScreen from 'react-native-splash-screen'
import AntIcon from 'react-native-vector-icons/AntDesign';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import ProductItem from "../components/ProductItem";

const ProductList = (props) => {
   
  const {categoryname} = props.route.params?props.route.params:"All";
  props.navigation.setOptions({
    title: categoryname==undefined?"Product List":"Product List - "+categoryname,
  })
  const {t, i18n} = useTranslation();
  
  
  const {lang} = useSelector(state=>state.langReducer);
  const windowWidth = Dimensions.get('window').width;
  
  if (i18n.language != lang) {
    
    
    i18n.changeLanguage(lang);
    
    
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
  
  
  const renderProductItem = ({item})=>(
    <ProductItem item={item}
       height={325}
       width={windowWidth/2-16}
       backgroundColor={"white"}
       marginEnd={5}
       borderRadius={10}
       borderWidth={2}
       borderColor={Colors.productitembordercolor}
       marginTop={20}
       props={props}
    />
    
  );  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
    
    
    <FlatList
            
            data={DATA}
            renderItem={renderProductItem}
            numColumns={2}
            keyExtractor={item => item.id}
            
          />
    </View>
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
  address_name: {
    fontSize: 24,
    color:"white",
    fontWeight:"bold"
  },
  name: {
    fontSize: 18,
    color:"white"
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
});

export default ProductList;