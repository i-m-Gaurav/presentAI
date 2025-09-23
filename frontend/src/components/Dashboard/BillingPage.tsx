import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Zap,
  Star,
  Gift,
  Settings,
  X,
  Edit
} from 'lucide-react';

interface BillingPageProps {
  onUpgrade: () => void;
}

const billingHistory = [
  {
    id: 1,
    date: '2024-01-15',
    description: 'Pro Plan - Monthly Subscription',
    amount: '$19.00',
    status: 'paid',
    invoice: 'INV-2024-001'
  },
  {
    id: 2,
    date: '2023-12-15',
    description: 'Pro Plan - Monthly Subscription',
    amount: '$19.00',
    status: 'paid',
    invoice: 'INV-2023-012'
  },
  {
    id: 3,
    date: '2023-11-15',
    description: 'Pro Plan - Monthly Subscription',
    amount: '$19.00',
    status: 'paid',
    invoice: 'INV-2023-011'
  },
  {
    id: 4,
    date: '2023-10-15',
    description: 'Pro Plan - Monthly Subscription',
    amount: '$19.00',
    status: 'paid',
    invoice: 'INV-2023-010'
  }
];

const usageStats = {
  presentationsUsed: 8,
  presentationsLimit: 20,
  storageUsed: 2.4,
  storageLimit: 10,
  aiGenerationsUsed: 15,
  aiGenerationsLimit: 50
};

export const BillingPage: React.FC<BillingPageProps> = ({ onUpgrade }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showManageModal, setShowManageModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: billingCycle === 'monthly' ? '$0' : '$0',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'Perfect for getting started',
      features: [
        '5 presentations per month',
        '10 AI generations',
        'Basic templates',
        'PDF upload',
        'Standard export',
        'Community support'
      ],
      current: false,
      popular: false
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '$19' : '$190',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      description: 'For professionals and teams',
      features: [
        'Unlimited presentations',
        'Unlimited AI generations',
        'Premium templates',
        'Advanced AI features',
        'Priority support',
        'Team collaboration',
        'Custom branding',
        'Analytics dashboard',
        'API access'
      ],
      current: true,
      popular: true,
      savings: billingCycle === 'yearly' ? 'Save $38/year' : null
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated support',
        'Advanced security',
        'Custom training',
        'SLA guarantee',
        'White-label solution',
        'Advanced analytics'
      ],
      current: false,
      popular: false
    }
  ];

  const handleCancelSubscription = () => {
    setShowCancelModal(false);
    // Handle cancellation logic here
    alert('Subscription cancelled successfully. You can continue using Pro features until your current billing period ends.');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Billing & Usage</h1>
        <p className="text-gray-600">Manage your subscription and view usage statistics</p>
      </div>

      {/* Current Plan & Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Current Plan */}
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
              Pro Plan
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm md:text-base">Monthly Cost</span>
              <span className="font-semibold">$19.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm md:text-base">Next Billing</span>
              <span className="font-semibold text-sm md:text-base">Feb 15, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm md:text-base">Status</span>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium text-sm">Active</span>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => setShowManageModal(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Manage Subscription
          </Button>
        </Card>

        {/* Usage Statistics */}
        <Card className="p-4 md:p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage This Month</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-gray-700 text-sm md:text-base">Presentations Created</span>
                </div>
                <span className="text-sm font-medium">
                  {usageStats.presentationsUsed}/{usageStats.presentationsLimit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(usageStats.presentationsUsed / usageStats.presentationsLimit) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-gray-700 text-sm md:text-base">AI Generations</span>
                </div>
                <span className="text-sm font-medium">
                  {usageStats.aiGenerationsUsed}/{usageStats.aiGenerationsLimit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(usageStats.aiGenerationsUsed / usageStats.aiGenerationsLimit) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-700 text-sm md:text-base">Storage Used</span>
                </div>
                <span className="text-sm font-medium">
                  {usageStats.storageUsed}GB/{usageStats.storageLimit}GB
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(usageStats.storageUsed / usageStats.storageLimit) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Upgrade Plans */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Available Plans</h2>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`p-4 md:p-6 relative ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              } ${plan.current ? 'bg-purple-50 border-purple-200' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 md:px-4 py-2 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {plan.current && (
                <div className="absolute -top-4 right-4">
                  <div className="flex items-center bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Current
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                {plan.savings && (
                  <p className="text-green-600 text-sm font-medium mt-2">{plan.savings}</p>
                )}
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className="w-full"
                variant={plan.current ? 'outline' : plan.popular ? 'primary' : 'outline'}
                size="lg"
                disabled={plan.current}
                onClick={onUpgrade}
              >
                {plan.current ? 'Current Plan' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">Billing History</h3>
          <Button variant="outline" icon={Download} size="sm">
            Download All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">Date</th>
                <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">Description</th>
                <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">Amount</th>
                <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">Status</th>
                <th className="text-left py-3 px-2 md:px-4 font-medium text-gray-700 text-sm">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-2 md:px-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 text-gray-400 mr-2" />
                      <span className="text-sm">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 md:px-4 text-gray-900 text-sm">{item.description}</td>
                  <td className="py-4 px-2 md:px-4 font-semibold text-sm">{item.amount}</td>
                  <td className="py-4 px-2 md:px-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                      <span className="text-green-600 font-medium capitalize text-sm">{item.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 md:px-4">
                    <Button variant="ghost" size="sm" icon={Download}>
                      <span className="hidden sm:inline">{item.invoice}</span>
                      <span className="sm:hidden">PDF</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Payment Method */}
      <Card className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">Payment Method</h3>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Update Payment
          </Button>
        </div>

        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center mr-4">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
            <p className="text-sm text-gray-600">Expires 12/2025</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Primary</p>
          </div>
        </div>
      </Card>

      {/* Manage Subscription Modal */}
      <Modal
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
        title="Manage Subscription"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pro Plan</h3>
            <p className="text-gray-600 mb-4">$19.00/month • Next billing: Feb 15, 2024</p>
            <div className="flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-600 font-medium">Active Subscription</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                setShowManageModal(false);
                setBillingCycle('yearly');
              }}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Switch to Annual Billing (Save 17%)
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
            >
              <Edit className="w-5 h-5 mr-3" />
              Update Payment Method
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
            >
              <Download className="w-5 h-5 mr-3" />
              Download Invoices
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                setShowManageModal(false);
                setShowCancelModal(true);
              }}
            >
              <X className="w-5 h-5 mr-3" />
              Cancel Subscription
            </Button>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
            <p className="text-sm text-blue-700 mb-3">
              Contact our support team if you have any questions about your subscription.
            </p>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
              Contact Support
            </Button>
          </div>
        </div>
      </Modal>

      {/* Cancel Subscription Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Subscription"
        size="md"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Your Subscription?</h3>
            <p className="text-gray-600">
              You'll lose access to Pro features at the end of your current billing period (Feb 15, 2024).
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">What you'll lose:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Unlimited presentations</li>
              <li>• Advanced AI features</li>
              <li>• Premium templates</li>
              <li>• Priority support</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowCancelModal(false)}
            >
              Keep Subscription
            </Button>
            <Button
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={handleCancelSubscription}
            >
              Cancel Subscription
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            You can reactivate your subscription at any time before it expires.
          </p>
        </div>
      </Modal>
    </div>
  );
};