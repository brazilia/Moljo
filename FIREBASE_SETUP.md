# Firebase Setup Guide

## 🔥 Firebase Configuration

To connect your Moljo app to Firebase, follow these steps:

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Click "Save"

### 3. Enable Firestore Database

1. Go to **Firestore Database** > **Create database**
2. Choose **Start in test mode** (for development)
3. Select a location close to your users
4. Click "Done"

### 4. Get Your Configuration

1. Go to **Project Settings** > **General**
2. Scroll down to "Your apps" section
3. Click **Add app** and choose **Web**
4. Register your app with a nickname (e.g., "Moljo Web App")
5. Copy the configuration object

### 5. Environment Variables

Create a `.env` file in your project root with these variables:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 6. Security Rules (Optional)

For production, update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add more rules as needed for other collections
  }
}
```

### 7. Test Your Setup

1. Start your development server: `npm start`
2. Try to register a new account
3. Check Firebase Console > Authentication to see the new user
4. Check Firestore Database to see the user profile

## 🚀 Features Included

- ✅ **User Registration** with email/password
- ✅ **User Login** with email/password
- ✅ **Password Reset** functionality
- ✅ **Protected Routes** - users must be logged in
- ✅ **User Profiles** stored in Firestore
- ✅ **Logout** functionality
- ✅ **Modern UI** with fantasy theme
- ✅ **Password Strength** validation
- ✅ **Error Handling** for all auth scenarios

## 🔧 Troubleshooting

### Common Issues:

1. **"Firebase App not initialized"**
   - Check that all environment variables are set correctly
   - Restart your development server after adding .env file

2. **"Permission denied"**
   - Make sure Firestore security rules allow read/write
   - Check that Authentication is enabled

3. **"Email already in use"**
   - This is normal - the user already has an account
   - Direct them to the login page

4. **"Weak password"**
   - Firebase requires passwords to be at least 6 characters
   - Our app enforces stronger requirements (8+ chars, mixed case, numbers, symbols)

## 📁 File Structure

```
src/
├── config/
│   └── firebase.js          # Firebase configuration
├── contexts/
│   └── AuthContext.js       # Authentication context
├── components/
│   ├── ProtectedRoute.js    # Route protection
│   └── Navbar.js           # Updated navbar with auth
├── pages/
│   ├── LoginPage.js        # Login form
│   └── RegisterPage.js     # Registration form
└── App.js                  # Updated with auth routes
```

## 🎯 Next Steps

After setting up Firebase:

1. **Test the authentication flow**
2. **Customize the user profile structure** in `AuthContext.js`
3. **Add more authentication methods** (Google, GitHub, etc.)
4. **Implement email verification**
5. **Add user roles and permissions**
6. **Set up proper security rules for production**

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Use different Firebase projects for development and production
- Set up proper Firestore security rules before going live
- Consider implementing email verification for production
- Monitor Firebase usage and costs

---

**Need help?** Check the [Firebase Documentation](https://firebase.google.com/docs) or create an issue in the project repository.


