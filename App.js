import { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import Keypad from './src/components/Keypad';
import Display from './src/components/Display';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(true);
  const [is2nd, setIs2nd] = useState(false);

  const handleDigit = (digit) => {
    if (display === '0' || operation === '=') {
      setDisplay(digit);
      if (operation === '=') setOperation(null);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleOperation = (op) => {
    if (op === '=') {
      calculate();
      return;
    }
    setPrevValue(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const calculate = () => {
    if (!prevValue || !operation) return;
    
    const current = parseFloat(display);
    let result;
    
    switch (operation) {
      case '+': result = prevValue + current; break;
      case '-': result = prevValue - current; break;
      case '×': result = prevValue * current; break;
      case '÷': result = prevValue / current; break;
      case 'x^y': result = Math.pow(prevValue, current); break;
      default: result = current;
    }
    
    setDisplay(String(result));
    setOperation('=');
  };

  const handleSciOp = (op) => {
    const val = parseFloat(display);
    let result;
    
    switch (op) {
      case 'sin': 
        result = is2nd ? Math.asin(val) : Math.sin(isRadians ? val : val * (Math.PI/180));
        break;
      case 'cos':
        result = is2nd ? Math.acos(val) : Math.cos(isRadians ? val : val * (Math.PI/180));
        break;
      case 'tan':
        result = is2nd ? Math.atan(val) : Math.tan(isRadians ? val : val * (Math.PI/180));
        break;
      case 'log':
        result = is2nd ? Math.pow(10, val) : Math.log10(val);
        break;
      case 'ln':
        result = is2nd ? Math.exp(val) : Math.log(val);
        break;
      case '√':
        result = is2nd ? val * val : Math.sqrt(val);
        break;
      case 'x!':
        if (val < 0 || !Number.isInteger(val)) result = 'Error';
        else result = Array.from({length: val}, (_, i) => i + 1).reduce((a, b) => a * b, 1);
        break;
      case 'π': result = Math.PI; break;
      case 'e': result = Math.E; break;
      default: result = val;
    }
    
    setDisplay(String(result));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Display 
        value={display} 
        isRadians={isRadians} 
        isInverse={is2nd} 
      />
      <Keypad 
        onPressDigit={handleDigit}
        onPressOp={handleOperation}
        onPressSci={handleSciOp}
        onPressMem={(op) => {
          const val = parseFloat(display);
          if (op === 'MC') setMemory(0);
          if (op === 'MR') setDisplay(String(memory));
          if (op === 'M+') setMemory(memory + val);
          if (op === 'M-') setMemory(memory - val);
        }}
        onToggleMode={(mode) => {
          if (mode === 'rad/deg') setIsRadians(!isRadians);
          if (mode === '2nd') setIs2nd(!is2nd);
        }}
        is2nd={is2nd}
        isRad={isRadians}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});