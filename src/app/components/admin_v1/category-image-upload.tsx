import React, { useRef, forwardRef } from 'react';
import { Upload, X, ImageIcon, RefreshCw } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryImageUploadProps {
  imageUrl?: string;
  onImageChange: (url: string | undefined) => void;
  categoryName: string;
}

export const CategoryImageUpload = forwardRef<HTMLDivElement, CategoryImageUploadProps>(
  ({ imageUrl, onImageChange, categoryName }, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // In a real app, we would upload to a server. 
        // For this demo, we'll use a URL.createObjectURL or a mock URL.
        const mockUrl = URL.createObjectURL(file);
        onImageChange(mockUrl);
      }
    };

    const handleRemove = () => {
      onImageChange(undefined);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    return (
      <div ref={ref} className="font-normal">
        <label className="block text-xs font-normal text-gray-400 uppercase tracking-widest mb-3">
          Category Image
        </label>
        
        <div className="flex items-start gap-6">
          <div className="relative group">
            <div className={`w-32 h-32 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center transition-all ${!imageUrl ? 'border-dashed border-gray-200' : ''}`}>
              {imageUrl ? (
                <ImageWithFallback 
                  src={imageUrl} 
                  alt={categoryName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <ImageIcon className="w-8 h-8 opacity-20" />
                </div>
              )}
            </div>
            
            {imageUrl && (
              <button
                onClick={handleRemove}
                className="absolute -top-2 -right-2 p-1.5 bg-white border border-gray-100 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-colors cursor-pointer"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex-1 space-y-3 py-1">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleUploadClick}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-normal text-gray-700 hover:bg-[#FF7A59]/5 hover:border-[#FF7A59]/30 hover:text-[#FF7A59] transition-all uppercase tracking-widest cursor-pointer"
              >
                {imageUrl ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    Replace image
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    Upload image
                  </>
                )}
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Used for category representation across the platform. Recommended size: 800x800px.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

CategoryImageUpload.displayName = 'CategoryImageUpload';