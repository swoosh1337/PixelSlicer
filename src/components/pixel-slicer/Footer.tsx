
import React from "react";
import { Github, Twitter, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export const Footer: React.FC = () => {
  const socialLinks = [
    { icon: <Github size={20} />, label: "GitHub", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <ExternalLink size={20} />, label: "PixelMint Website", href: "#" }
  ];

  return (
    <footer className="py-10 text-center border-t-2 border-pixelSlicer-accent/10 mt-8">
      <motion.div 
        className="font-pixelHeading text-xl text-pixelSlicer-darkText mb-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Built by PixelMint
      </motion.div>
      
      <motion.div 
        className="flex justify-center gap-6 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {socialLinks.map((link, index) => (
          <motion.a 
            key={link.label}
            href={link.href} 
            className="text-pixelSlicer-darkTextSecondary hover:text-pixelSlicer-darkText transition-colors hover:scale-110 transform"
            aria-label={link.label}
            whileHover={{ y: -3 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            {link.icon}
          </motion.a>
        ))}
      </motion.div>
      
      <motion.div 
        className="text-sm text-pixelSlicer-darkTextSecondary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        &copy; {new Date().getFullYear()} PixelMint. All rights reserved.
      </motion.div>
    </footer>
  );
};
