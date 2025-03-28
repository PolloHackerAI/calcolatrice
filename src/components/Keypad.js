import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = Math.min(width / 10, width/ 2); // Adjusted to fit the screen size
const MARGIN = 0.2;

const Keypad = (props) => {
  const rows = [
    ['2nd', 'sin', 'cos', 'tan', 'ln', 'log', 'AC', '+/-', '%', '÷'],
    ['x²', 'x³', 'x^y', '√', '(', ')', '7', '8', '9', '×'],
    ['π', 'e', 'EE', 'x!', 'mc', 'm+', '4', '5', '6', '-'],
    ['Rad', 'sinh', 'cosh', 'tanh', 'm-', 'mr', '1', '2', '3', '+'],
    [ '0', '.', '='],
  ];

  const getButtonType = (btn) => {
    if (['÷','×','-','+','='].includes(btn)) return 'operation';
    if (['sin','cos','tan','log','ln','x²','x³','x^y','½','⅓','¼','√','x!','EE','π','e','sinh','cosh','tanh'].includes(btn)) return 'scientific';
    if (['mc','m+','m-','mr'].includes(btn)) return 'memory';
    if (['AC','+/-','%'].includes(btn)) return 'utility';
    if (['2nd','Rad'].includes(btn)) return 'mode';
    if (['(',')'].includes(btn)) return 'parenthesis';
    return 'digit';
  };

  const handlePress = (btn) => {
    const type = getButtonType(btn);
    if (type === 'digit') return props.onPressDigit(btn);
    if (type === 'operation') return props.onPressOp(btn);
    if (type === 'scientific') return props.onPressSci(btn.toLowerCase());
    if (type === 'memory') return props.onPressMem(btn);
    if (type === 'mode') return props.onToggleMode(btn === 'Rad' ? 'rad/deg' : '2nd');
    if (btn === 'AC') return props.onPressOp('C');
    if (btn === '+/-') return props.onPressOp('+/-');
    if (btn === '%') return props.onPressOp('%');
  };

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((btn, btnIndex) => {
            const isWide = btn === '0' || btn === '=';
            const isActive = (btn === '2nd' && props.is2nd) || (btn === 'Rad' && !props.isRad);
            
            return (
              <TouchableOpacity
                key={`btn-${rowIndex}-${btnIndex}`}
                style={[
                  styles.button,
                  getButtonType(btn) === 'operation' && styles.opButton,
                  getButtonType(btn) === 'scientific' && styles.sciButton,
                  isActive && styles.activeButton,
                  isWide && styles.wideButton,
                ]}
                onPress={() => handlePress(btn)}
              >
                <Text style={[
                  styles.buttonText,
                  getButtonType(btn) === 'operation' && styles.opText,
                  getButtonType(btn) === 'scientific' && styles.sciText,
                ]}>
                  {btn}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#000',
        justifyContent: 'space-evenly',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
    },
    button: {
        flex: 1,
        aspectRatio: 0.5, 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#333',
        margin: MARGIN,
    },
    opButton: {
        backgroundColor: '#FF9500',
    },
    sciButton: {
        backgroundColor: '#555',
    },
    activeButton: {
        backgroundColor: '#FF9500',
    },
    wideButton: {
        //flex:0.1, // Makes wide buttons take up twice the space
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    opText: {
        fontSize: 22,
    },
    sciText: {
        fontSize: 10,
    },
});

export default Keypad;