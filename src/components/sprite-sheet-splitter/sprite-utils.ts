
import { SpriteData } from "./types";
import { toast } from "sonner";

export const sliceSpritesFromImage = (
  image: HTMLImageElement, 
  rows: number, 
  columns: number, 
  canvas: HTMLCanvasElement
): SpriteData[] => {
  const tempSprites: SpriteData[] = [];
  
  // Get the canvas and its context
  const ctx = canvas.getContext("2d", { willReadFrequently: true, alpha: true });
  
  if (!ctx) {
    toast.error("Could not get canvas context");
    return [];
  }
  
  // Disable anti-aliasing for pixel-perfect slicing
  ctx.imageSmoothingEnabled = false;
  
  // Calculate exact sprite dimensions
  const exactWidth = image.width;
  const exactHeight = image.height;
  
  // Calculate tile dimensions using Math.floor to ensure whole pixels
  // This ensures we don't get partial pixels that could cause bleeding
  const tileWidth = Math.floor(exactWidth / columns);
  const tileHeight = Math.floor(exactHeight / rows);
  
  console.log(`Slicing sprite sheet: ${exactWidth}x${exactHeight} into ${rows}x${columns} grid`);
  console.log(`Each tile will be ${tileWidth}x${tileHeight} pixels`);
  
  // Create each sprite
  let index = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      try {
        // Create a new canvas for each sprite
        const spriteCanvas = document.createElement('canvas');
        spriteCanvas.width = tileWidth;
        spriteCanvas.height = tileHeight;
        const spriteCtx = spriteCanvas.getContext('2d', { alpha: true });
        
        if (!spriteCtx) {
          console.error("Could not get sprite canvas context");
          continue;
        }
        
        // Disable anti-aliasing for pixel-perfect rendering
        spriteCtx.imageSmoothingEnabled = false;
        
        // Clear the canvas with transparent background
        spriteCtx.clearRect(0, 0, tileWidth, tileHeight);
        
        // Calculate source coordinates using integer math to avoid subpixel issues
        const sourceX = Math.floor(col * tileWidth);
        const sourceY = Math.floor(row * tileHeight);
        
        // Handle edge cases for the last column and row
        // This ensures we don't try to read beyond the image boundaries
        const sourceWidth = col === columns - 1
          ? Math.min(tileWidth, exactWidth - sourceX)
          : tileWidth;
        
        const sourceHeight = row === rows - 1
          ? Math.min(tileHeight, exactHeight - sourceY)
          : tileHeight;
        
        // Draw the exact portion of the image
        spriteCtx.drawImage(
          image,
          sourceX,           // Source X - exact pixel
          sourceY,           // Source Y - exact pixel
          sourceWidth,       // Source Width - clamped to image bounds
          sourceHeight,      // Source Height - clamped to image bounds
          0,                 // Destination X
          0,                 // Destination Y
          sourceWidth,       // Destination Width - match source exactly
          sourceHeight       // Destination Height - match source exactly
        );
        
        // Apply cleanup to detect and remove residual pixels
        cleanupSprite(spriteCtx, sourceWidth, sourceHeight);
        
        // Get data URL and add to sprites array
        const dataUrl = spriteCanvas.toDataURL("image/png");
        tempSprites.push({
          dataUrl,
          index: index++
        });
      } catch (error) {
        console.error(`Error slicing sprite at row ${row}, column ${col}:`, error);
        toast.error(`Failed to slice sprite at position ${row},${col}`);
      }
    }
  }
  
  return tempSprites;
};
/**
 * Optional function to clean up a sprite by detecting and removing background
 * This is currently not used in the main slicing function to preserve exact pixel boundaries
 */
function cleanupSprite(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Get image data
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  // First pass: Determine the bounds of the actual sprite
  let left = width;
  let right = 0;
  let top = height;
  let bottom = 0;
  let hasContent = false;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      
      // Check if pixel has any opacity (not fully transparent)
      // and is not a background color (we consider near-white as background)
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      
      // If the pixel has opacity and is not close to a background color
      const isBackground = isBackgroundPixel(r, g, b, a);
      
      if (!isBackground) {
        left = Math.min(left, x);
        right = Math.max(right, x);
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
        hasContent = true;
      }
    }
  }
  
  // If no content was found, return an empty transparent sprite
  if (!hasContent) {
    ctx.clearRect(0, 0, width, height);
    return;
  }
  
  // Extract just the sprite content without padding to maintain exact boundaries
  const spriteContent = ctx.getImageData(left, top, right - left + 1, bottom - top + 1);
  
  // Clear the canvas
  ctx.clearRect(0, 0, width, height);
  
  // Put the sprite content back onto the canvas at its original position
  // This preserves the exact position of the sprite within its tile
  ctx.putImageData(spriteContent, left, top);
}

/**
 * Returns true if a pixel should be treated as background
 */
function isBackgroundPixel(r: number, g: number, b: number, a: number): boolean {
  // Adjust these thresholds based on your sprite sheet's background color
  return (r > 240 && g > 240 && b > 240) || a < 20;
}


