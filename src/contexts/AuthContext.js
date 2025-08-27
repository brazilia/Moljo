import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  const signup = async (email, password, fullName, userType = 'jobseeker') => {
    try {
      console.log('Attempting to create user with email:', email, 'userType:', userType);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', userCredential.user.uid);
      
      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      console.log('Profile updated with display name');

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        fullName: fullName,
        userType: userType, // 'jobseeker' or 'employer'
        createdAt: new Date().toISOString(),
        profileCompleted: false,
        aiProfile: null
      });
      console.log('User profile created in Firestore');

      return userCredential.user;
    } catch (error) {
      console.error('Signup error details:', {
        code: error.code,
        message: error.message,
        fullError: error
      });
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  // Update user profile in Firestore
  const updateUserProfile = async (profileData) => {
    if (!currentUser) throw new Error('No user logged in');
    
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        ...profileData,
        updatedAt: new Date().toISOString(),
        profileCompleted: true
      }, { merge: true });
      
      // Update local state
      setUserProfile(prev => ({ ...prev, ...profileData }));
    } catch (error) {
      throw error;
    }
  };

  // Get user profile from Firestore
  const getUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Get user profile from Firestore
        try {
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
    getUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

