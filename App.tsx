import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PerformanceTracker} from '@d11/marco';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import JSBottomTabs from './src/JSBottomTab';
import NativeBottomTabs from './src/NativeBottomTab';
import TabsBenchmark from './src/TabsBenchmark';

PerformanceTracker.configure({
  persistToFile: true,
});

const NativeStack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const NavigationStack = NativeStack;
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NavigationStack.Navigator initialRouteName="BottomTab Benchmarks">
          <NavigationStack.Screen
            name="BottomTab Benchmarks"
            component={TabsBenchmark}
          />
          <NavigationStack.Screen
            name="JSBottomTabs"
            component={JSBottomTabs}
          />
          <NavigationStack.Screen
            name="NativeBottomTabs"
            component={NativeBottomTabs}
          />
        </NavigationStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
