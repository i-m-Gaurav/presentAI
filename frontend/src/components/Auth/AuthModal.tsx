import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import  axios  from 'axios';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultMode?: 'login' | 'signup';
}

interface LoginResponse {
  token: string;
  message: string;
}

interface SignupResponse {
  message: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    if (mode === "signup") {
      // Signup API

      console.log(`${BASE_URL}/user/signup`);
      const response = await axios.post<SignupResponse>(`${BASE_URL}/user/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });


      console.log("response",response.data);

      // After signup, switch to login mode automatically
      setMode("login");
      setLoading(false);
      setError("Signup successful! Please login.");
      return;
    }

    if (mode === "login") {
      console.log(`${BASE_URL}/user/login`);
      const response = await axios.post<LoginResponse>(`${BASE_URL}/user/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { token } = response.data;

      // Save token in localStorage
      localStorage.setItem("token", token);

      setLoading(false);
      onSuccess();  // notify App.tsx that login succeeded
      onClose();    // close modal
      return;
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  }

  setLoading(false);
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleDemoLogin = () => {
    setFormData({
      name: '',
      email: 'demo@presentai.com',
      password: 'demo123'
    });
    setMode('login');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-600">
          {mode === 'login' 
            ? 'Sign in to your account to continue' 
            : 'Join thousands of users creating amazing presentations'
          }
        </p>
      </div>

      {/* Demo Login Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-purple-900">Try the demo</p>
            <p className="text-xs text-purple-700">Use demo credentials or any email/password</p>
          </div>
          <Button
            size="sm"
            onClick={handleDemoLogin}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Demo Login
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {mode === 'signup' && (
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="pl-12"
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="pl-12"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="pl-12 pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={loading}
        >
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="ml-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>

      {/* Demo Instructions */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          <strong>Demo Mode:</strong> Use "demo@presentai.com" / "demo123\" or any email/password combination to access the dashboard
        </p>
      </div>
    </Modal>
  );
};