// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as FaceDetector from 'expo-face-detector';
// import { useAuth } from '../../context/AuthContext';
// import { recordAttendance } from '../../services/attendance';
// import { router } from 'expo-router';

// export default function ClockOutScreen() {
//   const { employee } = useAuth();
//   const [faces, setFaces] = useState<any[]>([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);

//   const handleCapture = async () => {
//     if (!employee) {
//       Alert.alert('Error', 'No employee logged in');
//       return;
//     }

//     setIsProcessing(true);
//     try {
//       // 1. Request camera permissions
//       const { status } = await ImagePicker.requestCameraPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'Camera access is required');
//         return;
//       }

//       // 2. Launch camera
//       const result = await ImagePicker.launchCameraAsync({
//         allowsEditing: false,
//         aspect: [4, 3],
//         quality: 0.7,
//         base64: true,
//       });

//       if (result.canceled || !result.assets?.[0]?.uri) {
//         Alert.alert('Cancelled', 'No photo was taken');
//         return;
//       }

//       const photoUri = result.assets[0].uri;
//       setCapturedImage(photoUri);

//       // 3. Detect faces
//       const detectionResult = await FaceDetector.detectFacesAsync(
//         photoUri,
//         {
//           mode: FaceDetector.FaceDetectorMode.fast,
//           detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
//           runClassifications: FaceDetector.FaceDetectorClassifications.none,
//         }
//       );

//       if (detectionResult.faces.length === 0) {
//         Alert.alert('No Face', 'No face detected in the image');
//         return;
//       }

//       setFaces(detectionResult.faces);

//       // 4. Record attendance (clock-out)
//       await recordAttendance({
//         employeeId: employee.id,
//         type: 'clock-out', // Changed to clock-out
//         photoUri: photoUri
//       });

//       Alert.alert('Success', 'Clock-out recorded with face verification');
//       router.back();
//     } catch (error) {
//        let errorMessage = 'Failed to record attendance';
  
//   if (error instanceof Error) {
//     errorMessage = error.message;
//   } else if (typeof error === 'string') {
//     errorMessage = error;
//   }

//   Alert.alert('Error', errorMessage);
//   console.error('ClockOut Error:', error);
  
//   // Optional: Log to error tracking service (Sentry, etc.)
//   // logErrorToService(error);
// } finally {
//   setIsProcessing(false);
// }
//   };

//   return (
//     <View style={styles.container}>
//       {capturedImage ? (
//         <Image source={{ uri: capturedImage }} style={styles.previewImage} />
//       ) : (
//         <View style={styles.placeholder}>
//           <Text style={styles.placeholderText}>No image captured</Text>
//         </View>
//       )}

//       <View style={styles.faceGuideOverlay}>
//         <View style={[
//           styles.faceGuide,
//           { borderColor: faces.length > 0 ? '#2ecc71' : '#e74c3c' }
//         ]} />
//       </View>

//       <View style={styles.controls}>
//         <Text style={styles.statusText}>
//           {faces.length > 0 ? '✅ Face Verified' : '❌ Face Detection Required'}
//         </Text>

//         <TouchableOpacity
//           style={[
//             styles.button,
//             { 
//               backgroundColor: '#e74c3c', // Red color for clock-out
//               opacity: isProcessing ? 0.7 : 1
//             }
//           ]}
//           onPress={handleCapture}
//           disabled={isProcessing}
//         >
//           <Text style={styles.buttonText}>
//             {isProcessing ? 'Processing...' : 'Capture & Clock Out'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // Reuse the same styles from ClockInScreen
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   placeholder: {
//     width: '100%',
//     height: '70%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//   },
//   placeholderText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   previewImage: {
//     width: '100%',
//     height: '70%',
//     resizeMode: 'contain',
//   },
//   faceGuideOverlay: {
//     position: 'absolute',
//     width: '100%',
//     height: '70%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   faceGuide: {
//     width: 250,
//     height: 300,
//     borderWidth: 3,
//     borderRadius: 10,
//     backgroundColor: 'transparent',
//   },
//   controls: {
//     position: 'absolute',
//     bottom: 40,
//     width: '100%',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 18,
//     marginBottom: 20,
//     textAlign: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 10,
//     borderRadius: 10,
//   },
//   button: {
//     width: '100%',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });