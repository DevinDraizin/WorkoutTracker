import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { workoutMovements } from './workoutTypes';
import WTDropdown from '@/components/WTCore/WTDropdown';
import { buildWtDropDownOptions } from '@/utils/componentUtils';
import WTButton, { ButtonVariant } from '@/components/WTCore/WTButton';

export default function BuildWorkout() {
  const { type } = useLocalSearchParams<{ type: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Build Workout</Text>
      <WTDropdown label={'Movement'} values={buildWtDropDownOptions(workoutMovements[type])} onChange={function (value: string): void {} } />
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
});
