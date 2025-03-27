import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import WTRadioBar from '@/components/WTCore/WTRadioBar';
import WTButton, { ButtonVariant } from '@/components/WTCore/WTButton';
import WTTextInput from '@/components/WTCore/WTTextInput';
import { workoutTypes } from '@/utils/workoutUtils';

export default function CreateWorkout() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [bodyWeight, setBodyWeight] = useState<string>('');
  const [isBodyWeightValid, setIsBodyWeightValid] = useState<boolean>(true);
  const today: Date = new Date();
  today.setHours(0,0,0,0)

  const setWorkoutType = (type: string): void => {
    setSelectedType(type);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Create New Workout</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.formSection}>
          <Text style={styles.label}>Workout Date</Text>
          <View style={styles.datePickerContainer}>
            <DateTimePicker 
              value={date} 
              mode="date" 
              display="default" 
              minimumDate={today}
              onChange={(_, selectedDate) => selectedDate && setDate(selectedDate)}
              themeVariant="light"
              accentColor="#084B83"
            />
          </View>
        </View>
      
        <View style={styles.formSection}>
          <Text style={styles.label}>Workout Type</Text>
          <View style={styles.radioContainer}>
            <WTRadioBar options={workoutTypes} onChange={setWorkoutType} />
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Body Weight</Text>
          <WTTextInput
            prompt="Body Weight (lbs)"
            value={bodyWeight}
            onChange={setBodyWeight}
            numberInput={true}
            onValidationChange={setIsBodyWeightValid}
          />
        </View>
      </View>
      
      <View style={styles.footer}>
        <WTButton
          title='Create Workout'
          onPress={() => selectedType && router.push({ 
            pathname: '/createWorkouts/BuildWorkout', 
            params: { 
              workoutType: selectedType,
              bodyWeight: bodyWeight || '0'
            }
          })}
          disabled={!selectedType || !isBodyWeightValid}
          variant={ButtonVariant.Primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    backgroundColor: '#084B83',
    width: '100%',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 30,
  },
  formSection: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#270722',
    marginBottom: 15,
  },
  datePickerContainer: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 10,
  },
  radioContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#9EA3B0',
  },
});
