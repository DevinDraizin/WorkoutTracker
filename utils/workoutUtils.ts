import { WTDropdownOption } from "@/components/WTCore/WTDropdown"
import { Movement } from "@/Types/DBTypes"

export const setTypes = ['standard', 'cardio', 'other']
export const workoutTypes = ['push', 'pull', 'legs', 'other']

export const buildMovementDropdownData = (movements: Movement[]): WTDropdownOption[] => {
  const dropdownData: WTDropdownOption[] = []
  if(movements) {
      movements.forEach(movement => {
          dropdownData.push({
              label: movement.name,
              value: movement.id.toString()
          })
      })
  }
  return dropdownData
}

export const capitalizeString = (input: string): string => {
  if (!input) {
    return input; // Handle empty or null input
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export const workoutMovements: Record<string, string[]> = {
  Push: ["Bench Press", "Overhead Press", "Dips"],
  Pull: ["Pull-Ups", "Barbell Rows", "Biceps Curls"],
  Legs: ["Squats", "Deadlifts", "Lunges"],
  Other: ["Core Work", "Cardio", "Stretching0", "Stretching1", "Stretching2", "Stretching3", "Stretching4", "Stretching5", "Stretching6", "Stretching7", "Stretching8", "Stretching9", "Stretching10", "Stretching11", "Stretching12", "Stretching13", "Stretching14", "Stretching15", "Stretching16", "Stretching17", "Stretching18", "Stretching19"],
};
