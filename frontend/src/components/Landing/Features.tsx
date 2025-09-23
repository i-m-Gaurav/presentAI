import React from 'react';
import { Zap, FileText, Palette, Download, Shield, Users } from 'lucide-react';
import { Card } from '../ui/Card';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Generation',
    description: 'Create professional presentations from simple text prompts using advanced AI technology.'
  },
  {
    icon: FileText,
    title: 'PDF to Presentation',
    description: 'Upload any PDF and instantly convert it into a beautiful, editable presentation.'
  },
  {
    icon: Palette,
    title: 'Smart Design',
    description: 'Our AI automatically applies beautiful designs, layouts, and color schemes to your content.'
  },
  {
    icon: Download,
    title: 'Multiple Export Options',
    description: 'Export your presentations as PowerPoint, PDF, or share them online with a single click.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your data is protected with enterprise-grade security and privacy controls.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Collaborate with your team in real-time and share presentations effortlessly.'
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block md:inline"> Modern Teams</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, collaborate, and present like a pro. 
            No design skills required.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} hover className="p-6 md:p-8 text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};