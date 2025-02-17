import { MovementRepository } from "@/repositories/MovementRepository";
import { SetRepository } from "@/repositories/WTSetRepository";
import { WorkoutRepository } from "@/repositories/WorkoutRepository";
import { Workout, WTSet } from "@/Types/DBTypes";

export class WorkoutService {
    constructor(
      private workoutRepository: WorkoutRepository,
      private setRepository: SetRepository,
      private movementRepository: MovementRepository
    ) {}
  
    async createWorkoutWithSets(
      workout: Omit<Workout, 'id'>,
      sets: Array<Omit<WTSet, 'id' | 'workoutId'>>
    ): Promise<Workout> {
      const workoutId = await this.workoutRepository.createWorkout(workout);
      
      // Create all sets for the workout
      await Promise.all(
        sets.map(set =>
          this.setRepository.createSet({
            ...set,
            workoutId
          })
        )
      );
  
      return this.getWorkoutWithSets(workoutId);
    }
  
    async getWorkoutWithSets(workoutId: number): Promise<Workout & { sets: WTSet[] }> {
      const [workout, sets] = await Promise.all([
        this.workoutRepository.getWorkout(workoutId),
        this.setRepository.getSetsForWorkout(workoutId)
      ]);
  
      if (!workout) {
        throw new Error(`Workout with id ${workoutId} not found`);
      }
  
      return {
        ...workout,
        sets
      };
    }
  }