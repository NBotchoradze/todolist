import { db } from "@/constants/Database";

export const useTaskData = () => {
  const save = async (name: string, text: string) =>
    await (
      await db
    ).runAsync("INSERT INTO tasks (name, text) VALUES (?, ?)", name, text);

  const get = async (): Promise<ITask[]> => {
    const tasks = await (await db).getAllAsync("SELECT * FROM tasks");
    return tasks as ITask[];
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

  const get = async (): Promise<ITask[]> => {
    const tasks = await (await db).getAllAsync("SELECT * FROM completedTasks");
    return tasks as ITask[];
  };

  const remove = async (id: number) => {
    try {
      (await db).runAsync("DELETE FROM completedTasks WHERE id = ?", id);
    } catch (error) {
      console.error("Error removing task from completedTasks:", error);
    }
  };

  const removeAll = async () => {
    try {
      (await db).runAsync("DELETE FROM completedTasks");
    } catch (error) {
      console.error("Error clearing tasks:", error);
    }
  };

  return { get, completeTask: save, remove, removeAll };
};
