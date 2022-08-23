import React, { useState,useEffect } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import { useSelector, useDispatch } from 'react-redux';
  import { getUserAddresses,updateUserAddresses} from '../redux/actions';  
  import { APICONFIG } from "../config/api";
  import { Colors } from "../style/colors";
  

  const DropdownThemeType = (props) => {
    const [value, setValue] = useState(props.value);
    const {user} = useSelector(state=>state.userReducer);
    const dispatch = useDispatch();
    //const updateUserAddress = address_id => dispatch(updateUserAddresses(address_id));
    useEffect(() => {
      setValue(props.value);
      

    },[props.value])

   const changeThemeTypeValue = (itemvalue) => {
     props.changeThemeTypeValue(itemvalue)
   }
    


    const renderItem = (item) => {
      return (
        <View style={styles.item}>
          <Text >{item.name}</Text>
          
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        
        iconStyle={styles.iconStyle}
        data={props.data && props.data.items?props.data.items:[]}
        
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder={props.selectText}
        
        value={value}
        onChange={item => {
          changeThemeTypeValue(item)
          
        }}
        
        renderItem={renderItem}
      />
    );
  };

  export default DropdownThemeType;

  const styles = StyleSheet.create({
    dropdown: {
      width:"100%",  
      
      height: 30,
      
      borderColor:Colors.greenBtnColor,
      borderWidth:1,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      
    },
    textItem: {
      flex: 1,
      fontSize: 14,
      
    },
    placeholderStyle: {
        color:"black",fontSize:14,textAlign:"left"
    },
    selectedTextStyle: {
        color:"black",fontSize:14,textAlign:"left"
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 14,
    },
  });