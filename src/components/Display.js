import { StyleSheet, View, Text } from "react-native"

const Display = ({ value, isRadians, isInverse }) => {
  return (
    <View style={styles.display}>
      <View style={styles.indicators}>
        <Text style={styles.indicator}>{isRadians ? "RAD" : "DEG"}</Text>
        {isInverse && <Text style={styles.indicator}>INV</Text>}
      </View>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  display: {
    padding: 24,
    backgroundColor: "#202020",
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  indicator: {
    color: "#999",
    fontSize: 14,
    marginLeft: 10,
  },
  value: {
    color: "white",
    fontSize: 48,
    textAlign: "right",
    fontWeight: "300",
  },
})

export default Display