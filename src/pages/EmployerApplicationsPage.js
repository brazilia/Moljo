import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function EmployerApplicationsPage() {
  const { t } = useLanguage();
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, new, reviewed, shortlisted, rejected
  const [selectedJob, setSelectedJob] = useState(jobId || 'all');

  useEffect(() => {
    const loadData = async () => {
      try {
        // Mock data - in real app this would fetch from API
        const mockJobs = [
          { id: 1, title: "Frontend Developer" },
          { id: 2, title: "UX/UI Designer" },
          { id: 3, title: "Data Analyst" }
        ];
        
        const mockApplications = [
          {
            id: 1,
            jobId: 1,
            jobTitle: "Frontend Developer",
            candidate: {
              name: "Sarah Johnson",
              email: "sarah.johnson@email.com",
              location: "San Francisco, CA",
              experience: "3 years",
              skills: ["React", "JavaScript", "CSS", "HTML"],
              avatar: "https://via.placeholder.com/40"
            },
            appliedDate: "2024-01-20",
            status: "new",
            matchScore: 92,
            coverLetter: "I'm excited to apply for the Frontend Developer position...",
            resume: "sarah_johnson_resume.pdf"
          },
          {
            id: 2,
            jobId: 1,
            jobTitle: "Frontend Developer",
            candidate: {
              name: "Mike Chen",
              email: "mike.chen@email.com",
              location: "New York, NY",
              experience: "5 years",
              skills: ["React", "TypeScript", "Next.js", "Tailwind"],
              avatar: "https://via.placeholder.com/40"
            },
            appliedDate: "2024-01-19",
            status: "shortlisted",
            matchScore: 88,
            coverLetter: "With 5 years of experience in frontend development...",
            resume: "mike_chen_resume.pdf"
          },
          {
            id: 3,
            jobId: 2,
            jobTitle: "UX/UI Designer",
            candidate: {
              name: "Emily Rodriguez",
              email: "emily.rodriguez@email.com",
              location: "Austin, TX",
              experience: "4 years",
              skills: ["Figma", "Adobe Creative Suite", "User Research"],
              avatar: "https://via.placeholder.com/40"
            },
            appliedDate: "2024-01-18",
            status: "reviewed",
            matchScore: 85,
            coverLetter: "I'm passionate about creating user-centered designs...",
            resume: "emily_rodriguez_resume.pdf"
          }
        ];
        
        setJobs(mockJobs);
        setApplications(mockApplications);
      } catch (error) {
        console.error('Error loading applications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredApplications = applications.filter(app => {
    const statusMatch = filter === 'all' || app.status === filter;
    const jobMatch = selectedJob === 'all' || app.jobId === parseInt(selectedJob);
    return statusMatch && jobMatch;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { color: 'blue', text: 'New' },
      reviewed: { color: 'orange', text: 'Reviewed' },
      shortlisted: { color: 'green', text: 'Shortlisted' },
      rejected: { color: 'red', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || { color: 'gray', text: status };
    return <span className={`fantasy-badge ${config.color}`}>{config.text}</span>;
  };

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };

  const getStatusCount = (status) => {
    return applications.filter(app => app.status === status).length;
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
          <p className="fantasy-text text-text-secondary">Loading applications...</p>
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
              <h1 className="fantasy-title text-3xl mb-2">Applications</h1>
              <p className="fantasy-text text-text-secondary">
                Review and manage applications for your job postings
              </p>
            </div>
            <div className="text-right">
              <div className="fantasy-text text-2xl font-bold text-accent-blue">
                {applications.length}
              </div>
              <div className="fantasy-text text-sm text-text-secondary">Total Applications</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="fantasy-card p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            {/* Job Filter */}
            <div>
              <label className="block fantasy-text text-sm font-medium mb-2">Filter by Job</label>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="fantasy-input"
              >
                <option value="all">All Jobs</option>
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block fantasy-text text-sm font-medium mb-2">Filter by Status</label>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    filter === 'all' 
                      ? 'fantasy-button' 
                      : 'fantasy-text text-text-secondary hover:text-text-primary'
                  }`}
                >
                  All ({applications.length})
                </button>
                <button
                  onClick={() => setFilter('new')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    filter === 'new' 
                      ? 'fantasy-button' 
                      : 'fantasy-text text-text-secondary hover:text-text-primary'
                  }`}
                >
                  New ({getStatusCount('new')})
                </button>
                <button
                  onClick={() => setFilter('reviewed')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    filter === 'reviewed' 
                      ? 'fantasy-button' 
                      : 'fantasy-text text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Reviewed ({getStatusCount('reviewed')})
                </button>
                <button
                  onClick={() => setFilter('shortlisted')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    filter === 'shortlisted' 
                      ? 'fantasy-button' 
                      : 'fantasy-text text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Shortlisted ({getStatusCount('shortlisted')})
                </button>
                <button
                  onClick={() => setFilter('rejected')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    filter === 'rejected' 
                      ? 'fantasy-button' 
                      : 'fantasy-text text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Rejected ({getStatusCount('rejected')})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="fantasy-card p-8 text-center">
              <div className="fantasy-icon blue mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="fantasy-subtitle text-xl mb-2">No applications found</h3>
              <p className="fantasy-text text-text-secondary">
                {filter === 'all' 
                  ? "You haven't received any applications yet."
                  : `No ${filter} applications found.`
                }
              </p>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div key={application.id} className="fantasy-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <img
                      src={application.candidate.avatar}
                      alt={application.candidate.name}
                      className="w-12 h-12 rounded-full"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="fantasy-subtitle text-lg">{application.candidate.name}</h3>
                        {getStatusBadge(application.status)}
                        <span className={`fantasy-badge ${application.matchScore >= 90 ? 'green' : 'blue'}`}>
                          {application.matchScore}% Match
                        </span>
                      </div>
                      
                      <p className="fantasy-text text-text-secondary mb-2">
                        {application.jobTitle} • {application.candidate.location} • {application.candidate.experience} experience
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {application.candidate.skills.slice(0, 4).map(skill => (
                          <span key={skill} className="fantasy-badge secondary text-xs">
                            {skill}
                          </span>
                        ))}
                        {application.candidate.skills.length > 4 && (
                          <span className="fantasy-text text-xs text-text-secondary">
                            +{application.candidate.skills.length - 4} more
                          </span>
                        )}
                      </div>
                      
                      <p className="fantasy-text text-sm text-text-secondary mb-3">
                        Applied on {new Date(application.appliedDate).toLocaleDateString()}
                      </p>
                      
                      <p className="fantasy-text text-sm line-clamp-2">
                        {application.coverLetter}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <select
                      value={application.status}
                      onChange={(e) => handleStatusChange(application.id, e.target.value)}
                      className="fantasy-input text-sm"
                    >
                      <option value="new">Mark as New</option>
                      <option value="reviewed">Mark as Reviewed</option>
                      <option value="shortlisted">Shortlist</option>
                      <option value="rejected">Reject</option>
                    </select>
                    
                    <button className="fantasy-button secondary text-sm">
                      View Profile
                    </button>
                    
                    <button className="fantasy-button secondary text-sm">
                      Download Resume
                    </button>
                    
                    <button className="fantasy-button text-sm">
                      Contact Candidate
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
