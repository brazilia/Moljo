// src/services/mockApi.js

// Mock job data with enhanced AI matching information
const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$80,000 - $120,000",
    description: "We're looking for a passionate Frontend Developer to join our growing team...",
    requiredSkills: ["React", "JavaScript", "CSS", "HTML"],
    preferredSkills: ["TypeScript", "Next.js", "Tailwind CSS"],
    companyInfo: {
      size: "medium",
      industry: "technology",
      culture: ["Innovation", "Collaborative", "Learning-focused"],
      remotePolicy: "hybrid",
      benefits: ["Health Insurance", "401k", "Flexible PTO"]
    },
    aiMatchScore: 94,
    aiInsights: {
      cultureFit: "Excellent match for collaborative, learning-focused environment",
      skillMatch: "95% skill alignment with your React and JavaScript expertise",
      growthPotential: "High potential for career advancement in fast-growing tech company"
    }
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "CreativeStudio",
    location: "New York, NY",
    type: "Full-time",
    salary: "$70,000 - $100,000",
    description: "Join our creative team to design beautiful, user-centered experiences...",
    requiredSkills: ["Figma", "Adobe Creative Suite", "User Research"],
    preferredSkills: ["Prototyping", "Design Systems", "Accessibility"],
    companyInfo: {
      size: "small",
      industry: "creative",
      culture: ["Creative", "Autonomous", "Work-Life Balance"],
      remotePolicy: "remote",
      benefits: ["Health Insurance", "Unlimited PTO", "Home Office Stipend"]
    },
    aiMatchScore: 87,
    aiInsights: {
      cultureFit: "Perfect for creative, autonomous work environment",
      skillMatch: "88% skill alignment with your design expertise",
      growthPotential: "Great opportunity to work on diverse creative projects"
    }
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "FinanceHub",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$65,000 - $90,000",
    description: "Help us make data-driven decisions in the financial sector...",
    requiredSkills: ["SQL", "Python", "Excel", "Data Visualization"],
    preferredSkills: ["R", "Tableau", "Machine Learning"],
    companyInfo: {
      size: "large",
      industry: "finance",
      culture: ["Data-driven", "Transparent", "Professional"],
      remotePolicy: "office",
      benefits: ["Health Insurance", "401k", "Professional Development"]
    },
    aiMatchScore: 76,
    aiInsights: {
      cultureFit: "Good match for data-driven, professional environment",
      skillMatch: "78% skill alignment with your analytical background",
      growthPotential: "Stable career path in established financial institution"
    }
  },
  {
    id: 4,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90,000 - $130,000",
    description: "Lead product development for our innovative SaaS platform...",
    requiredSkills: ["Product Strategy", "Agile", "User Research", "Analytics"],
    preferredSkills: ["Technical Background", "A/B Testing", "Go-to-Market"],
    companyInfo: {
      size: "startup",
      industry: "technology",
      culture: ["Fast-paced", "Innovation", "Social Impact"],
      remotePolicy: "flexible",
      benefits: ["Equity", "Health Insurance", "Flexible Hours"]
    },
    aiMatchScore: 91,
    aiInsights: {
      cultureFit: "Excellent match for fast-paced, innovative startup culture",
      skillMatch: "92% skill alignment with your product management experience",
      growthPotential: "High growth potential with equity compensation"
    }
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "EcoCorp",
    location: "Portland, OR",
    type: "Full-time",
    salary: "$55,000 - $75,000",
    description: "Help us promote sustainable products and environmental awareness...",
    requiredSkills: ["Digital Marketing", "Social Media", "Content Creation"],
    preferredSkills: ["SEO", "Email Marketing", "Analytics"],
    companyInfo: {
      size: "medium",
      industry: "non-profit",
      culture: ["Social Impact", "Work-Life Balance", "Diverse"],
      remotePolicy: "hybrid",
      benefits: ["Health Insurance", "Flexible PTO", "Wellness Programs"]
    },
    aiMatchScore: 83,
    aiInsights: {
      cultureFit: "Great match for socially conscious, balanced work environment",
      skillMatch: "85% skill alignment with your marketing expertise",
      growthPotential: "Meaningful work with positive environmental impact"
    }
  }
];

