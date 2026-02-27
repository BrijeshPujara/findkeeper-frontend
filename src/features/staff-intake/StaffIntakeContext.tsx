import { createContext, ReactNode, useContext } from 'react';
import { StaffIntakeFormActions, StaffIntakeFormState, useStaffIntakeForm } from './useStaffIntakeForm';

type StaffIntakeContextValue = StaffIntakeFormState & StaffIntakeFormActions;

const StaffIntakeContext = createContext<StaffIntakeContextValue | null>(null);

export const StaffIntakeProvider = ({ children }: { children: ReactNode }) => {
  const value = useStaffIntakeForm();

  return <StaffIntakeContext.Provider value={value}>{children}</StaffIntakeContext.Provider>;
};

export const useStaffIntakeContext = (): StaffIntakeContextValue => {
  const context = useContext(StaffIntakeContext);

  if (!context) {
    throw new Error('useStaffIntakeContext must be used within StaffIntakeProvider');
  }

  return context;
};
