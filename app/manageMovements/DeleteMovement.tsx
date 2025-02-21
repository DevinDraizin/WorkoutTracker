import WTButton, { ButtonVariant } from "@/components/WTCore/WTButton";
import WTDropdown, { WTDropdownOption } from "@/components/WTCore/WTDropdown";
import { WorkoutService } from "@/services/WorkoutService";
import { Movement } from "@/Types/DBTypes";
import { buildMovementDropdownData } from "@/utils/workoutUtils";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function DeleteMovement() {
    const [movements, setMovements] = useState<Movement[] | undefined>(undefined)
    const [selectedMovement, setSelectedMovement] = useState<string>('')
    const router = useRouter()

    useEffect(() => {
        // Maybe add loading spinner if we ever slow down
        WorkoutService.getInstance().getAllMovements().then(movements => {
            setMovements(movements ? movements : undefined)
        })
    }, [])

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

        <WTDropdown placeholder="Set Type" values={buildMovementDropdownData(movements ? movements : [])} onChange={(id) => {setSelectedMovement(id)}}/>
        <View style={{flexDirection: 'row', marginVertical: 80,}}>
            <WTButton title="Delete" disabled={!selectedMovement.length} variant={ButtonVariant.Primary} onPress={onDelete} />
            <WTButton title="Cancel" variant={ButtonVariant.Primary} onPress={() => {router.back()}} />
        </View>
        </View>
    )
}