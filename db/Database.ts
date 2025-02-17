import * as SQLite from 'expo-sqlite';

export class Database {
  private readonly db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync('workout_tracker.db')
  }

  async init(): Promise<void> {
    try {
      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS workouts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT NOT NULL,
          type TEXT NOT NULL,
          body_weight REAL
        );
      `);

      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS movements (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          set_type TEXT NOT NULL
        );
      `);

      await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS sets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          workout_id INTEGER NOT NULL,
          movement_id INTEGER NOT NULL,
          set_type TEXT NOT NULL,
          details TEXT NOT NULL,
          FOREIGN KEY (workout_id) REFERENCES workouts (id),
          FOREIGN KEY (movement_id) REFERENCES movements (id)
        );
      `);
    } catch (error) {
      throw new Error(`Database initialization failed: ${error}`);
    }
  }

  getDatabase(): SQLite.SQLiteDatabase {
    return this.db;
  }

  async prepareAndExecute<T>(
    sql: string,
    params: Record<string, any>
  ): Promise<{ lastInsertRowId: number; changes: number; rows?: T[] }> {
    let statement: SQLite.SQLiteStatement | null = null;
    try {
      statement = await this.db.prepareAsync(sql);
      const result = await statement.executeAsync(params);
      // result.resetAsync()
      console.log((await result.getAllAsync()).forEach((row) => console.log(row)))
      return result;
    } finally {
      if (statement) {
        await statement.finalizeAsync();
      }
    }
  }
}