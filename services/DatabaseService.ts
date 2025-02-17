import { Database } from "@/db/Database";

export class DatabaseService {
    private static instance: DatabaseService;
    private db: Database;
    private isInitialized: boolean = false;
  
    private constructor() {
      this.db = new Database();
    }
  
    static getInstance(): DatabaseService {
      if (!DatabaseService.instance) {
        DatabaseService.instance = new DatabaseService();
      }
      return DatabaseService.instance;
    }
  
    async initialize(): Promise<void> {
      if (this.isInitialized) return;
      
      try {
        await this.db.init();
        this.isInitialized = true;
      } catch (error) {
        throw new Error(`Failed to initialize database: ${error}`);
      }
    }
  
    getDatabase(): Database {
      if (!this.isInitialized) {
        throw new Error('Database not initialized. Call initialize() first.');
      }
      return this.db;
    }
  }