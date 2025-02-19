// ModalManager.ts

export enum ModalType {
    ERROR = 'error',
    SUCCESS = 'success',
    WARNING = 'warning'
  }
  
  export interface ModalConfig {
    title: string;
    message: string;
    type: ModalType;
  }
  
  interface ModalContextType {
    showModal: (config: ModalConfig) => void;
    hideModal: () => void;
  }
  
  export class ModalManager {
    private static context: ModalContextType | null = null;
  
    static setContext(context: ModalContextType) {
      ModalManager.context = context;
    }
  
    static show(config: ModalConfig) {
      if (ModalManager.context) {
        ModalManager.context.showModal(config);
      } else {
        console.warn('ModalManager: Context is not initialized');
      }
    }
  
    static hide() {
      if (ModalManager.context) {
        ModalManager.context.hideModal();
      }
    }
  }