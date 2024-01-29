import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import rootReducer from './src/components/reducers/index';
import LoginScreen from './src/components/LoginScreen';
import HotelListScreen from './src/components/HotelListScreen';
import HotelDetailScreen from './src/components/HotelDetailScreen';
import ProfileScreen from './src/components/ProfileScreen';

const Tab = createBottomTabNavigator();
const store = createStore(rootReducer);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator>
            {loggedIn ? (
              <>
                <Tab.Screen
                  name="Список отелей"
                  component={HotelListScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="ios-list" size={size} color={color} />
                    ),
                  }} />
                <Tab.Screen
                  name="Подробнее об отеле"
                  component={HotelDetailScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="ios-document" size={size} color={color} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Профиль"
                  component={ProfileScreen}
                  options={{
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name="ios-person" size={size} color={color} />
                    ),
                  }}
                />
              </>
            ) : (
              <Tab.Screen
                name="Вход"
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-home" size={size} color={color} />
                  ),
                }}
              >
                {() => <LoginScreen onLogin={handleLogin} />}
              </Tab.Screen>
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </>

  );
}

export default App;

