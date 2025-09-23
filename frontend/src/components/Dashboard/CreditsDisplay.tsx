import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Zap, 
  FileText, 
  Upload, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  Gift
} from 'lucide-react';

interface CreditsDisplayProps {
  userPlan: string;
  freeUsage: { presentations: number; limit: number };
  onUpgrade: () => void;
}

export const CreditsDisplay: React.FC<CreditsDisplayProps> = ({ 
  userPlan, 
  freeUsage, 
  onUpgrade 
}) => {
  const usagePercentage = (freeUsage.presentations / freeUsage.limit) * 100;
  const remainingCredits = freeUsage.limit - freeUsage.presentations;
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = freeUsage.presentations >= freeUsage.limit;

  // Mock data for Pro plan
  const proUsage = {
    presentations: 45,
    aiGenerations: 234,
    storageUsed: 3.2,
    storageLimit: 100
  };

  if (userPlan === 'pro') {
    return (
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Pro Plan</h3>
              <p className="text-sm text-gray-600">Unlimited everything</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-600">∞</p>
            <p className="text-xs text-gray-500">Unlimited</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <FileText className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">{proUsage.presentations}</p>
            <p className="text-xs text-gray-600">Presentations Created</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">{proUsage.aiGenerations}</p>
            <p className="text-xs text-gray-600">AI Generations</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <Upload className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">{proUsage.storageUsed}GB</p>
            <p className="text-xs text-gray-600">Storage Used</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${isNearLimit ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
            isNearLimit ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
          }`}>
            {isNearLimit ? (
              <AlertTriangle className="w-5 h-5 text-white" />
            ) : (
              <Gift className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Free Plan Credits</h3>
            <p className="text-sm text-gray-600">
              {isAtLimit ? 'Credits exhausted' : `${remainingCredits} presentations remaining`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            {freeUsage.presentations}/{freeUsage.limit}
          </p>
          <p className="text-xs text-gray-500">This month</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Usage</span>
          <span className="text-sm text-gray-600">{Math.round(usagePercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${
              isAtLimit ? 'bg-red-500' : 
              isNearLimit ? 'bg-orange-500' : 
              'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Status Message */}
      <div className={`p-3 rounded-lg mb-4 ${
        isAtLimit ? 'bg-red-100 border border-red-200' :
        isNearLimit ? 'bg-orange-100 border border-orange-200' :
        'bg-blue-100 border border-blue-200'
      }`}>
        <div className="flex items-center">
          {isAtLimit ? (
            <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
          ) : isNearLimit ? (
            <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
          ) : (
            <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
          )}
          <p className={`text-sm font-medium ${
            isAtLimit ? 'text-red-800' :
            isNearLimit ? 'text-orange-800' :
            'text-blue-800'
          }`}>
            {isAtLimit ? 'You\'ve reached your monthly limit' :
             isNearLimit ? 'You\'re running low on credits' :
             'You\'re doing great! Keep creating'}
          </p>
        </div>
        <p className={`text-xs mt-1 ${
          isAtLimit ? 'text-red-600' :
          isNearLimit ? 'text-orange-600' :
          'text-blue-600'
        }`}>
          {isAtLimit ? 'Upgrade to Pro for unlimited presentations' :
           isNearLimit ? 'Consider upgrading to avoid interruptions' :
           'Resets on the 1st of each month'}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {(isAtLimit || isNearLimit) && (
          <Button 
            onClick={onUpgrade}
            className="flex-1"
            size="sm"
          >
            Upgrade to Pro
          </Button>
        )}
        <Button 
          variant="outline" 
          size="sm"
          className={isAtLimit || isNearLimit ? 'flex-1' : 'w-full'}
        >
          <Calendar className="w-4 h-4 mr-2" />
          View History
        </Button>
      </div>

      {/* Next Reset */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Credits reset:</span>
          <span className="font-medium">January 1, 2024</span>
        </div>
      </div>
    </Card>
  );
};