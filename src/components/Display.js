// components/Display.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Display = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    padding: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 10,
    borderRadius: 10,
    width: 50,
  },
  displayText: {
    color: '#ffffff',
    fontSize: 48,
  },
});

export default Display;