

export interface WTDropdownOption {
  label: string;
  value: string;
}

export const buildWtDropDownOptions = (values: string[]): WTDropdownOption[] => {
    return values.map(movement => ({ label: movement, value: movement.replace(/\s+/g, '')}));
}