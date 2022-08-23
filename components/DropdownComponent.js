import React, { useState,useEffect } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import { useSelector, useDispatch } from 'react-redux';
  import { getUserAddresses,updateUserAddresses} from '../redux/actions';  
  import { APICONFIG } from "../config/api";
  

  const DropdownComponent = (props) => {
    const [value, setValue] = useState(props.value);
    const {user} = useSelector(state=>state.userReducer);
    const dispatch = useDispatch();
    const updateUserAddress = address_id => dispatch(updateUserAddresses(address_id));
    useEffect(() => {
      setValue(props.value);
      

    },[props.value])


    


    const renderItem = (item) => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          
        </View>
      );
    };

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        
        
        data={props.data}
        
        maxHeight={300}
        labelField="short_label"
        valueField="value"
        placeholder={props.selectText}
        
        value={parseInt(value)}
        onChange={item => {
          setValue(item.value);
          updateUserAddress(item.value);
        }}
        
        renderItem={renderItem}
      />
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    dropdown: {
      width:"96%",  
      margin: 5,
      height: 30,
      
      
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
      textAlign:"left",
      
    },
    placeholderStyle: {
        color:"gray",fontSize:14,textDecorationLine:"underline",textAlign:"left"
    },
    selectedTextStyle: {
        color:"gray",fontSize:14,textDecorationLine:"underline",textAlign:"left"
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });