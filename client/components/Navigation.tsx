import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Registration from './pages/Registration';
import MainPage from './pages/MainPage';
import Autorization from './pages/Autorization';
import ResultPage from './pages/ResultPage';
import GeneralPage from './pages/GeneralPage';
import ScorePage from './pages/ScorePage';
import ProfilePage from './pages/ProfilePage';

const Stack = createNativeStackNavigator();

export default function Navigation(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: 'Главная страница' }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ title: 'Регистрация' }}
        />
        <Stack.Screen
          name="Autorization"
          component={Autorization}
          options={{ title: 'Авторизация' }}
        />
        <Stack.Screen 
        name='ResultPage'
        component={ResultPage}
        options={{title: 'Результат'}}
        />
        <Stack.Screen name='ScorePage' component={ScorePage} />
        <Stack.Screen name='GeneralPage' component={GeneralPage} />
        <Stack.Screen name='ProfilePage' component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
