// src/pages/ApplicationsPage.js
import React, { useState, useEffect } from 'react';
import { fetchApplications, fetchAiActivity } from '../services/mockApi';
import { useLanguage } from '../contexts/LanguageContext';

export default function ApplicationsPage() {
  const { t } = useLanguage();
  const [applications, setApplications] = useState([]);
  const [aiActivity, setAiActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [appsData, activityData] = await Promise.all([
          fetchApplications(),
          fetchAiActivity()
        ]);
        setApplications(appsData);
        setAiActivity(activityData);
      } catch (error) {
        console.error('Error loading applications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredApplications = applications.filter(app => {
    if (statusFilter === 'all') return true;
    return app.status === statusFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'gold';
      case 'responded': return 'green';
      case 'pending': return 'silver';
      case 'rejected': return 'bronze';
      case 'interviewScheduled': return 'purple';
      default: return 'bronze';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'submitted': return t('applications.submitted');
      case 'responded': return t('applications.responded');
      case 'pending': return t('applications.pending');
      case 'rejected': return t('applications.rejected');
      case 'interviewScheduled': return t('applications.interviewScheduled');
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="fantasy-loading">
          <div className="fantasy-icon gold animate-spin">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="fantasy-text text-xl mt-4">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="fantasy-card p-8 mb-8 ornate-border">
          <h1 className="fantasy-title text-4xl mb-4">{t('applications.applicationTracker')}</h1>
          <p className="fantasy-text text-gray-300">{t('applications.applicationTrackerSubtitle')}</p>
        </div>

        {/* AI Activity Summary */}
        {aiActivity && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="fantasy-stats">
              <div className="flex items-center">
                <div className="fantasy-icon gold mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="fantasy-text text-sm text-gray-400 uppercase tracking-wider">{t('applications.applicationsThisWeek')}</p>
                  <p className="fantasy-subtitle text-2xl text-white">{aiActivity.applicationsSubmitted}</p>
                </div>
              </div>
            </div>

            <div className="fantasy-stats">
              <div className="flex items-center">
                <div className="fantasy-icon silver mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <p className="fantasy-text text-sm text-gray-400 uppercase tracking-wider">{t('applications.responsesReceived')}</p>
                  <p className="fantasy-subtitle text-2xl text-white">{aiActivity.responsesReceived}</p>
                </div>
              </div>
            </div>

            <div className="fantasy-stats">
              <div className="flex items-center">
                <div className="fantasy-icon bronze mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="fantasy-text text-sm text-gray-400 uppercase tracking-wider">{t('applications.interviewsScheduled')}</p>
                  <p className="fantasy-subtitle text-2xl text-white">{aiActivity.interviewsScheduled}</p>
                </div>
              </div>
            </div>

            <div className="fantasy-stats">
              <div className="flex items-center">
                <div className="fantasy-icon purple mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="fantasy-text text-sm text-gray-400 uppercase tracking-wider">AI Tailored</p>
                  <p className="fantasy-subtitle text-2xl text-white">{aiActivity.applicationsTailored}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Filter */}
        <div className="fantasy-card p-6 mb-8 ornate-border">
          <h2 className="fantasy-subtitle text-xl mb-6 text-white">Filter by Status</h2>
          <div className="flex flex-wrap gap-4">
            {['all', 'submitted', 'responded', 'pending', 'rejected', 'interviewScheduled'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`fantasy-badge ${statusFilter === status ? getStatusColor(status) : 'bronze'} cursor-pointer`}
              >
                {status === 'all' ? t('applications.allApplications') : getStatusText(status)}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length > 0 ? (
          <div className="space-y-6">
            {filteredApplications.map(application => (
              <div key={application.id} className="fantasy-card p-6 ornate-border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="fantasy-subtitle text-xl text-white">{application.jobTitle}</h3>
                    <p className="fantasy-text text-gray-300">{application.company}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`fantasy-badge ${getStatusColor(application.status)}`}>
                      {getStatusText(application.status)}
                    </span>
                    {application.aiTailored && (
                      <span className="fantasy-badge green text-xs">AI Tailored</span>
                    )}
                    <span className="fantasy-badge gold text-xs">{application.aiScore}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="fantasy-text text-sm text-gray-400">Submitted</p>
                    <p className="fantasy-text text-white">{formatDate(application.submittedDate)}</p>
                  </div>
                  <div>
                    <p className="fantasy-text text-sm text-gray-400">Last Updated</p>
                    <p className="fantasy-text text-white">{formatDate(application.lastUpdated)}</p>
                  </div>
                  <div>
                    <p className="fantasy-text text-sm text-gray-400">AI Score</p>
                    <p className="fantasy-text text-white">{application.aiScore}% Match</p>
                  </div>
                </div>

                {application.notes && (
                  <div className="fantasy-card p-4 bg-opacity-50 mb-4">
                    <p className="fantasy-text text-sm text-gray-300">{application.notes}</p>
                  </div>
                )}

                {application.response && (
                  <div className="fantasy-card p-4 bg-opacity-50 mb-4 border-l-4 border-gold-400">
                    <h4 className="fantasy-text font-semibold text-gold-400 mb-2">Company Response</h4>
                    <p className="fantasy-text text-sm text-gray-300">{application.response}</p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    <button className="fantasy-text text-gold-400 hover:text-gold-300 font-medium uppercase tracking-wider">
                      {t('applications.updateStatus')}
                    </button>
                    <button className="fantasy-text text-silver-400 hover:text-silver-300 font-medium uppercase tracking-wider">
                      {t('applications.followUp')}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="fantasy-text text-xs text-gray-400">AI Optimized</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="fantasy-card p-12 text-center ornate-border">
            <div className="fantasy-icon gold mb-4">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="fantasy-subtitle text-2xl mb-2">{t('applications.noApplications')}</h3>
            <p className="fantasy-text text-gray-400 mb-6">{t('applications.noApplicationsSubtitle')}</p>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="fantasy-text text-sm text-green-400">AI agent ready to start applying</span>
            </div>
          </div>
        )}

        {/* Recent AI Activity */}
        {aiActivity && aiActivity.recentActivity && (
          <div className="fantasy-card p-6 mt-8 ornate-border">
            <h2 className="fantasy-subtitle text-xl mb-6 text-white">Recent AI Activity</h2>
            <div className="space-y-4">
              {aiActivity.recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-400' : 
                    activity.status === 'in_progress' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}></div>
                  <span className="fantasy-text text-sm text-gray-300">{activity.message}</span>
                  <span className="fantasy-text text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
