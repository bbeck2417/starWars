import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// Import your Star Wars screens
import Planets from "./Planets";
import Spaceships from "./Spaceships";
import Films from "./Films";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const PlanetsStack = createStackNavigator();
function PlanetsScreen() {
  return (
    <PlanetsStack.Navigator>
      <PlanetsStack.Screen name="Planets" component={Planets} />
      {/* Add more screens related to planets if needed */}
    </PlanetsStack.Navigator>
  );
}

const SpaceshipsStack = createStackNavigator();
function SpaceshipsScreen() {
  return (
    <SpaceshipsStack.Navigator>
      <SpaceshipsStack.Screen name="Spaceships" component={Spaceships} />
      {/* Add more screens related to spaceships if needed */}
    </SpaceshipsStack.Navigator>
  );
}

const FilmsStack = createStackNavigator();
function FilmsScreen() {
  return (
    <FilmsStack.Navigator>
      <FilmsStack.Screen name="Films" component={Films} />
      {/* Add more screens related to films if needed */}
    </FilmsStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          width: "70%",
        }}
        screenOptions={{ headerShown: false, drawerActiveTintColor: "#e91e63" }}
      >
        <Drawer.Screen
          name="Planets"
          component={PlanetsScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="planet" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Spaceships"
          component={SpaceshipsScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="rocket" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Films"
          component={FilmsScreen}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="film" size={24} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
