import WTTextInput from "@/components/WTCore/WTTextInput";
import { Movement } from "@/Types/DBTypes";
import { useState } from "react";
import { View, Text } from "react-native";



export default function AddEditMovements() {
  const [name, setName] = useState<string>('')
  const [workoutType, setWorkoutType] = useState<string>('')
  const [setType, setSetType] = useState<string>('')
  const [movement, setMovement] = useState<Movement>()

  const handleNameChange = (value: string) => {
    setName(value)
  }

  const handleWorkoutTypeChange = (value: string) => {
    setWorkoutType(value)
  }
  
  const handleSetTypeChange = (value: string) => {
    setSetType(value)
  } 




  return (
    <View>
      <WTTextInput prompt="Name" value={name} numberInput={false} onChange={handleNameChange}/>
      <WTTextInput prompt="Workout Type" value={workoutType} numberInput={false} onChange={handleWorkoutTypeChange}/>
      <WTTextInput prompt="Set Type" value={setType} numberInput={false} onChange={handleSetTypeChange}/>
      <Text>{name}</Text>
    </View>
  )
}