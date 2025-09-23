import React, { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { CreditsDisplay } from "./CreditsDisplay";
import axios from "axios";
import {
  Sparkles,
  Presentation,
  Lightbulb,
  Target,
  Users,
  Palette,
  Wand2,
  Brain,
  Zap,
} from "lucide-react";

interface CreatePresentationProps {
  onTabChange: (tab: string) => void;
  onCreatePresentation: () => boolean; // kept for backwards compatibility, unused for now
  userPlan: string;
  freeUsage: { presentations: number; limit: number };
  onUpgrade: () => void;
}

const templates = [
  {
    id: 1,
    name: "Business Presentation",
    description: "Professional slides for business meetings",
    icon: Presentation,
    color: "bg-blue-500",
    preview:
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Sales Pitch",
    description: "Compelling presentations to close deals",
    icon: Target,
    color: "bg-green-500",
    preview:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Team Update",
    description: "Internal presentations for team meetings",
    icon: Users,
    color: "bg-purple-500",
    preview:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Creative Brief",
    description: "Visually appealing creative presentations",
    icon: Palette,
    color: "bg-pink-500",
    preview:
      "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
  },
];

const aiSuggestions = [
  "Create a presentation about quarterly sales performance with charts and metrics",
  "Design a product launch presentation for a new mobile app",
  "Build a team onboarding presentation for new employees",
  "Generate a marketing strategy presentation for social media campaigns",
  "Create an investor pitch deck for a tech startup",
  "Design a training presentation about cybersecurity best practices",
];

export const CreatePresentation: React.FC<CreatePresentationProps> = ({
  onTabChange,
  // onCreatePresentation (unused while credits disabled)
  userPlan,
  freeUsage,
  onUpgrade,
}) => {
  const [prompt, setPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [slideCount, setSlideCount] = useState("10");
  const [duration, setDuration] = useState("15");
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const generationSteps = [
    "Analyzing your prompt...",
    "Generating content structure...",
    "Creating slide layouts...",
    "Applying design elements...",
    "Finalizing presentation...",
  ];

  const canGenerate = prompt.trim().length > 0 && selectedTemplate !== null;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);
    setGenerationStep(0);

    try {
      

      const data = {
        prompt: prompt.trim(),
        templateId: selectedTemplate,
        slideCount: Number(slideCount),
        duration: Number(duration),
      };

      // Simulate progress steps
      for (let i = 0; i < generationSteps.length; i++) {
        setGenerationStep(i);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Axios POST request
      const res = await axios.post(`${BASE_URL}/presentations/generate`, data, {
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("token")
            ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
            : {}),
        },
      });

      console.log("Generated:", res.data);
    } catch (err) {
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
      onTabChange("presentations");
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  // Temporarily disable credit gating
  // Temporarily disable credit gating (leave variable removed to avoid lint)

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Create Your Presentation
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Describe what you want to present, and our AI will create a beautiful
          presentation for you in seconds.
        </p>
      </div>

      {/* Credits Display */}
      <CreditsDisplay
        userPlan={userPlan}
        freeUsage={freeUsage}
        onUpgrade={onUpgrade}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Creation Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Prompt Section */}
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  AI-Powered Generation
                </h2>
                <p className="text-gray-600">
                  Tell us what you want to present
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Create a presentation about quarterly sales performance, including charts showing revenue growth, key metrics, and future projections for the next quarter..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-lg"
              />

              <div className="flex items-center text-sm text-gray-500">
                <Lightbulb className="w-4 h-4 mr-2" />
                <span>
                  Tip: Be specific about your topic, audience, and desired
                  outcome for best results
                </span>
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Popular prompts:
              </h3>
              <div className="flex flex-wrap gap-2">
                {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs px-3 py-2 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {suggestion.length > 50
                      ? suggestion.substring(0, 50) + "..."
                      : suggestion}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Template Selection */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Choose a Template Style
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`relative cursor-pointer transition-all duration-200 rounded-lg overflow-hidden ${
                    selectedTemplate === template.id
                      ? "ring-2 ring-purple-500 shadow-lg"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 ${template.color} rounded-lg flex items-center justify-center mr-3`}
                      >
                        <template.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {template.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Additional Options */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Presentation Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Number of Slides"
                type="number"
                value={slideCount}
                onChange={(e) => setSlideCount(e.target.value)}
                min="5"
                max="50"
              />
              <Input
                label="Duration (minutes)"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="5"
                max="120"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Creative</option>
                  <option>Academic</option>
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Generate Button */}
          <Card className="p-6">
            <Button
              onClick={handleGenerate}
              loading={isGenerating}
              disabled={!canGenerate} // <-- now properly updates
              size="lg"
              icon={isGenerating ? Wand2 : Sparkles}
              className="w-full text-lg py-4"
            >
              {isGenerating ? "Generating..." : "Generate Presentation"}
            </Button>

            {/* Credits gating disabled */}

            {isGenerating && (
              <div className="mt-4 space-y-3">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">
                    {generationSteps[generationStep]}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${
                        ((generationStep + 1) / generationSteps.length) * 100
                      }%`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  This may take a few moments. We're creating something amazing
                  for you!
                </p>
              </div>
            )}
          </Card>

          {/* AI Features */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              AI Features
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Smart Content
                  </p>
                  <p className="text-xs text-gray-600">
                    AI generates relevant content
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <Palette className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Auto Design
                  </p>
                  <p className="text-xs text-gray-600">
                    Beautiful layouts automatically
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <Brain className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Smart Structure
                  </p>
                  <p className="text-xs text-gray-600">
                    Logical flow and organization
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Pro Tips
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Include your target audience in the prompt</li>
              <li>• Mention specific data or metrics you want</li>
              <li>• Specify the presentation's main goal</li>
              <li>• Add any brand guidelines or preferences</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};
