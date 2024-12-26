import { Text, View, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function GoalItem({ goal, onDelete }) {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#d4d4d4" }}
        onPress={() => onDelete(goal.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{goal.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: "#e4e4e4",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    padding: 10,
  },
});
