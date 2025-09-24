import React, { useEffect } from "react";
import axios from "axios";
import {
  Home,
  FileText,
  Upload,
  Settings,
  User,
  LogOut,
  Sparkles,
  FolderOpen,
  CreditCard,
  AlertCircle,
  X,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  userPlan: string;
  freeUsage: { presentations: number; limit: number };
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "create", label: "Create Presentation", icon: Sparkles },
  { id: "presentations", label: "My Presentations", icon: FileText },
  { id: "upload", label: "Upload PDF", icon: Upload },
  { id: "templates", label: "Templates", icon: FolderOpen },
  { id: "billing", label: "Billing & Usage", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "profile", label: "Profile", icon: User },
];

interface User{
  name : string;
  email: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  userPlan,
  freeUsage,
  isMobileMenuOpen = false,
  onMobileMenuToggle,
}) => {


  const usagePercentage = (freeUsage.presentations / freeUsage.limit) * 100;
  const isNearLimit = usagePercentage >= 80;
  const [user,setUser] = React.useState<User | null >(null);

  const BASE_URL = 'http://localhost:3000';

  async function getUser(){
    try {

      const response = await axios.get<User>(`${BASE_URL}/user/getProfile`,{
        headers : {
          Authorization : `Bearer ${localStorage.getItem("token")}`,
        }
      })

      console.log("User Profile:", response.data);
      setUser(response.data);
      console.log("User state:", user);

      
    } catch (error) {
      console.error("Error fetching user profile:", error);
      
    } 
  }

  useEffect(()=>{
    getUser();
  },[]);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">PresentAI</h1>
          </div>
          {/* Mobile close button */}
          {onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Free Plan Usage Warning */}
      {userPlan === "free" && isNearLimit && (
        <div className="m-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm font-medium text-orange-800">
              Usage Alert
            </span>
          </div>
          <p className="text-xs text-orange-700 mb-2">
            {freeUsage.presentations}/{freeUsage.limit} presentations used
          </p>
          <div className="w-full bg-orange-200 rounded-full h-1.5 mb-2">
            <div
              className="bg-orange-500 h-1.5 rounded-full"
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
          <button
            onClick={() => {
              onTabChange("billing");
              onMobileMenuToggle?.();
            }}
            className="text-xs text-orange-600 hover:text-orange-800 font-medium"
          >
            Upgrade to Pro →
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  onTabChange(item.id);
                  onMobileMenuToggle?.();
                }}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="text-sm md:text-base">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          {user && (
            <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{userPlan} Plan</p>
          </div>
          )}
        </div>

        {/* Free Plan Usage */}
        {userPlan === "free" && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Presentations</span>
              <span className="text-xs font-medium text-gray-900">
                {freeUsage.presentations}/{freeUsage.limit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isNearLimit ? "bg-orange-500" : "bg-purple-500"
                }`}
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={() => {
            try {
              localStorage.removeItem("token");
            } catch {
              // ignore storage errors (private mode, etc.)
            }
            onLogout();
            onMobileMenuToggle?.();
          }}
          className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 mr-3" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-white border-r border-gray-200 h-screen flex-col">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onMobileMenuToggle}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl flex flex-col">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
