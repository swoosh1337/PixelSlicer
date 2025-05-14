
import React from "react";
import { Upload, Grid, Download } from "lucide-react";
import { motion } from "framer-motion";

export const HowItWorks: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16" id="how-it-works">
      <motion.h2 
        className="text-3xl font-pixelHeading text-pixelSlicer-darkText mb-12 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How It Works
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="flex flex-col items-center text-center p-6 bg-white/50 rounded-xl shadow-lg border-2 border-pixelSlicer-accent/10 hover:border-pixelSlicer-accent/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          variants={itemVariants}
        >
          <div className="w-16 h-16 flex items-center justify-center bg-pixelSlicer-accent/20 rounded-full mb-4">
            <Upload className="text-pixelSlicer-darkText" size={24} />
          </div>
          <h3 className="text-xl font-pixelHeading text-pixelSlicer-darkText mb-2">
            Step 1
          </h3>
          <p className="text-pixelSlicer-darkTextSecondary">
            Upload your sprite sheet image
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center text-center p-6 bg-white/50 rounded-xl shadow-lg border-2 border-pixelSlicer-accent/10 hover:border-pixelSlicer-accent/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          variants={itemVariants}
        >
          <div className="w-16 h-16 flex items-center justify-center bg-pixelSlicer-accent/20 rounded-full mb-4">
            <Grid className="text-pixelSlicer-darkText" size={24} />
          </div>
          <h3 className="text-xl font-pixelHeading text-pixelSlicer-darkText mb-2">
            Step 2
          </h3>
          <p className="text-pixelSlicer-darkTextSecondary">
            Choose rows & columns
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center text-center p-6 bg-white/50 rounded-xl shadow-lg border-2 border-pixelSlicer-accent/10 hover:border-pixelSlicer-accent/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          variants={itemVariants}
        >
          <div className="w-16 h-16 flex items-center justify-center bg-pixelSlicer-accent/20 rounded-full mb-4">
            <Download className="text-pixelSlicer-darkText" size={24} />
          </div>
          <h3 className="text-xl font-pixelHeading text-pixelSlicer-darkText mb-2">
            Step 3
          </h3>
          <p className="text-pixelSlicer-darkTextSecondary">
            Download sprites
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
