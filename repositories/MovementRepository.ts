import { DatabaseService } from "@/services/DatabaseService"
import { Movement } from "@/Types/DBTypes"

export class MovementRepository {
    db = DatabaseService.getInstance().getDatabase()
  
    async createMovement(movement: Omit<Movement, 'id'>): Promise<Movement[] | null> {
      try {
        const result = await this.db.prepareAndExecute<Movement>(
          'INSERT INTO movements (name, workout_type, set_type) VALUES ($name, $workout_type, $setType);',
          {
            $name: movement.name,
            $workout_type: movement.workoutType,
            $setType: movement.setType
          }
        )

        return result;
      } catch (error) {
        throw new Error(`Failed to create movement: ${error}`);
      }
    }

    async deleteMovement(id: number): Promise<Movement[] | null> {
      try {
        const result = await this.db.prepareAndExecute<Movement>(
          'DELETE FROM movements WHERE id = $id;',
          {
            $id: id,
          }
        )

        return result;
      } catch (error) {
        throw new Error(`Failed to create movement: ${error}`);
      }
    }
  
    async getMovement(id: number): Promise<Movement[] | null> {
      try {
        const result = await this.db.prepareAndExecute<Movement>(
          'SELECT * FROM movements WHERE id = $id;',
          { $id: id }
        )
  
        if (!result.length) {
          console.log('No rows found for movement with ID:', id)
          return null
        }
  
        return result
      } catch (error) {
        throw new Error(`Failed to get movement: ${error}`)
      }
    }

    async getAllMovements(): Promise<Movement[] | null> {
      try {
        const result = await this.db.prepareAndExecute<Movement>(
          'SELECT * FROM movements ORDER BY name ASC;',
          {}
        )

        if (!result.length) {
          console.log('No rows found:')
          return null
        }

        return result
      } catch (error) {
        throw new Error(`Failed to get movements: ${error}`)
      }
    }

    async getMovementsByType(workoutType: string): Promise<Movement[] | null> {
      try {
        const result = await this.db.prepareAndExecute<Movement>(
          'SELECT * FROM movements WHERE workout_type = $workout_type;',
          {$workout_type: workoutType}
        )

        if (!result.length) {
          console.log('No rows found:')
          return null
        }

        return result
      } catch (error) {
        throw new Error(`Failed to get movements: ${error}`)
      }
    }

  
    async updateMovement(id: number, movement: Partial<Omit<Movement, 'id'>>): Promise<void> {
      try {
        const updates: string[] = []
        const params: Record<string, any> = { $id: id }
  
        if (movement.name !== undefined) {
          updates.push('name = $name')
          params.$name = movement.name
        }
  
        if (movement.setType !== undefined) {
          updates.push('set_type = $setType')
          params.$setType = movement.setType
        }
  
        if (updates.length === 0) {
          return
        }
  
        await this.db.prepareAndExecute(
          `UPDATE movements SET ${updates.join(', ')} WHERE id = $id;`,
          params
        )
      } catch (error) {
        throw new Error(`Failed to update movement: ${error}`)
      }
    }
  }