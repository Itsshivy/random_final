import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface AttendanceRecord {
  date: string;
  time: string;
  photoUri: string;
  status: 'Present' | 'Absent' | 'Late';
}

export default function AttendanceCard({ record }: { record: AttendanceRecord }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: record.photoUri }} style={styles.photo} />
      <View style={styles.details}>
        <Text style={styles.date}>{record.date}</Text>
        <Text style={styles.time}>{record.time}</Text>
        <Text style={[
          styles.status,
          record.status === 'Late' && styles.late,
          record.status === 'Absent' && styles.absent
        ]}>
          {record.status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  details: {
    justifyContent: 'center',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  status: {
    fontSize: 14,
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  late: {
    color: '#f39c12',
  },
  absent: {
    color: '#e74c3c',
  },
});