import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import SkillsSelector from '../components/SkillsSelector';

export default function CreateJobPage() {
  const { t } = useLanguage();
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      // Mock API call - in real app this would save to database
      console.log('Creating job posting:', formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(formData.status === 'draft' 
        ? 'Job draft saved successfully!' 
        : 'Job posted successfully!'
      );
      navigate('/employer/jobs');
    } catch (error) {
      console.error('Error creating job posting:', error);
      alert('Error creating job posting. Please try again.');
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

  return (
    <div className="min-h-screen p-4 bg-secondary-bg">
      <div className="max-w-4xl mx-auto">
        <div className="fantasy-card p-8 mb-8">
          <div className="text-center mb-6">
            <img src="/moljo-logo.svg" alt="Moljo" className="mx-auto mb-4 w-16 h-16" />
          </div>
          <h1 className="fantasy-title text-3xl mb-4">Create Job Posting</h1>
          <p className="fantasy-text text-text-secondary">
            Create a compelling job posting to attract the best candidates
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
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, status: 'draft' }));
                  handleSubmit({ preventDefault: () => {} });
                }}
                disabled={isSubmitting}
                className="fantasy-button secondary"
              >
                {isSubmitting ? 'Saving...' : 'Save as Draft'}
              </button>
              <button
                type="submit"
                onClick={() => setFormData(prev => ({ ...prev, status: 'active' }))}
                disabled={isSubmitting}
                className="fantasy-button"
              >
                {isSubmitting ? 'Posting...' : 'Post Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
