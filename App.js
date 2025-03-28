"use client"

import { useState } from "react"
import { StyleSheet, View, SafeAreaView, StatusBar, Platform } from "react-native"
import Display from "./src/components/Display"
import Keypad from "./src/components/Keypad"

export default function App() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [memory, setMemory] = useState(0)
  const [isRadians, setIsRadians] = useState(true)
  const [isInverse, setIsInverse] = useState(false)

  const clearAll = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay("0")
  }

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit)
    }
  }

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const toggleSign = () => {
    setDisplay(display.charAt(0) === "-" ? display.substring(1) : "-" + display)
  }

  const inputPercent = () => {
    const value = Number.parseFloat(display)
    setDisplay(String(value / 100))
  }

  const performOperation = (nextOperation) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      let newValue

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue
          break
        case "-":
          newValue = currentValue - inputValue
          break
        case "×":
          newValue = currentValue * inputValue
          break
        case "÷":
          newValue = currentValue / inputValue
          break
        case "x^y":
          newValue = Math.pow(currentValue, inputValue)
          break
        default:
          newValue = inputValue
      }

      setPreviousValue(newValue)
      setDisplay(String(newValue))
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculateResult = () => {
    if (!previousValue || !operation) {
      return
    }

    performOperation("=")
    setOperation(null)
  }

  const handleScientificOperation = (op) => {
    const value = Number.parseFloat(display)
    let result

    switch (op) {
      case "sin":
        result = isInverse ? Math.asin(value) : Math.sin(isRadians ? value : (value * Math.PI) / 180)
        break
      case "cos":
        result = isInverse ? Math.acos(value) : Math.cos(isRadians ? value : (value * Math.PI) / 180)
        break
      case "tan":
        result = isInverse ? Math.atan(value) : Math.tan(isRadians ? value : (value * Math.PI) / 180)
        break
      case "log":
        result = isInverse ? Math.pow(10, value) : Math.log10(value)
        break
      case "ln":
        result = isInverse ? Math.exp(value) : Math.log(value)
        break
      case "sqrt":
        result = isInverse ? Math.pow(value, 2) : Math.sqrt(value)
        break
      case "π":
        result = Math.PI
        break
      case "e":
        result = Math.E
        break
      case "1/x":
        result = 1 / value
        break
      case "x!":
        if (value < 0 || value % 1 !== 0) {
          result = "Error"
        } else {
          result = factorial(value)
        }
        break
      default:
        result = value
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const factorial = (n) => {
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  const toggleMode = (mode) => {
    switch (mode) {
      case "rad/deg":
        setIsRadians(!isRadians)
        break
      case "inv":
        setIsInverse(!isInverse)
        break
    }
  }

  const handleMemory = (action) => {
    const value = Number.parseFloat(display)

    switch (action) {
      case "MC":
        setMemory(0)
        break
      case "MR":
        setDisplay(String(memory))
        setWaitingForOperand(true)
        break
      case "M+":
        setMemory(memory + value)
        setWaitingForOperand(true)
        break
      case "M-":
        setMemory(memory - value)
        setWaitingForOperand(true)
        break
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.calculator}>
        <Display value={display} isRadians={isRadians} isInverse={isInverse} />
        <Keypad
          onInputDigit={inputDigit}
          onInputDot={inputDot}
          onClearAll={clearAll}
          onClearEntry={clearEntry}
          onToggleSign={toggleSign}
          onInputPercent={inputPercent}
          onPerformOperation={performOperation}
          onCalculateResult={calculateResult}
          onScientificOperation={handleScientificOperation}
          onToggleMode={toggleMode}
          onMemoryAction={handleMemory}
          isInverse={isInverse}
          isRadians={isRadians}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  calculator: {
    flex: 1,
  },
})
