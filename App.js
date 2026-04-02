import { GestureHandlerRootView } from "react-native-gesture-handler";
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
      <PlanetsStack.Screen
        name="PlanetsList" // Changed from "Planets"
        component={Planets}
        options={{ title: "Planets" }} // This keeps the header saying "Planets"
      />
    </PlanetsStack.Navigator>
  );
}

const SpaceshipsStack = createStackNavigator();
function SpaceshipsScreen() {
  return (
    <SpaceshipsStack.Navigator>
      <SpaceshipsStack.Screen
        name="SpaceshipsList" // Changed from "Spaceships"
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
        name="FilmsList" // Changed from "Films"
        component={Films}
        options={{ title: "Films" }}
      />
    </FilmsStack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: "#e91e63",
            drawerStyle: {
              width: "70%",
            },
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
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
