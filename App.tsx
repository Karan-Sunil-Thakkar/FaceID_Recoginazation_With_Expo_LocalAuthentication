import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

const Biometrics = async () => {
  const isSupported = await LocalAuthentication.hasHardwareAsync();

  if (isSupported) {
    const hasEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasEnrolled) {
      // Check if Face ID is available
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const isFaceIDAvailable = supportedTypes.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      );

      if (isFaceIDAvailable) {
        // Prompt for Face ID authentication
        const authenticateAsync = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate using Face ID',
          fallbackLabel: 'Enter Password',
          cancelLabel: 'Cancel',
        });

        if (authenticateAsync.success) {
          console.log('Authentication successful');
          Alert.alert('Success', 'Authentication was successful!');
        } else {
          console.log('Authentication failed');
          Alert.alert('Failed', 'Authentication failed, please try again.');
        }
      } else {
        console.log('Face ID is not available on this device.');
        Alert.alert('Unavailable', 'Face ID is not available on this device.');
      }
    } else {
      console.log('No biometrics enrolled');
      Alert.alert('Not Enrolled', 'No biometrics are enrolled on this device.');
    }
  } else {
    console.log('Biometrics not supported');
    Alert.alert('Unsupported', 'Biometrics are not supported on this device.');
  }
};

const checkBiometricSupport = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  console.log('Has hardware:', hasHardware);
  console.log('Is enrolled:', isEnrolled);

  if (!hasHardware) {
    Alert.alert('Error', 'Biometric hardware is not available on this device.');
  } else if (!isEnrolled) {
    Alert.alert(
      'Error',
      'No biometric credentials are enrolled on this device.',
    );
  } else {
    // Proceed with authentication
    await Biometrics();
  }
};

const App = () => {
  useEffect(() => {
    checkBiometricSupport();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React Native Applications</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});










// import {StyleSheet, Text, View, Alert} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import * as LocalAuthentication from 'expo-local-authentication';

// const Biometrics = async () => {
//   // Check if the device supports biometrics (Face ID/Touch ID)
//   const isSupported = await LocalAuthentication.hasHardwareAsync();

//   if (isSupported) {
//     // Check if there are enrolled biometrics
//     const hasEnrolled = await LocalAuthentication.isEnrolledAsync();

//     if (hasEnrolled) {
//       // Prompt for biometric authentication
//       const authenticateAsync = await LocalAuthentication.authenticateAsync({
//         promptMessage: 'Authenticate using Face ID or Touch ID',
//         fallbackLabel: 'Enter Password',
//         cancelLabel: 'Cancel',
//       });

//       if (authenticateAsync.success) {
//         console.log('Authentication successful');
//         Alert.alert('Success', 'Authentication was successful!');
//       } else {
//         console.log('Authentication failed');
//         Alert.alert('Failed', 'Authentication failed, please try again.');
//       }
//     } else {
//       console.log('No biometrics enrolled');
//       Alert.alert('Not Enrolled', 'No biometrics are enrolled on this device.');
//     }
//   } else {
//     console.log('Biometrics not supported');
//     Alert.alert('Unsupported', 'Biometrics are not supported on this device.');
//   }
// };
// //

// const checkBiometricSupport = async () => {
//   const hasHardware = await LocalAuthentication.hasHardwareAsync();
//   const isEnrolled = await LocalAuthentication.isEnrolledAsync();

//   console.log('Has hardware:', hasHardware);
//   console.log('Is enrolled:', isEnrolled);

//   if (!hasHardware) {
//     Alert.alert('Error', 'Biometric hardware is not available on this device.');
//   } else if (!isEnrolled) {
//     Alert.alert(
//       'Error',
//       'No biometric credentials are enrolled on this device.',
//     );
//   } else {
//     // Proceed with authentication
//     await Biometrics();
//   }
// };

// const App = () => {
//   useEffect(() => {
//     checkBiometricSupport();
   
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Hello React Native Applications</Text>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//   },
// });
