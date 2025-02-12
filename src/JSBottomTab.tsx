import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Article} from './Screens/Article';
import {Albums} from './Screens/Albums';
import {Contacts} from './Screens/Contacts';
import {Chat} from './Screens/Chat';
import {Platform} from 'react-native';
import {PerformanceMarkers} from './Utils';
import {PerformanceTracker} from '@d11/marco';

const Tab = createBottomTabNavigator();

function JSBottomTabs(props: any) {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Article"
        component={Article}
        initialParams={props?.route?.params}
      />
      <Tab.Screen
        name="Albums"
        component={Albums}
        initialParams={props?.route?.params}
        options={{
          tabBarButtonTestID: 'Albums',
        }}
        listeners={{
          tabPress: e => {
            PerformanceTracker.track(
              PerformanceMarkers.JS_ALBUMS_TAB_CLICKED,
              Date.now(),
            );
            console.log(Platform.OS, 'Album Tab Press', e.data);
          },
        }}
      />
      <Tab.Screen name="Contacts" component={Contacts} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
}

export default JSBottomTabs;
