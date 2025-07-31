import { Employee, EMPLOYEES } from '../constants/employees';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const saveEmployee = async (employee: Employee) => {
  try {
    // Update in-memory array (replace with API call in production)
    const existing = EMPLOYEES.find(e => e.id === employee.id);
    if (existing) {
      Object.assign(existing, employee);
    } else {
      EMPLOYEES.push(employee);
    }
    
    // Persist to storage
    await AsyncStorage.setItem('employees', JSON.stringify(EMPLOYEES));
    return true;
  } catch (error) {
    console.error('Failed to save employee:', error);
    return false;
  }
};
export const login = async (id: string, password: string): Promise<Employee | null> => {
  // Replace with actual API call in production
  const employee = EMPLOYEES.find(emp => 
    emp.id === id && emp.password === password
  );
  
  if (employee) {
    await AsyncStorage.setItem('currentEmployee', JSON.stringify(employee));
    return employee;
  }
  return null;
};

export const logout = async () => {
  await AsyncStorage.removeItem('currentEmployee');
};

export const getCurrentEmployee = async (): Promise<Employee | null> => {
  const employee = await AsyncStorage.getItem('currentEmployee');
  return employee ? JSON.parse(employee) : null;
};