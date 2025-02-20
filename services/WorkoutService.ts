import { ModalManager, ModalType } from "@/components/Modal/ModalManager";
import { MovementRepository } from "@/repositories/MovementRepository";
import { WorkoutRepository } from "@/repositories/WorkoutRepository";
import { WTSetRepository } from "@/repositories/WTSetRepository";
import { Movement, Workout, WTSet } from "@/Types/DBTypes";

export class WorkoutService {
    private static instance: WorkoutService;
    private readonly workoutRepository: WorkoutRepository;
    private readonly WTSetRepository: WTSetRepository;
    private readonly movementRepository: MovementRepository;
  
    private constructor() {
      this.workoutRepository = new WorkoutRepository();
      this.WTSetRepository = new WTSetRepository();
      this.movementRepository = new MovementRepository();
    }

    static getInstance(): WorkoutService {
      if (!WorkoutService.instance) {
        WorkoutService.instance = new WorkoutService();
      }
      return WorkoutService.instance;
    }
  
    async createWorkoutWithSets(workout: Omit<Workout, 'id'>, sets: Array<Omit<WTSet, 'id' | 'workoutId'>>): Promise<number> {
      try {
        const workoutId = await this.workoutRepository.createWorkout(workout);
        
        await Promise.all(
          sets.map(set => 
            this.WTSetRepository.createSet({
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
  
    async createMovement(movement: Omit<Movement, 'id'>): Promise<void> {
      try {
        await this.movementRepository.createMovement(movement);
        ModalManager.show({title:'Success', message:'Successfully created movement', type:ModalType.SUCCESS});
      } catch (error) {
        ModalManager.show({title:'Error', message:'Failed to create movement', type:ModalType.ERROR});
        throw new Error(`Failed to create movement: ${error}`)
      }
    }

    async getMovement(id: number): Promise<Movement[] | null> {
      try {
        const workout = await this.movementRepository.getMovement(id)
        return workout
      } catch (error) {
        throw new Error(`Failed to get workout: ${error}`);
      }
    }

    async getAllMovements(): Promise<Movement[] | null> {
      try {
        const workout = await this.movementRepository.getAllMovements()
        return workout
      } catch (error) {
        throw new Error(`Failed to get workout: ${error}`);
      }
    }
  }
  