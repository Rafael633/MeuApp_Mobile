import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SignOut from "./screens/SignOut";
import { SplashScreen } from "./screens/SplashScreen";
import Tasks from "./screens/Tasks";

import TasksAdd from "./screens/TasksAdd";
import TasksList from "./screens/TasksList";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          component={SplashScreen}
          name="SplashScreen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: "Registre-se",
            // headerShown: false,
          }}
        />
        <Stack.Screen
          name="MTBNavigation"
          component={MBTNavigation}
          options={{
            title: "Nav pricipal",
            headerShown: false,
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
      <MTB.Screen
        name="Tasks"
        component={Tasks}
        options={{
          title: "Tarefas",
          tabBarIcon: "phone-in-talk",
        }}
      />
      {/* <MTB.Screen
        name="TasksAdd"
        component={TasksAdd}
        options={{
          title: "+ Tarefa",
          tabBarIcon: "checkbox-marked-circle-plus-outline",
        }}
      />
      <MTB.Screen
        name="TasksList"
        component={TasksList}
        options={{
          title: "Tarefas",
          tabBarIcon: "checkbox-marked-circle-plus-outline",
        }}
      /> */}
      <MTB.Screen
        name="LogoutScreen"
        component={SignOut}
        options={{
          title: "Sair",
          tabBarIcon: "exit-to-app",
        }}
      />
    </MTB.Navigator>
  );
}
