// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
// import { Camera } from 'expo-camera';
// import { useAuth } from '../../context/AuthContext';
// import { recordAttendance } from '../../services/attendance';
// import { router } from 'expo-router';

// // Type augmentation for Camera
// declare module 'expo-camera' {
//   interface Camera {
//     Constants: {
//       Type: { front: string; back: string };
//       FaceDetection: {
//         Mode: { fast: string; accurate: string };
//         Landmarks: { all: string; none: string };
//         Classifications: { all: string; none: string };
//       };
//     };
//   }
// }

// interface FaceFeature {
//   faceID?: number;
//   bounds: {
//     origin: {
//       x: number;
//       y: number;
//     };
//     size: {
//       width: number;
//       height: number;
//     };
//   };
// }

// const ClockInScreen = () => {
//   const { employee } = useAuth();
//   const [faces, setFaces] = useState<FaceFeature[]>([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);
//   const cameraRef = useRef<Camera>(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleCapture = async () => {
//     if (!employee) {
//       Alert.alert('Error', 'No employee logged in');
//       return;
//     }

//     if (!cameraRef.current) {
//       Alert.alert('Error', 'Camera not ready');
//       return;
//     }

//     setIsProcessing(true);
//     try {
//       const photo = await cameraRef.current.takePictureAsync({
//         quality: 0.7,
//         base64: true,
//         skipProcessing: true,
//       });

//       setCapturedImage(photo.uri);

//       if (faces.length === 0) {
//         Alert.alert('No Face', 'No face detected in the image');
//         return;
//       }

//       await recordAttendance({
//         employeeId: employee.id,
//         type: 'clock-in',
//         photoUri: photo.uri
//       });

//       Alert.alert('Success', 'Clock-in recorded with face verification');
//       router.navigate('MyRecords'); // Changed from router.back()
//     } catch (error) {
//       Alert.alert('Error', 'Failed to record attendance');
//       console.error('ClockIn Error:', error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleFacesDetected = ({ faces }: { faces: FaceFeature[] }) => {
//     setFaces(faces);
//   };

//   if (hasPermission === null) {
//     return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
//   }

//   if (hasPermission === false) {
//     return (
//       <View style={[styles.container, {justifyContent: 'center'}]}>
//         <Text style={{color: 'white', fontSize: 18}}>
//           Please enable camera permissions in settings
//         </Text>
//       </View>
//     );
//   }

//   if (!Camera || !Camera.Constants) {
//     return (
//       <View style={[styles.container, {justifyContent: 'center'}]}>
//         <Text style={{color: 'white', fontSize: 18}}>
//           Camera module loading, please wait...
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {capturedImage ? (
//         <Image source={{ uri: capturedImage }} style={styles.previewImage} />
//       ) : (
//         <Camera
//           ref={cameraRef}
//           style={styles.camera}
//           type={Camera.Constants.Type.front}
//           onFacesDetected={handleFacesDetected}
//           faceDetectorSettings={{
//             mode: Camera.Constants.FaceDetection.Mode.fast,
//             detectLandmarks: Camera.Constants.FaceDetection.Landmarks.none,
//             runClassifications: Camera.Constants.FaceDetection.Classifications.none,
//           }}
//         >
//           <View style={styles.faceGuideOverlay}>
//             <View style={[
//               styles.faceGuide,
//               { borderColor: faces.length > 0 ? '#2ecc71' : '#e74c3c' }
//             ]} />
//           </View>
//         </Camera>
//       )}

//       <View style={styles.controls}>
//         <Text style={styles.statusText}>
//           {faces.length > 0 ? '✅ Face Verified' : '❌ Face Detection Required'}
//         </Text>

//         <TouchableOpacity
//           style={[
//             styles.button,
//             { 
//               backgroundColor: '#27ae60',
//               opacity: isProcessing ? 0.7 : 1
//             }
//           ]}
//           onPress={handleCapture}
//           disabled={isProcessing}
//         >
//           <Text style={styles.buttonText}>
//             {isProcessing ? 'Processing...' : 'Capture & Clock In'}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     width: '100%',
//     height: '70%',
//   },
//   previewImage: {
//     width: '100%',
//     height: '70%',
//     resizeMode: 'contain',
//   },
//   faceGuideOverlay: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
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

// export default ClockInScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import { useAuth } from '../../context/AuthContext';
import { recordAttendance } from '../../services/attendance';
import { router } from 'expo-router';

export default function ClockInScreen() {
  const { employee } = useAuth();
  const [faces, setFaces] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [model, setModel] = useState<faceDetection.FaceDetector | null>(null);

  // Initialize TensorFlow and load model
  useEffect(() => {
    const initialize = async () => {
      await tf.ready(); // Wait for TensorFlow to be ready
      
      const detector = await faceDetection.createDetector(
        faceDetection.SupportedModels.MediaPipeFaceDetector,
        {
          runtime: 'mediapipe', // Uses bundled model
          modelType: 'short', // Optimized for mobile
          maxFaces: 1 // Only detect one face
        }
      );
      setModel(detector);
    };
    initialize();
  }, []);

  const handleCapture = async () => {
    if (!employee) {
      Alert.alert('Error', 'No employee logged in');
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Check camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Camera access is required');
        return;
      }

      // 2. Take photo
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0.7,
        base64: true,
      });

      if (result.canceled || !result.assets?.[0]?.uri) {
        Alert.alert('Cancelled', 'No photo was taken');
        return;
      }

      const photoUri = result.assets[0].uri;
      setCapturedImage(photoUri);

      // 3. Detect faces (OFFLINE)
      if (!model) throw new Error('Face detector not ready');
      
      const imageTensor = await imageToTensor(photoUri);
      const faces = await model.estimateFaces(imageTensor);
      
      if (faces.length === 0) {
        Alert.alert('No Face', 'Please capture a clear photo of your face');
        return;
      }

      setFaces(faces);

      // 4. Save attendance record
      await recordAttendance({
        employeeId: employee.id,
        type: 'clock-in',
        photoUri: photoUri
      });

      Alert.alert('Success', 'Clock-in verified!');
      router.navigate('MyRecords');
    } catch (error) {
      Alert.alert('Error', 'Face verification failed');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Convert image to tensor format
  const imageToTensor = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return await tf.browser.fromPixels(await createImageBitmap(blob));
  };

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <Image source={{ uri: capturedImage }} style={styles.previewImage} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Ready to capture</Text>
        </View>
      )}

      <View style={styles.faceGuideOverlay}>
        <View style={[
          styles.faceGuide,
          { borderColor: faces.length > 0 ? '#2ecc71' : '#e74c3c' }
        ]} />
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: '#27ae60', opacity: isProcessing ? 0.7 : 1 }
        ]}
        onPress={handleCapture}
        disabled={isProcessing}
      >
        <Text style={styles.buttonText}>
          {isProcessing ? 'Verifying...' : 'Capture & Clock In'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
  },
  previewImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  faceGuideOverlay: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceGuide: {
    width: 250,
    height: 300,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});