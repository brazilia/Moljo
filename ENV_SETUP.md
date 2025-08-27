# Environment Variables Setup

## Create Your .env File

Create a file named `.env` in your project root (same level as package.json) with the following content:

```env
# Firebase Configuration
# Replace these values with your actual Firebase project credentials
# You can find these in your Firebase Console > Project Settings > General > Your apps

REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## How to Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Go to **Project Settings** (gear icon) > **General**
4. Scroll down to "Your apps" section
5. Click **Add app** and choose **Web**
6. Register your app with a nickname
7. Copy the configuration object values to your `.env` file

## Example Configuration

Your Firebase config object will look something like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## After Creating .env File

1. Save the `.env` file
2. Restart your development server: `npm start`
3. The Firebase errors should be resolved!

## Important Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore` for security
- Make sure to enable Authentication and Firestore in your Firebase Console

