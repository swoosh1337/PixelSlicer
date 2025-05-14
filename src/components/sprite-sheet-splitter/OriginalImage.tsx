
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, ZoomIn, ZoomOut } from "lucide-react";

interface OriginalImageProps {
  imageUrl: string;
}

export const OriginalImage: React.FC<OriginalImageProps> = ({ imageUrl }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  return (
    <div className="flex flex-col h-full">
      <motion.h2 
        className="text-xl font-pixelHeading text-pixelSlicer-darkText mb-3 flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Eye size={18} className="text-pixelSlicer-accent" />
        Original Sprite Sheet
      </motion.h2>
      
      <motion.div 
        className={`flex-1 border-2 border-pixelSlicer-accent/20 rounded-xl overflow-hidden bg-white/50 p-4 flex items-center justify-center shadow-md relative group cursor-pointer ${isZoomed ? 'bg-white/80' : ''}` }
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        onClick={toggleZoom}
      >
        <img
          src={imageUrl}
          alt="Original sprite sheet"
          className={`transition-all duration-300 pixelated object-contain ${isZoomed ? 'max-h-[350px] scale-150' : 'max-h-[250px]'}`}
        />
        
        <div className="absolute top-2 right-2 bg-white/80 rounded-full p-2 shadow-md z-10">
          {isZoomed ? (
            <ZoomOut size={18} className="text-pixelSlicer-darkText" />
          ) : (
            <ZoomIn size={18} className="text-pixelSlicer-darkText" />
          )}
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-3 text-center text-sm text-pixelSlicer-darkTextSecondary italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Click to {isZoomed ? 'zoom out' : 'zoom in'}
      </motion.div>
    </div>
  );
};
