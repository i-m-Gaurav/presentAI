import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Play, ChevronDown, Zap, Brain, Wand2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeroProps {
  onGetStarted: () => void;
}

const presentationExamples = [
  {
    title: "Sales Performance Q4",
    subtitle: "Executive Dashboard",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    category: "Business",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Product Launch Strategy", 
    subtitle: "Marketing Presentation",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    category: "Marketing",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Team Training Module",
    subtitle: "Educational Content", 
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    category: "Education",
    color: "from-green-500 to-emerald-500"
  }
];

const aiSteps = [
  { icon: Brain, text: "Understanding your prompt...", color: "text-blue-500" },
  { icon: Wand2, text: "Generating content structure...", color: "text-purple-500" },
  { icon: Sparkles, text: "Applying beautiful design...", color: "text-pink-500" },
  { icon: Zap, text: "Finalizing your presentation...", color: "text-green-500" }
];

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [currentExample, setCurrentExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % presentationExamples.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isGenerating) {
      const stepTimer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= aiSteps.length - 1) {
            setIsGenerating(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1500);
      return () => clearInterval(stepTimer);
    }
  }, [isGenerating]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const startDemo = () => {
    setIsGenerating(true);
    setCurrentStep(0);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${20 + mousePosition.x * 0.02}%`,
            top: `${10 + mousePosition.y * 0.02}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            right: `${15 + mousePosition.x * -0.015}%`,
            top: `${30 + mousePosition.y * 0.01}%`,
            transform: 'translate(50%, -50%)',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute w-72 h-72 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${60 + mousePosition.x * 0.01}%`,
            bottom: `${20 + mousePosition.y * -0.01}%`,
            transform: 'translate(-50%, 50%)',
            animationDelay: '2s'
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Left Column - Content */}
          <div className="space-y-8 text-white">
            
            {/* Floating Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3" />
              <Sparkles className="w-5 h-5 mr-2 text-purple-300" />
              <span className="text-sm font-medium">AI-Powered • Live Demo Available</span>
            </div>

            {/* Main Headline with Typewriter Effect */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                <span className="block text-white">Create</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                  Stunning
                </span>
                <span className="block text-white">Presentations</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-300 font-light">
                  in <span className="text-purple-400 font-bold">Seconds</span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Just describe your idea and watch our AI create 
                <span className="text-purple-400 font-semibold"> professional presentations </span>
                instantly. No design skills needed.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="group text-xl px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 border-2 border-purple-400/50"
              >
                <Sparkles className="w-6 h-6 mr-3 group-hover:animate-spin" />
                Start Creating Free
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={startDemo}
                className="text-xl px-10 py-5 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Play className="w-6 h-6 mr-3" />
                Watch AI in Action
              </Button>
            </div>

            {/* Trust Indicators with Animation */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              {[
                { number: "500K+", label: "Presentations Created", delay: "0s" },
                { number: "50K+", label: "Happy Users", delay: "0.2s" },
                { number: "4.9★", label: "User Rating", delay: "0.4s" }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="text-center transform hover:scale-110 transition-all duration-300"
                  style={{ animationDelay: stat.delay }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 animate-pulse">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="relative">
            
            {/* Main Demo Container */}
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              
              {/* Demo Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="text-white/80 text-sm font-medium">PresentAI Studio</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs font-medium">Live Demo</span>
                </div>
              </div>

              {/* AI Generation Status */}
              {isGenerating && (
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                      {React.createElement(aiSteps[currentStep].icon, { 
                        className: "w-4 h-4 text-white animate-spin" 
                      })}
                    </div>
                    <div>
                      <p className="text-white font-medium">{aiSteps[currentStep].text}</p>
                      <p className="text-purple-300 text-sm">Step {currentStep + 1} of {aiSteps.length}</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((currentStep + 1) / aiSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Slide Preview */}
              <div className="relative overflow-hidden rounded-2xl mb-6 group">
                <div className="aspect-video relative transition-all duration-700">
                  <img
                    src={presentationExamples[currentExample].image}
                    alt={presentationExamples[currentExample].title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Dynamic Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${presentationExamples[currentExample].color} opacity-60`} />
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                        {presentationExamples[currentExample].category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">AI Generated</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{presentationExamples[currentExample].title}</h3>
                    <p className="text-white/90 text-lg">{presentationExamples[currentExample].subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Interactive Controls */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  {presentationExamples.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentExample(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentExample 
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400 scale-125 shadow-lg' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-white/60 text-sm">
                    {currentExample + 1} / {presentationExamples.length}
                  </div>
                  <button
                    onClick={startDemo}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Generate New
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Action Bubbles */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80 animate-bounce shadow-2xl" />
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-60 animate-pulse shadow-2xl" />
            <div className="absolute top-1/2 -right-4 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-70 animate-ping shadow-xl" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center cursor-pointer hover:text-white transition-colors">
            <span className="text-sm mb-2 font-medium">Discover More</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};