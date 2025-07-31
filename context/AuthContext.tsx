import React, { createContext, useContext, useState, ReactNode } from 'react';
import { EMPLOYEES } from '../constants/employees';
import type { Employee } from '../constants/employees';


interface AuthContextType {
  employee: Employee | null;
  login: (id: string, password: string) => boolean;
  logout: () => void;
}
/*
    Note: The EMPLOYEES variable is correctly imported from '../constants/employees'.
    The type 'Employee' is used for typing the context and state.
    No changes needed here regarding EMPLOYEES vs employee.
*/
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [employee, setEmployee] = useState<Employee | null>(null);

  const login = (id: string, password: string) => {
    // Replace with your actual employee verification logic
    const foundEmployee = EMPLOYEES.find(emp => 
      emp.id === id && emp.password === password
    );
    if (foundEmployee) {
      setEmployee(foundEmployee);
      return true;
    }
    return false;
  };

  const logout = () => {
    setEmployee(null);
  };

  return (
    <AuthContext.Provider value={{ employee, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};