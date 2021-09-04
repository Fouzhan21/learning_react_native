
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store"
import MyStack from './Navigation/StackNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar StatusBar="dark" backgroundColor="black" />
          <MyStack />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}
