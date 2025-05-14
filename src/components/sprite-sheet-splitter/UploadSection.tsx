
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface UploadSectionProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onImageUpload }) => {
  return (
    <div className="w-full" id="sprite-slicer-tool">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Label htmlFor="image-upload" className="block mb-2 text-pixelSlicer-darkText font-pixelHeading text-xl">
          Upload Sprite Sheet
        </Label>
      </motion.div>
      
      <motion.div 
        className="border-2 border-dashed border-pixelSlicer-accent/50 rounded-xl p-8 text-center bg-white/50 shadow-md animate-pulse-border"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="mb-4 bg-pixelSlicer-accent/20 p-4 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ImageIcon size={32} className="text-pixelSlicer-darkText" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="outline"
              className="w-full md:w-auto flex gap-2 items-center bg-pixelSlicer-accent text-pixelSlicer-darkText hover:bg-pixelSlicer-accent/80 border-pixelSlicer-darkText/20 font-pixelHeading shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <Upload size={18} /> Choose File
            </Button>
          </motion.div>
          
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
          
          <motion.p 
            className="mt-4 text-sm text-pixelSlicer-darkTextSecondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            PNG, JPG, or GIF up to 5MB
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
