
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, TestTube, Scissors } from "lucide-react";

export const ExampleGallery: React.FC = () => {
  const [spriteImage, setSpriteImage] = useState<string>("");
  
  useEffect(() => {
    // Set the sprite image path once the component mounts
    setSpriteImage("/assets/sprites.png");
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Boxer sprite frames - individual frames from the assets folder
  const boxerFrames = [
    { id: 0, src: "/assets/sprite_0.png", label: "Frame 1" },
    { id: 1, src: "/assets/sprite_1.png", label: "Frame 2" },
    { id: 2, src: "/assets/sprite_2.png", label: "Frame 3" },
    { id: 3, src: "/assets/sprite_3.png", label: "Frame 4" },
    { id: 4, src: "/assets/sprite_4.png", label: "Frame 5" },
    { id: 5, src: "/assets/sprite_5.png", label: "Frame 6" }
  ];

  return (
    <section className="py-16 bg-white/10 rounded-2xl border border-pixelSlicer-accent/10 shadow-sm my-12">
      <motion.div
        className="flex items-center justify-center gap-3 mb-8"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <TestTube className="text-pixelSlicer-accent" size={24} />
        <h2 className="text-3xl font-pixelHeading text-pixelSlicer-darkText text-center">
          Example: From Sheet to Frames
        </h2>
      </motion.div>
      
      <motion.p
        className="text-center text-pixelSlicer-darkTextSecondary max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Here's what PixelSlicer can do with your sprite sheets
      </motion.p>
      
      <motion.div 
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Sprite Sheet - BEFORE */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-pixelHeading text-pixelSlicer-darkText">
              <span className="inline-block bg-pixelSlicer-accent/20 px-3 py-1 rounded mr-2">BEFORE</span>
              Original Sprite Sheet
            </h3>
          </div>
          
          <div className="bg-pixelSlicer-accent/10 p-6 rounded-xl flex justify-center">
            <div className="bg-white border-2 border-dashed border-pixelSlicer-accent/50 rounded-lg p-4 inline-block shadow-md relative group overflow-hidden">
              {spriteImage ? (
                <img 
                  src={spriteImage} 
                  alt="Boxer Sprite Sheet"
                  className="max-h-48 w-auto pixelated"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="h-48 w-48 flex items-center justify-center">
                  <div className="animate-spin h-8 w-8 border-4 border-pixelSlicer-accent/20 border-t-pixelSlicer-accent rounded-full" />
                </div>
              )}
              
              {/* Grid overlay to show the 2x3 grid */}
              <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="border border-pixelSlicer-accent/50" />
                ))}
              </div>
              
              <div className="absolute bottom-2 right-2 bg-pixelSlicer-accent/90 text-white text-xs px-2 py-1 rounded-full">
                2×3 Grid
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Arrow connecting the steps */}
        <motion.div 
          className="flex justify-center items-center gap-3" 
          variants={itemVariants}
        >
          <div className="h-px bg-pixelSlicer-accent/30 flex-grow max-w-xs" />
          <div className="bg-pixelSlicer-accent/20 rounded-full p-3 flex items-center justify-center">
            <Scissors className="text-pixelSlicer-darkText" size={24} />
          </div>
          <div className="h-px bg-pixelSlicer-accent/30 flex-grow max-w-xs" />
        </motion.div>
        
        {/* Sliced Frames - AFTER */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-pixelHeading text-pixelSlicer-darkText">
              <span className="inline-block bg-pixelSlicer-accent/20 px-3 py-1 rounded mr-2">AFTER</span>
              Individual Frames
            </h3>
          </div>
          
          <div className="bg-pixelSlicer-accent/10 p-6 rounded-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-2">
              {boxerFrames.map((frame) => (
                <motion.div 
                  key={frame.id} 
                  className="bg-white border-2 border-pixelSlicer-accent/30 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: frame.id * 0.1 }}
                >
                  <div className="relative bg-white/50 p-2 rounded mb-2 flex items-center justify-center aspect-square w-full">
                    {frame.src ? (
                      <img 
                        src={frame.src} 
                        alt={`Boxer Sprite ${frame.id + 1}`}
                        className="h-16 w-16 pixelated object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="h-16 w-16 flex items-center justify-center">
                        <div className="animate-spin h-4 w-4 border-2 border-pixelSlicer-accent/20 border-t-pixelSlicer-accent rounded-full" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-pixelSlicer-darkTextSecondary font-medium">
                    {frame.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.p 
            className="text-center text-sm text-pixelSlicer-darkTextSecondary mt-6 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            PixelSlicer automatically extracts each frame from your sprite sheet
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};
