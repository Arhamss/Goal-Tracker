import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Platform,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const colorsList = [
    "#08D9D6",
    "#252A34",
    "#FF2E63",
    "#40514E",
    "#A27B5C",
    "#F08A5D",
    "#FEA82F",
  ];

  const [courseGoals, setCourseGoals] = useState([]);
  const [isModalVisible, setModalVisibility] = useState(false);
  const [goalsCompleted, setGoalsCompleted] = useState(0);

  function modalVisibilityHandler() {
    setModalVisibility(true);
  }
  function modalExitHandler() {
    setModalVisibility(false);
  }

  function addGoalHandler(enteredGoalText) {
    const newGoal = {
      text: enteredGoalText,
      key: Math.random().toString(),
      color: colorsList[Math.floor(Math.random() * colorsList.length)], // Assign a random color
    };
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, newGoal]);
    setModalVisibility(false);
  }

  function deleteGoalHandler(id) {
    setGoalsCompleted((goalsCompleted) => goalsCompleted + 1);
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goals) => goals.key !== id);
    });
  }

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.appContainer}>
        <Pressable
          onPress={modalVisibilityHandler}
          android_ripple={{}}
          style={(pressData) =>
            Platform.OS == "ios" && pressData.pressed && styles.pressedItem
          }
        >
          <View style={styles.addGoalView}>
            <Text style={styles.textAddGoal}>Tap To Add Goal</Text>
          </View>
        </Pressable>

        <GoalInput
          modalVisible={isModalVisible}
          onAddGoal={addGoalHandler}
          modalExit={modalExitHandler}
        />

        <View style={styles.divider}></View>
        <View style={styles.textView}>
          <Text style={styles.normText}>Current Goals</Text>
          <Text style={styles.goalsCompletedText}>
            Goals Completed: {goalsCompleted}{" "}
          </Text>
          <Text style={styles.smalltext}>
            {" "}
            Goals Left: {courseGoals.length}
          </Text>
        </View>
        <View style={styles.taskList}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  color={itemData.item.color}
                  id={itemData.item.key}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  textView: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  smalltext: {
    color: "#9BA4B5",
  },
  goalsCompletedText: {
    color: "green",
  },
  normText: {
    fontSize: 24,
    marginBottom: 5,
    color: "#495464",
    fontWeight: "700",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#cccccc",
    width: "100%",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  appContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  addGoalView: {
    borderRadius: 10,
    backgroundColor: "#A6B1E1",
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 5,
  },
  pressedItem: {
    opacity: 0.5,
  },
  textAddGoal: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    color: "white",
  },
  taskList: {
    flex: 7,
  },
});
