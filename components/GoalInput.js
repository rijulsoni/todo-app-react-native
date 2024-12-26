import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";

export default function GoalInput(props) {
  const [enteredGoal, setEnteredGoal] = useState("");

  function goalInputHandler(input) {
    setEnteredGoal(input);
  }

  function addGoalHandler() {
    if (enteredGoal.trim().length === 0) {
      Alert.alert("Invalid Input", "Goal cannot be empty!", [{ text: "Okay" }]);
      return;
    }
    props.addGoalHandler(enteredGoal);
    setEnteredGoal("");
  }

  return (
    <Modal visible={props.modalVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/goal.png")}
          style={{ width: 200, height: 200, tintColor:'#F5F5DC' }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your goals"
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonAlign}>
          <Button color="#62897c" title="Add Goal" onPress={addGoalHandler} />
          <Button
            color="#896962"
            title="Cancel"
            onPress={props.endAddGoalHandler}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 10,
    backgroundColor: "#abdbe3",
  },
  buttonAlign: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    width: "60%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "blue",
    width: "80%",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
});
