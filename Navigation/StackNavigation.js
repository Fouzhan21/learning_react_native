import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTab from "./BottomNavigation"





const Some = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Some.Navigator  screenOptions={{ headerShown: false }}>
      <Some.Screen name="BottomTab" component={BottomTab} />
      
    </Some.Navigator>
  );
}

