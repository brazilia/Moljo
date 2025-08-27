// src/pages/CommunityPage.js
import React, { useState } from 'react';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('success-stories');

  const successStories = [
    {
      id: 1,
      name: 'Amina K.',
      role: 'Junior SMM Manager',
      company: 'Kaspi.kz',
      story: 'I had no experience but showed my Instagram page where I grew my personal brand to 5K followers. They loved my creativity and hired me!',
      skills: ['SMM', 'Creativity', 'Social Media'],
      timeToHire: '2 weeks',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Daniyar M.',
      role: 'Sales Intern',
      company: 'Halyk Bank',
      story: 'I practiced my pitch 50 times and showed them my university debate club experience. Confidence is everything in sales!',
      skills: ['Public Speaking', 'Sales', 'Confidence'],
      timeToHire: '3 weeks',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Zarina A.',
      role: 'Web Designer',
      company: 'Air Astana',
      story: 'I created 3 mock landing pages in Figma and sent them with my application. They said my portfolio stood out immediately.',
      skills: ['UI/UX Design', 'Figma', 'Portfolio'],
      timeToHire: '1 month',
      avatar: '👩‍🎨'
    }
  ];

  const companyInsights = [
    {
      id: 1,
      company: 'Kaspi.kz',
      rating: 4.2,
      pros: ['Great learning opportunities', 'Modern office', 'Good benefits'],
      cons: ['Fast-paced environment', 'Long hours sometimes'],
      tips: 'Show your creativity and be ready to learn quickly. They value innovation.',
      interviewProcess: '2 rounds: HR + Team Lead'
    },
    {
      id: 2,
      company: 'Halyk Bank',
      rating: 3.8,
      pros: ['Stable company', 'Good for beginners', 'Training provided'],
      cons: ['Traditional corporate culture', 'Slow career growth'],
      tips: 'Dress formally and show your analytical skills. They like structured thinking.',
      interviewProcess: '3 rounds: HR + Manager + Director'
    },
    {
      id: 3,
      company: 'Air Astana',
      rating: 4.0,
      pros: ['International exposure', 'Travel benefits', 'Creative projects'],
      cons: ['Seasonal workload', 'Remote work challenges'],
      tips: 'Show your design portfolio and explain your creative process clearly.',
      interviewProcess: '2 rounds: Portfolio review + Team interview'
    }
  ];

  const tipsAndAdvice = [
    {
      id: 1,
      title: 'How to Write a Killer Cover Letter',
      author: 'Career Coach',
      content: 'Start with a hook, show you researched the company, and explain why you\'re excited about the role. Keep it under 300 words.',
      tags: ['Cover Letter', 'Application Tips']
    },
    {
      id: 2,
      title: 'What to Wear to Your First Interview',
      author: 'HR Professional',
      content: 'Research the company culture. Tech companies are more casual, banks are formal. When in doubt, business casual is safe.',
      tags: ['Interview', 'Professional Dress']
    },
    {
      id: 3,
      title: 'Follow-up Email Templates',
      author: 'Recruitment Expert',
      content: 'Send a thank you email within 24 hours. Mention something specific from the interview and reiterate your interest.',
      tags: ['Follow-up', 'Email Templates']
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="fantasy-card p-8 mb-8 ornate-border">
          <h1 className="fantasy-title text-4xl mb-2">GUILD HALL</h1>
          <p className="fantasy-text text-gray-300">Learn from others' experiences and share your journey</p>
        </div>

        {/* Tab Navigation */}
        <div className="fantasy-card p-6 mb-8 ornate-border">
          <h2 className="fantasy-subtitle text-lg mb-6 text-white">GUILD SECTIONS</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('success-stories')}
              className={`fantasy-button px-4 py-2 ${
                activeTab === 'success-stories' 
                  ? 'glow-gold' 
                  : ''
              }`}
            >
              SUCCESS STORIES
            </button>
            <button
              onClick={() => setActiveTab('company-insights')}
              className={`fantasy-button px-4 py-2 ${
                activeTab === 'company-insights' 
                  ? 'glow-gold' 
                  : ''
              }`}
            >
              COMPANY INSIGHTS
            </button>
            <button
              onClick={() => setActiveTab('tips-advice')}
              className={`fantasy-button px-4 py-2 ${
                activeTab === 'tips-advice' 
                  ? 'glow-gold' 
                  : ''
              }`}
            >
              TIPS & ADVICE
            </button>
          </div>
        </div>

        {/* Success Stories Tab */}
        {activeTab === 'success-stories' && (
          <div className="space-y-6">
            <div className="fantasy-card p-6 ornate-border">
              <h2 className="fantasy-subtitle text-xl mb-4 text-white">REAL SUCCESS STORIES</h2>
              <p className="fantasy-text text-gray-300 mb-6">Learn from people who got their first quest with no experience</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories.map(story => (
                  <div key={story.id} className="fantasy-card p-6 hover:glow-gold transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{story.avatar}</div>
                      <div>
                        <h3 className="fantasy-subtitle text-white">{story.name}</h3>
                        <p className="fantasy-text text-sm text-gray-400">{story.role} at {story.company}</p>
                      </div>
                    </div>
                    <p className="fantasy-text text-gray-300 mb-4 text-sm leading-relaxed">"{story.story}"</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {story.skills.map(skill => (
                        <span key={skill} className="fantasy-badge bronze text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>Time to hire: {story.timeToHire}</span>
                      <span className="text-green-400 font-medium">✓ HIRED</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Company Insights Tab */}
        {activeTab === 'company-insights' && (
          <div className="space-y-6">
            <div className="fantasy-card p-6 ornate-border">
              <h2 className="fantasy-subtitle text-xl mb-4 text-white">COMPANY INSIGHTS</h2>
              <p className="fantasy-text text-gray-300 mb-6">What it's really like to work at these companies</p>
              
              <div className="space-y-6">
                {companyInsights.map(company => (
                  <div key={company.id} className="fantasy-card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="fantasy-subtitle text-lg text-white">{company.company}</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex text-gold-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < Math.floor(company.rating) ? 'text-gold-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 fantasy-text text-sm text-gray-400">{company.rating}/5</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="fantasy-subtitle text-green-400 mb-2">PROS</h4>
                        <ul className="fantasy-text text-sm text-gray-300 space-y-1">
                          {company.pros.map((pro, index) => (
                            <li key={index} className="flex items-center">
                              <span className="text-green-400 mr-2">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="fantasy-subtitle text-red-400 mb-2">CONS</h4>
                        <ul className="fantasy-text text-sm text-gray-300 space-y-1">
                          {company.cons.map((con, index) => (
                            <li key={index} className="flex items-center">
                              <span className="text-red-400 mr-2">✗</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 fantasy-card bg-opacity-50">
                      <h4 className="fantasy-subtitle text-gold-400 mb-2">INTERVIEW TIPS</h4>
                      <p className="fantasy-text text-sm text-gold-300 mb-2">{company.tips}</p>
                      <p className="fantasy-text text-xs text-gold-400">Process: {company.interviewProcess}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tips & Advice Tab */}
        {activeTab === 'tips-advice' && (
          <div className="space-y-6">
            <div className="fantasy-card p-6 ornate-border">
              <h2 className="fantasy-subtitle text-xl mb-4 text-white">TIPS & ADVICE</h2>
              <p className="fantasy-text text-gray-300 mb-6">Expert advice to help you succeed</p>
              
              <div className="space-y-6">
                {tipsAndAdvice.map(tip => (
                  <div key={tip.id} className="fantasy-card p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="fantasy-subtitle text-lg text-white">{tip.title}</h3>
                      <span className="fantasy-text text-sm text-gray-400">by {tip.author}</span>
                    </div>
                    <p className="fantasy-text text-gray-300 mb-4 leading-relaxed">{tip.content}</p>
                    <div className="flex flex-wrap gap-2">
                      {tip.tags.map(tag => (
                        <span key={tag} className="fantasy-badge silver text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Your Story */}
            <div className="fantasy-card p-6 ornate-border">
              <h2 className="fantasy-subtitle text-xl mb-4 text-white">SHARE YOUR STORY</h2>
              <p className="fantasy-text text-gray-300 mb-4">Help others by sharing your quest hunting experience</p>
              <button className="fantasy-button px-6 py-3">
                SHARE MY SUCCESS STORY
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
