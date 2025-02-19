import { ModalManager, ModalType } from "@/components/Modal/ModalManager";
import WTButton, { ButtonVariant } from "@/components/WTCore/WTButton";
import WTTextInput from "@/components/WTCore/WTTextInput";
import { Movement } from "@/Types/DBTypes";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";



export default function AddEditMovements() {

  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [workoutType, setWorkoutType] = useState<string>('')
  const [setType, setSetType] = useState<string>('')
  const [movement, setMovement] = useState<Movement>()

  useEffect(() => {
    if(name && workoutType && setType) {
      setMovement({
        id: 0,
        name: name,
        workoutType: workoutType,
        setType: setType
      })
    }
  },[name, workoutType, setType])

  const onCreate = () => {
    if(movement) {
      // Check to see if movement already exists by name
    } else {
        ModalManager.show({
            title: "Success!",
            message: "Operation completed successfully",
            type: ModalType.SUCCESS
        })
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
      <WTTextInput prompt="Name" value={name} numberInput={false} onChange={(value) => {setName(value)}}/>
      <WTTextInput prompt="Workout Type" value={workoutType} numberInput={false} onChange={(value) => {setWorkoutType(value)}}/>
      <WTTextInput prompt="Set Type" value={setType} numberInput={false} onChange={(value) => {setSetType(value)}}/>
      <View style={{flexDirection: 'row', marginVertical: 80,}}>
        <WTButton title="Create" variant={ButtonVariant.Primary} onPress={onCreate} />
        <WTButton title="Cancel" variant={ButtonVariant.Primary} onPress={() => {router.back()}} />
      </View>
    </View>
  )
}