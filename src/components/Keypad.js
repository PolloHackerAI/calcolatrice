import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Dimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const Keypad = ({
  onInputDigit,
  onInputDot,
  onClearAll,
  onClearEntry,
  onToggleSign,
  onInputPercent,
  onPerformOperation,
  onCalculateResult,
  onScientificOperation,
  onToggleMode,
  onMemoryAction,
  isInverse,
  isRadians,
}) => {
  // Pulsanti scientifici con icone
  const scientificButtons = [
    { label: "sin", icon: "functions", type: "scientific", operation: "sin", inverseLabel: "asin" },
    { label: "cos", icon: "functions", type: "scientific", operation: "cos", inverseLabel: "acos" },
    { label: "tan", icon: "functions", type: "scientific", operation: "tan", inverseLabel: "atan" },
    { label: "log", icon: "exposure-zero", type: "scientific", operation: "log", inverseLabel: "10^x" },
    { label: "ln", icon: "exposure-neg-1", type: "scientific", operation: "ln", inverseLabel: "e^x" },
    { label: "√", icon: "square-root-alt", type: "scientific", operation: "sqrt", inverseLabel: "x²" },
    { label: "π", icon: "pi", type: "scientific", operation: "π" },
    { label: "e", icon: "e", type: "scientific", operation: "e" },
    { label: "x!", icon: "exclamation", type: "scientific", operation: "x!" },
    { label: "1/x", icon: "swap-vert", type: "scientific", operation: "1/x" },
  ];

  // Pulsanti memoria
  const memoryButtons = [
    { label: "MC", type: "memory", operation: "MC" },
    { label: "MR", type: "memory", operation: "MR" },
    { label: "M+", type: "memory", operation: "M+" },
    { label: "M-", type: "memory", operation: "M-" },
  ];

  // Pulsanti modalità
  const modeButtons = [
    { 
      label: isRadians ? "DEG" : "RAD", 
      type: "mode", 
      operation: "rad/deg",
      active: true
    },
    { 
      label: "INV", 
      type: "mode", 
      operation: "inv",
      active: isInverse
    },
  ];

  // Pulsanti principali
  const basicButtons = [
    { label: "C", type: "clear", operation: "C" },
    { label: "(", type: "operation", operation: "(" },
    { label: ")", type: "operation", operation: ")" },
    { label: "÷", type: "operation", operation: "÷" },
    
    { label: "7", type: "digit", operation: "7" },
    { label: "8", type: "digit", operation: "8" },
    { label: "9", type: "digit", operation: "9" },
    { label: "×", type: "operation", operation: "×" },
    
    { label: "4", type: "digit", operation: "4" },
    { label: "5", type: "digit", operation: "5" },
    { label: "6", type: "digit", operation: "6" },
    { label: "-", type: "operation", operation: "-" },
    
    { label: "1", type: "digit", operation: "1" },
    { label: "2", type: "digit", operation: "2" },
    { label: "3", type: "digit", operation: "3" },
    { label: "+", type: "operation", operation: "+" },
    
    { label: "+/-", type: "operation", operation: "+/-" },
    { label: "0", type: "digit", operation: "0" },
    { label: ".", type: "dot", operation: "." },
    { label: "=", type: "equals", operation: "=" },
  ];

  const handlePress = (button) => {
    switch (button.type) {
      case "digit":
        onInputDigit(button.operation);
        break;
      case "dot":
        onInputDot();
        break;
      case "clear":
        button.label === "C" ? onClearAll() : onClearEntry();
        break;
      case "operation":
        if (button.operation === "+/-") {
          onToggleSign();
        } else if (button.operation === "%") {
          onInputPercent();
        } else if (button.operation === "=") {
          onCalculateResult();
        } else {
          onPerformOperation(button.operation);
        }
        break;
      case "scientific":
        onScientificOperation(button.operation);
        break;
      case "mode":
        onToggleMode(button.operation);
        break;
      case "memory":
        onMemoryAction(button.operation);
        break;
    }
  };

  const renderButtonContent = (button) => {
    if (button.icon) {
      const displayLabel = isInverse && button.inverseLabel ? button.inverseLabel : button.label;
      return (
        <>
          <MaterialIcons name={button.icon} size={20} color="white" />
          <Text style={styles.smallButtonText}>{displayLabel}</Text>
        </>
      );
    }
    return <Text style={styles.buttonText}>{button.label}</Text>;
  };

  const renderButtonRow = (buttons, isScrollable = false) => {
    if (isScrollable) {
      return (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollableRow}
        >
          {buttons.map((button, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.smallButton,
                getButtonStyle(button),
                button.active && styles.activeModeButton
              ]}
              onPress={() => handlePress(button)}
            >
              {renderButtonContent(button)}
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }

    return (
      <View style={styles.buttonRow}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              getButtonStyle(button),
              button.label === "0" && styles.zeroButton,
              button.active && styles.activeModeButton
            ]}
            onPress={() => handlePress(button)}
          >
            {renderButtonContent(button)}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getButtonStyle = (button) => {
    const stylesMap = {
      digit: styles.digitButton,
      operation: styles.operationButton,
      scientific: styles.scientificButton,
      memory: styles.memoryButton,
      clear: styles.clearButton,
      mode: styles.modeButton,
      equals: styles.equalsButton,
      dot: styles.digitButton,
    };
    return stylesMap[button.type] || styles.button;
  };

  return (
    <View style={styles.container}>
      {/* Righe scorrevoli per funzioni avanzate */}
      {renderButtonRow(scientificButtons, true)}
      {renderButtonRow([...memoryButtons, ...modeButtons], true)}
      
      {/* Tastiera principale */}
      <View style={styles.mainKeypad}>
        {[0, 1, 2, 3, 4].map((row) => (
          renderButtonRow(basicButtons.slice(row * 4, (row + 1) * 4))
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const buttonSize = width / 4.5;
const smallButtonSize = width / 6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 10,
  },
  scrollableRow: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  mainKeypad: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: buttonSize,
    height: buttonSize * 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 4,
  },
  smallButton: {
    width: smallButtonSize,
    height: smallButtonSize * 0.7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "400",
  },
  smallButtonText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "400",
  },
  digitButton: {
    backgroundColor: "#333333",
  },
  operationButton: {
    backgroundColor: "#FF9500",
  },
  scientificButton: {
    backgroundColor: "#2a2a2a",
  },
  memoryButton: {
    backgroundColor: "#2a2a2a",
  },
  clearButton: {
    backgroundColor: "#a5a5a5",
  },
  modeButton: {
    backgroundColor: "#2a2a2a",
  },
  activeModeButton: {
    backgroundColor: "#FF9500",
  },
  equalsButton: {
    backgroundColor: "#FF9500",
  },
  zeroButton: {
    width: buttonSize * 2 + 10,
  },
});

export default Keypad;