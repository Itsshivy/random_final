export type RootStackParamList = {
  Login: undefined;
  ClockIn: undefined;
  ClockOut: undefined;
  MyRecords: undefined;
  AllRecords: undefined;
  AddUser: undefined;
};
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import  LoginScreen  from '../screens/LoginScreen';
import ClockInScreen from '../features/user/ClockInScreen';
// import ClockOutScreen from '../features/user/ClockOutScreen';
import MyRecordsScreen from '../features/user/MyRecordsScreen';
import AddUserScreen from '../features/admin/AddUserScreen';
import AllRecordsScreen from '../features/admin/AllRecordsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { employee } = useAuth();

  return (
    <Stack.Navigator>
      {!employee ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : employee.role === 'admin' ? (
        <>
          <Stack.Screen name="AllRecords" component={AllRecordsScreen} />
          <Stack.Screen name="AddUser" component={AddUserScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="ClockIn" component={ClockInScreen} />
          {/* <Stack.Screen name="ClockOut" component={ClockOutScreen} /> */}
          <Stack.Screen name="MyRecords" component={MyRecordsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}