export interface Workout {
    id: number;
    date: string;
    type: string;
    bodyWeight: number;
  }
  
  export interface WTSet {
    id: number;
    workoutId: number;
    movementId: number;
    setType: string;
    details: CardioSetDetails | StandardSetDetails | OtherSetDetails;
  }
  
  export interface Movement {
    id: number;
    name: string;
    workoutType: string;
    setType: string;
  }
  
  export interface CardioSetDetails {
    duration: number;
    elevation: number;
    timeIncrement: number;
    inclineIncrement: number;
  }
  
  export interface StandardSetDetails {
    weight: number;
    reps: number;
    isDropset: boolean;
    dropsetWeight: number | undefined;
    dropsetReps: number | undefined;
  }

  export interface OtherSetDetails {
    description: string;
  }