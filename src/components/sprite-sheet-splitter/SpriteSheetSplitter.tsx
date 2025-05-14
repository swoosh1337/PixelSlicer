
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { SpriteData } from "./types";
import { UploadSection } from "./UploadSection";
import { ControlsSection } from "./ControlsSection";
import { SpriteDisplay } from "./SpriteDisplay";
import { OriginalImage } from "./OriginalImage";
import { Separator } from "@/components/ui/separator";
import { sliceSpritesFromImage } from "./sprite-utils";
import { motion, AnimatePresence } from "framer-motion";

export const SpriteSheetSplitter = () => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [rows, setRows] = useState<number>(2);
  const [columns, setColumns] = useState<number>(3);
  const [sprites, setSprites] = useState<SpriteData[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // Reset sprites when new image is uploaded
        setSprites([]);
        
        // Create image element from uploaded file
        const img = new window.Image();
        img.onload = () => {
          setImage(img);
        };
        img.src = event.target.result as string;
        setImageUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
    toast.success("Image uploaded successfully!");
  };

  // Process sprites when image, rows, or columns change
  useEffect(() => {
    if (image && canvasRef.current) {
      setIsProcessing(true);
      // Small delay to allow the loading animation to be visible
      setTimeout(() => {
        const newSprites = sliceSpritesFromImage(image, rows, columns, canvasRef.current);
        setSprites(newSprites);
        setIsProcessing(false);
        if (newSprites.length > 0) {
          toast.success("Sprites extracted successfully!");
        }
      }, 600);
    }
  }, [image, rows, columns]);

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <UploadSection onImageUpload={handleImageUpload} />
          <ControlsSection 
            rows={rows} 
            columns={columns} 
            setRows={setRows} 
            setColumns={setColumns} 
            hasSprites={sprites.length > 0}
            sprites={sprites}
          />
        </div>
        
        <AnimatePresence>
          {imageUrl && (
            <motion.div
              key="original-image"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <OriginalImage imageUrl={imageUrl} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
      
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-pixelSlicer-accent/20" />
              <div className="absolute inset-0 rounded-full border-t-4 border-pixelSlicer-accent animate-spin" />
            </div>
            <p className="mt-4 text-pixelSlicer-darkTextSecondary font-pixelHeading">Processing sprites...</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {sprites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Separator className="my-8 bg-pixelSlicer-darkText/10" />
            <SpriteDisplay sprites={sprites} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
