import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import Button from './src/components/Button';

export default function App() {
  const [currentValue, setCurrentValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [memoryValue, setMemoryValue] = useState(0);

  const handleNumberPress = (number) => {
    if (currentValue === '0') {
      setCurrentValue(number);
    } else {
      setCurrentValue(currentValue + number);
    }
  };

  const handleDecimalPress = () => {
    if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const handleOperationPress = (op) => {
    const value = parseFloat(currentValue);
    
    if (previousValue === null) {
      setPreviousValue(value);
    } else if (operator) {
      const result = performOperation(previousValue, value, operator);
      setPreviousValue(result);
      setCurrentValue(String(result));
    }
    
    setCurrentValue('0');
    setOperator(op);
  };

  const performOperation = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return a / b;
      default:
        return b;
    }
  };

  const handleEqualPress = () => {
    const value = parseFloat(currentValue);
    
    if (operator && previousValue !== null) {
      const result = performOperation(previousValue, value, operator);
      setCurrentValue(String(result));
      setPreviousValue(null);
      setOperator(null);
    }
  };

  const handleClearPress = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
  };

  const handleMemoryAdd = () => {
    setMemoryValue(memoryValue + parseFloat(currentValue));
  };

  const handleMemorySubtract = () => {
    setMemoryValue(memoryValue - parseFloat(currentValue));
  };

  const handleMemoryRecall = () => {
    setCurrentValue(String(memoryValue));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.displayContainer}>
        <Text style={styles.display} numberOfLines={1} adjustsFontSizeToFit>
          {currentValue}
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button title="M+" onPress={handleMemoryAdd} type="memory" />
          <Button title="M-" onPress={handleMemorySubtract} type="memory" />
          <Button title="RM" onPress={handleMemoryRecall} type="memory" />
          <Button title="C" onPress={handleClearPress} type="control" />
        </View>
        
        <View style={styles.row}>
          <Button title="7" onPress={() => handleNumberPress('7')} />
          <Button title="8" onPress={() => handleNumberPress('8')} />
          <Button title="9" onPress={() => handleNumberPress('9')} />
          <Button title="÷" onPress={() => handleOperationPress('/')} type="operation" />
        </View>
        
        <View style={styles.row}>
          <Button title="4" onPress={() => handleNumberPress('4')} />
          <Button title="5" onPress={() => handleNumberPress('5')} />
          <Button title="6" onPress={() => handleNumberPress('6')} />
          <Button title="×" onPress={() => handleOperationPress('*')} type="operation" />
        </View>
        
        <View style={styles.row}>
          <Button title="1" onPress={() => handleNumberPress('1')} />
          <Button title="2" onPress={() => handleNumberPress('2')} />
          <Button title="3" onPress={() => handleNumberPress('3')} />
          <Button title="-" onPress={() => handleOperationPress('-')} type="operation" />
        </View>
        
        <View style={styles.row}>
          <Button title="0" onPress={() => handleNumberPress('0')} />
          <Button title="." onPress={handleDecimalPress} />
          <Button title="=" onPress={handleEqualPress} type="equal" />
          <Button title="+" onPress={() => handleOperationPress('+')} type="operation" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-center',
    backgroundColor: '#202020',
    padding: 20,
    width: '90%',
    margin: 'auto',
    borderRadius: 20,
  },
  display: {
    fontSize: 70,
    color: 'white',
    textAlign: 'right',
    
    
  },
  buttonContainer: {
    flex: 5,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});