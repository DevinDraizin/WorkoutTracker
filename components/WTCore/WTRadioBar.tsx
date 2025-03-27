import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  LayoutAnimation
} from 'react-native';

// Define the component props
interface WTRadioBarProps {
  options: string[];
  onChange: (value: string) => void;
}



const WTRadioBar: React.FC<WTRadioBarProps> = (componentProps: WTRadioBarProps) => { 
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    // Use a simple animation that won't affect the text layout
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      }
    });
    
    setSelectedOption(option);
    componentProps.onChange(option);
  };

  return (
    <View style={styles.container}>      
      <View style={styles.radioContainer}>
        {componentProps.options.map((option, index) => {
          const isFirst = index === 0;
          const isLast = index === componentProps.options.length - 1;
          const isSelected = selectedOption === option;
          
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.radioOption,
                isFirst && styles.firstOption,
                isLast && styles.lastOption,
                isSelected && styles.selectedOption,
                // Add separator lines between options except for the last one
                index < componentProps.options.length - 1 && styles.optionWithSeparator
              ]}
              onPress={() => handleSelect(option)}
              activeOpacity={0.7}
            >
              <Text 
                style={[
                  styles.radioText,
                  isSelected && styles.selectedText
                ]}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.8}
                numberOfLines={1}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '100%',
  },
  radioOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  firstOption: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  lastOption: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionWithSeparator: {
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  radioText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default WTRadioBar;