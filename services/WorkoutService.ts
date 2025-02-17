import { Database } from "@/db/Database";
import { MovementRepository } from "@/repositories/MovementRepository";
import { WorkoutRepository } from "@/repositories/WorkoutRepository";
import { SetRepository } from "@/repositories/WTSetRepository";
import { Workout, WTSet } from "@/Types/DBTypes";

export class WorkoutService {
    private readonly workoutRepository: WorkoutRepository;
    private readonly setRepository: SetRepository;
    private readonly movementRepository: MovementRepository;
  
    constructor(db: Database) {
      this.workoutRepository = new WorkoutRepository(db);
      this.setRepository = new SetRepository(db);
      this.movementRepository = new MovementRepository(db);
    }
  
    async createWorkoutWithSets(
      workout: Omit<Workout, 'id'>,
      sets: Array<Omit<WTSet, 'id' | 'workoutId'>>
    ): Promise<number> {
      try {
        const workoutId = await this.workoutRepository.createWorkout(workout);
        
        await Promise.all(
          sets.map(set => 
            this.setRepository.createSet({
              ...set,
              workoutId
            })
          )
        );
  
        return workoutId;
      } catch (error) {
        throw new Error(`Failed to create workout with sets: ${error}`);
      }
    }
  
    // Other service methods...
  }