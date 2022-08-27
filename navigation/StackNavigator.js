import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Category from "../screens/Category";
import Search from "../screens/Search";
import About from "../screens/About";
import Help from "../screens/Help";
import DeliveryInfo from "../screens/DeliveryInfo";
import Terms from "../screens/Terms";
import DeliveryTerms from "../screens/DeliveryPassTerms";
import ContactUs from "../screens/ContactUs";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import PickupAndDelivery from "../screens/PickupAndDelivery";
import GiftCardsHome from "../screens/GiftCardsHome";

import ProductList from "../screens/ProductList";
import ProductDetail from "../screens/ProductDetail";
import Cart from "../screens/Cart";
import Myaccount from "../screens/Myaccount";
import AccountDetails from "../screens/AccountDetails";
import Notifications from "../screens/Notifications";
import Wallet from "../screens/Wallet";
import TimeSlots from "../screens/TimeSlots";
import OrderHistory from "../screens/OrderHistory";
import WishList from "../screens/WishList";
import AwesaPlus from "../screens/AwesaPlus";
import BuyAwesaPlus from "../screens/BuyAwesaPlus";
import SetAReminder from "../screens/SetAReminder";
import StoreCredit from "../screens/StoreCredit";
import GiftCards from "../screens/GiftCards";
import PurchaseGiftCard from "../screens/PurchaseGiftCard";
import Contact from "../screens/Contact";
import Localpickup from "../screens/Localpickup";
import ChangeLanguage from "../screens/ChangeLanguage";
import {  Image,Button,View,TouchableOpacity } from "react-native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "../style/colors";
import Header from "../components/Header;";
import SignIn from "../screens/SignIn";
import Register from "../screens/Register";
import ResetPassword from "../screens/ResetPassword";
import MyItems from "../screens/MyItems";
import { FONT } from "../style/fonts";
import HeaderMyAccount from "../components/HeaderMyAccount";
import HeaderChangeLanguagge from "../components/HeaderChangeLanguagge";
import HeaderCart from "../components/HeaderCart";
import HeaderUser from "../components/HeaderUser";
import HeaderThankyou from "../components/HeaderThankyou";
import HeaderMyItems from "../components/HeaderMyItems";
import CheckoutPayment from "../screens/CheckoutPayment";
import CheckoutReviewOrder from "../screens/CheckoutReviewOrder";
import CheckoutDeliveryMethod from "../screens/CheckoutDeliveryMethod";
import CheckoutThankyou from "../screens/CheckoutThankyou";
import IntroSlider from "../screens/IntroSlider";

import MyLists from "../screens/MyLists";
import OrderDetails from "../screens/OrderDetails";

import '../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';
import { t } from "i18next";



const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "white",
    },
    headerTintColor: Colors.drawerHeaderBackground,
    headerBackTitle: "Back",
    
  };
const AuthStackNavigator = () => {
  const {t, i18n} = useTranslation();
  return (
<Stack.Navigator screenOptions={screenOptionStyle} headerMode="screen" initialRouteName="SignIn" >
    <Stack.Screen name="SignIn"  component={SignIn}  options={({ navigation }) => ({
      header:()=>(<HeaderUser navigation={navigation} title={t('signin_title')} showTitle={true} showBackBtn={false} />),
      headerTitleStyle:{fontFamily:FONT.RobotoMedium}

})} />
<Stack.Screen name="Register"  component={Register} options={({ navigation }) => ({
      header:()=>(<HeaderUser navigation={navigation} title={t('signup_title')} showTitle={true} showBackBtn={true} />),
      headerTitleStyle:{fontFamily:FONT.RobotoMedium}

})} />
<Stack.Screen name="ResetPassword" component={ResetPassword} options={({ navigation }) => ({
      header:()=>(<HeaderUser navigation={navigation} title={t('resetpassword_title')} showTitle={true} showBackBtn={true} />),
      headerTitleStyle:{fontFamily:FONT.RobotoMedium}

})}   />  
</Stack.Navigator>
  )


}

const IntroStackNavigator = () => {
  
  return (
<Stack.Navigator   screenOptions={screenOptionStyle}  initialRouteName="IntroSlider" >
    <Stack.Screen name="IntroSlider"  component={IntroSlider}  options={({ navigation }) => ({
      header:()=>null
      

})}  />

</Stack.Navigator>
  )


}


