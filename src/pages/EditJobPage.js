import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import SkillsSelector from '../components/SkillsSelector';

export default function EditJobPage() {
  const { t } = useLanguage();
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Full-time',
    salary: '',
    requiredSkills: [],
    preferredSkills: [],
    experience: '',
    education: '',
    benefits: [],
    remotePolicy: 'on-site',
    applicationDeadline: '',
    status: 'draft'
  });

  useEffect(() => {
    const loadJob = async () => {
      try {
        // Mock data - in real app this would fetch from API
        const mockJob = {
          id: id,
          title: "Frontend Developer",
          description: "We're looking for a passionate Frontend Developer to join our growing team...",
          location: "San Francisco, CA",
          type: "Full-time",
          salary: "$80,000 - $120,000",
          requiredSkills: ["React", "JavaScript", "CSS"],
          preferredSkills: ["TypeScript", "Next.js"],
          experience: "Mid Level (3-5 years)",
          education: "Bachelor's Degree",
          benefits: ["Health Insurance", "401(k)", "Flexible PTO"],
          remotePolicy: "hybrid",
          applicationDeadline: "2024-02-15",
          status: "active"
        };
        
        setFormData(mockJob);
      } catch (error) {
        console.error('Error loading job:', error);
        alert('Error loading job details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillChange = (field, skills) => {
    setFormData(prev => ({ ...prev, [field]: skills }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location) {
      alert('Please fill in all required fields (Title, Description, Location)');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mock API call - in real app this would update in database
      console.log('Updating job posting:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Job posting updated successfully!');
      navigate('/employer/jobs');
    } catch (error) {
      console.error('Error updating job posting:', error);
      alert('Error updating job posting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefitsOptions = [
    'Health Insurance',
    'Dental Insurance',
    'Vision Insurance',
    '401(k)',
    'Flexible PTO',
    'Remote Work',
    'Professional Development',
    'Gym Membership',
    'Free Lunch',
    'Stock Options'
  ];

  const experienceOptions = [
    'Entry Level (0-2 years)',
    'Mid Level (3-5 years)',
    'Senior Level (6-8 years)',
    'Lead/Manager (8+ years)',
    'Executive Level (10+ years)'
  ];

  const educationOptions = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'No formal education required'
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-bg">
        <div className="fantasy-loading">
          <div className="fantasy-icon blue mb-4">
            <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="fantasy-text text-text-secondary">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-secondary-bg">
      <div className="max-w-4xl mx-auto">
        <div className="fantasy-card p-8 mb-8">
          <div className="text-center mb-6">
            <img src="/moljo-logo.svg" alt="Moljo" className="mx-auto mb-4 w-16 h-16" />
          </div>
          <h1 className="fantasy-title text-3xl mb-4">Edit Job Posting</h1>
          <p className="fantasy-text text-text-secondary">
            Update your job posting to attract the best candidates
          </p>
        </div>

        <div className="fantasy-card p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                    className="fantasy-input"
                    placeholder="e.g., Frontend Developer"
                  />
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                    className="fantasy-input"
                    placeholder="e.g., San Francisco, CA or Remote"
                  />
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Employment Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="fantasy-input"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Salary Range</label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    className="fantasy-input"
                    placeholder="e.g., $80,000 - $120,000"
                  />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Job Description</h2>
              <div>
                <label className="block fantasy-text text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  className="fantasy-input h-32 resize-none"
                  placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                />
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Experience Level</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="fantasy-input"
                  >
                    <option value="">Select experience level</option>
                    {experienceOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Education</label>
                  <select
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="fantasy-input"
                  >
                    <option value="">Select education level</option>
                    {educationOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Required Skills</label>
                  <SkillsSelector
                    selectedSkills={formData.requiredSkills}
                    onSkillChange={(skills) => handleSkillChange('requiredSkills', skills)}
                  />
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Preferred Skills</label>
                  <SkillsSelector
                    selectedSkills={formData.preferredSkills}
                    onSkillChange={(skills) => handleSkillChange('preferredSkills', skills)}
                  />
                </div>
              </div>
            </div>

            {/* Benefits & Policies */}
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Benefits & Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Remote Policy</label>
                  <select
                    value={formData.remotePolicy}
                    onChange={(e) => handleInputChange('remotePolicy', e.target.value)}
                    className="fantasy-input"
                  >
                    <option value="on-site">On-site only</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="remote">Remote</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                    className="fantasy-input"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block fantasy-text text-sm font-medium mb-2">Benefits</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {benefitsOptions.map(benefit => (
                    <label key={benefit} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.benefits.includes(benefit)}
                        onChange={() => handleMultiSelect('benefits', benefit)}
                        className="fantasy-checkbox"
                      />
                      <span className="fantasy-text text-sm">{benefit}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/employer/jobs')}
                className="fantasy-button secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="fantasy-button"
              >
                {isSubmitting ? 'Updating...' : 'Update Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
