import React, { useState } from 'react';
import { 
  TextInput, 
  StyleSheet, 
  View, 
  Text,
} from 'react-native';

interface WTTextInputProps {
  prompt: string,
  onChange: (value: string, valid: boolean) => void
}

const WTTextInput: React.FC<WTTextInputProps> = (componentProps: WTTextInputProps) => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const [value, setValue] = useState<string>('');

  const validateInput = (text: string): boolean => {
    if (text === '') return true; // Empty input is considered valid for UX
    
    // Regex for positive integer or floating point
    const regex = /^(0|[1-9]\d*)(\.\d+)?$/
    return regex.test(text);
  }

  const handleChangeText = (text: string) => {
    const valid: boolean = validateInput(text)
    setValue(text)
    setIsValid(valid)
    componentProps.onChange(text, valid)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          !isValid && styles.invalidInput,
        ]}
        value={value}
        onChangeText={handleChangeText}
        placeholder={componentProps.prompt}
        keyboardType="numeric"
        placeholderTextColor="#999"
      />
      {!isValid && <Text style={styles.errorText}>Please enter a positive number</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  promptText: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: '#333',
  },
  invalidInput: {
    borderColor: '#FF3B30',
    borderWidth: 2,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
  }
});

export default WTTextInput