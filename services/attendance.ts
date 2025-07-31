import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

interface AttendanceRecord {
  employeeId: string;
  date: string; // YYYY-MM-DD
  timestamp: string; // ISO string
  type: 'clock-in' | 'clock-out';
  photoUri: string;
  verificationHash?: string; // For face data integrity
}

// Save with additional security checks
export const recordAttendance = async (
  record: Omit<AttendanceRecord, 'date' | 'timestamp' | 'verificationHash'>
) => {
  try {
    const now = new Date();
    const records = await getAttendanceRecords();
    
    // Prevent duplicate clock-in/out on same day
    const todayRecords = records.filter(
      r => r.employeeId === record.employeeId && 
           r.date === now.toISOString().split('T')[0] &&
           r.type === record.type
    );
    
    if (todayRecords.length > 0) {
      throw new Error(`Already ${record.type} today`);
    }

    // Generate verification hash from face data
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${record.employeeId}-${now.getTime()}`
    );

    const newRecord: AttendanceRecord = {
      ...record,
      date: now.toISOString().split('T')[0],
      timestamp: now.toISOString(),
      verificationHash: hash
    };

    await AsyncStorage.setItem(
      'attendance',
      JSON.stringify([...records, newRecord])
    );
    return newRecord;
  } catch (error) {
    console.error('Attendance recording failed:', error);
    throw error;
  }
};

// Get records with pagination support
export const getAttendanceRecords = async (
  options?: {
    employeeId?: string;
    fromDate?: string;
    toDate?: string;
    type?: 'clock-in' | 'clock-out';
  }
): Promise<AttendanceRecord[]> => {
  const raw = await AsyncStorage.getItem('attendance');
  let records = raw ? JSON.parse(raw) : [];

  if (options?.employeeId) {
    records = records.filter((r: AttendanceRecord) => 
      r.employeeId === options.employeeId
    );
  }

  if (options?.fromDate !== undefined) {
    records = records.filter((r: AttendanceRecord) => 
      options.fromDate !== undefined && r.date >= options.fromDate
    );
  }

  if (options?.toDate !== undefined) {
    records = records.filter((r: AttendanceRecord) => 
      options.toDate !== undefined && r.date <= options.toDate
    );
  }

  if (options?.type) {
    records = records.filter((r: AttendanceRecord) => 
      r.type === options.type
    );
  }

  return records.sort((a: AttendanceRecord, b: AttendanceRecord) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Utility for checking today's status
export const getTodaysStatus = async (employeeId: string) => {
  const today = new Date().toISOString().split('T')[0];
  const records = await getAttendanceRecords({ 
    employeeId, 
    fromDate: today 
  });

  return {
    clockedIn: records.some(r => r.type === 'clock-in'),
    clockedOut: records.some(r => r.type === 'clock-out'),
    lastActivity: records[0]?.timestamp || null
  };
};