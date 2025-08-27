import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function EmployerJobsPage() {
  const { t } = useLanguage();
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, draft, closed

  useEffect(() => {
    const loadJobs = async () => {
      try {
        // Mock data - in real app this would fetch from API
        const mockJobs = [
          {
            id: 1,
            title: "Frontend Developer",
            status: "active",
            applications: 12,
            views: 45,
            postedDate: "2024-01-15",
            location: "San Francisco, CA",
            type: "Full-time",
            salary: "$80,000 - $120,000"
          },
          {
            id: 2,
            title: "UX/UI Designer",
            status: "draft",
            applications: 0,
            views: 0,
            postedDate: null,
            location: "New York, NY",
            type: "Full-time",
            salary: "$70,000 - $100,000"
          },
          {
            id: 3,
            title: "Data Analyst",
            status: "closed",
            applications: 8,
            views: 32,
            postedDate: "2024-01-10",
            location: "Remote",
            type: "Full-time",
            salary: "$60,000 - $90,000"
          }
        ];
        
        setJobs(mockJobs);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    return job.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'green', text: 'Active' },
      draft: { color: 'orange', text: 'Draft' },
      closed: { color: 'gray', text: 'Closed' }
    };
    
    const config = statusConfig[status] || { color: 'gray', text: status };
    return <span className={`fantasy-badge ${config.color}`}>{config.text}</span>;
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(prev => prev.filter(job => job.id !== jobId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-bg">
        <div className="fantasy-loading">
          <div className="fantasy-icon blue mb-4">
            <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="fantasy-text text-text-secondary">Loading your job postings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-secondary-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="fantasy-card p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="fantasy-title text-3xl mb-2">Job Postings</h1>
              <p className="fantasy-text text-text-secondary">
                Manage your job postings and track applications
              </p>
            </div>
            <Link
              to="/employer/jobs/create"
              className="fantasy-button"
            >
              + Post New Job
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="fantasy-card p-4 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'fantasy-button' 
                  : 'fantasy-text text-text-secondary hover:text-text-primary'
              }`}
            >
              All ({jobs.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'active' 
                  ? 'fantasy-button' 
                  : 'fantasy-text text-text-secondary hover:text-text-primary'
              }`}
            >
              Active ({jobs.filter(j => j.status === 'active').length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'draft' 
                  ? 'fantasy-button' 
                  : 'fantasy-text text-text-secondary hover:text-text-primary'
              }`}
            >
              Drafts ({jobs.filter(j => j.status === 'draft').length})
            </button>
            <button
              onClick={() => setFilter('closed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'closed' 
                  ? 'fantasy-button' 
                  : 'fantasy-text text-text-secondary hover:text-text-primary'
              }`}
            >
              Closed ({jobs.filter(j => j.status === 'closed').length})
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="fantasy-card p-8 text-center">
              <div className="fantasy-icon blue mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="fantasy-subtitle text-xl mb-2">No jobs found</h3>
              <p className="fantasy-text text-text-secondary mb-4">
                {filter === 'all' 
                  ? "You haven't posted any jobs yet. Get started by creating your first job posting!"
                  : `No ${filter} jobs found.`
                }
              </p>
              {filter === 'all' && (
                <Link to="/employer/jobs/create" className="fantasy-button">
                  Post Your First Job
                </Link>
              )}
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job.id} className="fantasy-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h2 className="fantasy-subtitle text-xl">{job.title}</h2>
                      {getStatusBadge(job.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="fantasy-text text-sm text-text-secondary">Location</p>
                        <p className="fantasy-text">{job.location}</p>
                      </div>
                      <div>
                        <p className="fantasy-text text-sm text-text-secondary">Type</p>
                        <p className="fantasy-text">{job.type}</p>
                      </div>
                      <div>
                        <p className="fantasy-text text-sm text-text-secondary">Salary</p>
                        <p className="fantasy-text">{job.salary}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                      <div>
                        <span className="fantasy-text text-text-secondary">Applications: </span>
                        <span className="fantasy-text font-semibold">{job.applications}</span>
                      </div>
                      <div>
                        <span className="fantasy-text text-text-secondary">Views: </span>
                        <span className="fantasy-text font-semibold">{job.views}</span>
                      </div>
                      {job.postedDate && (
                        <div>
                          <span className="fantasy-text text-text-secondary">Posted: </span>
                          <span className="fantasy-text">{new Date(job.postedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Link
                      to={`/employer/jobs/${job.id}`}
                      className="fantasy-button secondary"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/employer/applications?jobId=${job.id}`}
                      className="fantasy-button secondary"
                    >
                      View Apps
                    </Link>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="fantasy-button danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
