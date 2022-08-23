import React ,{ useEffect }from "react";
import { SafeAreaView,FlatList,View, StyleSheet, Text,Pressable,I18nManager,Image,TouchableOpacity,ScrollView  } from "react-native";

import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart'; 

import { useSelector, useDispatch } from 'react-redux';
import { setLang} from '../redux/actions';  
import { Colors } from '../style/colors';
import { RobotoRegular } from '../style/fonts';

import {FONT} from '../style/fonts';
import LinearGradient from "react-native-linear-gradient";
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcon  from 'react-native-vector-icons/EvilIcons';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome";

const ChangeLanguage = (props) => {
  const { lang } = useSelector(state => state.langReducer);
  const {t, i18n} = useTranslation();  
 
  
  const DATA = [
    {
      id: 'en',
      title: t('changelang_eng_lbl'),
    },
    {
      id: 'fr',
      title: t('changelang_french_lbl'),
    },
    {
      id: 'ar',
      title: t('changelang_arabic_lbl'),
    },
   
  ];
  const Item = ({ item }) => (
    <TouchableOpacity  onPress={()=>{changeLanguage(item.id)}}>
    <View style={styles.item} >
      <View style={{flex:0.5}}>
      {item.id=='en' &&<Image 
                            style={{width:26,height:26,alignSelf:"center"}}
                            source={require('../assets/images/en.png')}
                            resizeMode="contain"
                            
                            />}
                             {item.id=='ar' &&<Image 
                            style={{width:26,height:26,alignSelf:"center"}}
                            source={require('../assets/images/ar.png')}
                            resizeMode="contain"
                            
                            />}
                             {item.id=='fr' &&<Image 
                            style={{width:26,height:26,alignSelf:"center"}}
                            source={require('../assets/images/fr.png')}
                            resizeMode="contain"
                            
                            />}
      </View>
      <View style={{flex:3}}><Text style={styles.title}>{item.title}</Text></View>
      <View style={{flex:0.3}}>
      {item.id==lang && (<FeatherIcon
              name="check"
              size={20}
              color={Colors.drawerHeaderBackground}
           />)}
      
      </View>
    </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item item={item} />
  );
  
  const dispatch = useDispatch();
  const changeAppLanguage = lang => dispatch(setLang(lang));
  
  const handleLangChange = lang => {
    changeAppLanguage(lang);
  };
  

    
    const changeLanguage = value => {
        i18n
          .changeLanguage(value)
          .then(() => {
            if(value=='en' || value=='fr'){
            I18nManager.forceRTL(false);
            handleLangChange(value);

                         
            }
            else {
            I18nManager.forceRTL(true);
            handleLangChange(value)
            
           }
           
           setTimeout(() =>{RNRestart.Restart()},250);
          }
            )
          .catch(err => console.log(err));
      };  

      
   return (
    <SafeAreaView style={styles.container}>
          {/* <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          /> */}
          <LinearGradient  colors={["white","white"]} style={{flex:1}}>
   
   <View style={{ flex: 1 }}>
   <ScrollView>
   {/* <FlatList
       data={DATA}
       renderItem={renderItem}
       numColumns={2}
       keyExtractor={item => item.id}
     /> */}
     <TouchableOpacity onPress={()=>{changeLanguage("en")}}>
       <View style={styles.item2}>
    
   
     <View style={{flexDirection:"row",flex:1}}><View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
     <Image 
                            style={{width:26,height:26,alignSelf:"center"}}
                            source={require('../assets/images/en.png')}
                            resizeMode="contain"
                            
                            />
    </View>
         
     <View style={{flex:3,justifyContent:"center"}}><Text style={styles.address_name2}>{t('changelang_eng_lbl')}</Text></View>
     <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    {lang=="en" && <FontAwesome5Icon
     color={Colors.drawerHeaderBackground}
     name="check-circle"
     size={30}
   />
    }
    {lang!="en" && <EvilIcon
     color={Colors.greenBtnColor}
     name="check"
     size={30}
   />
    }

   </View>
     </View>
     
   </View>
   </TouchableOpacity>

   <TouchableOpacity onPress={()=>{changeLanguage("fr")}}>
   <View style={styles.item2}>
    
   
    <View style={{flexDirection:"row",flex:1}}><View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    <Image 
                            style={{width:26,height:26,alignSelf:"center"}}
                            source={require('../assets/images/fr.png')}
                            resizeMode="contain"
                            
                            />
    </View>
        
    <View style={{flex:3,justifyContent:"center"}}><Text style={styles.address_name2}>{t('changelang_french_lbl')}</Text></View>
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    {lang=="fr" && <FontAwesome5Icon
     color={Colors.drawerHeaderBackground}
     name="check-circle"
     size={30}
   />
    }
    {lang!="fr" && <EvilIcon
     color={Colors.greenBtnColor}
     name="check"
     size={30}
   />
    }
    </View>
    </View>
    
  </View>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>{changeLanguage("ar")}}>
  <View style={styles.item2}>
    
   
    <View style={{flexDirection:"row",flex:1}}><View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    <Image 
                            style={{width:26,height:26,alignSelf:"center"}}
                            source={require('../assets/images/ar.png')}
                            resizeMode="contain"
                            
                            />
    </View>
        
    <View style={{flex:3,justifyContent:"center"}}><Text style={styles.address_name2}>{t('changelang_arabic_lbl')}</Text></View>
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    {lang=="ar" && <FontAwesome5Icon
     color={Colors.drawerHeaderBackground}
     name="check-circle"
     size={30}
   />
    }
    {lang!="ar" && <EvilIcon
     color={Colors.greenBtnColor}
     name="check"
     size={30}
   />
    }
    </View>
    </View>
    
  </View>
  </TouchableOpacity>

   

    

     


     

     

    

   </ScrollView>  
   </View>
        </LinearGradient>
  </SafeAreaView>
   ) 
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:0,
  },
  /* item: {
    backgroundColor: 'white',
    borderBottomColor:Colors.drawerHeaderBackground,
    borderBottomWidth:1,
    padding: 5,
    marginVertical: 0,
    marginHorizontal: 0,
    flexDirection:"row"
  },
  title: {
    fontSize: 20,
    color:"gray",
    fontFamily:FONT.RobotoMedium,
    textAlign:"left"

  }, */
  item: {
    backgroundColor: "white",
    flex:1/2,
    marginVertical: 8,
    marginHorizontal: 5,
    borderRadius:10,
    borderColor:Colors.greenBtnColor,
    height:100,
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center"

  },
  item2: {
    flex:1,
    backgroundColor: "white",
    
    marginVertical: 8,
    marginHorizontal: 30,
    borderRadius:10,
    borderColor:Colors.greenBtnColor,
    height:100,
    borderWidth:1,
    justifyContent:"center",
    alignItems:"center"

  },
  address_name: {
    fontSize: 14,
    color:Colors.greenBtnColor,
    fontFamily:FONT.RobotoSemiBold,
    marginTop:5
  
  },
  address_name2: {
    fontSize: 20,
    color:Colors.greenBtnColor,
    fontFamily:FONT.RobotoSemiBold,
    
    
  
  },
});

export default ChangeLanguage;