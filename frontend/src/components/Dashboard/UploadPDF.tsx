import React, { useState, useCallback } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { CreditsDisplay } from './CreditsDisplay';
import { 
  Upload, 
  FileText, 
  X,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

interface UploadPDFProps {
  onTabChange: (tab: string) => void;
  onUpgrade: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  error?: string;
}

export const UploadPDF: React.FC<UploadPDFProps> = ({ onTabChange, onUpgrade }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFile = async (file: File) => {
    const fileId = Math.random().toString(36).substr(2, 9);
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0
    };

    setFiles(prev => [...prev, uploadedFile]);

    // Simulate upload progress
    for (let progress = 0; progress <= 100; progress += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    }

    // Simulate processing
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'processing', progress: 0 } : f
    ));

    for (let progress = 0; progress <= 100; progress += 20) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    }

    // Complete processing
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'completed', progress: 100 } : f
    ));
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    Array.from(selectedFiles).forEach(file => {
      if (file.type === 'application/pdf') {
        processFile(file);
      } else {
        const fileId = Math.random().toString(36).substr(2, 9);
        setFiles(prev => [...prev, {
          id: fileId,
          name: file.name,
          size: file.size,
          status: 'error',
          progress: 0,
          error: 'Only PDF files are supported'
        }]);
      }
    });
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    handleFileSelect(e.dataTransfer.files);
  }, []);

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const completedFiles = files.filter(f => f.status === 'completed');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload PDF to Presentation</h1>
        <p className="text-lg text-gray-600">
          Upload your PDF documents and convert them into beautiful, editable presentations.
        </p>
      </div>

      {/* Credits Display */}
      <CreditsDisplay 
        userPlan="free"
        freeUsage={{ presentations: 3, limit: 5 }}
        onUpgrade={onUpgrade}
      />

      {/* Upload Area */}
      <Card className="p-8">
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
            isDragActive
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-purple-400'
          }`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Drop your PDF files here
          </h3>
          <p className="text-gray-600 mb-6">
            or click to browse from your computer
          </p>
          
          <label htmlFor="file-upload">
            <Button as="span" className="cursor-pointer">
              Select PDF Files
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          
          <p className="text-sm text-gray-500 mt-4">
            Supports PDF files up to 50MB
          </p>
        </div>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Progress</h3>
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center ml-4">
                      {file.status === 'uploading' && (
                        <Loader className="w-4 h-4 text-blue-500 animate-spin" />
                      )}
                      {file.status === 'processing' && (
                        <Loader className="w-4 h-4 text-purple-500 animate-spin" />
                      )}
                      {file.status === 'completed' && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {file.status === 'uploading' && `Uploading... ${file.progress}%`}
                      {file.status === 'processing' && `Processing... ${file.progress}%`}
                      {file.status === 'completed' && 'Ready to convert'}
                      {file.status === 'error' && file.error}
                    </span>
                  </div>
                  
                  {(file.status === 'uploading' || file.status === 'processing') && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          file.status === 'uploading' ? 'bg-blue-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Convert Button */}
      {completedFiles.length > 0 && (
        <div className="text-center">
          <Button
            size="lg"
            icon={FileText}
            onClick={() => onTabChange('presentations')}
            className="px-12 py-4 text-lg"
          >
            Convert to Presentations ({completedFiles.length})
          </Button>
          <p className="text-sm text-gray-600 mt-2">
            This will create editable presentations from your uploaded PDFs
          </p>
        </div>
      )}

      {/* Tips */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Best Results</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Upload high-quality PDF files for better text recognition</li>
          <li>• Ensure your PDFs have clear, readable text and images</li>
          <li>• Files with complex layouts may require manual adjustments</li>
          <li>• The conversion process preserves your original formatting as much as possible</li>
        </ul>
      </Card>
    </div>
  );
};