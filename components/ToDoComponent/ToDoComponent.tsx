import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

import ArrowUp from "../../assets/images/ArrowUp.svg";
import ArrowDown from "../../assets/images/ArrowDown.svg";
import EditIcon from "../../assets/images/EditIcon.svg";
import DeleteIcon from "../../assets/images/DeleteIcon.svg";
import Marked from "../../assets/images/DoneIcon.svg";
import { TextBase } from "../TextBase/TextBase";

interface ToDoComponentProps {
  name: string;
  text: string;
  completeTask: (name: string, text: string, id: number) => void;
  id: number;
  deleteTask: (id: number) => void;
  handleEdit: (name: string, text: string, id: number) => void;
  isCompleted: boolean;
}

export const ToDoComponent = (props: ToDoComponentProps) => {
  const {
    name,
    text,
    id,
    completeTask,
    deleteTask,
    handleEdit,
    isCompleted = false,
  } = props;

  const [pressed, setPressed] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.headWrapper}>
        <TextBase style={styles.headText}>{name}</TextBase>
        <Pressable onPress={() => setPressed(!pressed)}>
          {pressed ? <ArrowUp /> : <ArrowDown />}
        </Pressable>
      </View>

      {!pressed && (
        <View style={styles.textWrapper}>
          <TextBase style={styles.text}>{text}</TextBase>
        </View>
      )}

      <View style={styles.footerWrapper}>
        <View style={styles.rowContainer}>
          {!isCompleted && (
            <Pressable onPress={() => handleEdit(name, text, id)}>
              <EditIcon />
            </Pressable>
          )}
          <Pressable onPress={() => deleteTask(id)}>
            <DeleteIcon />
          </Pressable>
        </View>
        <Pressable
          onPress={() => completeTask(name, text, id)}
          style={styles.rowContainer}
        >
          <TextBase style={styles.markText}>
            {isCompleted ? "Completed" : "Mark completed"}
          </TextBase>
          <Marked />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.taskBackColor,
    width: "100%",
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  headText: {
    color: colors.textColor,
    fontSize: 14,
    fontWeight: "500",
  },

  headWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  textWrapper: {
    backgroundColor: colors.backgroundBlue,
    padding: 12,
  },

  text: {
    color: colors.taskTextColor,
    fontSize: 10,
    fontWeight: "600",
  },

  footerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 17,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  markText: {
    color: colors.taskTextColor,
    fontSize: 10,
    fontWeight: "500",
  },
});