// Mock user profile data - initially null until profile is created
let mockUserProfile = null;
let profileSubmitted = false;

// Mock applications data
const mockApplications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: "Frontend Developer",
    company: "TechCorp",
    status: "submitted",
    submittedDate: "2024-01-15",
    aiTailored: true,
    aiScore: 94,
    lastUpdated: "2024-01-15",
    notes: "AI-optimized resume and cover letter sent"
  },
  {
    id: 2,
    jobId: 4,
    jobTitle: "Product Manager",
    company: "StartupXYZ",
    status: "responded",
    submittedDate: "2024-01-12",
    aiTailored: true,
    aiScore: 91,
    lastUpdated: "2024-01-14",
    notes: "Company responded - interview scheduled for next week",
    response: "Thank you for your application. We'd like to schedule an interview."
  },
  {
    id: 3,
    jobId: 2,
    jobTitle: "UX/UI Designer",
    company: "CreativeStudio",
    status: "pending",
    submittedDate: "2024-01-10",
    aiTailored: true,
    aiScore: 87,
    lastUpdated: "2024-01-10",
    notes: "Application submitted, waiting for response"
  }
];

// Mock AI activity data - initially inactive until profile is submitted
let mockAiActivity = {
  status: "inactive",
  lastSearch: null,
  jobsAnalyzed: 0,
  matchesFound: 0,
  applicationsTailored: 0,
  applicationsSubmitted: 0,
  responsesReceived: 0,
  interviewsScheduled: 0,
  recentActivity: [
    {
      type: "setup",
      message: "AI agent waiting for profile completion",
      timestamp: new Date().toISOString(),
      status: "waiting"
    }
  ]
};

// Mock interview data
const mockInterviews = [
  {
    id: 1,
    applicationId: 2,
    company: "StartupXYZ",
    position: "Product Manager",
    scheduledDate: "2024-01-22T14:00:00Z",
    type: "video",
    status: "scheduled",
    aiPrep: {
      companyInsights: "StartupXYZ is a fast-growing SaaS company focused on AI-powered productivity tools. They value innovation and have a collaborative culture.",
      commonQuestions: [
        "Tell us about a product you've managed from concept to launch",
        "How do you handle competing priorities?",
        "What's your approach to user research?",
        "How do you measure product success?"
      ],
      keyPoints: [
        "Emphasize your experience with agile methodologies",
        "Highlight any AI/ML product experience",
        "Show examples of data-driven decision making",
        "Demonstrate understanding of SaaS business model"
      ]
    }
  }
];

// API functions
export const fetchJobs = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockJobs;
};

export const fetchJobById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockJobs.find(job => job.id === parseInt(id));
};

export const fetchUserProfile = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockUserProfile;
};

export const submitProfile = async (profileData) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Save the profile
  mockUserProfile = {
    ...profileData,
    id: Date.now(),
    createdAt: new Date().toISOString()
  };
  
  // Mark profile as submitted
  profileSubmitted = true;
  
  // Activate AI agent
  mockAiActivity = {
    status: "active",
    lastSearch: new Date().toISOString(),
    jobsAnalyzed: 47,
    matchesFound: 12,
    applicationsTailored: 0,
    applicationsSubmitted: 0,
    responsesReceived: 0,
    interviewsScheduled: 0,
    recentActivity: [
      {
        type: "activation",
        message: "AI agent activated and starting job search",
        timestamp: new Date().toISOString(),
        status: "completed"
      },
      {
        type: "search",
        message: "Analyzing job postings and company profiles",
        timestamp: new Date().toISOString(),
        status: "in_progress"
      }
    ]
  };
  
  console.log('Profile submitted and AI agent activated:', mockUserProfile);
  return { success: true, message: 'Profile created successfully! Your AI agent is now ready to find matches.' };
};

