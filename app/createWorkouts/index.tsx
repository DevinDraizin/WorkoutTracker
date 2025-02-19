import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { workoutTypes } from './workoutTypes';
import WTRadioBar from '@/components/WTCore/WTRadioBar';
import WTButton, { ButtonVariant } from '@/components/WTCore/WTButton';

export default function CreateWorkout() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const today: Date = new Date();
  today.setHours(0,0,0,0)

  const setWorkoutType = (type: string): void => {
    setSelectedType(type);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Create New Workout</Text>
        <View style={styles.box}>
          <Text style={styles.label}>Workout Date</Text>
          <View style={styles.datePickerStyle}>
            <DateTimePicker 
              value={date} 
              mode="date" 
              display="default" 
              minimumDate={today}
              onChange={(_, selectedDate) => selectedDate && setDate(selectedDate)}
            />
          </View>
          
        </View>
      
        <View style={styles.box}>
          <Text style={styles.label}>Workout Type</Text>
          <WTRadioBar options={workoutTypes} onChange={setWorkoutType}></WTRadioBar>
        </View>
      </View>
      
      
      <WTButton
        title='Create Workout'
        onPress={() => selectedType && router.push({ pathname: '/createWorkouts/BuildWorkout', params: { type: selectedType }})}
        disabled={!selectedType}
        variant={ButtonVariant.Primary}
      ></WTButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', alignItems: 'center', gap: 140, padding: 20},
  content: { flex: 1, flexDirection: 'column', alignItems: 'center', gap: 80},
  box: { flex: 1, flexDirection: 'column', alignItems: 'center', gap: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'},
  radioContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  datePickerStyle: { alignSelf: 'center', color: '#007AFF' },
});
