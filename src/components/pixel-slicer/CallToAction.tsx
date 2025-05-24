
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const CallToAction: React.FC = () => {
  return (
    <section className="py-16">
      <motion.div 
        className="bg-pixelSlicer-accent/30 p-8 rounded-xl text-center border-2 border-pixelSlicer-accent/20 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute -top-6 left-1/2 transform -translate-x-1/2"
        >
          <div className="bg-pixelSlicer-accent p-3 rounded-full shadow-md">
            <Sparkles className="text-pixelSlicer-darkText" size={24} />
          </div>
        </motion.div>
        
        <motion.h2 
          className="text-3xl font-pixelHeading text-pixelSlicer-darkText mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Ready to generate your own sprites?
        </motion.h2>
        
        <motion.p 
          className="text-lg text-pixelSlicer-darkTextSecondary mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          PixelMint helps you create beautiful pixel art with AI
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <a 
            href="https://www.pixelmint.art"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              className="bg-pixelSlicer-darkText hover:bg-pixelSlicer-darkText/80 text-pixelSlicer-background font-pixelHeading px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Generate with PixelMint <ArrowRight className="ml-2" size={18} />
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
