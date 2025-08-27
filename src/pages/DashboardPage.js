// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchJobs } from '../services/mockApi';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardPage() {
  const { t } = useLanguage();
  const { currentUser, userProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [recentMatches, setRecentMatches] = useState([]);
  const [showStats, setShowStats] = useState(false);
  const [aiStats, setAiStats] = useState({
    aiStatus: 'active',
    matchesFound: 12,
    applicationsSent: 8,
    responsesReceived: 3,
    interviewsScheduled: 1
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (userProfile && userProfile.profileCompleted) {
          const jobs = await fetchJobs();
          setRecentMatches(jobs.slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadData();
  }, [userProfile]);

  // Show loading state while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-bg">
        <div className="fantasy-loading">
          <div className="fantasy-icon blue mb-4">
            <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="fantasy-text text-text-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show welcome screen if no profile exists
  if (!userProfile || !userProfile.profileCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-secondary-bg">
        <div className="max-w-md w-full">
          <div className="fantasy-card p-8 text-center">
            <img 
              src="/moljo-logo.svg" 
              alt="Moljo" 
              className="mx-auto mb-6 w-20 h-20"
            />
            <h1 className="fantasy-title text-3xl mb-4">Welcome to Moljo</h1>
            <p className="fantasy-text text-text-secondary mb-8">
              Let's find your perfect job match
            </p>
            <button
              onClick={() => navigate('/profile')}
              className="fantasy-button text-lg px-8 py-4 w-full"
            >
              Create Your Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main dashboard - simplified and focused
  return (
    <div className="min-h-screen p-4 bg-secondary-bg">
      <div className="max-w-2xl mx-auto">
        {/* Header - Simple and clear */}
        <div className="fantasy-card p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="fantasy-title text-2xl mb-2">Hello, {userProfile.fullName || 'there'}!</h1>
              <p className="fantasy-text text-text-secondary">Ready to find your next opportunity?</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent-green rounded-full animate-pulse"></div>
              <span className="fantasy-text text-sm text-text-muted">AI Active</span>
            </div>
          </div>
        </div>

        {/* Primary Action Card */}
        <div className="fantasy-card p-6 mb-6">
          <div className="text-center">
            <img 
              src="/moljo-logo.svg" 
              alt="Moljo" 
              className="mx-auto mb-4 w-16 h-16"
            />
            <h2 className="fantasy-subtitle text-xl mb-2">You have {aiStats.matchesFound} new matches</h2>
            <p className="fantasy-text text-text-secondary mb-6">Review and apply to jobs that match your profile</p>
            <Link to="/jobs" className="fantasy-button text-lg px-8 py-4 w-full">
              View Matches
            </Link>
          </div>
        </div>

        {/* Quick Stats - Collapsible */}
        <div className="fantasy-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="fantasy-subtitle text-lg">Your Progress</h3>
            <button
              onClick={() => setShowStats(!showStats)}
              className="fantasy-text text-accent-blue hover:text-blue-700 text-sm"
            >
              {showStats ? 'Hide' : 'Show'} Details
            </button>
          </div>
          
          {showStats ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-secondary-bg rounded-lg">
                <div className="fantasy-subtitle text-2xl text-accent-blue">{aiStats.applicationsSent}</div>
                <div className="fantasy-text text-sm text-text-muted">Applications Sent</div>
              </div>
              <div className="text-center p-4 bg-secondary-bg rounded-lg">
                <div className="fantasy-subtitle text-2xl text-accent-green">{aiStats.responsesReceived}</div>
                <div className="fantasy-text text-sm text-text-muted">Responses</div>
              </div>
              <div className="text-center p-4 bg-secondary-bg rounded-lg">
                <div className="fantasy-subtitle text-2xl text-accent-purple">{aiStats.interviewsScheduled}</div>
                <div className="fantasy-text text-sm text-text-muted">Interviews</div>
              </div>
              <div className="text-center p-4 bg-secondary-bg rounded-lg">
                <div className="fantasy-subtitle text-2xl text-accent-orange">{aiStats.matchesFound}</div>
                <div className="fantasy-text text-sm text-text-muted">Total Matches</div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="fantasy-subtitle text-3xl text-accent-blue mb-2">{aiStats.applicationsSent}</div>
              <div className="fantasy-text text-text-secondary">Applications sent this week</div>
            </div>
          )}
        </div>

        {/* Recent Matches - Simplified */}
        {recentMatches.length > 0 && (
          <div className="fantasy-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="fantasy-subtitle text-lg">Recent Matches</h3>
              <Link to="/jobs" className="fantasy-text text-accent-blue hover:text-blue-700 text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {recentMatches.slice(0, 2).map((match) => (
                <Link to={`/jobs/${match.id}`} key={match.id} className="block">
                  <div className="fantasy-card p-4 bg-secondary-bg hover:glow-blue transition-all duration-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="fantasy-text font-semibold mb-1">{match.title}</h4>
                        <p className="fantasy-text text-sm text-text-secondary">{match.company}</p>
                      </div>
                      <span className="fantasy-badge green">New</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions - Minimal */}
        <div className="fantasy-card p-6 mt-6">
          <h3 className="fantasy-subtitle text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/profile" className="fantasy-button secondary text-center py-3">
              Update Profile
            </Link>
            <Link to="/applications" className="fantasy-button secondary text-center py-3">
              View Applications
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
