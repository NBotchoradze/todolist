import React from "react";
import { View, Pressable, TextInput, StyleSheet } from "react-native";
import ReactNativeModal from "react-native-modal";

//import { AppButton, AppText } from "../";

import CloseIcon from "../../assets/images/CloseIcon.svg";
import { TextBase } from "../TextBase/TextBase";
import { Button } from "../Button/Button";
import { colors } from "@/constants/Colors";

interface CreateModalProps {
  isVisible?: boolean;
  hide?: () => void;
  close?: () => void;
  onSave: () => void;
  taskName?: string;
  taskText?: string;
  changeTask: (name: string, text: string) => void;
}

export const CreateModal = (props: CreateModalProps) => {
  const { isVisible, hide, close, onSave, taskName, taskText, changeTask } =
    props;

  return (
    <View style={styles.container}>
      <ReactNativeModal isVisible={isVisible} onBackdropPress={hide}>
        <View style={styles.innerContainer}>
          <View style={styles.headerWrapper}>
            <View />
            <TextBase style={styles.headText}>Create task</TextBase>
            <Pressable onPress={close}>
              <CloseIcon />
            </Pressable>
          </View>
          <View style={styles.nameInputContainer}>
            <TextInput
              placeholder="Task name"
              style={styles.taskNameInput}
              onChangeText={(value) => changeTask(value, taskText!)}
              value={taskName}
            />
          </View>

          <View style={styles.detailTextWrapper}>
            <TextInput
              placeholder="Type task details here..."
              style={styles.taskDetailInput}
              textAlign="left"
              placeholderTextColor="#6C86A8"
              multiline={true}
              value={taskText}
              onChangeText={(value) => changeTask(taskName!, value)}
            />
          </View>

          <Button style={styles.btn} text="Save" onPress={onSave} />
        </View>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  innerContainer: {
    backgroundColor: colors.taskBackColor,
    position: "absolute",
    top: "40%",
    width: 340,
    height: 250,
    padding: 12,
    alignSelf: "center",
    borderRadius: 12,
  },

  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headText: {
    color: colors.textColor,
    fontSize: 12,
    fontWeight: "700",
    alignSelf: "center",
  },

  nameInputContainer: {
    backgroundColor: colors.searchBarWhite,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lineColor,
  },

  taskNameInput: {
    padding: 8,
  },

  detailTextWrapper: {
    backgroundColor: colors.backgroundBlue,
    flexWrap: "wrap",
    height: 100,
    marginVertical: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },

  taskDetailInput: {
    paddingBottom: 40,
    maxWidth: 280,
  },

  btn: {
    flex: 1,
    width: "100%",
  },
  });
