import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
// Update the path below to the correct relative path for your project structure
import { useAuth } from '../../context/AuthContext';
import { saveEmployee } from '../../services/auth';

export default function AddUserScreen() {
  const [form, setForm] = useState({
    id: '',
    name: '',
    password: '',
    role: 'user' as const,
  });

  const handleSubmit = async () => {
    try {
      const success= await saveEmployee({
        id: form.id,
        name: form.name,
        password: form.password,
        role: form.role,
        faceData: " "
      });
      if (success){
        
      Alert.alert('Success', 'Employee added successfully');
      setForm({ id: '', name: '', password: '', role: 'user' });
      }else{
        Alert.alert('Error', 'Failed to add employee');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to add employee');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Employee ID"
        value={form.id}
        onChangeText={id => setForm({...form, id})}
      />
      {/* Add other fields similarly */}
      <Button title="Add Employee" onPress={handleSubmit} />
    </View>
  );
}