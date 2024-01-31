import { StyleSheet, View, Text, Pressable, Platform } from "react-native";
function GoalItem(props) {
  return (
    <View
      style={{
        ...styles.goalStyle,
        backgroundColor: props.color,
      }}
    >
      <Pressable
        onPress={props.onDeleteItem.bind(this, props.id)}
        android_ripple={{}}
        style={(pressData) =>
          Platform.OS == "ios" && pressData.pressed && styles.pressedItem
        }
      >
        <Text style={styles.goalTextStyle}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalStyle: {
    margin: 6,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalTextStyle: {
    padding: 12,
    color: "#EAEAEA",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default GoalItem;
