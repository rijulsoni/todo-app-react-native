import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
} from "react-native";
import { useState, useEffect } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@goals");
      if (jsonValue !== null) {
        setGoals(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Error retrieving data from AsyncStorage:", e);
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@goals", jsonValue);
    } catch (e) {
      console.error("Error storing data to AsyncStorage:", e);
    }
  };

  function addGoalHandler(enteredGoal) {
    setGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), text: enteredGoal },
    ]);
    endAddGoalHandler();
  }
  function startAddGoalHandler() {
    setModalVisible(true);
  }

  function endAddGoalHandler() {
    setModalVisible(false);
  }

  function deleteGoalHandler(goalId) {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== goalId)
    );
    storeData(goals);
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.appContainer}>
        <View style={{ marginVertical: 10 }}>
          <Button
            title="Add New Goal"
            modalVisible={modalVisible}
            color="#314534"
            onPress={startAddGoalHandler}
          />
        </View>
        {modalVisible && (
          <GoalInput
            endAddGoalHandler={endAddGoalHandler}
            addGoalHandler={addGoalHandler}
          />
        )}
        <Text style={styles.headerText}>List of Goals</Text>
        <FlatList
          style={styles.goalsContainer}
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <GoalItem goal={itemData.item} onDelete={deleteGoalHandler} />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 40,
    backgroundColor: "#f8f9fa",
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  goalsContainer: {
    marginTop: 10,
  },
});
