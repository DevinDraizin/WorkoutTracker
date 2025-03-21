import { Switch, View, Text, StyleSheet } from "react-native"
import BaseSet from "./BaseSet"
import { useEffect, useState } from "react"
import WTTextInput from "./WTCore/WTTextInput"
import { StandardSetDetails } from "@/Types/DBTypes"
import WTButton, { ButtonVariant } from "./WTCore/WTButton"

interface StandardSetProps {
  currentSet: StandardSetDetails
  previousSet?: StandardSetDetails | undefined
}

const StandardSet = (componentProps: StandardSetProps) => {
    const [dropSetEnabled, setDropSetEnabled] = useState(false)
    const [reps, setReps] = useState<string>(componentProps.previousSet ? componentProps.previousSet.reps.toString() : '')
    const [weight, setWeight] = useState<string>(componentProps.previousSet ? componentProps.previousSet.weight.toString() : '')
    const [dropReps, setDropReps] = useState<string>(componentProps.previousSet &&  componentProps.previousSet.isDropset ? componentProps.previousSet.dropsetReps!.toString() : '')
    const [dropWeight, setDropWeight] = useState<string>(componentProps.previousSet && componentProps.previousSet.isDropset ? componentProps.previousSet.dropsetWeight!.toString() : '')
    const [isComplete, setIsComplete] = useState<boolean>(false)


    
    // One day I need to come back and fix this. The BaseSet component animation is fighting with the
    // disable logic for the finish button causing visual bugs.
    const updateIsComplete = () => {
        if (dropSetEnabled) {
            setIsComplete(reps.trim() !== "" && weight.trim() !== "" && dropReps.trim() !== "" && dropWeight.trim() !== "")
        } else {
            setIsComplete(reps.trim() !== "" && weight.trim() !== "")
        }
    }

    useEffect(() => {
        updateIsComplete()
    }, [reps, weight, dropReps, dropWeight, dropSetEnabled])


    const onDropSettToggle = () => {
        setDropSetEnabled(!dropSetEnabled)
    }

    const buildDropSet = () => {
        return (
            <View style={styles.fullWidth}>
                <WTTextInput numberInput={true} cantBeEmpty={true} prompt='Drop Set Weight' value={dropWeight} onChange={(newValue: string) => {setDropWeight(newValue)}} />
                <WTTextInput numberInput={true} cantBeEmpty={true} prompt='Drop Set Reps' value={dropReps} onChange={(newValue: string) => {setDropReps(newValue)}} />
            </View>
        )
    }

    return (
        <BaseSet animateResize={dropSetEnabled}>
            <WTTextInput numberInput={true} cantBeEmpty={true} prompt='Set Weight' value={weight} onChange={(newValue: string) => {setWeight(newValue)}} />
            <WTTextInput numberInput={true} cantBeEmpty={true} prompt='Set Reps' value={reps} onChange={(newValue: string) => {setReps(newValue)}} />
            <View style={styles.row}>
                <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={'#007AFF'}
                    ios_backgroundColor="#acadad"
                    onValueChange={onDropSettToggle}
                    value={dropSetEnabled}
                />
                <Text style={styles.text}>Drop Set</Text>
            </View>

            {dropSetEnabled && buildDropSet()}
            <View style={styles.fullWidth}>
                <WTButton disabled={!isComplete} title="Finish" onPress={() => { } } variant={ButtonVariant.Primary} />
            </View>
        </BaseSet>
    )
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center', // Align items vertically in the row
      marginBottom: 10,
    },
    text: {
      marginLeft: 10, // Add some spacing between the switch and text
    },
    fullWidth: {
        width: '100%',
    }
  });

export default StandardSet