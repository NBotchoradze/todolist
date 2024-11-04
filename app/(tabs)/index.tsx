import { TopBar } from "@/components/TopBar/TopBar";
import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import { colors } from "../../constants/Colors";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextBase } from "@/components/TextBase/TextBase";
import { CreateModal } from "@/components/CreateModal/CreateModal";
import { EditModal } from "@/components/EditModal/EditModal";
import { ToDoComponent } from "@/components/ToDoComponent/ToDoComponent";
import AddComponentIcon from "@/assets/images/AddComponentIcon.svg";
import Calendar from "@/assets/images/calendar.svg";
import Time from "@/assets/images/time.svg";
import { useTaskData, useCompletedTaskData } from "@/hooks/useData";

export default function HomeScreen() {
  const [editModalVisible, setEditModalVisible] = useState(false);
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
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPage, setSelectedPage] = useState("tasks");
  const { get, save, edit, remove, removeAll } = useTaskData();
  const {
    completeTask,
    get: getCompletedTasks,
    remove: removeCompleted,
    removeAll: removeAllCompleted,
  } = useCompletedTaskData();

  useEffect(() => {
    getTasks();
    getAllCompletedTasks();
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
  };

  const clearTasks = () => {
    if (selectedPage === "tasks") {
      removeAll();
      getTasks();
    } else {
      removeAllCompleted();
      getAllCompletedTasks();
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setNewTask(() => ({
      name: "",
      text: "",
    }));
  };

  const onChangeText = (name?: string, text?: string) => {
    setNewTask({ name: name || "", text: text || "" });
  };

  const filteredTasks = tasks?.filter(
    (task: ITask) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedTasks = completedTasks?.filter(
    (task: ITask) =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getTasks = async (): Promise<void> => {
    try {
      await get().then((fetchedTasks: ITask[]) => setTasks(fetchedTasks));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const getAllCompletedTasks = async (): Promise<void> => {
    await getCompletedTasks().then((fetchedTasks: ITask[]) =>
      setCompletedTasks(fetchedTasks)
    );
  };
  const handleTaskCompletion = async (
    name: string,
    text: string,
    id: number
  ) => {
    await completeTask(name, text);
    remove(id);
    getTasks();
    getAllCompletedTasks();
  };

  const removeTaskFromTasks = (id: number) => {
    remove(id);
    getTasks();
  };
  const removeTaskFromCompleted = (id: number) => {
    removeCompleted(id);
    getAllCompletedTasks();
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
          <Pressable
            style={styles.btnContainer}
            onPress={() => setSelectedPage("tasks")}
          >
            <TextBase style={styles.btnText}>Tasks</TextBase>
            <View
              style={[
                styles.box,
                selectedPage === "tasks" && styles.focusedBox,
              ]}
            >
              <Calendar />
            </View>
          </Pressable>

          <Pressable
            style={styles.btnContainer}
            onPress={() => setSelectedPage("history")}
          >
            <TextBase style={styles.btnText}>History</TextBase>
            <View
              style={[
                styles.box,
                selectedPage === "history" && styles.focusedBox,
              ]}
            >
              <Time />
            </View>
          </Pressable>
        </View>
        <Pressable onPress={clearTasks}>
          <TextBase style={styles.clearTasksText}>Clear all Tasks</TextBase>
        </Pressable>
      </View>
      {(selectedPage === "tasks" && (
        <FlatList
          data={filteredTasks}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ToDoComponent
              name={item.name}
              text={item.text}
              completeTask={handleTaskCompletion}
              id={item.id}
              deleteTask={removeTaskFromTasks}
              handleEdit={handleEdit}
              isCompleted={false}
            />
          )}
          ListFooterComponent={() => <View style={styles.footerView} />}
        />
      )) || (
        <FlatList
          data={filteredCompletedTasks}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ToDoComponent
              name={item.name}
              text={item.text}
              completeTask={() => {}}
              id={item.id}
              deleteTask={removeTaskFromCompleted}
              isCompleted={true}
              handleEdit={() => {}}
            />
          )}
          ListFooterComponent={() => <View style={styles.footerView} />}
        />
      )}
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
  box: {
    backgroundColor: "#D8D8D8",
    padding: 10,
    borderRadius: 10,
  },
  focusedBox: {
    backgroundColor: "#6A6CE0",
  },
});
