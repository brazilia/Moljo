// src/pages/JobsFeedPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAiMatches, submitApplication } from '../services/mockApi';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function JobsFeedPage() {
  const { t } = useLanguage();
  const { currentUser, userProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatches, setSelectedMatches] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (userProfile && userProfile.profileCompleted) {
          const aiMatches = await getAiMatches(userProfile);
          setMatches(aiMatches);
          // Auto-select top 3 matches for simplicity
          setSelectedMatches(aiMatches.slice(0, 3).map(match => match.id));
        }
      } catch (error) {
        console.error('Error loading matches:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userProfile]);

  const handleAutoApply = () => {
    setShowConfirmation(true);
  };

  const handleConfirmApplications = async () => {
    setIsSubmitting(true);
    
    try {
      const promises = selectedMatches.map(matchId => submitApplication(matchId));
      await Promise.all(promises);
      
      alert(`Successfully submitted ${selectedMatches.length} applications!`);
      setShowConfirmation(false);
      setSelectedMatches([]);
      
    } catch (error) {
      console.error('Error submitting applications:', error);
      alert('Error submitting applications. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMatchSelection = (matchId) => {
    setSelectedMatches(prev => 
      prev.includes(matchId)
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  // Show loading state while auth is loading
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-bg">
        <div className="fantasy-loading">
          <div className="fantasy-icon blue mb-4">
            <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="fantasy-text text-text-secondary">Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  // Show profile completion message if no profile or profile not completed
  if (!userProfile || !userProfile.profileCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-bg">
        <div className="max-w-md w-full">
          <div className="fantasy-card p-8 text-center">
            <img 
              src="/moljo-logo.svg" 
              alt="Moljo" 
              className="mx-auto mb-6 w-20 h-20"
            />
            <h1 className="fantasy-title text-2xl mb-4">Complete Your Profile</h1>
            <p className="fantasy-text text-text-secondary mb-6">
              We need to know more about you to find the best job matches.
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="fantasy-button w-full"
            >
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-secondary-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="fantasy-card p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="fantasy-title text-2xl mb-2">Your Job Matches</h1>
              <p className="fantasy-text text-text-secondary">
                {matches.length} opportunities found for you
              </p>
            </div>
            {selectedMatches.length > 0 && (
              <button
                onClick={handleAutoApply}
                className="fantasy-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Applying...' : `Apply to ${selectedMatches.length} Jobs`}
              </button>
            )}
          </div>
        </div>

        {/* Job Matches */}
        <div className="space-y-4">
          {matches.map((match) => {
            const isSelected = selectedMatches.includes(match.id);
            const scoreColor = match.aiMatchScore >= 90 ? 'green' : 
                              match.aiMatchScore >= 80 ? 'blue' : 
                              match.aiMatchScore >= 70 ? 'purple' : 'orange';
            
            return (
              <div key={match.id} className="fantasy-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h2 className="fantasy-subtitle text-xl">{match.title}</h2>
                      <span className={`fantasy-badge ${scoreColor}`}>
                        {match.aiMatchScore}% Match
                      </span>
                    </div>
                    <p className="fantasy-text text-lg text-text-secondary mb-2">{match.company}</p>
                    <p className="fantasy-text text-text-muted mb-3">{match.location}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {match.requiredSkills.slice(0, 3).map(skill => (
                        <span key={skill} className="fantasy-badge orange text-xs">{skill}</span>
                      ))}
                      {match.requiredSkills.length > 3 && (
                        <span className="fantasy-text text-xs text-text-muted">
                          +{match.requiredSkills.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <p className="fantasy-text text-sm text-text-secondary mb-4">
                      {match.description.substring(0, 150)}...
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-3 ml-4">
                    <button
                      onClick={() => toggleMatchSelection(match.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-accent-blue border-accent-blue' 
                          : 'border-border-subtle hover:border-accent-blue'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    
                    <Link
                      to={`/jobs/${match.id}`}
                      className="fantasy-text text-accent-blue hover:text-blue-700 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {matches.length === 0 && (
          <div className="fantasy-card p-12 text-center">
            <img 
              src="/moljo-logo.svg" 
              alt="Moljo" 
              className="mx-auto mb-6 w-20 h-20"
            />
            <h2 className="fantasy-subtitle text-xl mb-4">No Matches Yet</h2>
            <p className="fantasy-text text-text-secondary mb-6">
              We're still analyzing job opportunities for you. Check back soon!
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="fantasy-button"
            >
              Update Profile
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="fantasy-card p-6 max-w-md w-full">
            <h3 className="fantasy-subtitle text-xl mb-4">Confirm Applications</h3>
            <p className="fantasy-text text-text-secondary mb-6">
              Your AI will send tailored applications to {selectedMatches.length} selected jobs. Continue?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="fantasy-button secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApplications}
                className="fantasy-button flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Applying...' : 'Apply Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}