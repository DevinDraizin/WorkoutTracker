import React, { useState } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  FlatList, 
  SafeAreaView,
  Dimensions
} from 'react-native'

// Define the dropdown option interface
export interface WTDropdownOption {
  label: string
  value: string
}

// Define the component props
interface WTDropdownProps {
  label?: string
  values: WTDropdownOption[]
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

const { height } = Dimensions.get('window')

const WTDropdown: React.FC<WTDropdownProps> = (componentProps: WTDropdownProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState<WTDropdownOption | null>(null)

  const handleSelect = (option: WTDropdownOption) => {
    setSelectedOption(option)
    componentProps.onChange(option.value)
    setModalVisible(false)
  }

  const onSelect = () => {
    if(!componentProps.disabled) {
      setModalVisible(true)
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.expandable}>
        {componentProps.label && (<Text style={styles.label}>{componentProps.label}</Text>)}
        
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={onSelect}
          activeOpacity={componentProps.disabled ? 1 : 0.7}
        >
          <Text style={selectedOption ? styles.selectedText : styles.placeholderText}>
            {selectedOption ? selectedOption.label : componentProps.placeholder}
          </Text>
          <Text style={styles.dropdownIcon}>{componentProps.disabled ? "X" : "▼"}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity 
              style={styles.modalBackdrop}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            />
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalHeaderText}>{componentProps.label}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={styles.closeButton}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <FlatList
                  data={componentProps.values}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.optionItem,
                        selectedOption?.value === item.value && styles.selectedItem
                      ]}
                      onPress={() => handleSelect(item)}
                    >
                      <Text 
                        style={[
                          styles.optionText,
                          selectedOption?.value === item.value && styles.selectedItemText
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    marginBottom: 10,
  },
  expandable: {
    flex: 1, 
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  selectedText: {
    color: '#333',
    fontSize: 16,
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: height * 0.7,
  },
  modalContent: {
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 20,
    color: '#999',
    padding: 4,
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedItem: {
    backgroundColor: '#E6F2FF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItemText: {
    color: '#007AFF',
    fontWeight: '500',
  },
})

export default WTDropdown