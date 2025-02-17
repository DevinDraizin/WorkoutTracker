import { Database } from "@/db/Database";
import { CardioSetDetails, StandardSetDetails, WTSet } from "@/Types/DBTypes";

export class SetRepository {
  constructor(private db: Database) {}

  async createSet(set: Omit<WTSet, 'id'>): Promise<number> {
    try {
      const result = await this.db.prepareAndExecute(
        'INSERT INTO sets (workout_id, movement_id, set_type, details) VALUES ($workoutId, $movementId, $setType, $details);',
        {
          $workoutId: set.workoutId,
          $movementId: set.movementId,
          $setType: set.setType,
          $details: JSON.stringify(set.details)
        }
      );
      return result.lastInsertRowId;
    } catch (error) {
      throw new Error(`Failed to create set: ${error}`);
    }
  }

  async getSetsForWorkout(workoutId: number): Promise<WTSet[]> {
    try {
      const result = await this.db.prepareAndExecute<{
        id: number;
        workout_id: number;
        movement_id: number;
        set_type: string;
        details: string;
      }>(
        'SELECT * FROM sets WHERE workout_id = $workoutId ORDER BY id ASC;',
        { $workoutId: workoutId }
      );

      return (result.rows || []).map(row => ({
        id: row.id,
        workoutId: row.workout_id,
        movementId: row.movement_id,
        setType: row.set_type,
        details: JSON.parse(row.details) as CardioSetDetails | StandardSetDetails
      }));
    } catch (error) {
      throw new Error(`Failed to get sets for workout: ${error}`);
    }
  }

  async deleteSet(id: number): Promise<void> {
    try {
      await this.db.prepareAndExecute(
        'DELETE FROM sets WHERE id = $id;',
        { $id: id }
      );
    } catch (error) {
      throw new Error(`Failed to delete set: ${error}`);
    }
  }
}