import React, { useState } from 'react';
import { 
  TextInput, 
  StyleSheet, 
  View, 
} from 'react-native';

interface WTTextAreaProps {
  prompt: string,
  onChange: (value: string) => void
}

const WTTextArea: React.FC<WTTextAreaProps> = (componentProps: WTTextAreaProps) => {
  const [value, setValue] = useState<string>('');

  const handleChangeText = (text: string) => {
    setValue(text)
    componentProps.onChange(text)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
        ]}
        value={value}
        onChangeText={handleChangeText}
        placeholder={componentProps.prompt}
        keyboardType="numeric"
        placeholderTextColor="#999"
        multiline={true}
        numberOfLines={10}
      />
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
    height: 100,
  },
});

export default WTTextArea