import { Database } from "@/db/Database";
import { Workout } from "@/Types/DBTypes";

export class WorkoutRepository {
    constructor(private readonly db: Database) {}
  
    async createWorkout(workout: Omit<Workout, 'id'>): Promise<number> {
      try {
        const result = await this.db.prepareAndExecute(
          'INSERT INTO workouts (date, type, body_weight) VALUES ($date, $type, $bodyWeight);',
          {
            $date: workout.date,
            $type: workout.type,
            $bodyWeight: workout.bodyWeight
          }
        );
        return result.lastInsertRowId;
      } catch (error) {
        throw new Error(`Failed to create workout: ${error}`);
      }
    }
  
    async getWorkout(id: number): Promise<Workout | null> {
      try {
        const result = await this.db.prepareAndExecute<Workout>(
          'SELECT id, date, type, body_weight as bodyWeight FROM workouts WHERE id = $id;',
          { $id: id }
        );
        
        if (!result.rows || result.rows.length === 0) {
          return null;
        }
  
        return result.rows[0];
      } catch (error) {
        throw new Error(`Failed to get workout: ${error}`);
      }
    }
  
    async getAllWorkouts(): Promise<Workout[]> {
      try {
        const result = await this.db.prepareAndExecute<Workout>(
          'SELECT id, date, type, body_weight as bodyWeight FROM workouts ORDER BY date DESC;',
          {}
        );
        
        return result.rows || [];
      } catch (error) {
        throw new Error(`Failed to get workouts: ${error}`);
      }
    }
  }