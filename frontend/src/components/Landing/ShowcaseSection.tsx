import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ArrowRight, Sparkles, FileText, BarChart3, Users, Palette, Target } from 'lucide-react';

const showcaseItems = [
  {
    category: 'Business & Corporate',
    title: 'Executive Dashboard',
    description: 'Real-time KPI tracking and performance metrics',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    features: ['Interactive Charts', 'Real-time Data', 'Executive Summary'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    category: 'Sales & Marketing',
    title: 'Product Launch Deck',
    description: 'Compelling presentations that drive conversions',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    features: ['Conversion Focused', 'Brand Aligned', 'Call-to-Actions'],
    color: 'from-green-500 to-emerald-600'
  },
  {
    category: 'Education & Training',
    title: 'Learning Modules',
    description: 'Engaging educational content with interactive elements',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    features: ['Interactive Quizzes', 'Progress Tracking', 'Multimedia Rich'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    category: 'Creative & Design',
    title: 'Brand Presentations',
    description: 'Visually stunning presentations for creative projects',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    features: ['Custom Branding', 'Creative Layouts', 'Visual Storytelling'],
    color: 'from-pink-500 to-rose-600'
  },
  {
    category: 'Financial & Analytics',
    title: 'Investment Reports',
    description: 'Professional financial presentations with data insights',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    features: ['Financial Models', 'Data Visualization', 'Trend Analysis'],
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    category: 'Team & Collaboration',
    title: 'Project Updates',
    description: 'Keep teams aligned with clear project communications',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    features: ['Team Collaboration', 'Progress Updates', 'Milestone Tracking'],
    color: 'from-cyan-500 to-teal-600'
  }
];

export const ShowcaseSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Every Type of Presentation
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block"> You Can Imagine</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            From business reports to creative pitches, our AI creates stunning presentations for any purpose, audience, or industry.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {showcaseItems.map((item, index) => (
            <Card key={index} hover className="overflow-hidden group">
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button className="bg-white text-gray-900 hover:bg-gray-100">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Similar
                  </Button>
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <Button variant="ghost" size="sm" className="w-full group-hover:bg-purple-50 group-hover:text-purple-600">
                  View Template
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Create Your Perfect Presentation?</h3>
          <p className="text-lg md:text-xl text-purple-100 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who save hours every week with AI-powered presentations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              Start Free Trial
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-white border-white border-2 hover:bg-white hover:text-purple-600 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              View All Templates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};