import React, { useState } from 'react';
import { TextInput, View, Button, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    const success = login(id, password);
    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ClockIn' }],
      });
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Employee ID"
        value={id}
        onChangeText={setId}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}