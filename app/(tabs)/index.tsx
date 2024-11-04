import { TopBar } from "@/components/TopBar/TopBar";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { colors } from "../../constants/Colors";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextBase } from "@/components/TextBase/TextBase";
import { CreateModal } from "@/components/CreateModal/CreateModal";
import { EditModal } from "@/components/EditModal/EditModal";
import { ToDoComponent } from "@/components/ToDoComponent/ToDoComponent";
import TasksIcon from "@/assets/images/TasksIcon.svg";
import AddComponentIcon from "@/assets/images/AddComponentIcon.svg";
import HistoryIconGrey from "@/assets/images/HistoryIconGrey.svg";
import { db } from "@/constants/Database";
import { useTaskData, useCompletedTaskData } from "@/hooks/useData";

export default function HomeScreen() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState<null | number>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState<{ name: string; text: string }>({
    name: "",
    text: "",
  });
  const [focusedTask, setFocusedTask] = useState({
    name: "",
    text: "",
    id: 0,
  });
  const [tasks, setTasks] = useState<ToDoComponent[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { get, save, edit, remove, removeAll } = useTaskData();
  const { completeTask } = useCompletedTaskData();

  useEffect(() => {
    getTasks();
  }, []);

  const handleModalPress = () => {
    setModalVisible(true);
  };

  const handleEdit = (name: string, text: string, id: number) => {
    setEditModalVisible(true);
    setFocusedTask({
      name,
      text,
      id,
    });
  };

  const changeEditableTask = (name: string, text: string) => {
    setFocusedTask((value) => ({ id: value.id, text: text, name: name }));
  };

  const handleEditModalClose = () => {
    setEditModalVisible(false);
    setNewTask(() => ({
      name: "",
      text: "",
    }));
    // setIsEditing(null);
  };

  const clearTasks = () => {
    removeAll();
    getTasks();
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setNewTask(() => ({
      name: "",
      text: "",
    }));
    // setIsEditing(null);
  };

  const onChangeText = (name?: string, text?: string) => {
    setNewTask({ name: name || "", text: text || "" });
  };

  const filteredTasks = tasks?.filter(
    (task) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getTasks = async () => {
    try {
      await get().then((tasks) => setTasks(tasks));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleTaskCompletion = async (
    name: string,
    text: string,
    id: number
  ) => {
    await completeTask(name, text);
    remove(id);
    getTasks();
  };

  const removeTaskFromTasks = (id: number) => {
    remove(id);
    getTasks();
  };

  const saveTask = async () => {
    try {
      save(newTask.name, newTask.text);
      await getTasks();
      handleModalClose();
    } catch (error) {
      console.error("Error saving modal data:", error);
    }
  };

  const handleModalEdit = (name: string, text: string, id: number) => {
    setFocusedTask({ id: id, name: "", text: "" });
  };

  const saveEditied = () => {
    edit(focusedTask.name, focusedTask.text, focusedTask.id);
    getTasks();
    setEditModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar setSearchQuery={setSearchQuery} />
      <View style={styles.btnWrapper}>
        <View style={styles.btnRow}>
          <View style={styles.btnContainer}>
            <TextBase style={styles.btnText}>Tasks</TextBase>
            <TasksIcon />
          </View>
          <View style={styles.btnContainer}>
            <TextBase style={styles.btnText}>History</TextBase>
            <HistoryIconGrey />
            {/* <Pressable onPress={() => navigation.navigate("HISTORY")}>
              <HistoryEmptyGrey />
            </Pressable> */}
          </View>
        </View>
        <Pressable onPress={clearTasks}>
          <TextBase style={styles.clearTasksText}>Clear all Tasks</TextBase>
        </Pressable>
      </View>

      <FlatList
        data={filteredTasks}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ToDoComponent
            name={item.name}
            onEdit={handleModalEdit}
            text={item.text}
            completeTask={handleTaskCompletion}
            id={item.id}
            tasks={tasks}
            deleteTask={removeTaskFromTasks}
            handleEdit={handleEdit}
          />
        )}
        ListFooterComponent={() => <View style={styles.footerView} />}
      />
      <View style={styles.addIconWrapper}>
        <Pressable onPress={handleModalPress}>
          <AddComponentIcon />
        </Pressable>
      </View>
      <CreateModal
        isVisible={modalVisible}
        taskName={newTask?.name}
        taskText={newTask?.text}
        hide={() => setModalVisible(false)}
        close={handleModalClose}
        changeTask={onChangeText}
        onSave={saveTask}
      />
      <EditModal
        isVisible={editModalVisible}
        hide={() => setEditModalVisible(false)}
        close={handleEditModalClose}
        taskName={focusedTask?.name}
        taskText={focusedTask?.text}
        changeTask={changeEditableTask}
        onSave={saveEditied}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#E8F1FD",
  },

  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 45,
    marginBottom: 12,
  },

  btnRow: {
    flexDirection: "row",
    gap: 15,
  },

  btnContainer: {
    alignItems: "center",
    gap: 5,
  },

  btnText: {
    color: colors.textColor,
    fontSize: 10,
    fontWeight: "500",
  },

  clearTasksText: {
    color: colors.textColor,
    fontSize: 12,
    fontWeight: "500",
    textDecorationLine: "underline",
  },

  line: {
    backgroundColor: colors.lineColor,
    width: "100%",
    height: 0.5,
    marginTop: 20,
  },

  footerView: {
    height: 30,
  },

  addIconWrapper: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    zIndex: 99,
  },
});
