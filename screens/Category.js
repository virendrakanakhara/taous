import React,{ useEffect } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  SectionList 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';

import { getBooks ,addBookmark, removeBookmark} from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart'; 
import SplashScreen from 'react-native-splash-screen'
import { Colors } from "../style/colors";
import { FONT } from "../style/fonts";


const Category = (props) => {
   
  const {t, i18n} = useTranslation();
  
  
  const {lang} = useSelector(state=>state.langReducer);
  
  if (i18n.language != lang) {
    
    
    i18n.changeLanguage(lang);
    
    
  }
  const DATA = [
    {
      title: "Grocery",
      data: ["Bakery", "Bevarages", "Dairy cheese & Eggs","Dell & Prepared food","Flowers","Frozen","Fruits","Meat & Poultry","Pantry","Seafood","Snack Food","Vegetables"]
    },
    {
      title: "Household",
      data: ["Bags & Wraps", "Bathroom Tissue", "Cleaners","Dishwashing","Facial Tissue","Laundry","Paper & Plasticware","Paper Towels","Save A Bundle"]
    },
    {
      title: "Baby",
      data: ["Bath", "Food & Formula", "Baby Toys","Bedding & Decor","Feeding"]
    },
    {
      title: "Health & Beauty",
      data: ["Bath & Body Soap", "Cosmetics","Dental Care","Deodorants","Feminine Care","Fragrances","Hair Care","Incontinece","Para-Pharmacy","Shaving","Skin Care"]
    },
    {
      title: "Kitchen",
      data: ["Coffee Makers", "Cookware & Cookware Sets","Kitchen Appliances","Kitchen Storage","Kitchen Utensils & Gadgets","Tableware"]
    },
    {
      title: "Seasonal",
      data: ["Category 1", "Category 2"]
    },
    {
      title: "Hardware",
      data: ["Construction Gloves", "Hardware Tapes","Lighting & Electrical","Painting","Plumbing","Protection","Ropes","Ropes,Tie Wraps & Tie","Downs","Tie Wraps & Tie Downs","Tools & Equipments"]
    },
    {
      title: "School & Office",
      data: ["Blinders & Organizers", "Calendars & Planners","Colouring","Craft Basics","Craft Painting","Mailing","Notebooks","Pencils","Pencils,Pens & Markers","Pens & Markers","School & Office Basics","Sketching & Presentation","Tapes & Glues"]
    },
    {
      title: "Electonics",
      data: ["Batteries", "Earphones & Headphones","Mobile Accessories","Tablets Accessories","Television & Computer","Accessories"]
    },
    {
      title: "Organic",
      data: ["Amlou And Nut Butters", "Bride Area","Food Suppliments","Natural Dates","Natural Hearbs","Natural Oils","Natural Roses Products","Natural Theraputic Products","Skin and Body Care"]
    },
    {
      title: "Clothing",
      data: ["Kids & Baby", "Men","Women"]
    }

  ];
  const Item = ({ title }) => (
    <TouchableOpacity onPress={()=>props.navigation.navigate('ProductList')}>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
    </TouchableOpacity>
  );  
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
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
    backgroundColor: "white",
    padding: 20,
    
    borderBottomWidth:1,
    borderBottomColor:Colors.drawerHeaderBackground
    
  },
  header: {
    fontSize: 20,
    color:"white",
    backgroundColor: Colors.drawerHeaderBackground,
    paddingStart:5,
    paddingTop:1,
    height:30,
    fontFamily:FONT.RobotoMedium
    
  },
  title: {
    fontSize: 18,
    color:Colors.drawerHeaderBackground,
    fontFamily:FONT.RobotoMedium
  }
});

export default Category;