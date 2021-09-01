
 import React from "react";
 import { SafeAreaView,StatusBar } from "react-native";
 import { NavigationContainer } from "@react-navigation/native";

 
 import MyStack from './Navigation/StackNavigation';
 
 export default  function App() {
   return (
     <NavigationContainer>
       <SafeAreaView style={{ flex: 1}}>
         <StatusBar StatusBar="dark" backgroundColor="black" />
         <MyStack/>
       </SafeAreaView>
     </NavigationContainer>
   );
 }
 