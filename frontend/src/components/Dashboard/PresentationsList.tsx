import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CreditsDisplay } from './CreditsDisplay';
import { 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Edit,
  Download,
  Calendar,
  Clock,
  Share2,
  Copy,
  Star,
  Users,
  BarChart3,
  FileText
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

interface PresentationsListProps {
  onUpgrade: () => void;
}

const presentations = [
  {
    id: 1,
    title: 'Q4 Sales Report 2024',
    description: 'Comprehensive quarterly sales analysis with performance metrics and future projections',
    thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created: '2024-01-15',
    modified: '2 hours ago',
    status: 'Published',
    slides: 15,
    views: 234,
    collaborators: 3,
    starred: true
  },
  {
    id: 2,
    title: 'Product Launch Strategy',
    description: 'Go-to-market strategy for our new product line with detailed roadmap',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created: '2024-01-14',
    modified: '1 day ago',
    status: 'Draft',
    slides: 22,
    views: 45,
    collaborators: 5,
    starred: false
  },
  {
    id: 3,
    title: 'Team Onboarding Guide',
    description: 'Comprehensive guide for new team members including company culture and processes',
    thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created: '2024-01-12',
    modified: '3 days ago',
    status: 'Published',
    slides: 18,
    views: 156,
    collaborators: 2,
    starred: true
  },
  {
    id: 4,
    title: 'Marketing Campaign Results',
    description: 'Analysis of recent marketing campaign performance across all channels',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created: '2024-01-10',
    modified: '5 days ago',
    status: 'Published',
    slides: 12,
    views: 189,
    collaborators: 4,
    starred: false
  },
  {
    id: 5,
    title: 'Budget Planning 2024',
    description: 'Annual budget allocation and financial planning for the upcoming year',
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created: '2024-01-08',
    modified: '1 week ago',
    status: 'Draft',
    slides: 20,
    views: 67,
    collaborators: 3,
    starred: false
  },
  {
    id: 6,
    title: 'Innovation Workshop',
    description: 'Creative workshop for product innovation and brainstorming sessions',
    thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    created: '2024-01-05',
    modified: '1 week ago',
    status: 'Published',
    slides: 25,
    views: 302,
    collaborators: 8,
    starred: true
  }
];

export const PresentationsList: React.FC<PresentationsListProps> = ({ onUpgrade }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('modified');
  // const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const navigate = useNavigate();

  const filteredPresentations = presentations.filter(presentation => {
    const matchesSearch = presentation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         presentation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || presentation.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedPresentations = [...filteredPresentations].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'created':
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      case 'views':
        return b.views - a.views;
      default:
        return 0; // modified (default order)
    }
  });

  const handleCreateNew = () => {
    navigate("/dashboard/create");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Presentations</h1>
          <p className="text-gray-600">Manage and organize your presentations</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Share2}>
            Share Folder
          </Button>
          <Button icon={Eye} onClick={handleCreateNew}>
            Create New
          </Button>
        </div>
      </div>

      {/* Credits Display */}
      <CreditsDisplay 
        userPlan="free"
        freeUsage={{ presentations: 3, limit: 5 }}
        onUpgrade={onUpgrade}
      />

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search presentations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="modified">Last Modified</option>
              <option value="title">Title</option>
              <option value="created">Date Created</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Presentations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPresentations.map((presentation) => (
          <Card key={presentation.id} hover className="overflow-hidden group">
            {/* Thumbnail */}
            <div className="aspect-video bg-gray-200 overflow-hidden relative">
              <img
                src={presentation.thumbnail}
                alt={presentation.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {/* Star indicator */}
              {presentation.starred && (
                <div className="absolute top-3 left-3">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                  presentation.status === 'Published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {presentation.status}
                </span>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                {presentation.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {presentation.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <FileText className="w-3 h-3 mr-1" />
                    {presentation.slides} slides
                  </div>
                  <div className="flex items-center">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    {presentation.views} views
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 h-3 mr-1" />
                    {presentation.collaborators}
                  </div>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {presentation.created}
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {presentation.modified}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedPresentations.length === 0 && (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No presentations found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first presentation to get started'
            }
          </p>
          <Button>Create Presentation</Button>
        </Card>
      )}

      {/* Summary Stats */}
      {sortedPresentations.length > 0 && (
        <Card className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{sortedPresentations.length}</p>
              <p className="text-sm text-gray-600">Total Presentations</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {sortedPresentations.reduce((sum, p) => sum + p.views, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Views</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {sortedPresentations.reduce((sum, p) => sum + p.slides, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Slides</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {sortedPresentations.filter(p => p.status === 'Published').length}
              </p>
              <p className="text-sm text-gray-600">Published</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};