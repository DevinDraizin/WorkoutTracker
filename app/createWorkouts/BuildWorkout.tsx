import { View, Text, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import WTDropdown, { WTDropdownOption } from '@/components/WTCore/WTDropdown'
import { buildWtDropDownOptions } from '@/utils/componentUtils'
import WTButton, { ButtonVariant } from '@/components/WTCore/WTButton'
import { buildMovementDropdownData, workoutMovements } from '@/utils/workoutUtils'
import { useEffect, useState } from 'react'
import { Movement } from '@/Types/DBTypes'
import { WorkoutService } from '@/services/WorkoutService'

export default function BuildWorkout() {
  const { type } = useLocalSearchParams<{ type: string }>()
  const [movements, setMovements] = useState<Movement[]>([])

  useEffect(() => {
    WorkoutService.getInstance().getMovementsByType(type).then((movements) => {
      if(movements) {
        setMovements(movements)
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Build Workout</Text>
      <WTDropdown placeholder='Movement' values={buildMovementDropdownData(movements ? movements : [])} onChange={function (value: string): void {} } />
      <WTButton
        title='Add New Set'
        onPress={() =>  {}}
        variant={ButtonVariant.Secondary}
      />
      <WTButton
        title='Next Movement'
        onPress={() =>  {}}
        variant={ButtonVariant.Secondary}
        disabled={true}
      />
      <WTButton
        title='Complete Workout'
        onPress={() =>  {}}
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
