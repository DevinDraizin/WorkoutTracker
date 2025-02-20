import React, { useState, useCallback } from 'react'
import {
  TextInput,
  StyleSheet,
  View,
  Text,
} from 'react-native'

interface WTTextInputProps {
  prompt: string
  value: string
  numberInput?: boolean
  cantBeEmpty?: boolean
  onChange: (value: string) => void
}

interface ValidationState {
  isValid: boolean
  errorMessage: string
}

const WTTextInput: React.FC<WTTextInputProps> = (componentProps: WTTextInputProps) => {
  const [validationState, setValidationState] = useState<ValidationState>({
    isValid: true,
    errorMessage: ''
  })
  const [hasBeenEdited, setHasBeenEdited] = useState(false)

  const validateInput = useCallback((text: string): ValidationState => {
    // Don't show validation errors before first edit
    if (!hasBeenEdited) {
      return { isValid: true, errorMessage: '' }
    }

    if (componentProps.cantBeEmpty && text === '') {
      return {
        isValid: false,
        errorMessage: 'This field cannot be empty'
      }
    }

    if (componentProps.numberInput && text !== '') {
      // Regex for positive integer or floating point
      const regex = /^(0|[1-9]\d*)(\.\d+)?$/
      if (!regex.test(text)) {
        return {
          isValid: false,
          errorMessage: 'Please enter a positive number'
        }
      }
    }

    return { isValid: true, errorMessage: '' }
  }, [componentProps.cantBeEmpty, componentProps.numberInput, hasBeenEdited])

  const handleChangeText = (text: string) => {
    if (!hasBeenEdited && text.length > 0) {
      setHasBeenEdited(true)
    }

    const validationResult = validateInput(text)
    setValidationState(validationResult)
    componentProps.onChange(text)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          !validationState.isValid && styles.invalidInput,
        ]}
        value={componentProps.value}
        onChangeText={handleChangeText}
        placeholder={componentProps.prompt}
        keyboardType={componentProps.numberInput ? "numeric" : "default"}
        placeholderTextColor="#999"
      />
      {!validationState.isValid && (
        <Text style={styles.errorText}>
          {validationState.errorMessage}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
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
})

export default WTTextInput