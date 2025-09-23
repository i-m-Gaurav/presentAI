import React from 'react';
import { Sparkles, Mail, Phone, MapPin, Twitter, Linkedin, Github, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">PresentAI</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Transform your ideas into stunning presentations with AI. Create professional slides in seconds, not hours.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Pricing</a></li>
              <li><a href="#templates" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Templates</a></li>
              <li><a href="#integrations" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Integrations</a></li>
              <li><a href="#api" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">About Us</a></li>
              <li><a href="#careers" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Careers</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Blog</a></li>
              <li><a href="#press" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Press</a></li>
              <li><a href="#partners" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Partners</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#help" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Help Center</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Contact Us</a></li>
              <li><a href="#status" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">System Status</a></li>
              <li><a href="#security" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Security</a></li>
              <li><a href="#privacy" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Privacy Policy</a></li>
            </ul>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">support@presentai.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 PresentAI. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0">
              <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};