import WTButton, { ButtonVariant } from "@/components/WTCore/WTButton";
import WTDropdown from "@/components/WTCore/WTDropdown";
import { WorkoutService } from "@/services/WorkoutService";
import { Movement } from "@/Types/DBTypes";
import { buildWTDropDownLabels } from "@/utils/componentUtils";
import { buildMovementDropdownData, workoutTypes } from "@/utils/workoutUtils";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function DeleteMovement() {
    const [movements, setMovements] = useState<Movement[] | undefined>(undefined)
    const [selectedMovement, setSelectedMovement] = useState<string>('')
    const [selectedWorkoutType, setSelectedWorkoutType] = useState<string>('')
    const router = useRouter()

    useEffect(() => {
        if(selectedWorkoutType) {
            WorkoutService.getInstance().getMovementsByType(selectedWorkoutType).then((movements) => {
                if(movements) {
                  setMovements(movements)
                }
              })
        }
      }, [selectedWorkoutType])

    const onDelete = () => {
        WorkoutService.getInstance().deleteMovement(parseInt(selectedMovement))
        router.back()
    }

    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 40,
        }}>

        <WTDropdown placeholder='Workout Type' values={buildWTDropDownLabels(workoutTypes)} onChange={setSelectedWorkoutType} />
        <WTDropdown placeholder="Set Type" values={buildMovementDropdownData(movements ? movements : [])} onChange={(id) => {setSelectedMovement(id)}} disabled={!movements} />
        <View style={{flexDirection: 'row', marginVertical: 80,}}>
            <WTButton title="Delete" disabled={!selectedMovement.length} variant={ButtonVariant.Primary} onPress={onDelete} />
            <WTButton title="Cancel" variant={ButtonVariant.Primary} onPress={() => {router.back()}} />
        </View>
        </View>
    )
}