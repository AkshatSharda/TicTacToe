/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, View, Dimensions } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Game from './Game';

const { width, height } = Dimensions.get('window')

const App: () => React$Node = () => {
  return (
    <View>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView >
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionDescription}>
            Tick Tac Toe
          </Text>
          <Game />
        </View>
      </SafeAreaView>
    </View >
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    alignItems: "center",
    width,
    height,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 30,
    marginBottom: 100,
    fontSize: 32,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
