import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseAsync("tasks.db");

export const initDb = async () => {
  (await db).execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, text TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS completedTasks (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, text TEXT NOT NULL);
  `);
};
