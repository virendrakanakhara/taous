import React,{ useEffect } from "react";
import { View, 
  Button, 
  Text, 
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView 
} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { getBooks } from '../redux/actions';  
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "../style/colors";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ExpandableListView} from 'react-native-expandable-listview';
import {FONT} from '../style/fonts';

const Help = (props) => {

  const {bookmarks } = useSelector(state => state.booksReducer);
  const dispatch = useDispatch();

  const CONTENT = [
    {
      id: '42',
      categoryName: 'How Can I Find More About iMart?',
      
      subCategory: [
        {
          id: '1',
          name:
            "Category : About iMart",
        },
        {
          id: '2',
          name:
            "Visit our About us page for more information on how we’re able to bring you the freshest, best-tasting, lowest-priced food around.",
        },
       
        
      ],
    },
    {
      id: '95',
      categoryName: 'What Is Delivery Pass?',
      subCategory: [
        {
          id: '1',
          name:
            "Category : About iMart",
        },
        {
          id: '2',
          name:
            "A DeliveryPass subscription gives you unlimited free delivery, plus the ability to reserve a timeslot. That means you can order as often as you like and never pay a delivery fee. You’ll also receive exclusive special offers and savings. To start, you can sign up for a free DeliveryPass Trial – you’ll get 60 days of free delivery, $5 off your order Tuesday through Friday, and you can cancel at any time. After that, its $79 for 6 months.Please note that DeliveryPass orders to seasonal zones such like the Hamptons and Jersey Shore may be subject to a surcharge.",
        },
       
        
      ],
    },
    {
      id: '94',
      categoryName: 'What Is iMart?',
      subCategory: [
        {
          id: '1',
          name:
            "Category : About iMart",
        },
        {
          id: '2',
          name:
            "Imart provides you a smart way to shop the products you need with sanctification.We’ve hired top food experts, built the perfect environment for the food and found the shortest distance from farms, dairies and fisheries to your table. We have all the irresistibly fresh foods you could want, plus popular grocery brands, all for less than you might be paying now. And we bring it right to your door.",
        },
       
        
      ],
    },
    {
      id: '93',
      categoryName: 'What Is Privacy Policy?',
      subCategory: [
        {
          id: '1',
          name:
            "Category : About iMart",
        },
        {
          id: '2',
          name:
            "Please visit our privacy policy page for details",
        },
       
        
      ],
    },
    {
      id: '92',
      categoryName: 'How Do I Change My Password?',
      subCategory: [
        {
          id: '1',
          name:
            "Category : Account Settings",
        },
        {
          id: '2',
          name:
            "Please visit our forgot password page and fill in the details. It is pretty simple process",
        },
       
        
      ],
    },
    {
      id: '96',
      categoryName: 'How Do I Opt Into Various SMS Alerts?',
      subCategory: [
        {
          id: '1',
          name:
            "Category : Account Settings",
        },
        {
          id: '2',
          name:
            "To opt into SMS alerts, visit Your Account Preferences while signed into your FreshDirect account. You’ll be prompted to add your mobile phone number and choose which notifications you’d like to receive. A confirmation text message will be sent to that mobile number — just confirm your consent in the reply, and you’re done!To opt out of SMS alerts, visit Your Account Preferences, delete your mobile number, uncheck all preferences previously selected, and click “Save.”",
        },
       
        
      ],
    },
    {
      id: '96',
      categoryName: 'What If I Forget My Password?',
      subCategory: [
        {
          id: '1',
          name:
            "Category : Account Settings",
        },
        {
          id: '2',
          name:
            "Well, you can click here to recover your password.",
        },
       
        
      ],
    },
    {
      id: '96',
      categoryName: 'I\'ve spotted an error on the website.How should I tell you about it?',
      subCategory: [
        {
          id: '1',
          name:
            "Category : Account Settings",
        },
        {
          id: '2',
          name:
            "Please visit our Contact Us page for the same.",
        },
       
        
      ],
    },
    {
      id: '96',
      categoryName: 'What Is Star Rating?',
      subCategory: [
        {
          id: '1',
          name:
            "Category : Account Settings",
        },
        {
          id: '2',
          name:
            "Our star rating system guides you to the best fruit, vegetables, and seafood we have to offer. Each morning, our experts taste over 800 fresh products and rate them on a scale of one to five stars. That’s because we want you to know what’s really great (and what’s not). So look for four- or five-star-rated products — they’re the best of their kind out there.",
        },
       
        
      ],
    },
  ];
  

  const  handleItemClick = ({index}) => {
   
  };

  const handleInnerItemClick = ({innerIndex, item, itemIndex}) => {
    
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flex: 1, marginHorizontal: 5,marginTop:20,justifyContent:"center",alignItems:"center" }}>
      
    <ExpandableListView
        data={CONTENT} // required
        onInnerItemClick={handleInnerItemClick}
        onItemClick={handleItemClick}
        itemContainerStyle={{backgroundColor:"white"}}
        itemLabelStyle={{fontFamily:FONT.RobotoMedium}}
        innerItemLabelStyle={{fontFamily:FONT.RobotoMedium}}
        chevronColor="yellow"
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
  
});

export default Help;