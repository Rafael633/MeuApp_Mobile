import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MTBNavigation"
          component={MBTNavigation}
          options={{
            title: "Nav pricipal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Inicial",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MTB = createMaterialBottomTabNavigator();

export function MBTNavigation() {
  return (
    <MTB.Navigator>
      <MTB.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: "android",

          title: "Inicio",
        }}
      />
      <MTB.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          title: "Sobre",
          tabBarIcon: "help",
        }}
      />
      <MTB.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          title: "Contato",
          tabBarIcon: "phone-in-talk",
        }}
      />
    </MTB.Navigator>
  );
}
