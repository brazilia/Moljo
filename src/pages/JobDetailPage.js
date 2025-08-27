// src/pages/JobDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobById } from '../services/mockApi';

export default function JobDetailPage() {
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState('not-applied'); // not-applied, applied, saved
  const { id } = useParams();

  // Mock user skills - in real app this would come from user profile
  const userSkills = ['SMM', 'Copywriting', 'Customer Service'];

  useEffect(() => {
    fetchJobById(id).then(data => {
      setJob(data);
      setIsLoading(false);
    });
  }, [id]);

  const calculateSkillMatch = (jobSkills) => {
    const matchingSkills = jobSkills.filter(skill => userSkills.includes(skill));
    return Math.round((matchingSkills.length / jobSkills.length) * 100);
  };

  const handleApply = () => {
    setApplicationStatus('applied');
    // In a real app, this would send the application
    alert('Application submitted successfully! We\'ll notify you of any updates.');
  };

  const handleSaveJob = () => {
    setApplicationStatus(applicationStatus === 'saved' ? 'not-applied' : 'saved');
  };

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Browse Other Jobs
          </Link>
        </div>
      </div>
    );
  }

  const skillMatch = calculateSkillMatch(job.requiredSkills);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Back Button */}
        <Link to="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all jobs
        </Link>

        {/* Job Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{job.title}</h1>
              <p className="text-xl text-gray-700 mb-1">{job.company}</p>
              <p className="text-lg text-gray-500 mb-4">{job.location}</p>
              
              {/* Skill Match Indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Your Skill Match</span>
                  <span className="text-lg font-bold text-gray-900">{skillMatch}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      skillMatch >= 80 ? 'bg-green-500' : 
                      skillMatch >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${skillMatch}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {skillMatch >= 80 ? 'Excellent match! You have most of the required skills.' :
                   skillMatch >= 60 ? 'Good match! Consider highlighting your transferable skills.' :
                   'Limited match. Focus on learning the missing skills or similar roles.'}
                </p>
              </div>
            </div>
            <div className="ml-6">
              <span className="bg-blue-100 text-blue-800 text-lg font-semibold px-4 py-2 rounded-full">{job.type}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            {applicationStatus === 'applied' ? (
              <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg cursor-default">
                ✓ Applied
              </button>
            ) : (
              <button 
                onClick={handleApply}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Apply with My Moljo Profile
              </button>
            )}
            
            <button 
              onClick={handleSaveJob}
              className={`px-6 py-3 border-2 font-semibold rounded-lg transition-colors ${
                applicationStatus === 'saved' 
                  ? 'border-green-500 text-green-600 bg-green-50' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {applicationStatus === 'saved' ? '✓ Saved' : 'Save Job'}
            </button>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About the Role */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">About the Role</h3>
              <p className="text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Required Skills */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-3">
                {job.requiredSkills.map(skill => (
                  <span 
                    key={skill} 
                    className={`px-3 py-2 rounded-full text-sm font-medium ${
                      userSkills.includes(skill) 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}
                  >
                    {skill} {userSkills.includes(skill) && '✓'}
                  </span>
                ))}
              </div>
              
              {skillMatch < 100 && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Missing Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.filter(skill => !userSkills.includes(skill)).map(skill => (
                      <span key={skill} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-yellow-700 mt-2">
                    Consider learning these skills or highlighting similar experience in your application.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Company</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium text-gray-800">{job.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-800">{job.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Type</p>
                  <p className="font-medium text-gray-800">{job.type}</p>
                </div>
              </div>
            </div>

            {/* Application Tips */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Application Tips</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">💡</span>
                  <p className="text-gray-700">Highlight your {userSkills.filter(skill => job.requiredSkills.includes(skill)).join(', ')} experience</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">📝</span>
                  <p className="text-gray-700">Customize your motivation statement for this role</p>
                </div>
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">⏰</span>
                  <p className="text-gray-700">Apply within 24 hours for best chances</p>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                <Link to="/jobs" className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <p className="font-medium text-gray-800">SMM Specialist</p>
                  <p className="text-sm text-gray-600">Tech Startup • Almaty</p>
                </Link>
                <Link to="/jobs" className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <p className="font-medium text-gray-800">Marketing Assistant</p>
                  <p className="text-sm text-gray-600">Digital Agency • Remote</p>
                </Link>
                <Link to="/jobs" className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <p className="font-medium text-gray-800">Content Creator</p>
                  <p className="text-sm text-gray-600">E-commerce • Astana</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}