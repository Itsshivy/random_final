import React from 'react';
import { FlatList } from 'react-native';
import AttendanceCard from '../../components/AttendanceCard';
import { getAttendanceRecords } from '../../services/attendance';

type AttendanceRecord = {
  employeeId: string;
  date: string;
  type: string;
  time: string;
  photoUri: string;
  status: "Present" | "Absent" | "Late";
  // Add other fields if needed
};

export default function AllRecordsScreen() {
  const [records, setRecords] = React.useState<AttendanceRecord[]>([]);

  React.useEffect(() => {
    const loadRecords = async () => {
      const data = await getAttendanceRecords();
      // Ensure each record has a 'status' property
      const recordsWithStatus = data.map((record: any) => ({
        ...record,
        status: (record.status === "Present" || record.status === "Absent" || record.status === "Late")
          ? record.status
          : "Absent", // or choose a suitable default from the allowed values
      }));
      setRecords(recordsWithStatus);
    };
    loadRecords();
  }, []);

  return (
    <FlatList
      data={records}
      renderItem={({ item }) => <AttendanceCard record={item} />}
      keyExtractor={item => `${item.employeeId}-${item.date}-${item.type}`}
    />
  );
}