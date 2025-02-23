import React, { createContext, useState, useCallback, useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ModalManager, ModalConfig, ModalType } from './ModalManager';

interface ModalContextType {
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showModal = useCallback((config: ModalConfig) => {
    setModalConfig(config);
    setVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setVisible(false);
    setModalConfig(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      showModal,
      hideModal
    }),
    [showModal, hideModal]
  );

  React.useEffect(() => {
    ModalManager.setContext(contextValue);
  }, [contextValue]);

  const getModalColor = () => {
    if (!modalConfig) return '#757575';
    
    switch (modalConfig.type) {
      case ModalType.ERROR:
        return '#FF6B6B';
      case ModalType.SUCCESS:
        return '#4CAF50';
      case ModalType.WARNING:
        return '#FFA726';
      case ModalType.INFORMATION:
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={hideModal}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { borderColor: getModalColor() }]}>
            <Text style={[styles.modalTitle, { color: getModalColor() }]}>
              {modalConfig?.title}
            </Text>
            <Text style={styles.modalMessage}>{modalConfig?.message}</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: getModalColor() }]}
              onPress={hideModal}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    borderWidth: 2
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: '#333333'
  },
  button: {
    borderRadius: 8,
    padding: 12,
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  }
});