import { View, Text, StyleSheet, BackHandler } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import WTDropdown from '@/components/WTCore/WTDropdown'
import WTButton, { ButtonVariant } from '@/components/WTCore/WTButton'
import { buildMovementDropdownData } from '@/utils/workoutUtils'
import { useEffect, useState } from 'react'
import { Movement, StandardSetDetails } from '@/Types/DBTypes'
import { WorkoutService } from '@/services/WorkoutService'
import { ModalManager, ModalType } from '@/components/Modal/ModalManager'
import BaseSet from '@/components/BaseSet'
import WTTextInput from '@/components/WTCore/WTTextInput'
import StandardSet from '@/components/StandardSet'

export default function BuildWorkout() {
  const router = useRouter()
  const { workoutType } = useLocalSearchParams<{ workoutType: string }>()
  const [movements, setMovements] = useState<Movement[]>([])
  const [selectedMovement, setSelectedMovement] = useState<Movement | undefined>(undefined)
  const [setType, setSetType] = useState<string>('')

  useEffect(() => {
    WorkoutService.getInstance().getMovementsByType(workoutType).then((movements) => {
      if(movements) {
        setMovements(movements)
      }
    })
  }, [])

  useEffect(() => {
    if(selectedMovement) {
      setSetType(selectedMovement.setType)
    }
  }, [selectedMovement])

  const onMovementSelect = (id: string) => {
    setSelectedMovement(movements.find(movement => movement.id === parseInt(id)) || undefined)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Build Workout</Text>
      <WTDropdown placeholder='Movement' values={buildMovementDropdownData(movements ? movements : [])} onChange={onMovementSelect} />
      <StandardSet currentSet={{
           weight: 1,
           reps: 2,
           isDropset: false,
           dropsetWeight: undefined,
           dropsetReps: undefined
      }} />
      <WTButton
        title='Add New Set'
        onPress={() =>  {
          ModalManager.show({
            type: ModalType.INFORMATION,
            title: 'Test Title',
            message:'Some example text\nWith new line\nAnother new line\nAnd then a really long line that will wrap to the next line'
          })
        }}
        variant={ButtonVariant.Secondary}
      />
      <WTButton
        title='Next Movement'
        onPress={() =>  {router.replace('/createWorkouts/BuildWorkout')}}
        variant={ButtonVariant.Secondary}
        disabled={true}
      />
      <WTButton
        title='Complete Workout'
        onPress={() =>  {router.replace('/createWorkouts/BuildWorkout')}}
        variant={ButtonVariant.Primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
})
