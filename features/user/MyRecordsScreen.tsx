import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getAttendanceRecords } from '../../services/attendance';
import { format } from 'date-fns';

interface AttendanceRecord {
  employeeId: string;
  type: 'clock-in' | 'clock-out';
  photoUri: string;
  timestamp: string;
}

export default function MyRecordsScreen() {
  const { employee } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecords = async () => {
      if (!employee) return;
      
      try {
        const data = await getAttendanceRecords({ 
          employeeId: employee.id 
        });
        setRecords(data);
      } catch (error) {
        console.error('Failed to load records:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, [employee]);

  const renderItem = ({ item }: { item: AttendanceRecord }) => (
    <View style={styles.recordCard}>
      <Image 
        source={{ uri: item.photoUri }} 
        style={styles.faceImage} 
      />
      <View style={styles.recordDetails}>
        <Text style={styles.recordType}>
          {item.type === 'clock-in' ? '🟢 Clock In' : '🔴 Clock Out'}
        </Text>
        <Text style={styles.recordTime}>
          {format(new Date(item.timestamp), 'PPpp')}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading your records...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Attendance Records</Text>
      
      {records.length === 0 ? (
        <Text style={styles.emptyText}>No records found</Text>
      ) : (
        <FlatList
          data={records}
          renderItem={renderItem}
          keyExtractor={(item) => item.timestamp}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  recordCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  faceImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  recordDetails: {
    flex: 1,
  },
  recordType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recordTime: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});