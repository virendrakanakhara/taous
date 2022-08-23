import React,{useState} from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    Linking,
    TouchableOpacity,
    Switch,
    StatusBar,
    TextInput,
    
  } from 'react-native';
  import moment from 'moment';
  import { t } from "i18next";  
export const getFormattedDatetime = (datetime,formatstring) => {
    
    
        //return moment.utc(datetime).local().format('MMM YYYY');
        return moment.utc(datetime).local().format(formatstring);
    

} 
export const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const matchAndFindValueFromArray = (ary,val) => {
  element = ary.find(data => data.key === val); 
  return element==undefined?'-NA-':element.value
}

export const matchAndFindItemFromArray = (ary,val) => {
  const result = ary.filter((item)=>  item.id.toString() == val);
  return result[0];
}

export const matchAndFindItemWithKeyNameFromArray = (ary,key) => {
  const result = ary.filter((item)=>  item.key.toString() == key);
  return result.length > 0?result[0].value:undefined;
}


export const chekProductExistsInWishlist = (wishlists,value) => {
 
      
       
      const result = wishlists.map((wishlist) => {
          return {...wishlist , product_details: wishlist.product_details.filter(data => data.id.toString() == value)}
      });
     

      const total = result.reduce(
        (prevValue, currentValue) => prevValue + currentValue.product_details.length,
        0
      );
      

      return total > 0
    

}

export const getWishlistWithProduct = (wishlists,value) => {

            const result = wishlists.map((wishlist) => {
                return {...wishlist , product_details: wishlist.product_details.filter(data => data.id.toString() == value)}
            });


           const finalResult = result.filter(item => item.product_details.length > 0)


          return finalResult 


}

export const replaceKeyName = (keyname)=>{

  let resultkeyname = keyname;
  resultkeyname = resultkeyname.replace('total',t('common_total_lbl'));
  resultkeyname = resultkeyname.replace('Product ID',t('common_productnumber_lbl'));
  resultkeyname = resultkeyname.replace('_ywgc_is_physical',t('common_physical_lbl'));
  resultkeyname = resultkeyname.replace('_ywgc_recipients',t('common_recipient_lbl'));
  resultkeyname = resultkeyname.replace('Sender&#039;s name',t('common_sender_lbl'));
  resultkeyname = resultkeyname.replace('Recipient&#039;s name',t('common_recipientname_lbl'));
  resultkeyname = resultkeyname.replace('Message',t('common_message_lbl'));
  resultkeyname = resultkeyname.replace('_ywgc_postdated',t('common_postdated_lbl'));
  resultkeyname = resultkeyname.replace('Design Type',t('common_designtype_lbl'));
  resultkeyname = resultkeyname.replace('_ywgc_has_custom_design',t('common_iscustomdesign_lbl'));
  resultkeyname = resultkeyname.replace('Design',t('common_design_lbl'));
  resultkeyname = resultkeyname.replace('_ywgc_gift_card_post_id',t('common_postid_lbl'));
  resultkeyname = resultkeyname.replace('_ywgc_gift_card_code',t('common_giftcardcode_lbl'));
  resultkeyname = resultkeyname.replace('Digital',t('common_digital_lbl'));
  resultkeyname = resultkeyname.replace('price',t('common_price_lbl'));
  return resultkeyname;
}









