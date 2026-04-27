import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

import Planets from "./Planets";
import Spaceships from "./Spaceships";
import Films from "./Films";


const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const PlanetsStack = createStackNavigator();
function PlanetsScreen() {
  return (
    <PlanetsStack.Navigator>
      <PlanetsStack.Screen
        name="PlanetsList"
        component={Planets}
        options={{ title: "Planets" }}
      />
    </PlanetsStack.Navigator>
  );
}

const SpaceshipsStack = createStackNavigator();
function SpaceshipsScreen() {
  return (
    <SpaceshipsStack.Navigator>
      <SpaceshipsStack.Screen
        name="SpaceshipsList"
        component={Spaceships}
        options={{ title: "Spaceships" }}
      />
    </SpaceshipsStack.Navigator>
  );
}

const FilmsStack = createStackNavigator();
function FilmsScreen() {
  return (
    <FilmsStack.Navigator>
      <FilmsStack.Screen
        name="FilmsList"
        component={Films}
        options={{ title: "Films" }}
      />
    </FilmsStack.Navigator>
  );
}

export default function App() {
  const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: "#e91e63",
    drawerActiveTintColor: "#e91e63",
    tabBarIcon: ({ color, size }) => {
      let iconName;
      if (route.name === "Planets") iconName = "planet";
      else if (route.name === "Spaceships") iconName = "rocket";
      else if (route.name === "Films") iconName = "film";
      return <Ionicons name={iconName} size={size || 24} color={color} />;
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {Platform.OS === "ios" && (
          <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Planets" component={PlanetsScreen} />
            <Tab.Screen name="Spaceships" component={SpaceshipsScreen} />
            <Tab.Screen name="Films" component={FilmsScreen} />
          </Tab.Navigator>
        )}

        {Platform.OS === "android" && (
          <Drawer.Navigator
            screenOptions={{
              ...screenOptions({ route: {} }),
              drawerStyle: { width: "70%" },
            }}
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
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
