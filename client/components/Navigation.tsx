import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Registration from './pages/Registration';
import MainPage from './pages/MainPage';
import Autorization from './pages/Autorization';
import GamePage from './pages/GamePage';
import CreateLobbyPage from './pages/CreateLobbyPage';
import Lobby from './pages/Lobby';
import FactPage from './pages/FactPage';
import ResultPage from './pages/ResultPage';
import GeneralPage from './pages/GeneralPage';
import ScorePage from './pages/ScorePage';
import ProfilePage from './pages/ProfilePage';
import MakePhoto from './pages/MakePhoto';
import TakePartPage from './pages/TakePartPage';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppDispatch } from '../features/redux/hooks';
import { checkUserThunk } from '../features/redux/slices/user/thunkAction';

const Stack = createStackNavigator();

export default function Navigation(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkUserThunk());
  });
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShadowVisible: false }}>
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{
            title: 'Главная страница',
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            title: 'Регистрация',
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Autorization"
          component={Autorization}
          options={{
            title: 'Авторизация',
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="GamePage"
          component={GamePage}
          options={{ title: 'Игра', headerLeft: null, gestureEnabled: false }}
        />
        <Stack.Screen
          name="CreateLobbyPage"
          component={CreateLobbyPage}
          options={{
            title: '',
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Lobby"
          component={Lobby}
          options={{ title: '', headerLeft: null, gestureEnabled: false }}
        />
        <Stack.Screen
          name="FactPage"
          component={FactPage}
          options={{
            title: 'Введите факт',
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="ResultPage"
          component={ResultPage}
          options={{
            title: 'Результат',
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen name="ScorePage" component={ScorePage} />
        <Stack.Screen name="GeneralPage" component={GeneralPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        <Stack.Screen name="MakePhoto" component={MakePhoto} />
        <Stack.Screen name="TakePartPage" component={TakePartPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
