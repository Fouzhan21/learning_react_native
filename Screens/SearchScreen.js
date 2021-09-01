import React from "react"
import {StyleSheet,Text,View,} from "react-native";
import tailwind from 'tailwind-rn';

export default function SearchScreen() {
  return (
    <View style={tailwind('h-full bg-red-400')}> 
    <Text style={tailwind("text-xl text-center ")}>Search Screens</Text>
  </View>
  );
}

const styles = StyleSheet.create({
    
});


  