import { WTDropdownOption } from "@/components/WTCore/WTDropdown";

// Converts an array of dropdown values into an array of WTDropdownOption objects where value is the actual data and label is the display value
export const buildWtDropDownOptions = (values: string[]): WTDropdownOption[] => {
    return values.map(value => ({ label: value, value: value.replace(/\s+/g, '')}));
}

export const buildWTDropDownLabels = (values: string[]): WTDropdownOption[] => {
  return values.map(value => ({ label: value.charAt(0).toUpperCase() + value.slice(1), value: value}));
}