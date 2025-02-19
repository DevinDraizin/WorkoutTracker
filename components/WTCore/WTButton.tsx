import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define an enum for button variants
export enum ButtonVariant {
  Primary = "Primary",
  Secondary = "Secondary",
}

// Define props for the MainButton component
interface WTButtonProps {
  title: string;
  disabled?: boolean;
  variant: ButtonVariant
  onPress: () => void;
}

const WTButton: React.FC<WTButtonProps> = (componentProps: WTButtonProps) => {
  return (
    <TouchableOpacity 
      style={[styles.button, componentProps.variant === ButtonVariant.Primary ? styles.primary : styles.secondary, componentProps.disabled === true ? styles.disabled : undefined]} 
      onPress={componentProps.onPress} 
      activeOpacity={0.7}
      disabled={componentProps.disabled}
    >
      <Text style={componentProps.variant === ButtonVariant.Primary ? styles.primaryText : styles.secondaryText}>
        {componentProps.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  secondary: {
    backgroundColor: "#E0E0E0",
  },
  primaryText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  secondaryText: {
    color: "#333",
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  }
});

export default WTButton;
