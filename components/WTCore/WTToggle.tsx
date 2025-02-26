import React, {useState} from 'react';
import {Switch, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

interface WTToggleProps {
    onChange: (value: boolean) => void
}

const WTToggle: React.FC<WTToggleProps> = (componentProps: WTToggleProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    componentProps.onChange(!isEnabled);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={'#007AFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WTToggle;