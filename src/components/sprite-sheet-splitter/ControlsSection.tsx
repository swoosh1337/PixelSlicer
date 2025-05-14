
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Grid, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { SpriteData } from "./types";
import { motion } from "framer-motion";

interface ControlsSectionProps {
  rows: number;
  columns: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  setColumns: React.Dispatch<React.SetStateAction<number>>;
  hasSprites: boolean;
  sprites: SpriteData[];
}

export const ControlsSection: React.FC<ControlsSectionProps> = ({ 
  rows, 
  columns, 
  setRows, 
  setColumns,
  hasSprites,
  sprites
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number>>) => {
    // Get the raw value from the input field
    const rawValue = e.target.value;
    
    // Convert to number or use 1 as default if empty
    const value = rawValue === '' ? 1 : parseInt(rawValue);
    
    // Only update if it's a valid positive number
    if (!isNaN(value) && value > 0 && value <= 12) {
      setter(value);
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Select all text when the input gets focus for easier editing
    e.target.select();
  };

  const incrementValue = (current: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
    if (current < 12) {
      setter(current + 1);
    }
  };
  
  const decrementValue = (current: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
    if (current > 1) {
      setter(current - 1);
    }
  };

  const handleDownloadAll = () => {
    if (!hasSprites || !sprites.length) {
      toast.error("No sprites to download");
      return;
    }
    
    import("@/utils/FileUtils").then(({ downloadAllSprites }) => {
      downloadAllSprites(sprites, "sprites.zip")
        .then(() => {
          toast.success("All sprites downloaded as ZIP");
        })
        .catch((error) => {
          toast.error("Failed to download sprites: " + error.message);
        });
    });
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div>
        <Label htmlFor="grid-config" className="block mb-3 text-pixelSlicer-darkText font-pixelHeading text-xl">
          <Grid size={18} className="inline mr-2" /> Configure Grid
        </Label>
        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white/50 rounded-lg p-4 border-2 border-pixelSlicer-accent/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Label htmlFor="rows" className="block mb-2 text-sm font-medium text-pixelSlicer-darkTextSecondary">
              Rows
            </Label>
            <div className="flex items-center">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-r-none border-pixelSlicer-darkText/20 bg-white hover:bg-pixelSlicer-accent/20"
                onClick={() => decrementValue(rows, setRows)}
                disabled={rows <= 1}
              >
                <Minus size={14} />
              </Button>
              <Input
                id="rows"
                type="number"
                min={1}
                max={12}
                value={rows}
                onChange={(e) => handleInputChange(e, setRows)}
                onFocus={handleInputFocus}
                className="rounded-none text-center border-x-0 border-pixelSlicer-darkText/20 bg-white"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-l-none border-pixelSlicer-darkText/20 bg-white hover:bg-pixelSlicer-accent/20"
                onClick={() => incrementValue(rows, setRows)}
                disabled={rows >= 12}
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>
          
          <div className="bg-white/50 rounded-lg p-4 border-2 border-pixelSlicer-accent/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Label htmlFor="columns" className="block mb-2 text-sm font-medium text-pixelSlicer-darkTextSecondary">
              Columns
            </Label>
            <div className="flex items-center">
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-r-none border-pixelSlicer-darkText/20 bg-white hover:bg-pixelSlicer-accent/20"
                onClick={() => decrementValue(columns, setColumns)}
                disabled={columns <= 1}
              >
                <Minus size={14} />
              </Button>
              <Input
                id="columns"
                type="number"
                min={1}
                max={12}
                value={columns}
                onChange={(e) => handleInputChange(e, setColumns)}
                onFocus={handleInputFocus}
                className="rounded-none text-center border-x-0 border-pixelSlicer-darkText/20 bg-white"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-l-none border-pixelSlicer-darkText/20 bg-white hover:bg-pixelSlicer-accent/20"
                onClick={() => incrementValue(columns, setColumns)}
                disabled={columns >= 12}
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {hasSprites && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            variant="default" 
            className="w-full flex items-center gap-2 bg-pixelSlicer-accent text-pixelSlicer-darkText hover:bg-pixelSlicer-accent/80 font-pixelHeading shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onClick={handleDownloadAll}
          >
            <Download size={18} /> Download All Sprites
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
