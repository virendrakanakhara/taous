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
  TextInput
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import {Colors} from '../style/colors';
import {RobotoRegular} from '../style/fonts'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import { Badge } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FONT} from "../style/fonts";

const Oval = () => {
    return <View style={styles.oval} />;
  };
  
  const styles = StyleSheet.create({
    oval: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "yellow",
      transform: [{ scaleY:10 }],
    },
  });
  export default Oval;