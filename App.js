import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Planets from "./Planets";
import Spaceships from "./Spaceships";
import Films from "./Films";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Planets" component={Planets} />
        <Tab.Screen name="Spaceships" component={Spaceships} />
        <Tab.Screen name="Films" component={Films} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
