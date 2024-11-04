import { db } from "@/constants/Database";

export const useTaskData = () => {
  const save = async (name: string, text: string) =>
    await (
      await db
    ).runAsync("INSERT INTO tasks (name, text) VALUES (?, ?)", name, text);

  const get = async () => {
    const tasks = await (await db).getAllAsync("SELECT * FROM tasks");
    return tasks;
  };

  const edit = async (name: string, text: string, id: number) => {
    return (await db).runAsync(
      "UPDATE tasks SET name = ?, text = ? WHERE id = ?",
      name,
      text,
      id
    );
  };

  const remove = async (id: number) => {
    try {
      (await db).runAsync("DELETE FROM tasks WHERE id = ?", id);
    } catch (error) {
      console.error("Error removing task from tasks:", error);
    }
  };

  const removeAll = async () => {
    try {
      (await db).runAsync("DELETE FROM tasks");
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };

  return { get, save, edit, remove, removeAll };
};

export const useCompletedTaskData = () => {
  const save = async (name: string, text: string) =>
    await (
      await db
    ).runAsync(
      "INSERT INTO completedTasks (name, text) VALUES (?, ?)",
      name,
      text
    );

  const get = async () => {
    const tasks = await (await db).getAllAsync("SELECT * FROM tasks");
    return tasks;
  };

  const edit = async (id: number) => {
    const foundTask = (await db).getFirstAsync(
      "SELECT * FROM tasks WHERE id = ?",
      id
    );
    return foundTask;
  };

  return { get, completeTask: save, edit };
};
