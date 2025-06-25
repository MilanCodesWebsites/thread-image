export const downloadImage = async (imageUrl: string, filename: string): Promise<void> => {
  try {
    // Create a proxy URL to handle CORS issues
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;
    
    // Try direct fetch first, fallback to proxy if CORS fails
    let response: Response;
    try {
      response = await fetch(imageUrl, {
        mode: 'cors',
        headers: {
          'Accept': 'image/*',
        }
      });
      
      if (!response.ok) {
        throw new Error('Direct fetch failed');
      }
    } catch (directError) {
      // Fallback to proxy
      response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error('Proxy fetch failed');
      }
    }
    
    const blob = await response.blob();
    
    // Ensure we have a valid image blob
    if (!blob.type.startsWith('image/')) {
      // Try to determine image type from URL
      const extension = getImageExtension(imageUrl);
      const imageBlob = new Blob([blob], { type: `image/${extension}` });
      downloadBlob(imageBlob, filename);
    } else {
      downloadBlob(blob, filename);
    }
    
  } catch (error) {
    console.error('Download error:', error);
    
    // Final fallback: try to download via a temporary link
    try {
      await downloadViaLink(imageUrl, filename);
    } catch (linkError) {
      console.error('Link download also failed:', linkError);
      // Last resort: open in new tab
      window.open(imageUrl, '_blank');
    }
  }
};

const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }, 100);
};

const downloadViaLink = async (imageUrl: string, filename: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Add cross-origin attribute for better compatibility
    link.crossOrigin = 'anonymous';
    
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Listen for successful download
    link.addEventListener('click', () => {
      setTimeout(() => {
        document.body.removeChild(link);
        resolve();
      }, 100);
    });
    
    // Handle errors
    link.addEventListener('error', () => {
      document.body.removeChild(link);
      reject(new Error('Link download failed'));
    });
    
    link.click();
  });
};

const getImageExtension = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    
    // Common image extensions
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
    
    for (const ext of extensions) {
      if (pathname.includes(`.${ext}`)) {
        return ext === 'jpeg' ? 'jpg' : ext;
      }
    }
    
    // Default to jpg if no extension found
    return 'jpg';
  } catch {
    return 'jpg';
  }
};

export const getImageFilename = (url: string, prefix: string = 'image'): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const extension = getImageExtension(url);
    const timestamp = Date.now();
    
    // Try to extract meaningful name from URL
    const pathParts = pathname.split('/').filter(part => part.length > 0);
    const lastPart = pathParts[pathParts.length - 1];
    
    if (lastPart && lastPart.includes('.')) {
      const nameWithoutExt = lastPart.split('.')[0];
      if (nameWithoutExt.length > 0) {
        return `${prefix}-${nameWithoutExt}-${timestamp}.${extension}`;
      }
    }
    
    return `${prefix}-${timestamp}.${extension}`;
  } catch {
    return `${prefix}-${Date.now()}.jpg`;
  }
};
