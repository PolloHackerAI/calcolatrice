import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Button({ title, onPress, type = 'number' }) {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  switch (type) {
    case 'operation':
      buttonStyles.push(styles.operationButton);
      textStyles.push(styles.operationText);
      break;
    case 'control':
      buttonStyles.push(styles.controlButton);
      textStyles.push(styles.controlText);
      break;
    case 'equal':
      buttonStyles.push(styles.equalButton);
      textStyles.push(styles.equalText);
      break;
    case 'memory':
      buttonStyles.push(styles.memoryButton);
      textStyles.push(styles.memoryText);
      break;
    default:
      buttonStyles.push(styles.numberButton);
      break;
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text: {
    fontSize: 28,
    fontWeight: '500',
  },
  numberButton: {
    backgroundColor: '#ffffff',
  },
  operationButton: {
    backgroundColor: '#ff9500',
  },
  operationText: {
    color: 'white',
  },
  controlButton: {
    backgroundColor: '#a5a5a5',
  },
  controlText: {
    color: 'white',
  },
  equalButton: {
    backgroundColor: '#ff9500',
  },
  equalText: {
    color: 'white',
  },
  memoryButton: {
    backgroundColor: '#505050',
  },
  memoryText: {
    color: 'white',
  },
});