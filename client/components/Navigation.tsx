import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Registration from "./pages/Registration";
import MainPage from "./pages/MainPage";
import Autorization from "./pages/Autorization";
import GamePage from "./pages/GamePage";
import CreateLobbyPage from "./pages/CreateLobbyPage";
import Lobby from "./pages/Lobby";

const Stack = createNativeStackNavigator();

export default function Navigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: "Главная страница" }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ title: "Регистрация" }}
        />
        <Stack.Screen
          name="Autorization"
          component={Autorization}
          options={{ title: "Авторизация" }}
        />
        <Stack.Screen
          name="GamePage"
          component={GamePage}
          options={{ title: "Игра" }}
        />
        <Stack.Screen
          name="CreateLobbyPage"
          component={CreateLobbyPage}
          options={{ title: "" }}
        />
        <Stack.Screen name="Lobby" component={Lobby} options={{ title: "" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
