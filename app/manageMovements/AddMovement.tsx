import WTButton, { ButtonVariant } from "@/components/WTCore/WTButton";
import WTDropdown from "@/components/WTCore/WTDropdown";
import WTTextInput from "@/components/WTCore/WTTextInput";
import { WorkoutService } from "@/services/WorkoutService";
import { Movement } from "@/Types/DBTypes";
import { buildWTDropDownLabels } from "@/utils/componentUtils";
import { setTypes, workoutTypes } from "@/utils/workoutUtils";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";



export default function AddMovement() {

  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [workoutType, setWorkoutType] = useState<string>('')
  const [setType, setSetType] = useState<string>('')
  const [movement, setMovement] = useState<Movement | undefined>(undefined)

  useEffect(() => {
    if(name && workoutType && setType) {
      setMovement({
        id: 0,
        name: name,
        workoutType: workoutType,
        setType: setType
      })
    } else {
        setMovement(undefined)
    }
  },[name, workoutType, setType])

  const onCreate = () => {
    if(movement) {
      WorkoutService.getInstance().createMovement(movement)
      router.back()
    } 
  }

  return (
    <View
    style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
      }}>
      <WTTextInput prompt="Movement Name" value={name} cantBeEmpty={true} onChange={(value) => {setName(value)}}/>
      <WTDropdown placeholder="Workout Type" values={buildWTDropDownLabels(workoutTypes)} onChange={(value) => {setWorkoutType(value)}}/>
      <WTDropdown placeholder="Set Type" values={buildWTDropDownLabels(setTypes)} onChange={(value) => {setSetType(value)}}/>
      <View style={{flexDirection: 'row', marginVertical: 80,}}>
        <WTButton title="Create" disabled={!movement} variant={ButtonVariant.Primary} onPress={onCreate} />
        <WTButton title="Cancel" variant={ButtonVariant.Primary} onPress={() => {router.back()}} />
      </View>
    </View>
  )
}