
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Download, ZoomIn, X } from "lucide-react";
import { SpriteData } from "./types";
import { motion } from "framer-motion";

interface SpriteDisplayProps {
  sprites: SpriteData[];
}

export const SpriteDisplay: React.FC<SpriteDisplayProps> = ({ sprites }) => {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  const handleDownloadSprite = (dataUrl: string, index: number) => {
    import("@/utils/FileUtils").then(({ downloadSprite }) => {
      downloadSprite(dataUrl, `sprite_${index}.png`);
    });
  };

  const handleZoom = (index: number) => setZoomedIndex(index);
  const handleCloseZoom = () => setZoomedIndex(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl font-pixelHeading text-pixelSlicer-darkText mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Extracted Sprites <span className="bg-pixelSlicer-accent/20 px-3 py-1 rounded-full text-lg">{sprites.length}</span>
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sprites.map((sprite) => (
          <motion.div key={sprite.index} variants={itemVariants}>
            <Card className="overflow-hidden border-2 border-pixelSlicer-accent/10 hover:border-pixelSlicer-accent/30 bg-white/80 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="p-4 flex flex-col items-center">
                <div className="bg-white/50 rounded-lg p-3 mb-3 w-full flex items-center justify-center aspect-square relative group cursor-zoom-in" onClick={() => handleZoom(sprite.index)}>
                  <img 
                    src={sprite.dataUrl} 
                    alt={`Sprite ${sprite.index}`} 
                    className="max-w-full max-h-full object-contain pixelated"
                  />
                  <div className="absolute inset-0 bg-pixelSlicer-darkText/0 group-hover:bg-pixelSlicer-darkText/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg">
                    <div className="bg-white rounded-full p-1 shadow-md">
                      <ZoomIn size={16} className="text-pixelSlicer-darkText" />
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs flex items-center justify-center gap-1 border-pixelSlicer-darkText/20 text-pixelSlicer-darkText hover:bg-pixelSlicer-accent/20 font-pixelHeading"
                  onClick={() => handleDownloadSprite(sprite.dataUrl, sprite.index)}
                >
                  <Download size={14} /> Download
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    {/* Zoom Modal */}
    {zoomedIndex !== null && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={handleCloseZoom}>
        <div className="relative bg-white rounded-xl shadow-lg p-6" style={{ minWidth: 240, minHeight: 240 }} onClick={e => e.stopPropagation()}>
          <button onClick={handleCloseZoom} className="absolute top-2 right-2 text-pixelSlicer-darkText hover:text-red-500"><X size={24} /></button>
          <img
            src={sprites[zoomedIndex].dataUrl}
            alt={`Zoomed Sprite ${zoomedIndex}`}
            className="w-64 h-64 object-contain pixelated"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="text-center mt-2 font-pixelHeading text-pixelSlicer-darkText">Sprite #{zoomedIndex + 1}</div>
        </div>
      </div>
    )}
  </motion.div>
  );
};
