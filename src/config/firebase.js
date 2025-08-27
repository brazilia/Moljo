import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration - Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Debug: Log configuration (remove in production)
console.log('Firebase Config Check:', {
  hasApiKey: !!firebaseConfig.apiKey,
  hasAuthDomain: !!firebaseConfig.authDomain,
  hasProjectId: !!firebaseConfig.projectId,
  hasStorageBucket: !!firebaseConfig.storageBucket,
  hasMessagingSenderId: !!firebaseConfig.messagingSenderId,
  hasAppId: !!firebaseConfig.appId
});

// Check if any required config is missing
const missingConfig = Object.entries(firebaseConfig).filter(([key, value]) => !value);
if (missingConfig.length > 0) {
  console.error('Missing Firebase configuration:', missingConfig.map(([key]) => key));
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;

