import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Modal,
  Pressable,
  Text,
  Platform,
  Image,
} from "react-native";

function GoalInput(props) {
  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (!enteredGoalText.trim()) {
      return;
    }
    props.onAddGoal(enteredGoalText);
    setEnteredGoalText("");
    setIsFocused(false);
  }

  function exitModalHandler() {
    props.modalExit();
    setIsFocused(false);
    setEnteredGoalText("");
    return;
  }

  return (
    <Modal
      visible={props.modalVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/goal.png")}
        />
        <View style={isFocused ? styles.textInputFocused : styles.textInput}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Write Goal Here..."
            onChangeText={goalInputHandler}
            placeholderTextColor={"white"}
            value={enteredGoalText}
            selectionColor="white"
            onFocus={() => setIsFocused(true)} // Set focus state to true
            onBlur={() => setIsFocused(false)} // Set focus state to false
          />
        </View>
        <View style={styles.buttonView}>
          <View style={styles.buttonStyle}>
            <Pressable
              onPress={exitModalHandler}
              android_ripple={{}}
              style={(pressData) =>
                Platform.OS == "ios" && pressData.pressed && styles.pressedItem
              }
            >
              <View style={styles.exitModal}>
                <Text style={styles.textAddGoal}>Exit</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.buttonStyle}>
            <Pressable
              onPress={addGoalHandler}
              android_ripple={{}}
              style={(pressData) =>
                Platform.OS == "ios" && pressData.pressed && styles.pressedItem
              }
            >
              <View style={styles.addGoalView}>
                <Text style={styles.textAddGoal}>Add Goal</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    margin: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 180,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.46)",
  },

  exitModal: {
    borderRadius: 10,
    backgroundColor: "#FF004D",
    padding: 5,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },

  addGoalView: {
    borderRadius: 10,
    backgroundColor: "#9ADE7B",
    padding: 5,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  pressedItem: {
    opacity: 0.5,
  },
  textAddGoal: {
    fontSize: 22,
    fontWeight: "400",
    color: "white",
  },

  buttonView: {
    flexDirection: "row",
    width: "80%",
  },
  buttonStyle: {
    width: "50%",
    marginHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    fontSize: 22,
    padding: 10,
    borderRadius: 8,
    borderColor: "darkgrey",
    borderWidth: "1px",
    opacity: 0.5,
    width: "80%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  textInputFocused: {
    fontSize: 22,
    padding: 10,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: "1px",
    width: "80%",
    marginBottom: 20,
    // Styles for focused state
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  textInputStyle: {
    fontSize: 18,
    color: "white",
  },
});
export default GoalInput;