const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} headerMode="screen" initialRouteName="Home" >
      <Stack.Screen name="Home" component={Home}   options={({ navigation }) => ({
        header:()=>(<Header navigation={navigation} title="Home" showTitle={false} />),
    
  })} />
  

      
  <Stack.Screen name="PickupAndDelivery" 
  options={({ navigation }) => ({
    header:()=>(<HeaderUser navigation={navigation} title={"Pickup And Delivery"} showTitle={true} showBackBtn={true} />),

})}  component={PickupAndDelivery}    />

   
         
  <Stack.Screen name="GiftCardsHome" options={{
          title: t('giftcards_title'),
          headerTitleStyle:{fontFamily:FONT.RobotoMedium}
        }}  component={GiftCardsHome}    />
 

<Stack.Screen name="AwesaPlus" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title="Awesa+" showTitle={true} showBackBtn={true} />),
    
  })} component={AwesaPlus}  />

  
   <Stack.Screen name="ProductDetail" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title="Product Detail" showTitle={true} showBackBtn={true} />),
    
  })}  component={ProductDetail}    /> 
   <Stack.Screen name="Cart" component={Cart} options={({ navigation }) => ({
          header:()=>(<HeaderCart navigation={navigation} title="Cart" showTitle={true} showBackBtn={true} />),
    
  })}     />
  <Stack.Screen name="CheckoutReviewOrder" component={CheckoutReviewOrder} options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('revieworder_title')} showTitle={true} showBackBtn={true} />),
    
  })}     />
  <Stack.Screen name="CheckoutDeliveryMethod" component={CheckoutDeliveryMethod} options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('deliverymethod_title')} showTitle={true} showBackBtn={true} />),
    
  })}     />
  <Stack.Screen name="CheckoutPayment" component={CheckoutPayment} options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('placeorder_title')} showTitle={true} showBackBtn={true} />),
    
  })}     />
  <Stack.Screen name="CheckoutThankyou" component={CheckoutThankyou} options={({ navigation }) => ({
          header:()=>(<HeaderThankyou navigation={navigation} title={t('thankyou_title')} showTitle={true} showBackBtn={true} />),
    
  })}     />


    <Stack.Screen name="ChangeLang"   component={ChangeLanguage} options={({ navigation }) => ({
          header:()=>(<HeaderChangeLanguagge navigation={navigation} title="Change Language" showTitle={true} showBackBtn={true} />),
    
  })}   />       

<Stack.Screen name="DeliveryInfo" component={DeliveryInfo} options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title="Delivery Info" showTitle={true} showBackBtn={true} />),
    
  })}  />    
            <Stack.Screen name="DeliveryTerms" component={DeliveryTerms} options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title="Delivery Pass - Terms & Conditions" showTitle={true} showBackBtn={true} />),
    
  })}    />  
    </Stack.Navigator>
  );
}

const CategoryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} >
      <Stack.Screen name="Category" component={Category}   options={({ navigation }) => ({
        header:()=>(<Header navigation={navigation} title="Category" showTitle={true} />),
    
  })} />
      
    </Stack.Navigator>
  );
}
const SearchStackNavigator = () => {
  const {t, i18n} = useTranslation();
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} >
      <Stack.Screen name="Search" component={Search}    options={({ navigation,route }) => ({
        header:()=>(<Header navigation={navigation}  title={route.params!=undefined && route.params.CatName!=null && route.params.CatId!=null?route.params.CatName.replace("&amp;","&"):t('search_title')} showTitle={true} showBackBtn={route.params!=undefined && route.params.CatName!=null && route.params.CatId!=null?true:false} />)
        
    
  })} />
    <Stack.Screen name="ProductList" options={({ navigation }) => ({
        header:()=>(<Header navigation={navigation}  title={t('search_title')} showTitle={true} showBackBtn={true} />)
        
    
  })} component={ProductList}    />
      
    </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Contact" component={Contact} options={({ navigation }) => ({
          header:()=>(<Header navigation={navigation} title="Contact" showTitle={true} />),
    
  })} />
      </Stack.Navigator>
    );
  }

  const MyItemsStackNavigator = () => {

    const {t, i18n} = useTranslation();
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="MyItemsStack" component={MyItems} options={({ navigation }) => ({
          header:()=>(<HeaderMyItems navigation={navigation} title={t('myitems_title')} showTitle={true} menu={1} />),
    
  })} />
  <Stack.Screen name="MyListsStack" component={MyLists} options={({ navigation }) => ({
          header:()=>(<HeaderMyItems navigation={navigation} title={t('myitems_title')} showTitle={true} menu={2} />),
    
  })} />
      </Stack.Navigator>
    );
  }

  

  const WishListStackNavigator = () => {
    const {t, i18n} = useTranslation();
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="MyWishlist" component={WishList} options={({ navigation }) => ({
          header:()=>(<Header navigation={navigation} title={t('wishlists_title')} showTitle={true} />),
    
  })} />
      </Stack.Navigator>
    );
  }

  const LocalpickupStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Local Pickup" component={Localpickup} options={({ navigation }) => ({
          header:()=>(<Header navigation={navigation} title="Local Pickup" showTitle={true} />),
    
  })} />
      </Stack.Navigator>
    );
  }

  const MyaccountStackNavigator = () => {

    const {t, i18n} = useTranslation();
    return (
      <Stack.Navigator screenOptions={screenOptionStyle} headerMode="screen" initialRouteName="MyAccount">
        <Stack.Screen name="MyAccount" component={Myaccount} options={({ navigation }) => ({
          header:()=>(<HeaderMyAccount navigation={navigation} title="My Account" showTitle={true} />),
    
  })} />



  <Stack.Screen name="LocalPickup" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('localpickup_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={Localpickup}  />
  <Stack.Screen name="AccountDetails" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('accountdetails_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={AccountDetails}  />
  <Stack.Screen name="Notifications" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('notifications_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={Notifications}  />
  <Stack.Screen name="Wallet" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('wallet_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={Wallet}  />
  <Stack.Screen name="TimeSlots" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('timeslots_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={TimeSlots}  />
  <Stack.Screen name="OrderHistory" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('purchasehistory_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={OrderHistory}  />
   <Stack.Screen name="OrderDetails" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('orderdetails_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={OrderDetails}  />

  

  <Stack.Screen name="WishList" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('user_wishlists_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={WishList}  />
  <Stack.Screen name="AwesaPlus" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title="Awesa Plus" showTitle={true} showBackBtn={true} />),
    
  })} component={AwesaPlus}  />

<Stack.Screen name="BuyAwesaPlus" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title="Buy Awesa Plus" showTitle={true} showBackBtn={true} />),
    
  })} component={BuyAwesaPlus}  />


  <Stack.Screen name="SetAReminder" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('setareminder_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={SetAReminder}  />
  <Stack.Screen name="StoreCredit" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('storecredit_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={StoreCredit}  />
  <Stack.Screen name="GiftCards" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('giftcards_title')} showTitle={true} showBackBtn={true} />),
    
  })} component={GiftCards}  />

<Stack.Screen name="PurchaseGiftCard" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title="Purchase Gift Card" showTitle={true} showBackBtn={true} />),
    
  })} component={PurchaseGiftCard}  />
  

  <Stack.Screen name="About" component={About}  options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('aboutus_title')} showTitle={true} showBackBtn={true} />),
    
  })}   />
  <Stack.Screen name="Help" component={Help} options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('helpfaq_title')} showTitle={true} showBackBtn={true} />),
    
  })}    />
  <Stack.Screen name="DeliveryInfo" component={DeliveryInfo} options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('deliveryinfo_title')} showTitle={true} showBackBtn={true} />),
    
  })}  />
  <Stack.Screen name="DeliveryTerms" component={DeliveryTerms} options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('deliverypasstc_title')} showTitle={true} showBackBtn={true} />),
    
  })}    />
  <Stack.Screen name="Terms" component={Terms} options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('termsnconditions_title')} showTitle={true} showBackBtn={true} />),
    
  })}   />
  <Stack.Screen name="PrivacyPolicy" options={({ navigation }) => ({
          header:()=>(<HeaderUser navigation={navigation} title={t('privacypolicy_title')} showTitle={true} showBackBtn={true} />),
    
  })}  component={PrivacyPolicy}    />

<Stack.Screen name="ContactUs" 
 options={({ navigation }) => ({
  header:()=>(<HeaderUser navigation={navigation} title="Contact Us" showTitle={true} showBackBtn={true} />),

})}  component={ContactUs}    />   

      </Stack.Navigator>
    );
  }

  const ChangelngStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle} >
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} options={({ navigation }) => ({
          header:()=>(<Header navigation={navigation} title="Change Language" showTitle={true} />),
    
  })} />
      </Stack.Navigator>
    );
  }

  
  

export { MainStackNavigator,CategoryStackNavigator,SearchStackNavigator,MyaccountStackNavigator,ContactStackNavigator ,ChangelngStackNavigator,LocalpickupStackNavigator,MyItemsStackNavigator,WishListStackNavigator,AuthStackNavigator,IntroStackNavigator};