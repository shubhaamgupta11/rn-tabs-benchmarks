import React from 'react';
import { Article } from './Screens/Article';
import { Albums } from './Screens/Albums';
import { Contacts } from './Screens/Contacts';
import { Chat } from './Screens/Chat';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import { Platform } from 'react-native';
import { PerformanceTracker } from '@d11/marco';
import { PerformanceMarkers } from './Utils';

const Tab = createNativeBottomTabNavigator();

function NativeBottomTabs(props: any) {
  return (
    <Tab.Navigator
    >
      <Tab.Screen
        name="Article"
        component={Article}
        initialParams={props?.route?.params}
        options={{
          tabBarBadge: '10',
          tabBarIcon: () => require('../assets/icons/article_dark.png'),
        }}
      />
      <Tab.Screen
        name="Albums"
        component={Albums}
        listeners={{
          tabPress: (e:any) => {
              PerformanceTracker.track(PerformanceMarkers.NATIVE_ALBUMS_TAB_CLICKED, Date.now());
              console.log(Platform.OS, 'Album Tab Press', e.target);
          },
        }}
        initialParams={props?.route?.params}
        options={{
          tabBarIcon: () => require('../assets/icons/grid_dark.png'),
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarIcon: () => require('../assets/icons/person_dark.png'),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarIcon: () => require('../assets/icons/chat_dark.png'),
        }}
      />
    </Tab.Navigator>
  );
}

export default NativeBottomTabs;
