import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CreditsDisplay } from './CreditsDisplay';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  TrendingUp,
  Clock,
  Users,
  ArrowRight,
  BarChart3,
  Calendar,
  Star
} from 'lucide-react';

interface DashboardHomeProps {
  onTabChange: (tab: string) => void;
  userPlan: string;
  freeUsage: { presentations: number; limit: number };
  onUpgrade: () => void;
}

const recentPresentations = [
  {
    id: 1,
    title: 'Q4 Sales Report 2024',
    description: 'Quarterly sales analysis and projections',
    thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    lastModified: '2 hours ago',
    status: 'Published',
    slides: 15,
    views: 234
  },
  {
    id: 2,
    title: 'Product Launch Strategy',
    description: 'New product go-to-market strategy',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    lastModified: '1 day ago',
    status: 'Draft',
    slides: 22,
    views: 45
  },
  {
    id: 3,
    title: 'Team Onboarding Guide',
    description: 'New employee orientation presentation',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    lastModified: '3 days ago',
    status: 'Published',
    slides: 18,
    views: 156
  },
  {
    id: 4,
    title: 'Marketing Campaign Results',
    description: 'Analysis of recent marketing campaign performance',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    lastModified: '5 days ago',
    status: 'Published',
    slides: 12,
    views: 189
  }
];

const stats = [
  { label: 'Total Presentations', value: '24', icon: FileText, color: 'bg-blue-500', trend: '+12%' },
  { label: 'Views This Month', value: '1,247', icon: TrendingUp, color: 'bg-green-500', trend: '+23%' },
  { label: 'Time Saved', value: '45h', icon: Clock, color: 'bg-purple-500', trend: '+8h' },
  { label: 'Team Members', value: '8', icon: Users, color: 'bg-pink-500', trend: '+2' }
];

const quickActions = [
  {
    title: 'Create with AI',
    description: 'Generate presentations from text prompts',
    icon: Sparkles,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    action: 'create'
  },
  {
    title: 'Upload PDF',
    description: 'Convert PDF documents to presentations',
    icon: Upload,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    action: 'upload'
  },
  {
    title: 'Browse Templates',
    description: 'Start with professional templates',
    icon: FileText,
    color: 'bg-gradient-to-r from-green-500 to-emerald-500',
    action: 'templates'
  }
];

const recentActivity = [
  {
    id: 1,
    action: 'Created presentation',
    target: 'Q4 Sales Report 2024',
    time: '2 hours ago',
    icon: FileText,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    action: 'Shared presentation',
    target: 'Product Launch Strategy',
    time: '1 day ago',
    icon: Users,
    color: 'bg-green-500'
  },
  {
    id: 3,
    action: 'Uploaded PDF',
    target: 'Marketing Report.pdf',
    time: '2 days ago',
    icon: Upload,
    color: 'bg-purple-500'
  },
  {
    id: 4,
    action: 'Updated presentation',
    target: 'Team Onboarding Guide',
    time: '3 days ago',
    icon: FileText,
    color: 'bg-orange-500'
  }
];

export const DashboardHome: React.FC<DashboardHomeProps> = ({ 
  onTabChange, 
  userPlan, 
  freeUsage, 
  onUpgrade 
}) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
              <p className="text-purple-100 text-lg">Ready to create something amazing today?</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="bg-white bg-opacity-10 backdrop-blur-sm border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 cursor-pointer" onClick={() => onTabChange(action.action)}>
                <div className="p-6 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                  <p className="text-sm text-purple-100">{action.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Credits Display */}
      <CreditsDisplay 
        userPlan={userPlan}
        freeUsage={freeUsage}
        onUpgrade={onUpgrade}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xs text-green-600 font-medium mt-1">{stat.trend} this month</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Presentations */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Presentations</h2>
            <Button
              variant="ghost"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onTabChange('presentations')}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPresentations.map((presentation) => (
              <Card key={presentation.id} hover className="overflow-hidden group cursor-pointer">
                <div className="aspect-video bg-gray-200 overflow-hidden relative">
                  <img
                    src={presentation.thumbnail}
                    alt={presentation.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                        Open
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{presentation.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      presentation.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {presentation.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{presentation.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{presentation.slides} slides • {presentation.views} views</span>
                    <span>{presentation.lastModified}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <Card className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}>
                    <activity.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {activity.target}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Usage Chart */}
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month's Usage</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Presentations Created</span>
                <span className="text-sm font-medium">8/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage Used</span>
                <span className="text-sm font-medium">2.4GB/10GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Team Collaborations</span>
                <span className="text-sm font-medium">12/∞</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};