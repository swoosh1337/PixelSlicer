
import React from "react";
import { ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  const handleScrollToTool = () => {
    // Scroll to the tool section
    const toolSection = document.querySelector("#sprite-slicer-tool");
    if (toolSection) {
      toolSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 text-center">
      <motion.h1 
        className="text-4xl md:text-6xl lg:text-7xl font-pixelHeading mb-6 text-pixelSlicer-darkText"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Pixel<span className="text-pixelSlicer-accent">Slicer</span>
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl mb-8 text-pixelSlicer-darkTextSecondary max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Slice up a sprite sheet and export individual frames
      </motion.p>
      
      <motion.div 
        className="relative max-w-3xl mx-auto mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-8 border-2 border-dashed border-pixelSlicer-accent/50 rounded-xl bg-white/30 cursor-pointer hover:bg-white/50 transition-all duration-300 hover:-translate-y-1 animate-pulse-border"
          onClick={handleScrollToTool}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-pixelSlicer-accent/20 rounded-full p-4">
              <Upload size={32} className="text-pixelSlicer-darkText" />
            </div>
            <p className="font-pixelHeading text-xl text-pixelSlicer-darkText">Upload your sprite sheet</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button 
          className="bg-pixelSlicer-accent hover:bg-pixelSlicer-accent/80 text-pixelSlicer-darkText font-pixelHeading px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          onClick={handleScrollToTool}
        >
          Start Slicing Now
        </Button>
        <a href="https://www.pixelmint.art" target="_blank" rel="noopener noreferrer">
          <Button 
            variant="outline"
            className="border-pixelSlicer-darkText text-pixelSlicer-darkText hover:bg-pixelSlicer-darkText hover:text-pixelSlicer-background font-pixelHeading px-8 py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Try PixelMint <ArrowRight className="ml-2" size={18} />
          </Button>
        </a>
      </motion.div>
      
      <motion.div 
        className="mt-8 flex justify-center gap-6 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-pixelSlicer-accent font-bold">✓</span>
          <span className="text-pixelSlicer-darkTextSecondary">Supports up to 12 tiles</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-pixelSlicer-accent font-bold">✓</span>
          <span className="text-pixelSlicer-darkTextSecondary">Download each frame</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-pixelSlicer-accent font-bold">✓</span>
          <span className="text-pixelSlicer-darkTextSecondary">Preview at 1x, 2x, 4x</span>
        </div>
      </motion.div>

      {/* CSS animations added via Tailwind classes */}
    </section>
  );
};
