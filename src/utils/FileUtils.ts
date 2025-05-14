
import JSZip from "jszip";
import { saveAs } from "file-saver";

export interface SpriteData {
  dataUrl: string;
  index: number;
}

/**
 * Downloads a single sprite as a PNG file
 */
export const downloadSprite = (dataUrl: string, filename: string) => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Downloads all sprites as a ZIP file
 */
export const downloadAllSprites = async (sprites: SpriteData[], filename: string) => {
  try {
    const zip = new JSZip();
    
    // Add each sprite to the zip file
    sprites.forEach((sprite) => {
      // Convert data URL to binary
      const data = sprite.dataUrl.split(",")[1];
      const binaryData = atob(data);
      const array = new Uint8Array(binaryData.length);
      
      for (let i = 0; i < binaryData.length; i++) {
        array[i] = binaryData.charCodeAt(i);
      }
      
      zip.file(`sprite_${sprite.index}.png`, array, { binary: true });
    });
    
    // Generate zip and trigger download
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, filename);
  } catch (error) {
    console.error("Error creating ZIP file:", error);
    throw error;
  }
};
