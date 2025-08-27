import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function FirebaseTest() {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setLoading(true);
    setTestResult('Testing Firebase connection...\n');
    
    try {
      // Test 1: Check configuration values
      const config = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID
      };

      setTestResult(prev => prev + '📋 Configuration Check:\n');
      setTestResult(prev => prev + `API Key: ${config.apiKey ? config.apiKey.substring(0, 10) + '...' : '❌ MISSING'}\n`);
      setTestResult(prev => prev + `Auth Domain: ${config.authDomain || '❌ MISSING'}\n`);
      setTestResult(prev => prev + `Project ID: ${config.projectId || '❌ MISSING'}\n`);
      setTestResult(prev => prev + `Storage Bucket: ${config.storageBucket || '❌ MISSING'}\n`);
      setTestResult(prev => prev + `Messaging Sender ID: ${config.messagingSenderId || '❌ MISSING'}\n`);
      setTestResult(prev => prev + `App ID: ${config.appId || '❌ MISSING'}\n\n`);

      // Check if any config is missing
      const missingConfig = Object.entries(config).filter(([key, value]) => !value);
      if (missingConfig.length > 0) {
        setTestResult(prev => prev + `❌ Missing configuration: ${missingConfig.map(([key]) => key).join(', ')}\n`);
        setTestResult(prev => prev + '💡 Please check your .env file\n\n');
        return;
      }

      // Test 2: Check if auth is initialized
      if (!auth) {
        setTestResult(prev => prev + '❌ Firebase Auth not initialized\n');
        return;
      }
      setTestResult(prev => prev + '✅ Firebase Auth initialized\n');

      // Test 3: Check if Firestore is initialized
      if (!db) {
        setTestResult(prev => prev + '❌ Firestore not initialized\n');
        return;
      }
      setTestResult(prev => prev + '✅ Firestore initialized\n');

      // Test 4: Try to create a test user
      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = 'TestPassword123!';
      
      setTestResult(prev => prev + '🔄 Testing user creation...\n');
      
      const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
      
      // If we get here, user creation worked
      setTestResult(prev => prev + '✅ User creation successful\n');
      
      // Test 5: Try to write to Firestore with simpler data
      setTestResult(prev => prev + '🔄 Testing simple Firestore write...\n');
      
      try {
        await setDoc(doc(db, 'test', 'simple-test'), {
          message: 'Hello Firestore',
          timestamp: new Date().toISOString(),
          test: true
        });
        setTestResult(prev => prev + '✅ Simple Firestore write successful\n');
      } catch (firestoreError) {
        setTestResult(prev => prev + `❌ Simple Firestore write failed: ${firestoreError.code}\n`);
        setTestResult(prev => prev + `Error message: ${firestoreError.message}\n`);
      }
      
      // Test 6: Try to read from Firestore
      setTestResult(prev => prev + '🔄 Testing Firestore read...\n');
      
      try {
        const docSnap = await getDoc(doc(db, 'test', 'simple-test'));
        if (docSnap.exists()) {
          setTestResult(prev => prev + '✅ Firestore read successful\n');
        } else {
          setTestResult(prev => prev + '⚠️ Document does not exist (write may have failed)\n');
        }
      } catch (readError) {
        setTestResult(prev => prev + `❌ Firestore read failed: ${readError.code}\n`);
      }
      
      setTestResult(prev => prev + '\n🎉 Firebase tests completed!');
      
    } catch (error) {
      console.error('Firebase test error:', error);
      setTestResult(prev => prev + `❌ Error: ${error.code} - ${error.message}\n`);
      
      if (error.code === 'auth/configuration-not-found') {
        setTestResult(prev => prev + '💡 Solution: Your Firebase project configuration is not found.\n');
        setTestResult(prev => prev + '   • Check if your Firebase project exists\n');
        setTestResult(prev => prev + '   • Verify your API key is correct\n');
        setTestResult(prev => prev + '   • Make sure your web app is registered in Firebase Console\n');
        setTestResult(prev => prev + '   • Check that project ID matches your Firebase project\n');
      } else if (error.code === 'auth/operation-not-allowed') {
        setTestResult(prev => prev + '💡 Solution: Enable Email/Password authentication in Firebase Console\n');
      } else if (error.code === 'auth/invalid-api-key') {
        setTestResult(prev => prev + '💡 Solution: Check your Firebase API key in .env file\n');
      } else if (error.code === 'auth/network-request-failed') {
        setTestResult(prev => prev + '💡 Solution: Check your internet connection\n');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fantasy-card p-6 max-w-2xl mx-auto mt-8">
      <h2 className="fantasy-title text-2xl mb-4">Firebase Connection Test</h2>
      
      <button
        onClick={testFirebaseConnection}
        disabled={loading}
        className="fantasy-button mb-4"
      >
        {loading ? 'Testing...' : 'Test Firebase Connection'}
      </button>
      
      {testResult && (
        <div className="fantasy-card p-4 bg-opacity-50">
          <pre className="fantasy-text text-sm whitespace-pre-wrap">{testResult}</pre>
        </div>
      )}
      
      <div className="fantasy-card p-4 bg-opacity-50 mt-4">
        <h3 className="fantasy-text font-semibold mb-2">For Firestore 400 errors:</h3>
        <ol className="fantasy-text text-sm space-y-1">
          <li>1. Go to Firebase Console → Firestore Database → Rules</li>
          <li>2. Update rules to allow read/write for testing:</li>
          <li>3. <code className="bg-gray-800 px-2 py-1 rounded">allow read, write: if true;</code></li>
          <li>4. Click "Publish" to save the rules</li>
          <li>5. Wait a few minutes for rules to propagate</li>
          <li>6. Test again</li>
        </ol>
      </div>
    </div>
  );
}
