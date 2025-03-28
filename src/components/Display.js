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
    padding: 1,
    backgroundColor: "#202020",
    minHeight: 10,
  },
  indicators: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 1,
  },
  indicator: {
    color: "#999",
    fontSize: 14,
    marginLeft: 1,
  },
  value: {
    color: "white",
    fontSize: 64,
    textAlign: "right",
    fontWeight: "100",
  },
})

export default Display