export const updateUserProfile = async (profileData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  mockUserProfile = { ...mockUserProfile, ...profileData };
  console.log('Profile updated:', mockUserProfile);
  return { success: true, message: 'Profile updated successfully' };
};

export const fetchApplications = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockApplications;
};

export const submitApplication = async (jobId) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const newApplication = {
    id: mockApplications.length + 1,
    jobId: parseInt(jobId),
    jobTitle: mockJobs.find(job => job.id === parseInt(jobId))?.title || "Unknown Position",
    company: mockJobs.find(job => job.id === parseInt(jobId))?.company || "Unknown Company",
    status: "submitted",
    submittedDate: new Date().toISOString().split('T')[0],
    aiTailored: true,
    aiScore: Math.floor(Math.random() * 20) + 80,
    lastUpdated: new Date().toISOString().split('T')[0],
    notes: "AI-optimized application submitted"
  };
  mockApplications.push(newApplication);
  
  // Update AI activity
  mockAiActivity.applicationsSubmitted += 1;
  mockAiActivity.applicationsTailored += 1;
  mockAiActivity.recentActivity.unshift({
    type: "submit",
    message: `Submitted application to ${newApplication.company}`,
    timestamp: new Date().toISOString(),
    status: "completed"
  });
  
  return newApplication;
};

export const fetchAiActivity = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockAiActivity;
};

export const fetchInterviews = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockInterviews;
};

export const getAiMatches = async (userPreferences) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if profile has been submitted
  if (!profileSubmitted) {
    return [];
  }
  
  // Simulate AI matching algorithm
  const matches = mockJobs.map(job => {
    let score = 50; // Base score
    let skillMatches = 0; // Initialize skillMatches variable
    
    // Industry match
    if (userPreferences.industries && userPreferences.industries.includes(job.companyInfo.industry)) score += 20;
    
    // Company size match
    if (userPreferences.companySizes && userPreferences.companySizes.includes(job.companyInfo.size)) score += 15;
    
    // Work style match
    if (userPreferences.workStyles && userPreferences.workStyles.includes(job.companyInfo.remotePolicy)) score += 15;
    
    // Culture values match
    if (userPreferences.cultureValues) {
      const cultureMatches = job.companyInfo.culture.filter(culture => 
        userPreferences.cultureValues.includes(culture)
      ).length;
      score += cultureMatches * 5;
    }
    
    // Skills match
    if (userPreferences.skills) {
      skillMatches = job.requiredSkills.filter(skill => 
        userPreferences.skills.includes(skill)
      ).length;
      score += (skillMatches / job.requiredSkills.length) * 20;
    }
    
    return {
      ...job,
      aiMatchScore: Math.min(score, 99),
      aiInsights: {
        cultureFit: `Good match for ${job.companyInfo.culture.join(', ')} environment`,
        skillMatch: `${Math.round((skillMatches / job.requiredSkills.length) * 100)}% skill alignment`,
        growthPotential: "High potential based on your preferences"
      }
    };
  });
  
  // Sort by match score and return top matches
  return matches
    .sort((a, b) => b.aiMatchScore - a.aiMatchScore)
    .slice(0, 10);
};

export const generateAiInsights = async (jobId, userProfile) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const job = mockJobs.find(j => j.id === parseInt(jobId));
  
  return {
    matchScore: job.aiMatchScore,
    cultureFit: job.aiInsights.cultureFit,
    skillMatch: job.aiInsights.skillMatch,
    growthPotential: job.aiInsights.growthPotential,
    recommendations: [
      "Emphasize your React experience in the cover letter",
      "Highlight any startup experience you may have",
      "Mention your interest in collaborative environments",
      "Include specific examples of learning and growth"
    ]
  };
};