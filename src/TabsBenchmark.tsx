import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  PerformanceMarkers,
  isFabricEnabled,
} from './Utils';
import {PerformanceTracker} from '@d11/marco';

const TabsBenchmark = () => {
  const navigation = useNavigation();

  const runNativeBottomTabBenchmarks = (e: GestureResponderEvent) => {
    PerformanceTracker.track(PerformanceMarkers.OPEN_NATIVE_TABS, e.timeStamp);
    //@ts-ignore
    navigation.navigate('NativeBottomTabs', {
      stack_type: 'native',
    });
  };

  const runJSBottomTabBenchmarks = (e: GestureResponderEvent) => {
    PerformanceTracker.track(PerformanceMarkers.OPEN_JS_TABS, e.timeStamp);
    //@ts-ignore
    navigation.navigate('JSBottomTabs', {
      stack_type: 'js',
    });
  };

  const resetLogs = () => {
    PerformanceTracker.resetLogs({
      clearFiles: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}>
        <Pressable
          style={styles.buttonContainer}
          testID="native_bottom_tab_benchmarks"
          onPress={runNativeBottomTabBenchmarks}>
          <Text style={styles.text}>Native Bottom Tabs</Text>
        </Pressable>
        <Pressable
          style={styles.buttonContainer}
          testID="js_bottom_tab_benchmarks"
          onPress={runJSBottomTabBenchmarks}>
          <Text style={styles.text}>JS Bottom Tabs</Text>
        </Pressable>
        <View style={styles.benchmarkContainer}>
          <Pressable
            testID="reset_logs"
            style={[styles.buttonContainer, styles.resetButton]}
            onPress={resetLogs}>
            <Text style={[styles.text, styles.resetColor]}>Reset</Text>
          </Pressable>
        </View>
        <Text>
          {isFabricEnabled ? 'New Arch Enabled ' : 'Old Arch Enabled'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {flex: 1},
  benchmarkContainer: {
    flexDirection: 'row',
  },
  resetColor: {color: 'white'},
  buttonContainer: {
    padding: 8,
    backgroundColor: '#d3d3d3',
    borderRadius: 20,
    width: 300,
    margin: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  resultsHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  resultBlock: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: '400',
    color: '#555',
  },
  metricDetail: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginTop: 4,
  },
  detailValue: {
    fontWeight: '400',
    color: '#777',
  },
  iterationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
    marginTop: 20,
  },
  benchmarkResults: {backgroundColor: '#ADD8E6', width: 130, margin: 15},
  resetButton: {backgroundColor: 'red', width: 130, margin: 15},
});

export default TabsBenchmark;
