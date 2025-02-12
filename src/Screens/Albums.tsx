import {PerformanceTracker} from '@d11/marco';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  Button,
} from 'react-native';
import {PerformanceMarkers} from '../Utils';
import { useNavigation } from '@react-navigation/native';

const COVERS = [
  require('../../assets/album-art-01.jpg'),
  require('../../assets/album-art-02.jpg'),
  require('../../assets/album-art-03.jpg'),
  require('../../assets/album-art-04.jpg'),
  require('../../assets/album-art-05.jpg'),
  require('../../assets/album-art-06.jpg'),
  require('../../assets/album-art-07.jpg'),
  require('../../assets/album-art-08.jpg'),
  require('../../assets/album-art-09.jpg'),
  require('../../assets/album-art-10.jpg'),
  require('../../assets/album-art-11.jpg'),
  require('../../assets/album-art-12.jpg'),
  require('../../assets/album-art-13.jpg'),
  require('../../assets/album-art-14.jpg'),
  require('../../assets/album-art-15.jpg'),
  require('../../assets/album-art-16.jpg'),
  require('../../assets/album-art-17.jpg'),
  require('../../assets/album-art-18.jpg'),
  require('../../assets/album-art-19.jpg'),
  require('../../assets/album-art-20.jpg'),
  require('../../assets/album-art-21.jpg'),
  require('../../assets/album-art-22.jpg'),
  require('../../assets/album-art-23.jpg'),
  require('../../assets/album-art-24.jpg'),
];

export function Albums(props: any) {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation()

  console.log(
    Platform.OS,
    ' Rendering Albums',
    props?.route.params?.stack_type,
  );
  const itemSize = dimensions.width / Math.floor(dimensions.width / 150);
  const isJSStack = props?.route.params?.stack_type === 'js'

  return (
    <PerformanceTracker
      tagName={
        isJSStack
          ? PerformanceMarkers.JS_ALBUMS_TAB_LOADED
          : PerformanceMarkers.NATIVE_ALBUMS_TAB_LOADED
      }
      eventTimeStamp={Date.now()}
      >
      <Text style={{textAlign: 'center'}}>Album Screen Displayed</Text>
      <Button title='Pop To Top' onPress={() => {
        navigation.goBack()
        navigation.goBack()
        }}/>
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic">
        {COVERS.map((source, i) => (
          <View
            key={i}
            style={[
              styles.item,
              Platform.OS !== 'web' && {
                height: itemSize,
                width: itemSize,
              },
            ]}>
            <Image source={source} resizeMode="cover" style={styles.photo} />
          </View>
        ))}
      </ScrollView>
    </PerformanceTracker>
  );
}

const styles = StyleSheet.create({
  ...Platform.select({
    web: {
      content: {
        // FIXME: React Native's types for `display` don't include `grid`.
        display: 'grid' as any,
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      },
      item: {
        width: '100%',
      },
    },
    default: {
      content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      item: {},
    },
  }),
  photo: {
    flex: 1,
    height: 'auto',
    width: 'auto',
  },
});
