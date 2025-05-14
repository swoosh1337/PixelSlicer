
import { SpriteSheetSplitter } from "@/components/sprite-sheet-splitter";
import { HeroSection } from "@/components/pixel-slicer/HeroSection";
import { HowItWorks } from "@/components/pixel-slicer/HowItWorks";
import { ExampleGallery } from "@/components/pixel-slicer/ExampleGallery";
import { CallToAction } from "@/components/pixel-slicer/CallToAction";
import { Footer } from "@/components/pixel-slicer/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-pixelSlicer-background">
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <HeroSection />
        
        <HowItWorks />
        
        <ExampleGallery />
        
        <div className="my-16 p-6 bg-white/50 rounded-xl shadow-lg border-2 border-pixelSlicer-accent/20">
          <h2 className="text-3xl font-pixelHeading text-pixelSlicer-darkText mb-8 text-center">
            Slice Your Sprites
          </h2>
          <SpriteSheetSplitter />
        </div>
        
        <CallToAction />
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
