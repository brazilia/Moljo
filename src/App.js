// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import DashboardPage from './pages/DashboardPage';
import JobsFeedPage from './pages/JobsFeedPage';
import JobDetailPage from './pages/JobDetailPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ProfileCreationPage from './pages/ProfileCreationPage';
import EmployerProfilePage from './pages/EmployerProfilePage';
import CommunityPage from './pages/CommunityPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmployerJobsPage from './pages/EmployerJobsPage';
import CreateJobPage from './pages/CreateJobPage';
import EditJobPage from './pages/EditJobPage';
import EmployerApplicationsPage from './pages/EmployerApplicationsPage';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-primary-bg text-text-primary">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes - Job Seeker */}
              <Route path="/" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/jobs" element={
                <ProtectedRoute>
                  <JobsFeedPage />
                </ProtectedRoute>
              } />
              <Route path="/jobs/:id" element={
                <ProtectedRoute>
                  <JobDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/applications" element={
                <ProtectedRoute>
                  <ApplicationsPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfileCreationPage />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              } />
              
              {/* Protected Routes - Employer */}
              <Route path="/employer/profile" element={
                <ProtectedRoute>
                  <EmployerProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/employer/jobs" element={
                <ProtectedRoute>
                  <EmployerJobsPage />
                </ProtectedRoute>
              } />
              <Route path="/employer/jobs/create" element={
                <ProtectedRoute>
                  <CreateJobPage />
                </ProtectedRoute>
              } />
              <Route path="/employer/jobs/:id" element={
                <ProtectedRoute>
                  <EditJobPage />
                </ProtectedRoute>
              } />
              <Route path="/employer/applications" element={
                <ProtectedRoute>
                  <EmployerApplicationsPage />
                </ProtectedRoute>
              } />
              
              {/* Redirect any unknown routes to dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;